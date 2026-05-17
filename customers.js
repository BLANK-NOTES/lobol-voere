// ═══════════════════════════════════════════════════════════════
// CUSTOMERS
// ═══════════════════════════════════════════════════════════════
function renderCustomers(){
  document.getElementById('cust-count').textContent=customers.length;
  const search=(document.getElementById('cust-search')?.value||'').toLowerCase();
  const filtered=customers.filter(c=>c.name.toLowerCase().includes(search)||(c.farm||'').toLowerCase().includes(search)||(c.area||'').toLowerCase().includes(search));
  const el=document.getElementById('cust-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen klante gevind nie.</div>'; return; }
  el.innerHTML=filtered.map(c=>{
    const open=expandedItems['cust_'+c.id];
    return `<div class="cust-card">
      <div class="cust-top" onclick="toggleExpand('cust_${c.id}');renderCustomers()">
        <div class="cust-avatar">${c.name.charAt(0)}</div>
        <div class="cust-info">
          <div class="cust-name">${escH(c.name)} ${c.eieGeel?'<span class="eie-chip">🌽 Eie Geel</span>':''}</div>
          <div class="cust-farm">${escH(c.farm||'')}</div>
        </div>
        <span class="cust-type">${c.type||''}</span>
      </div>
      ${open?`<div class="cust-detail">
        ${c.phone?`<a href="tel:${c.phone}" class="detail-link">📞 ${escH(c.phone)}</a>`:''}
        ${c.area?`<div style="display:flex;align-items:center;gap:5px;font-size:13px;color:var(--text2)">📍 ${escH(c.area)}</div>`:''}${c.distance?`<div style="display:flex;align-items:center;gap:5px;font-size:13px;color:var(--text2)">🛣️ ${escH(c.distance)} km vanaf fabriek</div>`:''}
        ${c.notes?`<div class="detail-notes">${escH(c.notes)}</div>`:''}
        <div class="cust-detail-acts">
          <button class="btn btn-secondary btn-sm" onclick="editCustomer(${c.id})">✏ Wysig</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${c.id})">🗑 Verwyder</button>
        </div>
      </div>`:''}
    </div>`;
  }).join('');
}
function toggleNewCustEieGeel(){ newCustEieGeel=!newCustEieGeel; document.getElementById('ca-eiegeel-toggle').className='toggle-pill'+(newCustEieGeel?' on':''); }
function addCustomer(){
  const name=document.getElementById('ca-name').value.trim(); if(!name) return;
  customers.push({id:uid(),name,farm:document.getElementById('ca-farm').value,phone:document.getElementById('ca-phone').value,area:document.getElementById('ca-area').value,distance:document.getElementById('ca-distance').value,type:document.getElementById('ca-type').value,notes:document.getElementById('ca-notes').value,eieGeel:newCustEieGeel});
  save('v3_customers',customers); newCustEieGeel=false;
  document.getElementById('ca-eiegeel-toggle').className='toggle-pill';
  ['ca-name','ca-farm','ca-phone','ca-area','ca-distance','ca-notes'].forEach(x=>document.getElementById(x).value='');
  closeModal('cust-add-modal'); renderCustomers();
}
function editCustomer(id){
  const c=customers.find(x=>x.id===id); if(!c) return;
  const name=prompt('Naam:',c.name); if(name===null) return;
  const phone=prompt('Tel:',c.phone||''); if(phone===null) return;
  const dist=prompt('Afstand vanaf fabriek (km):',c.distance||''); if(dist===null) return;
  const notes=prompt('Notas:',c.notes||''); if(notes===null) return;
  Object.assign(c,{name,phone,distance:dist,notes}); save('v3_customers',customers); renderCustomers();
}
function deleteCustomer(id){ if(!confirm('Verwyder hierdie klant?')) return; customers=customers.filter(c=>c.id!==id); save('v3_customers',customers); renderCustomers(); }