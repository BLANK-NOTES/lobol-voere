// ═══════════════════════════════════════════════════════════════
// TRUCK COUNT — met kapasiteit, geskiedenis, bestuurder, vloot
// ═══════════════════════════════════════════════════════════════
let activeTruckTab = 'sessions';

function renderTrucks() {
  const el = document.getElementById('truck-list');
  if (!el) return;
  if (!truckCounts.length) {
    el.innerHTML = '<div class="empty">Geen laaisessies nie. Tik + om te begin.</div>';
    return;
  }
  el.innerHTML = truckCounts.map(t => {
    const bags = t.items.reduce((s,i) => s+i.qty, 0);
    const val  = t.items.reduce((s,i) => s+i.total, 0);
    const ton  = ((bags*50)/1000).toFixed(1);
    const fleetTruck = fleet.find(f => f.id === t.fleetId || f.name === t.name);
    const totalCap   = fleetTruck ? fleetTruck.truckCapacity + (fleetTruck.hasTrailer ? fleetTruck.trailerCapacity : 0) : 0;
    const fillPct    = totalCap > 0 ? Math.min(100, Math.round(bags/totalCap*100)) : 0;
    const fillColor  = fillPct >= 90 ? 'var(--red)' : fillPct >= 70 ? 'var(--orange)' : 'var(--accent)';
    return `<div class="truck-card" onclick="openTruckDetail(${t.id})">
      <div class="truck-icon">🚛</div>
      <div class="truck-card-visual" style="flex:1">
        <span class="truck-name">${escH(t.name)}${t.driverName?` <span style="font-size:11px;color:var(--text3)">· ${escH(t.driverName)}</span>`:''}</span>
        <span class="truck-meta">${t.date} · ${t.items.length} produkte · ${bags} sakke · ${ton} ton</span>
        <span class="truck-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span>
        ${totalCap>0?`<div style="margin-top:4px">
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);margin-bottom:2px">
            <span>${bags}/${totalCap} sakke (${fillPct}%)</span>
            <span>${ton}/${((totalCap*50)/1000).toFixed(1)} ton</span>
          </div>
          <div class="truck-mini-fill"><div class="truck-mini-fill-bar" style="width:${fillPct}%;background:${fillColor}"></div></div>
        </div>`:''}
      </div>
      ${t.delivered?'<span class="badge badge-green" style="flex-shrink:0">Afgelewer</span>':''}
      <button class="icon-btn red sm" style="flex-shrink:0" onclick="event.stopPropagation();deleteTruck(${t.id})">🗑</button>
    </div>`;
  }).join('');
}

function switchTruckTab(tab) {
  activeTruckTab = tab;
  ['sessions','fleet','drivers','history'].forEach(t => {
    const btn = document.getElementById('ttab-'+t);
    const content = document.getElementById('truck-'+t+'-tab');
    if (btn) btn.className = 'tab-btn'+(t===tab?' active':'');
    if (content) content.style.display = t===tab?'':'none';
  });
  if (tab==='sessions') renderTrucks();
  if (tab==='fleet')    renderFleet();
  if (tab==='drivers')  renderDrivers();
  if (tab==='history')  renderTruckHistory();
}

// ── TRUCK ADD ──────────────────────────────────────────────────
function openTruckAddModal() {
  const driverSel = document.getElementById('ta-driver');
  if (driverSel) {
    driverSel.innerHTML = '<option value="">-- Kies bestuurder --</option>' +
      drivers.filter(d=>d.active).map(d =>
        `<option value="${escH(d.name)}">${escH(d.name)} (${escH(d.licenseCode||'EC')})</option>`
      ).join('');
  }
  const fleetSel = document.getElementById('ta-fleet');
  if (fleetSel) {
    fleetSel.innerHTML = '<option value="">-- Kies vragmotor (opsioneel) --</option>' +
      fleet.map(f => {
        const tot = f.truckCapacity + (f.hasTrailer?f.trailerCapacity:0);
        return `<option value="${f.id}">${escH(f.emoji||'🚛')} ${escH(f.name)} – ${tot} sakke / ${((tot*50)/1000).toFixed(1)} ton</option>`;
      }).join('');
  }
  const prev = document.getElementById('ta-cap-preview');
  if (prev) prev.style.display = 'none';
  openModal('truck-add-modal');
}

