// ═══════════════════════════════════════════════════════════════
// WORKERS
// ═══════════════════════════════════════════════════════════════
function renderWorkers(){
  // Summary pills
  document.getElementById('workers-sum').innerHTML=workers.filter(w=>w.active).map(w=>{
    const asgn=assignments[w.id]||[];
    const done=(assignments['done_'+w.id]||[]).filter(d=>asgn.includes(d)).length;
    return `<div class="wpill"><div class="wpill-av">${w.name.charAt(0)}</div><div><div class="wpill-name">${w.name.split(' ')[0]}</div><div class="wpill-prog">${done}/${asgn.length} take</div></div></div>`;
  }).join('');
  const el=document.getElementById('worker-list');
  if(!workers.length){ el.innerHTML='<div class="empty">Geen werknemers nie.</div>'; return; }
  el.innerHTML=workers.map(w=>{
    const open=expandedItems['wk_'+w.id];
    const asgn=assignments[w.id]||[];
    const done=(assignments['done_'+w.id]||[]).filter(d=>asgn.includes(d)).length;
    return `<div class="worker-card${!w.active?' worker-inactive':''}">
      <div class="worker-head" onclick="toggleExpand('wk_${w.id}');renderWorkers()">
        <div class="wk-av">${w.name.split(' ').map(p=>p[0]).join('').slice(0,2)}</div>
        <div class="wk-info">
          <div class="wk-name">${escH(w.name)}</div>
          <div class="wk-role">${escH(w.role||'')}</div>
          <div class="wk-bar"><div class="wk-bar-fill" style="width:${asgn.length?(done/asgn.length*100):0}%"></div></div>
          <div class="wk-task-lbl">${done}/${asgn.length} take gedoen</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          ${!w.active?'<span class="badge badge-dim">Af</span>':''}
          <div style="display:flex;gap:6px">
            <button class="icon-btn sm" onclick="event.stopPropagation();editWorker(${w.id})">✏</button>
            <button class="icon-btn sm" onclick="event.stopPropagation();toggleWorkerActive(${w.id})">${w.active?'✕':'✓'}</button>
            <button class="icon-btn red sm" onclick="event.stopPropagation();deleteWorker(${w.id})">🗑</button>
          </div>
        </div>
      </div>
      ${open?`<div class="wk-detail">
        ${w.phone?`<a href="tel:${w.phone}" class="detail-link">📞 ${escH(w.phone)}</a>`:''}
        ${w.notes?`<div class="detail-notes">${escH(w.notes)}</div>`:''}
        <div class="wk-duties-title">Toegewysde Take Vandag</div>
        ${duties.length===0?'<div style="padding:12px 0;color:var(--text3)">Geen take beskikbaar nie</div>':''}
        ${duties.map(d=>{
          const isAsgn=asgn.includes(d.id);
          const isDone=(assignments['done_'+w.id]||[]).includes(d.id);
          return `<div class="wk-duty-row${isDone?' wk-duty-done-row':''}">
            <div class="small-check${isAsgn?' assigned':''}" onclick="toggleAssign(${w.id},${d.id})">${isAsgn?'✓':'+'}</div>
            <div class="wk-duty-info"><span class="wk-duty-name${!isAsgn?' dimmed':''}">${escH(d.title)}</span><span class="wk-duty-cat">${d.category}</span></div>
            ${isAsgn?`<button class="done-check${isDone?' done':''}" onclick="markDone(${w.id},${d.id})">${isDone?'✅':'⏰'}</button>`:''}
          </div>`;
        }).join('')}
      </div>`:''}
    </div>`;
  }).join('');
}
function toggleAssign(wid,did){
  const k=String(wid);
  const cur=assignments[k]||[];
  assignments[k]=cur.includes(did)?cur.filter(x=>x!==did):[...cur,did];
  save('v3_assignments',assignments); renderWorkers();
}
function markDone(wid,did){
  const k='done_'+wid;
  const cur=assignments[k]||[];
  assignments[k]=cur.includes(did)?cur.filter(x=>x!==did):[...cur,did];
  save('v3_assignments',assignments); renderWorkers();
}
function addWorker(){
  const name=document.getElementById('wa-name').value.trim(); if(!name) return;
  workers.push({id:uid(),name,role:document.getElementById('wa-role').value,phone:document.getElementById('wa-phone').value,notes:document.getElementById('wa-notes').value,active:true});
  save('v3_workers',workers);
  ['wa-name','wa-phone','wa-notes'].forEach(x=>document.getElementById(x).value='');
  closeModal('worker-add-modal'); renderWorkers();
}
function editWorker(id){
  const w=workers.find(x=>x.id===id); if(!w) return;
  const name=prompt('Naam:',w.name); if(name===null) return;
  const notes=prompt('Notas:',w.notes||''); if(notes===null) return;
  Object.assign(w,{name,notes}); save('v3_workers',workers); renderWorkers();
}
function deleteWorker(id){ if(!confirm('Verwyder hierdie werknemer?')) return; workers=workers.filter(w=>w.id!==id); save('v3_workers',workers); renderWorkers(); }
function toggleWorkerActive(id){ const w=workers.find(x=>x.id===id); if(w){ w.active=!w.active; save('v3_workers',workers); renderWorkers(); } }
