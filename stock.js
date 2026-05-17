// ═══════════════════════════════════════════════════════════════
// FACTORY STOCK — verbeterde beheer en opsies
// ═══════════════════════════════════════════════════════════════
const STOCK_STATUSES = ['Alle','Goed','Lae Voorraad','Naby Verval','Verval'];

function renderStock() {
  const expired  = factoryStock.filter(i => ['Verval','Expired'].includes(i.status));
  const low      = factoryStock.filter(i => ['Lae Voorraad','Low'].includes(i.status));
  const near     = factoryStock.filter(i => ['Naby Verval','Near Expiry'].includes(i.status));
  const good     = factoryStock.filter(i => ['Goed','Good'].includes(i.status));
  const minAlert = factoryStock.filter(i => i.minQty && i.qty <= i.minQty);

  document.getElementById('stock-stats').innerHTML = `
    <div class="stat-box"><span class="stat-val">${factoryStock.length}</span><span class="stat-lbl">Totaal Items</span></div>
    <div class="stat-box"><span class="stat-val red">${expired.length}</span><span class="stat-lbl">Verval</span></div>
    <div class="stat-box"><span class="stat-val orange">${near.length + low.length}</span><span class="stat-lbl">Aandag</span></div>
    <div class="stat-box"><span class="stat-val green">${good.length}</span><span class="stat-lbl">Goed</span></div>`;

  const totalVal = factoryStock.reduce((s,i) => s + (i.qty||0)*(i.price||0), 0);
  document.getElementById('stock-value-banner').innerHTML = totalVal > 0
    ? `<div class="stock-value-banner">Totale voorraadwaarde: <strong>R${totalVal.toLocaleString('af-ZA',{minimumFractionDigits:2})}</strong></div>` : '';

  // Sort selector
  const sortEl = document.getElementById('stock-sort');
  const sortBy = sortEl ? sortEl.value : 'status';

  document.getElementById('stock-chips').innerHTML = STOCK_STATUSES.map(s =>
    `<button class="chip${stockFilter===s?' active':''}${s==='Verval'?' danger':s==='Lae Voorraad'||s==='Naby Verval'?' warn':''}" onclick="setStockFilter('${s}')">${s}</button>`
  ).join('') + `
    <button class="chip${stockFilter==='Min Alert'?' active danger':''}" onclick="setStockFilter('Min Alert')">⚠️ Min Vlak ${minAlert.length>0?'('+minAlert.length+')':''}</button>
    <button class="chip${stockFilter==='Meeste'?' active':''}" onclick="setStockFilter('Meeste')">📦 Meeste</button>`;

  const search = (document.getElementById('stock-search')?.value||'').toLowerCase();
  let filtered = factoryStock.filter(i => {
    if (search && !i.name.toLowerCase().includes(search)) return false;
    if (stockFilter === 'Alle') return true;
    if (stockFilter === 'Min Alert') return i.minQty && i.qty <= i.minQty;
    if (stockFilter === 'Meeste') return true;
    return i.status === stockFilter;
  });

  // Sorting
  if (stockFilter === 'Meeste') {
    filtered.sort((a,b) => b.qty - a.qty);
  } else if (sortBy === 'qty') {
    filtered.sort((a,b) => b.qty - a.qty);
  } else if (sortBy === 'name') {
    filtered.sort((a,b) => a.name.localeCompare(b.name));
  } else {
    // Sort by status urgency
    const order = {'Verval':0,'Expired':0,'Lae Voorraad':1,'Near Expiry':1,'Naby Verval':1,'Goed':2,'Good':2};
    filtered.sort((a,b) => (order[a.status]??3) - (order[b.status]??3));
  }

  const el = document.getElementById('stock-list');
  if (!filtered.length) { el.innerHTML = '<div class="empty">Geen voorraad items nie. Tik + om by te voeg.</div>'; return; }

  el.innerHTML = filtered.map(i => {
    const isExpired = ['Verval','Expired'].includes(i.status);
    const isWarn = ['Lae Voorraad','Low','Naby Verval','Near Expiry'].includes(i.status);
    const isMinAlert = i.minQty && i.qty <= i.minQty;
    const statusColor = isExpired ? 'red' : isWarn ? 'orange' : 'green';
    const statusEmoji = isExpired ? '🔴' : isWarn ? '🟠' : '🟢';
    const pct = i.maxQty ? Math.min(100, Math.round((i.qty/i.maxQty)*100)) : null;
    const fillColor = pct < 20 ? 'var(--red)' : pct < 50 ? 'var(--orange)' : 'var(--accent)';

    return `<div class="stock-card${isExpired?' expired':''}${isMinAlert?' min-alert-card':''}">
      <div class="stock-top">
        <div class="stock-name-row">
          <span>${statusEmoji}</span>
          <span class="stock-name">${escH(i.name)}</span>
          ${isMinAlert?'<span class="badge badge-orange" style="font-size:10px">⚠️ Lae Min</span>':''}
        </div>
        <span class="badge badge-${statusColor}">${i.status}</span>
      </div>
      <div class="stock-details">
        <span class="detail-item"><strong>${i.qty}</strong> ${i.unit}s</span>
        ${i.minQty?`<span class="detail-item" style="color:${isMinAlert?'var(--orange)':'var(--text3)'}">Min: ${i.minQty}</span>`:''}
        ${i.maxQty?`<span class="detail-item">Maks: ${i.maxQty}</span>`:''}
        <span class="detail-item">R${i.price}/eenheid</span>
        <span class="detail-item">Waarde: R${((i.qty||0)*(i.price||0)).toFixed(2)}</span>
      </div>
      ${pct!==null?`<div style="margin:6px 0 2px">
        <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);margin-bottom:2px"><span>${i.qty}/${i.maxQty} sakke</span><span>${pct}%</span></div>
        <div class="fill-bar-wrap"><div class="fill-bar" style="width:${pct}%;background:${fillColor}"></div></div>
      </div>`:''}
      ${i.isExpired===true?`<div class="badge badge-red" style="margin-top:6px;display:inline-block">✅ Gemerk as Verval</div>`:''}
      ${i.notes?`<div class="stock-notes">${escH(i.notes)}</div>`:''}
      <div class="stock-footer">
        <span class="stock-updated">Opgedateer ${i.updatedAt||''}</span>
        <div style="display:flex;gap:6px">
          <button class="icon-btn sm" onclick="editStockItem(${i.id})">✏</button>
          <button class="icon-btn sm" style="background:var(--rdim);color:var(--red)" onclick="markStockExpired(${i.id})" title="Merk as Verval">⚠️</button>
          <button class="icon-btn red sm" onclick="deleteStockItem(${i.id})">🗑</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function setStockFilter(f) { stockFilter = f; renderStock(); }

function markStockExpired(id) {
  const i = factoryStock.find(x => x.id === id);
  if (!i) return;
  i.status = 'Verval';
  i.isExpired = true;
  i.expiredDate = new Date().toLocaleDateString('af-ZA');
  i.updatedAt = new Date().toLocaleDateString('af-ZA');
  save('v3_stock', factoryStock);
  renderStock();
}

function renderStockPicker() {
  const s = (document.getElementById('sa-prod-search')?.value||'').toLowerCase();
  const f = products.filter(p => p.name.toLowerCase().includes(s)).slice(0,30);
  document.getElementById('sa-picker').innerHTML = f.map(p =>
    `<button class="picker-item" onclick="selectStockProd(${p.id},'${escH(p.name)}')">
      ${escH(p.name)}<span style="font-size:12px;color:var(--text3)"> · ${p.unit}</span>
    </button>`
  ).join('');
}

function selectStockProd(id, name) {
  document.getElementById('sa-prod-id').value = id;
  document.getElementById('sa-prod-search').value = name;
  document.getElementById('sa-picker').innerHTML = '';
  // Auto-fill price from product
  const p = products.find(x => x.id === id);
  if (p) {
    const priceEl = document.getElementById('sa-price');
    if (priceEl && !priceEl.value) priceEl.value = p.price;
  }
}

function addStockItem() {
  const prodId = parseInt(document.getElementById('sa-prod-id').value);
  if (!prodId) { alert('Kies eers ʼn produk'); return; }
  const p = products.find(x => x.id === prodId);
  if (!p) return;

  // Expiry handling: separate from status
  const expiryMode = document.getElementById('sa-expiry-mode')?.value || 'none';
  const expiryDate = document.getElementById('sa-expiry-date')?.value || '';
  let status = document.getElementById('sa-status').value;

  factoryStock.push({
    id: uid(),
    productId: prodId,
    name: p.name,
    unit: p.unit,
    price: parseFloat(document.getElementById('sa-price')?.value) || p.price,
    qty: parseInt(document.getElementById('sa-qty').value)||0,
    minQty: parseInt(document.getElementById('sa-min').value)||0,
    maxQty: parseInt(document.getElementById('sa-max')?.value)||0,
    status,
    expiryMode,   // 'none' | 'dated' | 'expired'
    expiryDate,
    notes: document.getElementById('sa-notes').value,
    updatedAt: new Date().toLocaleDateString('af-ZA'),
  });
  save('v3_stock', factoryStock);
  ['sa-prod-id','sa-qty','sa-min','sa-max','sa-expiry-date','sa-notes'].forEach(x => {
    const el = document.getElementById(x);
    if (el) el.value = '';
  });
  document.getElementById('sa-prod-search').value = '';
  document.getElementById('sa-picker').innerHTML = '';
  closeModal('stock-add-modal');
  renderStock();
}

function editStockItem(id) {
  const i = factoryStock.find(x => x.id === id); if (!i) return;
  const qty  = prompt('Hoeveelheid:', i.qty);      if (qty===null) return;
  const min  = prompt('Min vlak (waarskuwing):', i.minQty||0); if (min===null) return;
  const max  = prompt('Maks kapasiteit (0 = geen balk):', i.maxQty||0); if (max===null) return;
  const stat = prompt('Status (Goed/Lae Voorraad/Naby Verval/Verval):', i.status); if (stat===null) return;
  const notes = prompt('Notas:', i.notes||''); if (notes===null) return;
  Object.assign(i, {
    qty: parseInt(qty)||0,
    minQty: parseInt(min)||0,
    maxQty: parseInt(max)||0,
    status: stat,
    notes,
    updatedAt: new Date().toLocaleDateString('af-ZA'),
  });
  save('v3_stock', factoryStock);
  renderStock();
}

function deleteStockItem(id) {
  if (!confirm('Verwyder hierdie voorraad item?')) return;
  factoryStock = factoryStock.filter(i => i.id !== id);
  save('v3_stock', factoryStock);
  renderStock();
}

function toggleExpiryDate() {
  const mode = document.getElementById('sa-expiry-mode')?.value;
  const row = document.getElementById('sa-expiry-date-row');
  if (row) row.style.display = mode === 'dated' ? '' : 'none';
  // Auto-set status if expired selected
  if (mode === 'expired') {
    const sel = document.getElementById('sa-status');
    if (sel) sel.value = 'Verval';
  }
}