function updateTruckCapPreview() {
  const sel = document.getElementById('ta-fleet');
  const prev = document.getElementById('ta-cap-preview');
  if (!sel||!prev) return;
  const f = fleet.find(x => x.id===parseInt(sel.value));
  if (f) {
    const tot = f.truckCapacity+(f.hasTrailer?f.trailerCapacity:0);
    prev.style.display='';
    prev.innerHTML=`🚛 Vragmotor: ${f.truckCapacity} sakke${f.hasTrailer?` &nbsp;|&nbsp; 🚌 Sleepwa: ${f.trailerCapacity} sakke`:''} &nbsp;|&nbsp; <strong>Totaal: ${tot} sakke / ${((tot*50)/1000).toFixed(1)} ton</strong>`;
  } else { prev.style.display='none'; }
}

function addTruck() {
  const name = document.getElementById('ta-name').value.trim(); if (!name) return;
  const driverName = document.getElementById('ta-driver')?.value||'';
  const fleetId = parseInt(document.getElementById('ta-fleet')?.value)||null;
  const fleetTruck = fleet.find(f=>f.id===fleetId);
  const t = {
    id:uid(), name, driverName, fleetId,
    truckCapacity: fleetTruck?fleetTruck.truckCapacity:0,
    hasTrailer: fleetTruck?fleetTruck.hasTrailer:false,
    trailerCapacity: fleetTruck?fleetTruck.trailerCapacity:0,
    date: new Date().toLocaleDateString('af-ZA'),
    items: [], delivered: false,
    loadChecklist: { truckLoaded:false, trailerLoaded:false, sealCovered:false, driveComplete:false }
  };
  truckCounts.unshift(t);
  save('v3_trucks', truckCounts);
  document.getElementById('ta-name').value='';
  closeModal('truck-add-modal');
  openTruckDetail(t.id);
}

function deleteTruck(id) {
  if (!confirm('Verwyder hierdie laaisessie?')) return;
  truckCounts = truckCounts.filter(t=>t.id!==id);
  save('v3_trucks',truckCounts);
  renderTrucks();
}

// ── TRUCK DETAIL ───────────────────────────────────────────────

function openTruckDetail(id) {
  currentTruckId = id;
  const t = truckCounts.find(x=>x.id===id); if (!t) return;
  document.getElementById('truck-list-view').style.display='none';
  document.getElementById('truck-detail-view').style.display='';
  document.getElementById('truck-detail-name').textContent = t.name;
  const notice = document.getElementById('eie-notice-truck');
  if (notice) notice.innerHTML = eieGeelActive?'<div class="eie-notice" style="margin-bottom:10px">🌽 Eie Geel afslag toegepas</div>':'';
  renderTruckDetail();
}

function closeTruckDetail() {
  currentTruckId = null;
  document.getElementById('truck-list-view').style.display='';
  document.getElementById('truck-detail-view').style.display='none';
  renderTrucks();
}

