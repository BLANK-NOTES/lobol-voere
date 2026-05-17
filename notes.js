// ═══════════════════════════════════════════════════════════════
// NOTES
// ═══════════════════════════════════════════════════════════════
const NOTE_TYPES=['Alle','Algemeen','Klant','Voorraad','Vragmotor','Dringend'];
const COLORS=['default','green','orange','blue','red'];
const COLOR_BG={'default':'var(--card)','green':'var(--adim)','orange':'var(--odim)','blue':'var(--bdim)','red':'var(--rdim)'};
const COLOR_BDR={'default':'var(--border)','green':'var(--accent)','orange':'var(--orange)','blue':'var(--blue)','red':'var(--red)'};
function renderNotes(){
  document.getElementById('notes-count').textContent=notes.length;
  document.getElementById('note-chips').innerHTML=NOTE_TYPES.map(t=>`<button class="chip${noteTypeFilter===t?' active':''}" onclick="setNoteFilter('${t}')">${t}</button>`).join('');
  const search=(document.getElementById('note-search')?.value||'').toLowerCase();
  let filtered=notes.filter(n=>{
    const tm=noteTypeFilter==='Alle'||n.type===noteTypeFilter;
    const sm=n.title?.toLowerCase().includes(search)||n.body?.toLowerCase().includes(search);
    return tm&&sm;
  }).sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0));
  const el=document.getElementById('notes-grid');
  if(!filtered.length){ el.innerHTML='<div class="empty" style="grid-column:1/-1">Geen notas nie.</div>'; return; }
  el.innerHTML=filtered.map(n=>`<div class="note-card note-${n.color||'default'}${n.pinned?' pinned':''}">
    <div class="note-top">
      <div class="note-meta">${n.pinned?'📌 ':''}<span class="note-type-tag">${n.type}</span></div>
      <div class="note-acts">
        <button class="icon-btn sm${n.pinned?' accent':''}" onclick="toggleNotePin2(${n.id})" title="Vaspen">📌</button>
        <button class="icon-btn sm" onclick="editNote(${n.id})">✏</button>
        <button class="icon-btn red sm" onclick="deleteNote(${n.id})">🗑</button>
      </div>
    </div>
    ${n.title?`<div class="note-title-text">${escH(n.title)}</div>`:''}
    <div class="note-body-text">${escH(n.body||'')}</div>
    <div class="note-date-text">${n.createdAt||''}</div>
  </div>`).join('');
  // Populate note customer select
  const naCust=document.getElementById('na-cust');
  if(naCust){ naCust.innerHTML='<option value="">-- Koppel aan klant (opsioneel) --</option>'+customers.map(c=>`<option value="${c.id}">${escH(c.name)}</option>`).join(''); }
  // Color picker
  const naColors=document.getElementById('na-colors');
  if(naColors) naColors.innerHTML=COLORS.map(c=>`<div class="cdot cdot-${c}${noteColor===c?' sel':''}" onclick="setNoteColor('${c}')"></div>`).join('');
}
function setNoteFilter(t){ noteTypeFilter=t; renderNotes(); }
function setNoteColor(c){ noteColor=c; renderNotes(); }
function toggleNotePin(){ notePinned=!notePinned; document.getElementById('na-pin-toggle').className='toggle-pill'+(notePinned?' on':''); }
function toggleNotePin2(id){ const n=notes.find(x=>x.id===id); if(n){ n.pinned=!n.pinned; save('v3_notes',notes); renderNotes(); } }
function addNote(){
  const body=document.getElementById('na-body').value.trim();
  const title=document.getElementById('na-title').value.trim();
  if(!title&&!body) return;
  const custId=parseInt(document.getElementById('na-cust').value);
  const cust=customers.find(c=>c.id===custId);
  notes.unshift({id:uid(),title,body,type:document.getElementById('na-type').value,color:noteColor,pinned:notePinned,customerName:cust?.name||'',createdAt:new Date().toLocaleDateString('af-ZA')});
  save('v3_notes',notes); noteColor='default'; notePinned=false;
  document.getElementById('na-pin-toggle').className='toggle-pill';
  ['na-title','na-body'].forEach(x=>document.getElementById(x).value='');
  closeModal('note-add-modal'); renderNotes();
}
function editNote(id){
  const n=notes.find(x=>x.id===id); if(!n) return;
  const title=prompt('Opskrif:',n.title||''); if(title===null) return;
  const body=prompt('Nota teks:',n.body||''); if(body===null) return;
  Object.assign(n,{title,body}); save('v3_notes',notes); renderNotes();
}
function deleteNote(id){ if(!confirm('Verwyder hierdie nota?')) return; notes=notes.filter(n=>n.id!==id); save('v3_notes',notes); renderNotes(); }
