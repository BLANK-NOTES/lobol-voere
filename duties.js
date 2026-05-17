// ═══════════════════════════════════════════════════════════════
// DUTIES — met werker-toewysinggroep-ondersteuning
// ═══════════════════════════════════════════════════════════════
const DUTY_CATS = ['Alle','Skoonmaak','Voorraad','Instandhouding','Veiligheid','Admin','Ander'];
const PRI_COLOR = {high:'red',medium:'orange',low:'green'};
const PRI_LABEL = {high:'Hoog',medium:'Medium',low:'Laag'};

// workerGroups: [{id, name, memberIds:[workerId,...]}]

function renderDuties() {
  checkDutyReset();
  const done = dutyDone.length;
  const total = duties.length;
  document.getElementById('duties-prog-text').innerHTML = `📋 ${done} / ${total} voltooi vandag`;
  document.getElementById('duties-prog-fill').style.width = total ? `${(done/total)*100}%` : '0%';

  // Tab row: Pligte | Groepe
  if (!document.getElementById('duty-tab-pligte')) {
    const tabs = document.createElement('div');
    tabs.className = 'tab-row'; tabs.id = 'duty-tabs';
    tabs.innerHTML = `
      <button class="tab-btn active" id="duty-tab-pligte" onclick="switchDutyTab('pligte')">📋 Pligte</button>
      <button class="tab-btn" id="duty-tab-groepe" onclick="switchDutyTab('groepe')">👥 Groepe</button>`;
    const prog = document.querySelector('#page-duties .duties-prog');
    if (prog) prog.after(tabs);
  }

  document.getElementById('duty-chips').innerHTML = DUTY_CATS.map(c =>
    `<button class="chip${dutyFilter===c?' active':''}" onclick="setDutyFilter('${c}')">${c}</button>`
  ).join('');

  const filtered = [...duties]
    .filter(d => dutyFilter === 'Alle' || d.category === dutyFilter)
    .sort((a,b) => ({'high':0,'medium':1,'low':2}[a.priority]||1) - ({'high':0,'medium':1,'low':2}[b.priority]||1));

  const el = document.getElementById('duty-list');
  if (!filtered.length) { el.innerHTML = '<div class="empty">Geen take nie.</div>'; return; }

  el.innerHTML = filtered.map(d => {
    const isDone = dutyDone.includes(d.id);
    // Find assigned workers for this duty
    const assignedWorkers = workers.filter(w => (assignments[w.id]||[]).includes(d.id));
    const assignedStr = assignedWorkers.length
      ? assignedWorkers.map(w=>`<span class="tag" style="background:var(--adim);color:var(--accent)">${escH(w.name.split(' ')[0])}</span>`).join('')
      : '<span style="font-size:11px;color:var(--text3)">Niemand toegewys</span>';

    return `<div class="duty-card${isDone?' done-card':''}">
      <div class="duty-top">
        <div class="check-box${isDone?' checked':''}" onclick="toggleDutyDone(${d.id})">${isDone?'✓':''}</div>
        <div class="duty-info">
          <span class="duty-title-text">${escH(d.title)}</span>
          <div class="duty-tags">
            <span class="tag">${d.category}</span>
            <span class="tag ${PRI_COLOR[d.priority]||'orange'}">${PRI_LABEL[d.priority]||d.priority}</span>
          </div>
          <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px">${assignedStr}</div>
        </div>
        <div class="duty-acts">
          <button class="icon-btn sm" onclick="openAssignDutyModal(${d.id})" title="Ken werkers toe">👤</button>
          <button class="icon-btn sm" onclick="editDuty(${d.id})">✏</button>
          <button class="icon-btn red sm" onclick="deleteDuty(${d.id})">🗑</button>
        </div>
      </div>
      ${d.notes?`<div class="duty-notes">${escH(d.notes)}</div>`:''}
    </div>`;
  }).join('');
}