function renderTruckDetail() {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const bags  = t.items.reduce((s,i)=>s+i.qty,0);
  const val   = t.items.reduce((s,i)=>s+i.total,0);
  const ton   = ((bags*50)/1000).toFixed(1);
  const totalCap = t.truckCapacity + (t.hasTrailer?t.trailerCapacity:0);
  const fillPct  = totalCap>0?Math.min(100,Math.round(bags/totalCap*100)):0;
  const fillColor= fillPct>=90?'var(--red)':fillPct>=70?'var(--orange)':'var(--accent)';

  document.getElementById('truck-summary').innerHTML=`
    <div class="sum-item">
      <div class="sum-label">Totaal Sakke</div>
      <span class="sum-val" style="color:var(--accent)">${bags}</span>
    </div>
    <div class="sum-item">
      <div class="sum-label">Totale Waarde</div>
      <span class="sum-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span>
    </div>
    <div class="sum-item">
      <div class="sum-label">Ton Gelaai</div>
      <span class="sum-val">${ton}</span>
    </div>
    ${totalCap>0?`<div class="sum-item" style="grid-column:1/-1">
      <div class="sum-label">Kapasiteit (${fillPct}% vol)</div>
      <div class="fill-bar-wrap" style="margin-top:4px"><div class="fill-bar" style="width:${fillPct}%;background:${fillColor}"></div></div>
      <div style="font-size:11px;color:var(--text3);margin-top:2px">${bags}/${totalCap} sakke · ${ton}/${((totalCap*50)/1000).toFixed(1)} ton</div>
    </div>`:''}`;

  // ── LAAI KONTROLELYS ──────────────────────────────────────────
  const cl = t.loadChecklist || {};
  const checkItems = [
    {key:'truckLoaded',   label:'🚛 Vragmotor gelaai',         desc:'Alle items op die vragmotor'},
    {key:'trailerLoaded', label:'🚌 Sleepwa gelaai',           desc:'Alle items op die sleepwa', show: t.hasTrailer},
    {key:'sealCovered',   label:'🎪 Seildoek bedek',           desc:'Alle laaie bedek teen reën'},
    {key:'driveComplete', label:'✅ Rit voltooi / Afgelewer',  desc:'Bestuurder het teruggekeer'},
  ];
  const visibleItems = checkItems.filter(x => x.show !== false);
  const allDone = visibleItems.every(x => cl[x.key]);

  document.getElementById('truck-visual-section').innerHTML = `
    <div class="card" style="margin-bottom:12px">
      <div style="font-weight:700;font-size:13px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center">
        📋 Laai Kontrolelys ${t.driverName?`<span style="font-size:12px;color:var(--text3)">Bestuurder: ${escH(t.driverName)}</span>`:''}
      </div>
      ${visibleItems.map(item=>`
        <div onclick="toggleTruckCheck(${t.id},'${item.key}')"
          style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:6px;cursor:pointer;transition:background .15s;${cl[item.key]?'background:var(--adim)':''}">
          <div class="check-box${cl[item.key]?' checked':''}" style="flex-shrink:0">${cl[item.key]?'✓':''}</div>
          <div>
            <div style="font-weight:600;font-size:14px;${cl[item.key]?'color:var(--accent)':''}">${item.label}</div>
            <div style="font-size:11px;color:var(--text3)">${item.desc}</div>
          </div>
        </div>`).join('')}
      ${allDone?`<div style="background:var(--adim);color:var(--accent);border-radius:8px;padding:10px;font-weight:700;text-align:center;font-size:13px;margin-top:6px">
        🎉 Alles voltooi! Wil jy hierdie sessie na geskiedenis stuur?
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn btn-primary btn-full" onclick="archiveTruck(${t.id})">📦 Stuur na Geskiedenis</button>
        </div>
      </div>`:''}
    </div>`;

  const itemsEl = document.getElementById('truck-items');
  if (!t.items.length) { itemsEl.innerHTML='<div class="empty">Geen items nie – tik "Voeg Produk By"</div>'; return; }
  itemsEl.innerHTML = t.items.map(item=>`
    <div class="count-row">
      <div class="count-info">
        <span class="count-name">${escH(item.name)}</span>
        <span class="count-sub">${item.unit} · R${item.price.toFixed(2)} elk · Totaal: R${item.total.toFixed(2)}</span>
      </div>
      <div class="count-controls">
        <button class="qty-btn" onclick="updateTruckQty(${item.productId},-1)">−</button>
        <input type="number" class="qty-input" value="${item.qty}" min="0" onchange="setTruckQty(${item.productId},this.value)"/>
        <button class="qty-btn" onclick="updateTruckQty(${item.productId},1)">+</button>
        <button class="icon-btn red sm" onclick="removeTruckItem(${item.productId})">✕</button>
      </div>
    </div>`).join('');
}

function toggleTruckCheck(truckId, key) {
  const t = truckCounts.find(x=>x.id===truckId); if (!t) return;
  if (!t.loadChecklist) t.loadChecklist = {};
  t.loadChecklist[key] = !t.loadChecklist[key];
  if (key==='driveComplete' && t.loadChecklist[key]) t.delivered = true;
  save('v3_trucks', truckCounts);
  renderTruckDetail();
}

function archiveTruck(id) {
  const t = truckCounts.find(x=>x.id===id); if (!t) return;
  truckHistory.unshift({ ...t, archivedAt: new Date().toLocaleDateString('af-ZA') });
  truckCounts = truckCounts.filter(x=>x.id!==id);
  save('v3_trucks', truckCounts);
  save('v3_truckHistory', truckHistory);
  closeTruckDetail();
  alert('✅ Laaisessie gestoor in geskiedenis!');
}

// ── TRUCK HISTORY ──────────────────────────────────────────────
function renderTruckHistory() {
  const el = document.getElementById('truck-history-tab');
  if (!el) return;
  if (!truckHistory.length) { el.innerHTML='<div class="empty">Geen geskiedenis nie. Sessies verskyn hier nadat hulle geargiveer is.</div>'; return; }
  el.innerHTML = truckHistory.map(t => {
    const bags = t.items.reduce((s,i)=>s+i.qty,0);
    const val  = t.items.reduce((s,i)=>s+i.total,0);
    return `<div class="truck-card" style="opacity:.85">
      <div class="truck-icon" style="opacity:.6">📦</div>
      <div class="truck-card-visual" style="flex:1">
        <span class="truck-name">${escH(t.name)}${t.driverName?` · ${escH(t.driverName)}`:''}</span>
        <span class="truck-meta">Gery: ${t.date} · Geargiveer: ${t.archivedAt} · ${bags} sakke</span>
        <span class="truck-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span>
      </div>
      <button class="icon-btn red sm" onclick="deleteTruckHistory(${t.id})">🗑</button>
    </div>`;
  }).join('');
}

