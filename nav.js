// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════
const PAGES = [
  {id:'dashboard',label:'Dashboard',icon:'🏠'},
  {id:'products',label:'Produkte',icon:'📦'},
  {id:'truck',label:'Vragmotor Tel',icon:'🚛'},
  {id:'compare',label:'Vergelyking',icon:'📊'},
  {id:'stock',label:'Fabrieksvoorraad',icon:'🏭'},
  {id:'duties',label:'Pligte',icon:'📋'},
  {id:'reminders',label:'Herinneringe',icon:'🔔'},
  {id:'customers',label:'Klante',icon:'👥'},
  {id:'sales',label:'Verkope',icon:'🛒'},
  {id:'deliveries',label:'Aflewerings',icon:'🗺️'},
  {id:'notes',label:'Notas',icon:'📝'},
  {id:'workers',label:'Werknemers',icon:'👷'},
  {id:'calc',label:'Berekenaar',icon:'🧮'},
  {id:'beesbestuur',label:'Beesbestuur Gids',icon:'📖'},
  {id:'export',label:'Uitvoer & Rugsteun',icon:'💾'},
  {id:'health',    label:'Gesondheid & Notas', icon:'🏥'},
  {id:'flashcards',label:'Flitskaarte',       icon:'🃏'},
  {id:'kaart',    label:'Ermelo Kaart',      icon:'🗺️'},
  {id:'inligting',label:'Inligting & Gidse',icon:'📚'},
];
const PRIMARY = PAGES.slice(0,5);
let currentPage = 'dashboard';

function buildNav(){
  // Sidebar
  document.getElementById('sidebar-links').innerHTML = PAGES.map(p=>`
    <div class="nav-link${p.id===currentPage?' active':''}" onclick="navTo('${p.id}')">
      <span>${p.icon}</span><span>${p.label}</span>
    </div>`).join('');
  // Mobile bottom
  document.getElementById('mob-nav-inner').innerHTML = PRIMARY.map(p=>`
    <button class="mob-nav-item${p.id===currentPage?' active':''}" onclick="navTo('${p.id}')">
      <span style="font-size:20px">${p.icon}</span>${p.label}
    </button>`).join('') +
    `<button class="mob-nav-item" onclick="openMobileMenu()"><span style="font-size:20px">☰</span>Meer</button>`;
  // Mobile menu grid
  document.getElementById('mob-menu-grid').innerHTML = PAGES.map(p=>`
    <button class="mob-grid-item${p.id===currentPage?' active':''}" onclick="navTo('${p.id}');closeMobileMenu()">
      <div class="mob-grid-icon">${p.icon}</div><span>${p.label}</span>
    </button>`).join('');
}

function navTo(id){
  currentPage=id;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pg = document.getElementById('page-'+id);
  if(pg) pg.classList.add('active');
  buildNav();
  renderPage(id);
  window.scrollTo(0,0);
}

function renderPage(id){
  if(id==='dashboard') renderDashboard();
  else if(id==='products') renderProducts();
  else if(id==='truck') renderTrucks();
  else if(id==='compare') renderCompare();
  else if(id==='stock') renderStock();
  else if(id==='duties') renderDuties();
  else if(id==='reminders') renderReminders();
  else if(id==='customers') renderCustomers();
  else if(id==='sales') renderSales();
  else if(id==='deliveries') renderDeliveries();
  else if(id==='notes') renderNotes();
  else if(id==='workers') renderWorkers();
  else if(id==='calc') renderCalc();
  else if(id==='beesbestuur') renderCattleGuides();
  else if(id==='export') renderExport();
  else if(id==='flashcards') renderFlashcards();
  else if(id==='kaart') renderKaart();
  else if(id==='health') renderHealthPage();
  else if(id==='inligting') renderInligting();
}

function openMobileMenu(){ document.getElementById('mobile-menu').classList.add('open'); }
function closeMobileMenu(){ document.getElementById('mobile-menu').classList.remove('open'); }

// ═══════════════════════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════════════════════
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

// ═══════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════
function toggleTheme(){
  const t = document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',t);
  STORE.set('v3_theme',t);
}
function initTheme(){
  const t=STORE.get('v3_theme','dark');
  document.documentElement.setAttribute('data-theme',t);
}