// ═══════════════════════════════════════════════════════════════
// LOBOL STORAGE — iPhone-safe persistent storage
// Uses localStorage with automatic backup to prevent data loss
// ═══════════════════════════════════════════════════════════════

const STORE = {
  get(k, d) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : d;
    } catch { return d; }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      // Also keep a timestamp so we know when last saved
      localStorage.setItem('lobol_lastSave', Date.now().toString());
    } catch(e) {
      // localStorage full — alert user
      console.warn('Storage full:', e);
      showStorageWarning();
    }
  }
};

function showStorageWarning() {
  const el = document.getElementById('storage-warning');
  if (el) el.style.display = 'flex';
}

// ── iPhone DATA PERSISTENCE FIX ──────────────────────────────
// Safari on iPhone clears localStorage when "Prevent Cross-Site Tracking" 
// is on OR when storage quota is exceeded.
// Solution: auto-export to a downloadable JSON every time data changes.

let autoSaveTimer = null;
function scheduleAutoBackup() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(createAutoBackup, 3000); // 3s after last change
}

function createAutoBackup() {
  try {
    const backup = buildBackupData();
    const json = JSON.stringify(backup);
    // Store in sessionStorage as extra copy
    sessionStorage.setItem('lobol_backup', json);
    // Update last backup time shown in UI
    const el = document.getElementById('last-backup-time');
    if (el) el.textContent = 'Laaste rugsteun: ' + new Date().toLocaleTimeString('af-ZA', {hour:'2-digit',minute:'2-digit'});
  } catch(e) {
    console.warn('Auto backup failed:', e);
  }
}

function buildBackupData() {
  return {
    exportDate: new Date().toISOString(),
    version: '4.0',
    products:     STORE.get('v3_products', []),
    duties:       STORE.get('v3_duties', []),
    reminders:    STORE.get('v3_reminders', []),
    factoryStock: STORE.get('v3_stock', []),
    truckCounts:  STORE.get('v3_trucks', []),
    customers:    STORE.get('v3_customers', []),
    sales:        STORE.get('v3_sales', []),
    deliveries:   STORE.get('v3_deliveries', []),
    notes:        STORE.get('v3_notes', []),
    workers:      STORE.get('v3_workers', []),
    priceHistory: STORE.get('v3_priceHistory', []),
    fleet:        STORE.get('v3_fleet', []),
    drivers:      STORE.get('v3_drivers', []),
    workerGroups: STORE.get('v3_workerGroups', []),
    truckHistory: STORE.get('v3_truckHistory', []),
    healthRecords:STORE.get('v3_health', []),
    studyNotes:   STORE.get('v3_studyNotes', []),
    eieGeel:      STORE.get('v3_eieGeel', false),
    assignments:  STORE.get('v3_assignments', {}),
  };
}

// ── DOWNLOAD BACKUP ──────────────────────────────────────────
function downloadBackupNow() {
  const data = buildBackupData();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], {type: 'application/json'});
  const url  = URL.createObjectURL(blob);
  const date = new Date().toLocaleDateString('af-ZA').replace(/\//g,'-');
  
  // iPhone Safari: use <a download> trick
  const a = document.createElement('a');
  a.href = url;
  a.download = `LOBOL_Rugsteun_${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Show success
  const btn = document.getElementById('iphone-save-btn');
  if (btn) {
    btn.textContent = '✅ Gestoor!';
    setTimeout(() => { btn.textContent = '💾 Stoor Data na iPhone'; }, 2000);
  }
}

// ── RESTORE FROM FILE ────────────────────────────────────────
function restoreFromFile(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!data.version) throw new Error('Ongeldige rugsteun lêer');
      
      if (data.products)      STORE.set('v3_products',     data.products);
      if (data.duties)        STORE.set('v3_duties',       data.duties);
      if (data.reminders)     STORE.set('v3_reminders',    data.reminders);
      if (data.factoryStock)  STORE.set('v3_stock',        data.factoryStock);
      if (data.truckCounts)   STORE.set('v3_trucks',       data.truckCounts);
      if (data.customers)     STORE.set('v3_customers',    data.customers);
      if (data.sales)         STORE.set('v3_sales',        data.sales);
      if (data.deliveries)    STORE.set('v3_deliveries',   data.deliveries);
      if (data.notes)         STORE.set('v3_notes',        data.notes);
      if (data.workers)       STORE.set('v3_workers',      data.workers);
      if (data.priceHistory)  STORE.set('v3_priceHistory', data.priceHistory);
      if (data.fleet)         STORE.set('v3_fleet',        data.fleet);
      if (data.drivers)       STORE.set('v3_drivers',      data.drivers);
      if (data.workerGroups)  STORE.set('v3_workerGroups', data.workerGroups);
      if (data.healthRecords) STORE.set('v3_health',       data.healthRecords);
      if (data.studyNotes)    STORE.set('v3_studyNotes',   data.studyNotes);
      if (data.assignments)   STORE.set('v3_assignments',  data.assignments);
      
      alert('✅ Data suksesvol herstel! Die app herlaai nou.');
      location.reload();
    } catch(e) {
      alert('❌ Fout: ' + e.message);
    }
  };
  reader.readAsText(file);
  input.value = '';
}

// ── CHECK FOR LOST DATA ON STARTUP ───────────────────────────
function checkDataIntegrity() {
  const lastSave = localStorage.getItem('lobol_lastSave');
  const products = STORE.get('v3_products', null);
  
  if (lastSave && (!products || products.length === 0)) {
    // Data was lost! Try to restore from sessionStorage backup
    const backup = sessionStorage.getItem('lobol_backup');
    if (backup) {
      try {
        const data = JSON.parse(backup);
        if (data.products && data.products.length > 0) {
          if (confirm('⚠️ Dit lyk asof data verlore is. Wil jy die laaste rugsteun herstel?')) {
            Object.keys(data).forEach(k => {
              if (k !== 'exportDate' && k !== 'version') {
                const storeKey = {
                  products:'v3_products', duties:'v3_duties', customers:'v3_customers',
                  sales:'v3_sales', factoryStock:'v3_stock', notes:'v3_notes'
                }[k];
                if (storeKey) STORE.set(storeKey, data[k]);
              }
            });
            location.reload();
          }
        }
      } catch(e) {}
    }
  }
}
