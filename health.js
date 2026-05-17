// ═══════════════════════════════════════════════════════════════
// DIEREGESONDHEID & STUDIE NOTAS
// ═══════════════════════════════════════════════════════════════
let activeHealthTab = 'gesondheid';

const HEALTH_TYPES = ['Behandeling','Entstof','Dosering','Siekte','Besering','Ander'];
const ANIMAL_TYPES = ['Beeste','Skape','Bulle','Kalwers','Lammers','Melkbeeste','Pluimvee','Ander'];

// ── HEALTH TAB SWITCH ──────────────────────────────────────────
function switchHealthTab(tab) {
  activeHealthTab = tab;
  ['gesondheid','notas'].forEach(t => {
    const btn = document.getElementById('htab-'+t);
    const el  = document.getElementById('health-'+t+'-tab');
    if (btn) btn.className = 'tab-btn'+(t===tab?' active':'');
    if (el)  el.style.display = t===tab?'':'none';
  });
  if (tab==='gesondheid') renderHealth();
  if (tab==='notas')      renderStudyNotes();
}

// ── HEALTH RECORDS ─────────────────────────────────────────────
function renderHealth() {
  const el = document.getElementById('health-gesondheid-tab');
  if (!el) return;

  // Stats
  const today = new Date().toLocaleDateString('af-ZA');
  const thisMonth = new Date().toISOString().slice(0,7);
  const monthRecs = healthRecords.filter(r => r.date && r.date.includes(thisMonth.slice(5)));
  const treatments = healthRecords.filter(r => r.type==='Behandeling');
  const vaccines   = healthRecords.filter(r => r.type==='Entstof');

  el.innerHTML = `
    <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:12px">
      <div class="stat-box"><span class="stat-val">${healthRecords.length}</span><span class="stat-lbl">Totaal</span></div>
      <div class="stat-box"><span class="stat-val orange">${treatments.length}</span><span class="stat-lbl">Behandelings</span></div>
      <div class="stat-box"><span class="stat-val green">${vaccines.length}</span><span class="stat-lbl">Entstowwe</span></div>
    </div>
    <button class="btn btn-primary btn-full" style="margin-bottom:12px" onclick="openModal('health-add-modal')">＋ Voeg Gesondheidsrekord By</button>
    ${healthRecords.length===0?'<div class="empty">Geen gesondheidsrekords nie. Tik + om te begin.</div>':''}
    ${[...healthRecords].reverse().map(r => {
      const typeColor = r.type==='Behandeling'?'badge-orange':r.type==='Entstof'?'badge-green':r.type==='Siekte'?'badge-red':'badge-dim';
      return `<div class="card" style="margin-bottom:8px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
              <span class="badge ${typeColor}">${escH(r.type)}</span>
              <span style="font-size:11px;color:var(--text3)">🐄 ${escH(r.animalType)} ${r.count?'('+r.count+' diere)':''}</span>
              <span style="font-size:11px;color:var(--text3)">📅 ${r.date||''}</span>
            </div>
            <div style="font-weight:700;font-size:14px">${escH(r.title)}</div>
            ${r.product?`<div style="font-size:12px;color:var(--accent);margin-top:2px">💊 ${escH(r.product)}</div>`:''}
            ${r.dosage?`<div style="font-size:12px;color:var(--text2)">Dosis: ${escH(r.dosage)}</div>`:''}
            ${r.notes?`<div style="font-size:12px;color:var(--text3);margin-top:4px">${escH(r.notes)}</div>`:''}
            ${r.nextDue?`<div style="font-size:12px;color:var(--orange);margin-top:4px">🔔 Volgende: ${escH(r.nextDue)}</div>`:''}
          </div>
          <button class="icon-btn red sm" onclick="deleteHealthRecord(${r.id})">🗑</button>
        </div>
      </div>`;
    }).join('')}`;
}

function addHealthRecord() {
  const title = document.getElementById('hr-title').value.trim();
  if (!title) return;
  healthRecords.push({
    id: uid(),
    title,
    type:       document.getElementById('hr-type').value,
    animalType: document.getElementById('hr-animal').value,
    count:      document.getElementById('hr-count').value,
    product:    document.getElementById('hr-product').value,
    dosage:     document.getElementById('hr-dosage').value,
    date:       document.getElementById('hr-date').value || new Date().toLocaleDateString('af-ZA'),
    nextDue:    document.getElementById('hr-next').value,
    notes:      document.getElementById('hr-notes').value,
  });
  save('v3_health', healthRecords);
  ['hr-title','hr-count','hr-product','hr-dosage','hr-next','hr-notes'].forEach(x => {
    const el = document.getElementById(x); if(el) el.value='';
  });
  closeModal('health-add-modal');
  renderHealth();
}

function deleteHealthRecord(id) {
  if (!confirm('Verwyder hierdie rekord?')) return;
  healthRecords = healthRecords.filter(r => r.id !== id);
  save('v3_health', healthRecords);
  renderHealth();
}