function deleteTruckHistory(id) {
  if (!confirm('Verwyder hierdie geskiedenisinskrywing?')) return;
  truckHistory = truckHistory.filter(t=>t.id!==id);
  save('v3_truckHistory', truckHistory);
  renderTruckHistory();
}

// ── TRUCK ITEMS ────────────────────────────────────────────────
function renderTruckPicker() {
  const search = (document.getElementById('ti-search')?.value||'').toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(search)||p.category.toLowerCase().includes(search)).slice(0,40);
  document.getElementById('ti-picker').innerHTML = filtered.map(p=>
    `<button class="picker-item" onclick="addTruckItem(${p.id})">
      <span class="picker-name">${escH(p.name)}</span>
      <span class="picker-sub">${p.category} · R${getDiscounted(p).toFixed(2)}</span>
    </button>`
  ).join('');
}

function addTruckItem(prodId) {
  const p = products.find(x=>x.id===prodId); if (!p||!currentTruckId) return;
  const price = getDiscounted(p);
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const ex = t.items.find(i=>i.productId===prodId);
  if (ex) { ex.qty++; ex.total=ex.qty*ex.price; }
  else t.items.push({productId:prodId,name:p.name,unit:p.unit,price,qty:1,total:price});
  save('v3_trucks',truckCounts);
  closeModal('truck-item-modal');
  renderTruckDetail();
}

function updateTruckQty(prodId,delta) {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const i = t.items.find(x=>x.productId===prodId); if (!i) return;
  i.qty=Math.max(0,i.qty+delta); i.total=i.qty*i.price;
  save('v3_trucks',truckCounts); renderTruckDetail();
}

function setTruckQty(prodId,val) {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const i = t.items.find(x=>x.productId===prodId); if (!i) return;
  i.qty=parseInt(val)||0; i.total=i.qty*i.price;
  save('v3_trucks',truckCounts); renderTruckDetail();
}

function removeTruckItem(prodId) {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  t.items=t.items.filter(i=>i.productId!==prodId);
  save('v3_trucks',truckCounts); renderTruckDetail();
}

function exportTruckList() {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const bags=t.items.reduce((s,i)=>s+i.qty,0);
  const val=t.items.reduce((s,i)=>s+i.total,0);
  const lines=['LOBOL – Vragmotor Laailys',`Vragmotor: ${t.name}`,`Bestuurder: ${t.driverName||'—'}`,`Datum: ${t.date}`,'',
    ...t.items.map(i=>`${i.name} – ${i.qty} x R${i.price.toFixed(2)} = R${i.total.toFixed(2)}`),
    '',`Totaal Sakke: ${bags}`,`Totale Waarde: R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}`];
  dl(lines.join('\n'),`${t.name.replace(/\s/g,'_')}_laailys.txt`,'text/plain');
}

