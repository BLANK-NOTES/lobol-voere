// ═══════════════════════════════════════════════════════════════
// DELIVERIES
// ═══════════════════════════════════════════════════════════════
const DELIV_STATUSES=['Alle','Beplan','Onderweg','Afgelewer','Gekanselleer'];
function renderDeliveries(){
  document.getElementById('deliv-chips').innerHTML=DELIV_STATUSES.map(s=>`<button class="chip${delivFilter===s?' active':''}" onclick="setDelivFilter('${s}')">${s}</button>`).join('');
  const filtered=deliveries.filter(d=>delivFilter==='Alle'||d.status===delivFilter);
  const el=document.getElementById('deliv-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen aflewerings nie.</div>'; return; }
  const sc={'Afgelewer':'badge-green','Onderweg':'badge-orange','Gekanselleer':'badge-red','Beplan':'badge-dim'};
  el.innerHTML=filtered.map(d=>{
    const done=(d.stops||[]).filter(s=>s.done).length;
    const total=(d.stops||[]).length;
    const open=expandedItems['deliv_'+d.id];
    return `<div class="deliv-card${d.status==='Onderweg'?' active-route':''}">
      <div class="deliv-head" onclick="toggleExpand('deliv_${d.id}');renderDeliveries()">
        <div class="deliv-icon">🚛</div>
        <div class="deliv-info">
          <div class="deliv-truck">${escH(d.truck)}</div>
          <div class="deliv-meta">${d.driver?d.driver+' · ':''}${d.date?d.date+' · ':''} ${done}/${total} stopsels</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <span class="badge ${sc[d.status]||'badge-dim'}">${d.status}</span>
          <span>${open?'▲':'▼'}</span>
        </div>
      </div>
      <div class="deliv-prog"><div class="deliv-prog-fill" style="width:${total?(done/total*100):0}%"></div></div>
      ${open?`<div class="deliv-detail">
        ${(d.stops||[]).map((s,idx)=>`<div class="deliv-stop${s.done?' done-stop':''}">
          <div class="check-box${s.done?' checked':''}" onclick="toggleDelivStop(${d.id},${s.id})">${s.done?'✓':''}</div>
          <div style="flex:1">
            <div class="stop-seq">Stop ${idx+1}</div>
            <div class="stop-name">${escH(s.customerName)}</div>
            ${s.address?`<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}" target="_blank" class="detail-link">🧭 Navigeer</a>`:''}
            ${s.notes?`<div class="stop-notes-sm">${escH(s.notes)}</div>`:''}
          </div>
        </div>`).join('')}
        ${d.notes?`<div class="detail-notes">${escH(d.notes)}</div>`:''}
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
          <select class="status-sel" onchange="updateDelivStatus(${d.id},this.value)">
            ${['Beplan','Onderweg','Afgelewer','Gekanselleer'].map(o=>`<option${d.status===o?' selected':''}>${o}</option>`).join('')}
          </select>
          <button class="icon-btn red sm" onclick="deleteDelivery(${d.id})">🗑</button>
        </div>
      </div>`:''}
    </div>`;
  }).join('');
  // Populate add modal
  const custSel=document.getElementById('dla-stop-cust');
  if(custSel){ custSel.innerHTML='<option value="">-- Kies klant --</option>'+customers.map(c=>`<option value="${c.id}">${escH(c.name)}</option>`).join(''); }
  const tList=document.getElementById('dla-truck-list');
  if(tList){ tList.innerHTML=[...new Set(truckCounts.map(t=>t.name))].map(n=>`<option value="${n}"/>`).join(''); }
  renderDelivStops();
}
function setDelivFilter(f){ delivFilter=f; renderDeliveries(); }
function addDelivStop(){
  const custId=parseInt(document.getElementById('dla-stop-cust').value); if(!custId) return;
  const cust=customers.find(c=>c.id===custId); if(!cust) return;
  newDelivStops.push({id:uid(),customerId:cust.id,customerName:cust.name,address:cust.farm?`${cust.farm}, ${cust.area||''}`:cust.area||'',notes:document.getElementById('dla-stop-notes').value,done:false});
  document.getElementById('dla-stop-notes').value=''; renderDelivStops();
}
function renderDelivStops(){
  const el=document.getElementById('dla-stops'); if(!el) return;
  el.innerHTML=newDelivStops.map((s,i)=>`<div class="stop-row">
    <div class="stop-num">${i+1}</div>
    <div style="flex:1"><div class="stop-name">${escH(s.customerName)}</div>${s.address?`<div style="font-size:12px;color:var(--text3)">${escH(s.address)}</div>`:''}</div>
    <div class="stop-ctrl">
      <button class="icon-btn sm" onclick="moveStop(${i},-1)" ${i===0?'disabled':''}>↑</button>
      <button class="icon-btn sm" onclick="moveStop(${i},1)" ${i===newDelivStops.length-1?'disabled':''}>↓</button>
      <button class="icon-btn red sm" onclick="removeStop(${i})">✕</button>
    </div>
  </div>`).join('');
}
function moveStop(i,d){ const j=i+d; if(j<0||j>=newDelivStops.length) return; [newDelivStops[i],newDelivStops[j]]=[newDelivStops[j],newDelivStops[i]]; renderDelivStops(); }
function removeStop(i){ newDelivStops.splice(i,1); renderDelivStops(); }
function saveDelivery(){
  const truck=document.getElementById('dla-truck').value.trim(); if(!truck||!newDelivStops.length){ alert('Voer vragmotor naam in en voeg stopsels by'); return; }
  deliveries.unshift({id:uid(),truck,driver:document.getElementById('dla-driver').value,date:document.getElementById('dla-date').value,stops:[...newDelivStops],notes:document.getElementById('dla-notes').value,status:'Beplan',createdAt:new Date().toLocaleDateString('af-ZA')});
  save('v3_deliveries',deliveries); newDelivStops=[];
  ['dla-truck','dla-driver','dla-date','dla-notes'].forEach(x=>document.getElementById(x).value='');
  closeModal('deliv-add-modal'); renderDeliveries();
}
function toggleDelivStop(delivId,stopId){
  const d=deliveries.find(x=>x.id===delivId); if(!d) return;
  const s=d.stops.find(x=>x.id===stopId); if(!s) return;
  s.done=!s.done; save('v3_deliveries',deliveries); renderDeliveries();
}
function updateDelivStatus(id,st){ const d=deliveries.find(x=>x.id===id); if(d){ d.status=st; save('v3_deliveries',deliveries); renderDeliveries(); } }
function deleteDelivery(id){ if(!confirm('Verwyder hierdie aflewering?')) return; deliveries=deliveries.filter(d=>d.id!==id); save('v3_deliveries',deliveries); renderDeliveries(); }
