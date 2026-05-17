// ═══════════════════════════════════════════════════════════════
// SALES
// ═══════════════════════════════════════════════════════════════
function switchSalesTab(t){
  ['bestellings','prysgeskiedenis'].forEach(x=>{
    document.getElementById('sales-'+x+'-tab').style.display=x===t?'':'none';
    document.getElementById('tab-'+x).className='tab-btn'+(x===t?' active':'');
  });
  if(t==='prysgeskiedenis') renderPriceHistory();
}
function renderSales(){
  document.getElementById('sales-count').textContent=sales.length;
  const paid=sales.filter(s=>s.status==='Betaal').reduce((x,s)=>x+(s.total||0),0);
  const pend=sales.filter(s=>s.status==='Hangende').reduce((x,s)=>x+(s.total||0),0);
  document.getElementById('sales-sum').innerHTML=`
    <div class="sum-item"><div class="sum-label">Betaal</div><span class="sum-val" style="color:var(--accent)">R${paid.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span></div>
    <div class="sum-item"><div class="sum-label">Hangende</div><span class="sum-val" style="color:var(--orange)">R${pend.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span></div>
    <div class="sum-item"><div class="sum-label">Bestellings</div><span class="sum-val">${sales.length}</span></div>`;
  const search=(document.getElementById('sale-search')?.value||'').toLowerCase();
  const filtered=sales.filter(s=>s.customerName.toLowerCase().includes(search));
  const el=document.getElementById('sale-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen bestellings nie.</div>'; return; }
  el.innerHTML=filtered.map(s=>{
    const open=expandedItems['sale_'+s.id];
    const sc={'Betaal':'badge-green','Gekanselleer':'badge-red','Hangende':'badge-orange'};
    return `<div class="sale-card">
      <div class="sale-head" onclick="toggleExpand('sale_${s.id}');renderSales()">
        <div class="sale-info"><div class="sale-cust">${escH(s.customerName)} ${s.eieGeel?'🌽':''}</div><div class="sale-date">${s.date} · ${s.items?.length||0} produkte</div></div>
        <div class="sale-right"><div class="sale-amt">R${(s.total||0).toFixed(2)}</div><span class="badge ${sc[s.status]||'badge-dim'}">${s.status}</span><span>${open?'▲':'▼'}</span></div>
      </div>
      ${open?`<div class="sale-detail">
        ${s.items?.map(i=>`<div class="sale-detail-row"><span>${escH(i.name)}</span><span>${i.qty} × R${i.price?.toFixed(2)} = R${i.total?.toFixed(2)}</span></div>`).join('')||''}
        ${s.notes?`<div class="detail-notes">${escH(s.notes)}</div>`:''}
        <div class="sale-acts">
          <select class="status-sel" onchange="updateSaleStatus(${s.id},this.value)">
            ${['Hangende','Betaal','Gekanselleer'].map(o=>`<option${s.status===o?' selected':''}>${o}</option>`).join('')}
          </select>
          <button class="icon-btn red sm" onclick="deleteSale(${s.id})">🗑</button>
        </div>
      </div>`:''}
    </div>`;
  }).join('');
  // Populate sale customer list
  const slaCust=document.getElementById('sla-cust');
  if(slaCust){
    const cur=slaCust.value;
    slaCust.innerHTML='<option value="">-- Kies klant --</option>'+customers.map(c=>`<option value="${c.id}"${String(c.id)===cur?' selected':''}>${escH(c.name)}${c.eieGeel?' 🌽':''}</option>`).join('');
  }
}
function onSaleCustomerChange(){
  const id=parseInt(document.getElementById('sla-cust').value);
  const c=customers.find(x=>x.id===id);
  document.getElementById('sla-eie-notice').innerHTML=c?.eieGeel?'<div class="eie-notice">🌽 Eie Geel afslag toegepas: −R48/sak</div>':'';
}
function openSaleProdPicker(){ renderSalePicker(); openModal('sale-prod-modal'); }
function renderSalePicker(){
  const s=(document.getElementById('sp-search')?.value||'').toLowerCase();
  const custId=parseInt(document.getElementById('sla-cust').value);
  const cust=customers.find(c=>c.id===custId);
  const f=products.filter(p=>p.name.toLowerCase().includes(s)).slice(0,40);
  document.getElementById('sp-picker').innerHTML=f.map(p=>`<button class="picker-item" onclick="addSaleItem(${p.id})"><span class="picker-name">${escH(p.name)}</span><span class="picker-sub">R${getDiscounted(p,cust?.eieGeel).toFixed(2)} · ${p.unit}</span></button>`).join('');
}
function addSaleItem(prodId){
  const p=products.find(x=>x.id===prodId); if(!p) return;
  const custId=parseInt(document.getElementById('sla-cust').value);
  const cust=customers.find(c=>c.id===custId);
  const price=getDiscounted(p,cust?.eieGeel);
  const ex=newSaleItems.find(i=>i.productId===prodId);
  if(ex){ ex.qty++; ex.total=ex.qty*ex.price; }
  else newSaleItems.push({productId:prodId,name:p.name,unit:p.unit,price,qty:1,total:price});
  closeModal('sale-prod-modal'); renderSaleItems();
}
function renderSaleItems(){
  const total=newSaleItems.reduce((s,i)=>s+i.total,0);
  document.getElementById('sla-items').innerHTML=newSaleItems.map(i=>`
    <div class="sale-item-row">
      <span class="sale-item-name">${escH(i.name)}</span>
      <div class="sale-item-controls">
        <button class="qty-btn" onclick="updSaleItemQty(${i.productId},-1)">−</button>
        <input type="number" class="qty-input" value="${i.qty}" min="1" onchange="setSaleItemQty(${i.productId},this.value)"/>
        <button class="qty-btn" onclick="updSaleItemQty(${i.productId},1)">+</button>
        <span class="sale-item-total">R${i.total.toFixed(2)}</span>
        <button class="icon-btn red sm" onclick="remSaleItem(${i.productId})">✕</button>
      </div>
    </div>`).join('');
  const totEl=document.getElementById('sla-total');
  if(newSaleItems.length){ totEl.style.display=''; totEl.innerHTML=`<div class="sale-total-row">Totaal: <strong>R${total.toFixed(2)}</strong></div>`; }
  else totEl.style.display='none';
}
function updSaleItemQty(id,d){ const i=newSaleItems.find(x=>x.productId===id); if(i){ i.qty=Math.max(1,i.qty+d); i.total=i.qty*i.price; renderSaleItems(); } }
function setSaleItemQty(id,v){ const i=newSaleItems.find(x=>x.productId===id); if(i){ i.qty=parseInt(v)||1; i.total=i.qty*i.price; renderSaleItems(); } }
function remSaleItem(id){ newSaleItems=newSaleItems.filter(i=>i.productId!==id); renderSaleItems(); }
function saveSale(){
  const custId=parseInt(document.getElementById('sla-cust').value);
  if(!custId||!newSaleItems.length){ alert('Kies \ʼn klant en voeg produkte by'); return; }
  const cust=customers.find(c=>c.id===custId);
  sales.unshift({id:uid(),customerId:custId,customerName:cust?.name||'Onbekend',date:new Date().toISOString().slice(0,10),items:[...newSaleItems],total:newSaleItems.reduce((s,i)=>s+i.total,0),status:document.getElementById('sla-status').value,notes:document.getElementById('sla-notes').value,eieGeel:cust?.eieGeel||false});
  save('v3_sales',sales); newSaleItems=[];
  document.getElementById('sla-items').innerHTML=''; document.getElementById('sla-total').style.display='none'; document.getElementById('sla-notes').value='';
  closeModal('sale-add-modal'); renderSales();
}
function updateSaleStatus(id,st){ const s=sales.find(x=>x.id===id); if(s){ s.status=st; save('v3_sales',sales); renderSales(); } }
function deleteSale(id){ if(!confirm('Verwyder hierdie bestelling?')) return; sales=sales.filter(s=>s.id!==id); save('v3_sales',sales); renderSales(); }
function renderPriceHistory(){
  const el=document.getElementById('price-hist-list');
  if(!priceHistory.length){ el.innerHTML='<div class="empty">Geen prysgeskiedenis nie. Wysig \ʼn produk se prys om dit op te neem.</div>'; return; }
  el.innerHTML=priceHistory.map(h=>`<div class="price-hist-row"><div class="ph-name">${escH(h.productName)}</div><div class="ph-change"><span class="ph-old">R${h.oldPrice?.toFixed(2)}</span><span>→</span><span class="ph-new">R${h.newPrice?.toFixed(2)}</span></div><div class="ph-date">${h.date} ${h.time||''}</div></div>`).join('');
}