// ── FLEET ──────────────────────────────────────────────────────
function renderFleet() {
  const el=document.getElementById('fleet-list'); if (!el) return;
  if (!fleet.length) { el.innerHTML='<div class="empty">Geen vragmotors in vloot nie. Tik + om by te voeg.</div>'; return; }
  el.innerHTML=fleet.map(t=>{
    const tot=t.truckCapacity+(t.hasTrailer?t.trailerCapacity:0);
    return `<div class="fleet-item">
      <div class="fleet-icon">${t.emoji||'🚛'}</div>
      <div class="fleet-info">
        <div class="fleet-name">${escH(t.name)}</div>
        <div class="fleet-meta">${t.notes?escH(t.notes):'Geen notas'}</div>
        <div class="fleet-caps">
          <span class="fleet-cap-chip">🚛 ${t.truckCapacity} sakke (${((t.truckCapacity*50)/1000).toFixed(1)} ton)</span>
          ${t.hasTrailer?`<span class="fleet-cap-chip">🚌 Sleepwa: ${t.trailerCapacity} sakke (${((t.trailerCapacity*50)/1000).toFixed(1)} ton)</span>`:''}
          <span class="fleet-cap-chip" style="background:var(--adim);color:var(--accent);font-weight:700">Totaal: ${tot} sakke / ${((tot*50)/1000).toFixed(1)} ton</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="icon-btn sm" onclick="editFleet(${t.id})">✏</button>
        <button class="icon-btn red sm" onclick="deleteFleet(${t.id})">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function addFleet() {
  const name=document.getElementById('fa-name').value.trim(); if (!name) return;
  const hasTrailer=document.getElementById('fa-has-trailer').checked;
  fleet.push({id:uid(),name,emoji:document.getElementById('fa-emoji').value||'🚛',
    truckCapacity:parseInt(document.getElementById('fa-truck-cap').value)||0,
    hasTrailer,trailerCapacity:hasTrailer?(parseInt(document.getElementById('fa-trailer-cap').value)||0):0,
    notes:document.getElementById('fa-notes').value});
  save('v3_fleet',fleet);
  ['fa-name','fa-truck-cap','fa-trailer-cap','fa-notes'].forEach(x=>{const el=document.getElementById(x);if(el)el.value='';});
  closeModal('fleet-add-modal'); renderFleet();
}

function editFleet(id) {
  const t=fleet.find(x=>x.id===id); if (!t) return;
  const name=prompt('Naam:',t.name); if (name===null) return;
  const cap=prompt('Vragmotor kapasiteit (sakke):',t.truckCapacity); if (cap===null) return;
  const trailer=confirm('Sleepwa?');
  let tCap=0;
  if (trailer) { const tc=prompt('Sleepwa kapasiteit (sakke):',t.trailerCapacity||0); if (tc===null) return; tCap=parseInt(tc)||0; }
  const notes=prompt('Notas:',t.notes||''); if (notes===null) return;
  Object.assign(t,{name,truckCapacity:parseInt(cap)||0,hasTrailer:trailer,trailerCapacity:tCap,notes});
  save('v3_fleet',fleet); renderFleet();
}

function deleteFleet(id) {
  if (!confirm('Verwyder?')) return;
  fleet=fleet.filter(x=>x.id!==id); save('v3_fleet',fleet); renderFleet();
}

function toggleTrailerField() {
  const cb=document.getElementById('fa-has-trailer');
  const row=document.getElementById('fa-trailer-row');
  if (row) row.style.display=cb&&cb.checked?'':'none';
}

// ── DRIVERS ────────────────────────────────────────────────────
function renderDrivers() {
  const el=document.getElementById('driver-list'); if (!el) return;
  if (!drivers.length) { el.innerHTML='<div class="empty">Geen bestuurders nie.</div>'; return; }
  el.innerHTML=drivers.map(d=>`
    <div class="driver-row${!d.active?' worker-inactive':''}">
      <div class="driver-av">${d.name.charAt(0).toUpperCase()}</div>
      <div class="driver-info">
        <div class="driver-name">${escH(d.name)}</div>
        <div class="driver-role">Lisensie: ${escH(d.licenseCode||'EC')} ${d.phone?'· '+escH(d.phone):''}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        ${!d.active?'<span class="badge badge-dim">Af</span>':''}
        <button class="icon-btn sm" onclick="editDriver(${d.id})">✏</button>
        <button class="icon-btn sm" onclick="toggleDriverActive(${d.id})">${d.active?'✕':'✓'}</button>
        <button class="icon-btn red sm" onclick="deleteDriver(${d.id})">🗑</button>
      </div>
    </div>`).join('');
}

function addDriver() {
  const name=document.getElementById('da2-name').value.trim(); if (!name) return;
  drivers.push({id:uid(),name,phone:document.getElementById('da2-phone').value,
    licenseCode:document.getElementById('da2-license').value||'EC',
    notes:document.getElementById('da2-notes').value,active:true});
  save('v3_drivers',drivers);
  ['da2-name','da2-phone','da2-notes'].forEach(x=>{const el=document.getElementById(x);if(el)el.value='';});
  closeModal('driver-add-modal'); renderDrivers();
}

function editDriver(id) {
  const d=drivers.find(x=>x.id===id); if (!d) return;
  const name=prompt('Naam:',d.name); if (name===null) return;
  const phone=prompt('Tel:',d.phone||''); if (phone===null) return;
  const lic=prompt('Lisensiekode:',d.licenseCode||'EC'); if (lic===null) return;
  Object.assign(d,{name,phone,licenseCode:lic}); save('v3_drivers',drivers); renderDrivers();
}

function toggleDriverActive(id) {
  const d=drivers.find(x=>x.id===id); if(d){d.active=!d.active;save('v3_drivers',drivers);renderDrivers();}
}

function deleteDriver(id) {
  if (!confirm('Verwyder?')) return;
  drivers=drivers.filter(x=>x.id!==id); save('v3_drivers',drivers); renderDrivers();
}