let activeDutyTab = 'pligte';
function switchDutyTab(tab) {
  activeDutyTab = tab;
  ['pligte','groepe'].forEach(t => {
    const btn = document.getElementById('duty-tab-'+t);
    if (btn) btn.className = 'tab-btn' + (t===tab?' active':'');
  });
  const chips = document.getElementById('duty-chips');
  const list = document.getElementById('duty-list');
  const groupSection = document.getElementById('duty-group-section');
  if (tab === 'pligte') {
    if (chips) chips.style.display = '';
    if (list) list.style.display = '';
    if (groupSection) groupSection.style.display = 'none';
    renderDuties();
  } else {
    if (chips) chips.style.display = 'none';
    if (list) list.style.display = 'none';
    if (!groupSection) {
      const sec = document.createElement('div');
      sec.id = 'duty-group-section';
      document.getElementById('duty-list').after(sec);
    }
    document.getElementById('duty-group-section').style.display = '';
    renderGroups();
  }
}

// ── ASSIGN DUTY MODAL ──────────────────────────────────────────
let assigningDutyId = null;
function openAssignDutyModal(dutyId) {
  assigningDutyId = dutyId;
  const d = duties.find(x => x.id === dutyId);
  document.getElementById('assign-duty-title').textContent = d ? d.title : '';
  // Render worker checkboxes
  document.getElementById('assign-worker-list').innerHTML = workers.filter(w=>w.active).map(w => {
    const isAssigned = (assignments[w.id]||[]).includes(dutyId);
    return `<label style="display:flex;align-items:center;gap:10px;padding:8px;background:var(--bg3);border-radius:8px;cursor:pointer">
      <input type="checkbox" ${isAssigned?'checked':''} onchange="toggleAssignFromModal(${w.id},${dutyId},this.checked)" style="width:auto"/>
      <div class="wk-av" style="width:28px;height:28px;font-size:12px">${w.name.charAt(0)}</div>
      <span style="font-weight:600">${escH(w.name)}</span>
      <span style="font-size:11px;color:var(--text3)">${escH(w.role||'')}</span>
    </label>`;
  }).join('') || '<div class="empty">Geen aktiewe werknemers nie.</div>';
  openModal('assign-duty-modal');
}

function toggleAssignFromModal(wid, did, checked) {
  const k = String(wid);
  const cur = assignments[k] || [];
  assignments[k] = checked ? [...cur.filter(x=>x!==did), did] : cur.filter(x=>x!==did);
  save('v3_assignments', assignments);
}

// ── RANDOM GROUP ASSIGNMENT ────────────────────────────────────
function randomAssignGroup(groupId) {
  const group = workerGroups.find(g => g.id === groupId);
  if (!group || !group.memberIds.length) { alert('Groep het geen lede nie.'); return; }
  const groupDuties = duties.filter(d => d.groupId === groupId || !d.groupId);
  if (!groupDuties.length) { alert('Geen take vir hierdie groep nie.'); return; }
  // Shuffle members
  const members = [...group.memberIds].sort(() => Math.random() - 0.5);
  // Distribute duties round-robin
  groupDuties.forEach((d, i) => {
    const wid = String(members[i % members.length]);
    const cur = assignments[wid] || [];
    if (!cur.includes(d.id)) assignments[wid] = [...cur, d.id];
  });
  save('v3_assignments', assignments);
  renderGroups();
  alert(`✅ Take willekeurig toegeken aan ${group.name}!`);
}

// ── GROUPS ─────────────────────────────────────────────────────
function renderGroups() {
  const el = document.getElementById('duty-group-section');
  if (!el) return;
  el.innerHTML = `
    <button class="btn btn-primary btn-full" style="margin-bottom:12px" onclick="openModal('group-add-modal')">＋ Skep Nuwe Groep</button>
    ${workerGroups.length === 0 ? '<div class="empty">Geen groepe nie. Skep ʼn groep om werknemers in te organiseer.</div>' : ''}
    ${workerGroups.map(g => {
      const members = workers.filter(w => g.memberIds.includes(w.id));
      const groupDuties = duties.filter(d => d.groupId === g.id);
      return `<div class="card" style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${escH(g.name)}</div>
            <div style="font-size:12px;color:var(--text3)">${members.length} lede · ${groupDuties.length} groeptake</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="randomAssignGroup(${g.id})">🎲 Willekeurig</button>
          <button class="icon-btn sm" onclick="editGroup(${g.id})">✏</button>
          <button class="icon-btn red sm" onclick="deleteGroup(${g.id})">🗑</button>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
          ${members.map(w=>`<span style="background:var(--adim);color:var(--accent);font-size:12px;padding:3px 10px;border-radius:99px;font-weight:600">${escH(w.name.split(' ')[0])}</span>`).join('')}
          ${members.length===0?'<span style="font-size:12px;color:var(--text3)">Geen lede nie</span>':''}
        </div>
        ${groupDuties.length?`<div style="font-size:12px;color:var(--text3)">Take: ${groupDuties.map(d=>escH(d.title)).join(', ')}</div>`:''}
      </div>`;
    }).join('')}`;
}

