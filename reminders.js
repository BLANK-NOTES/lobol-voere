// ═══════════════════════════════════════════════════════════════
// REMINDERS
// ═══════════════════════════════════════════════════════════════
const ENG_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const AF_DAYS=['Maa','Din','Woe','Don','Vry','Sat','Son'];
let newRemDays=[...ENG_DAYS];
function timeToMin(t){ const[h,m]=t.split(':').map(Number); return h*60+m; }
function nowMin(){ const n=new Date(); return n.getHours()*60+n.getMinutes(); }
function getRemStatus(r){
  if(!r.active) return 'off';
  const diff=timeToMin(r.time)-nowMin();
  if(diff>=0&&diff<=60) return 'soon';
  if(diff<0&&diff>=-30) return 'recent';
  return 'scheduled';
}
function renderReminders(){
  document.getElementById('rem-time').textContent=new Date().toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'});
  const el=document.getElementById('rem-list');
  if(!reminders.length){ el.innerHTML='<div class="empty">Geen herinneringe nie.</div>'; return; }
  const now=new Date();
  const curIdx=now.getDay()===0?6:now.getDay()-1;
  const curEng=ENG_DAYS[curIdx];
  const sorted=[...reminders].sort((a,b)=>timeToMin(a.time)-timeToMin(b.time));
  const statusLbl={soon:{l:'Nou-nou!',c:'badge-orange'},recent:{l:'Pas verby',c:'badge-red'},off:{l:'Af',c:'badge-dim'},scheduled:{l:'Beplan',c:'badge-green'}};
  el.innerHTML=sorted.map(r=>{
    const st=getRemStatus(r);
    const {l,c}=statusLbl[st];
    return `<div class="rem-card${st==='soon'?' soon':''}${!r.active?' inactive':''}">
      <div class="rem-top">
        <div class="rem-time-block">
          <span class="rem-time">${r.time}</span>
          <span class="badge ${c}">${l}</span>
        </div>
        <div class="rem-acts">
          <button class="icon-btn sm" onclick="toggleRemActive(${r.id})">${r.active?'🔔':'🔕'}</button>
          <button class="icon-btn sm" onclick="editReminder(${r.id})">✏</button>
          <button class="icon-btn red sm" onclick="deleteReminder(${r.id})">🗑</button>
        </div>
      </div>
      <div class="rem-title">${escH(r.title)}</div>
      <div class="rem-days">${AF_DAYS.map((d,i)=>`<span class="day-tag${r.days.includes(ENG_DAYS[i])?' active':''}${ENG_DAYS[i]===curEng&&r.days.includes(ENG_DAYS[i])?' today':''}">${d}</span>`).join('')}</div>
      ${r.notes?`<div class="duty-notes">${escH(r.notes)}</div>`:''}
    </div>`;
  }).join('');
  // Build day picker for add modal
  const dpEl=document.getElementById('ra-days');
  if(dpEl) dpEl.innerHTML=AF_DAYS.map((d,i)=>`<button class="day-btn${newRemDays.includes(ENG_DAYS[i])?' active':''}" onclick="toggleRemDay('${ENG_DAYS[i]}')">${d}</button>`).join('');
}
function toggleRemDay(d){ if(newRemDays.includes(d)) newRemDays=newRemDays.filter(x=>x!==d); else newRemDays.push(d); document.getElementById('ra-days').innerHTML=AF_DAYS.map((af,i)=>`<button class="day-btn${newRemDays.includes(ENG_DAYS[i])?' active':''}" onclick="toggleRemDay('${ENG_DAYS[i]}')">${af}</button>`).join(''); }
function addReminder(){
  const title=document.getElementById('ra-title').value.trim(); if(!title) return;
  reminders.push({id:uid(),title,time:document.getElementById('ra-time').value,days:[...newRemDays],notes:document.getElementById('ra-notes').value,active:true});
  save('v3_reminders',reminders); newRemDays=[...ENG_DAYS];
  document.getElementById('ra-title').value=''; document.getElementById('ra-notes').value='';
  closeModal('rem-add-modal'); renderReminders();
}
function toggleRemActive(id){ const r=reminders.find(x=>x.id===id); if(r){ r.active=!r.active; save('v3_reminders',reminders); renderReminders(); } }
function editReminder(id){
  const r=reminders.find(x=>x.id===id); if(!r) return;
  const title=prompt('Taaknaam:',r.title); if(title===null) return;
  const time=prompt('Tyd (HH:MM):',r.time); if(time===null) return;
  const notes=prompt('Notas:',r.notes||''); if(notes===null) return;
  Object.assign(r,{title,time,notes}); save('v3_reminders',reminders); renderReminders();
}
function deleteReminder(id){ if(!confirm('Verwyder hierdie herinnering?')) return; reminders=reminders.filter(r=>r.id!==id); save('v3_reminders',reminders); renderReminders(); }