// ── QUICK HEALTH REFERENCE ────────────────────────────────────
const HEALTH_REF = [
  {category:'Beeste – Maagwerkings',icon:'🐄',items:[
    'Salmonella (bloed+slym in mis): Advocin + Vitamine B inspuiting',
    'Dikmelkagtige mis: Clamoxil RTU + Biosol M (oraal)',
    'Koksidiose (bloed/dooie bloed in mis): Sulfamiddel 3 dae (Amphoprim/Norotrim/Disulfox)',
    'Waterige grys mis: Biosol M (oraal) + Phosamine inspuiting',
    'Melklintwurm (groen loperige mis): Lintex/Endotape/Praziquantel – elke 14 dae herhaal',
    'Respiratories: Nuflor/Mycotil 300',
  ]},
  {category:'Skape – Lammer Probleme',icon:'🐑',items:[
    'Haarwurm: doseer elke 20 dae – wag 30 dae ná behandeling voor intensiewe voer',
    'Koksidiose: Vecoxan elke 20 dae (koksidiostaat in voer is eers effektief as inname hoog genoeg)',
    'Diarree: Suurmelk/Dikmelk verlaag PH van dermkanaal – geskik as remedie',
  ]},
  {category:'Kalwers – Voorkoming',icon:'🐮',items:[
    'Kolostrum BINNE 6 UUR na geboorte (2L) – immuniteit oordrag',
    'Naelstring: ontsmet met jodium onmiddellik na geboorte',
    'Voorsorg: Dectomax 1cc onderhuid | Enting Paratifus & Pasteurella',
    'Vitamine A inspuiting net na geboorte | Vitamine B maandeliks teen stres',
    'Siek kalf in eerste 2 maande = ±80kg ligter op 6 maande',
  ]},
  {category:'Algemene Entstowwe',icon:'💉',items:[
    'Knopvelsiekte, Pasteurella, Spons & Milt: sien met dip-skedule',
    'Paratifus: Dag 7 na geboorte (kalwers)',
    'Pasteurella en Clostridiale siektes: Dag 50 (kalwers)',
    'Wag 2 weke ná antibiotika voor enting kan plaasvind',
    'Moenie dip/skeer/inent binne 30 dae voor dekking nie (ramme/bulle)',
  ]},
];

function renderHealthRef() {
  const el = document.getElementById('health-ref-section');
  if (!el) return;
  el.innerHTML = HEALTH_REF.map((sec,i) => {
    const key = 'href_'+i;
    const open = infoExpanded[key];
    return `<div class="info-section">
      <div class="info-section-header" onclick="toggleInfoSection('${key}');renderHealthRef()">
        <div class="info-section-icon">${sec.icon}</div>
        <div class="info-section-title">${sec.category}</div>
        <span>${open?'▲':'▼'}</span>
      </div>
      ${open?`<div class="info-section-body">
        <ul class="info-list">${sec.items.map(li=>`<li>${li}</li>`).join('')}</ul>
      </div>`:''}
    </div>`;
  }).join('');
}

// ── STUDY NOTES ────────────────────────────────────────────────
function renderStudyNotes() {
  const el = document.getElementById('health-notas-tab');
  if (!el) return;

  const search = (document.getElementById('sn-search')?.value||'').toLowerCase();
  const filtered = studyNotes.filter(n =>
    !search || n.title.toLowerCase().includes(search) || n.body.toLowerCase().includes(search)
  ).sort((a,b) => (b.pinned?1:0)-(a.pinned?1:0));

  el.innerHTML = `
    <button class="btn btn-primary btn-full" style="margin-bottom:10px" onclick="openModal('study-note-modal')">＋ Nuwe Studie Nota</button>
    <div class="search-wrap" style="margin-bottom:10px">🔍 <input type="text" id="sn-search" placeholder="Soek notas..." oninput="renderStudyNotes()"/></div>
    ${filtered.length===0?'<div class="empty">Geen studie notas nie. Skryf wat jy leer hier neer!</div>':''}
    <div class="notes-grid">
      ${filtered.map(n=>`
        <div class="note-card note-${n.color||'default'}${n.pinned?' pinned':''}">
          <div class="note-top">
            <div class="note-meta">
              ${n.pinned?'📌 ':''}
              <span class="note-type-tag">${escH(n.tag||'Algemeen')}</span>
            </div>
            <div class="note-acts">
              <button class="icon-btn sm${n.pinned?' accent':''}" onclick="toggleStudyPin(${n.id})">📌</button>
              <button class="icon-btn red sm" onclick="deleteStudyNote(${n.id})">🗑</button>
            </div>
          </div>
          ${n.title?`<div class="note-title-text">${escH(n.title)}</div>`:''}
          <div class="note-body-text">${escH(n.body||'')}</div>
          <div class="note-date-text">${n.date||''}</div>
        </div>`).join('')}
    </div>`;
}

function addStudyNote() {
  const title = document.getElementById('sn-title').value.trim();
  const body  = document.getElementById('sn-body').value.trim();
  if (!title && !body) return;
  studyNotes.unshift({
    id: uid(), title, body,
    tag:   document.getElementById('sn-tag').value || 'Algemeen',
    color: document.getElementById('sn-color').value || 'default',
    pinned: false,
    date:  new Date().toLocaleDateString('af-ZA'),
  });
  save('v3_studyNotes', studyNotes);
  ['sn-title','sn-body'].forEach(x => { const el=document.getElementById(x); if(el) el.value=''; });
  closeModal('study-note-modal');
  renderStudyNotes();
}

function toggleStudyPin(id) {
  const n = studyNotes.find(x=>x.id===id);
  if (n) { n.pinned=!n.pinned; save('v3_studyNotes',studyNotes); renderStudyNotes(); }
}

function deleteStudyNote(id) {
  if (!confirm('Verwyder hierdie nota?')) return;
  studyNotes = studyNotes.filter(n=>n.id!==id);
  save('v3_studyNotes',studyNotes);
  renderStudyNotes();
}

function renderHealthPage() {
  switchHealthTab(activeHealthTab);
  // Always show the quick ref
  setTimeout(renderHealthRef, 50);
}