function addGroup() {
  const name = document.getElementById('ga-name').value.trim();
  if (!name) return;
  const memberIds = [...document.querySelectorAll('#ga-members input:checked')].map(x => parseInt(x.value));
  workerGroups.push({ id: uid(), name, memberIds });
  save('v3_workerGroups', workerGroups);
  document.getElementById('ga-name').value = '';
  closeModal('group-add-modal');
  renderGroups();
}

function editGroup(id) {
  const g = workerGroups.find(x => x.id === id);
  if (!g) return;
  const name = prompt('Groepnaam:', g.name);
  if (name === null) return;
  g.name = name;
  save('v3_workerGroups', workerGroups);
  renderGroups();
}

function deleteGroup(id) {
  if (!confirm('Verwyder hierdie groep?')) return;
  workerGroups = workerGroups.filter(g => g.id !== id);
  save('v3_workerGroups', workerGroups);
  renderGroups();
}

function openGroupAddModal() {
  document.getElementById('ga-members').innerHTML = workers.filter(w=>w.active).map(w =>
    `<label style="display:flex;align-items:center;gap:8px;padding:6px;background:var(--bg3);border-radius:6px;cursor:pointer">
      <input type="checkbox" value="${w.id}" style="width:auto"/>
      <span style="font-weight:600">${escH(w.name)}</span>
      <span style="font-size:11px;color:var(--text3)">${escH(w.role||'')}</span>
    </label>`
  ).join('') || '<div style="color:var(--text3);font-size:13px">Geen werknemers nie.</div>';
  openModal('group-add-modal');
}

function setDutyFilter(f) { dutyFilter = f; renderDuties(); }
function toggleDutyDone(id) {
  dutyDone = dutyDone.includes(id) ? dutyDone.filter(x=>x!==id) : [...dutyDone, id];
  save('v3_dutyDone', dutyDone);
  renderDuties();
}
function addDuty() {
  const title = document.getElementById('da-title').value.trim();
  if (!title) return;
  duties.push({id:uid(),title,category:document.getElementById('da-cat').value,priority:document.getElementById('da-pri').value,notes:document.getElementById('da-notes').value});
  save('v3_duties', duties);
  document.getElementById('da-title').value = '';
  document.getElementById('da-notes').value = '';
  closeModal('duty-add-modal');
  renderDuties();
}
function editDuty(id) {
  const d = duties.find(x=>x.id===id); if (!d) return;
  const title = prompt('Taaknaam:', d.title); if (title===null) return;
  const notes = prompt('Notas:', d.notes||''); if (notes===null) return;
  Object.assign(d, {title, notes});
  save('v3_duties', duties);
  renderDuties();
}
function deleteDuty(id) {
  if (!confirm('Verwyder hierdie taak?')) return;
  duties = duties.filter(d => d.id !== id);
  save('v3_duties', duties);
  renderDuties();
}
function toggleAssign(wid, did) {
  const k = String(wid);
  const cur = assignments[k]||[];
  assignments[k] = cur.includes(did) ? cur.filter(x=>x!==did) : [...cur, did];
  save('v3_assignments', assignments);
  renderWorkers();
}
function markDone(wid, did) {
  const k = 'done_'+wid;
  const cur = assignments[k]||[];
  assignments[k] = cur.includes(did) ? cur.filter(x=>x!==did) : [...cur, did];
  save('v3_assignments', assignments);
  renderWorkers();
}