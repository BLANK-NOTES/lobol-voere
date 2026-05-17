// ═══════════════════════════════════════════════════════════════
// ERMELO KAART — 250km radius met dorpe en afstande
// ═══════════════════════════════════════════════════════════════

// Towns within ~250km of Ermelo with coordinates and distances
const ERMELO_TOWNS = [
  // Core area (0-50km)
  {name:'Ermelo',km:0,dir:'',lat:-26.5167,lon:29.9833,prov:'MP',note:'LOBOL Fabriek'},
  {name:'Lothair',km:28,dir:'SO',lat:-26.3667,lon:30.4167,prov:'MP',note:''},
  {name:'Breyten',km:35,dir:'NO',lat:-26.3000,lon:29.9833,prov:'MP',note:''},
  {name:'Chrissiesmeer',km:42,dir:'O',lat:-26.2500,lon:30.2167,prov:'MP',note:''},
  {name:'Davel',km:48,dir:'NW',lat:-26.3667,lon:29.6833,prov:'MP',note:''},
  // 50-100km
  {name:'Carolina',km:55,dir:'N',lat:-26.0667,lon:30.1167,prov:'MP',note:''},
  {name:'Volksrust',km:60,dir:'SW',lat:-27.3667,lon:29.8833,prov:'KZN',note:''},
  {name:'Hendrina',km:65,dir:'NW',lat:-26.1667,lon:29.7333,prov:'MP',note:''},
  {name:'Piet Retief',km:90,dir:'S',lat:-27.0000,lon:30.8167,prov:'MP',note:''},
  {name:'Standerton',km:95,dir:'W',lat:-26.9333,lon:29.2333,prov:'MP',note:''},
  {name:'Amersfoort',km:55,dir:'SW',lat:-27.0167,lon:29.8667,prov:'MP',note:''},
  {name:'Badplaas',km:80,dir:'O',lat:-25.9500,lon:30.5667,prov:'MP',note:''},
  // 100-175km
  {name:'Secunda',km:110,dir:'NW',lat:-26.5167,lon:29.1667,prov:'MP',note:'Sasol'},
  {name:'Nelspruit / Mbombela',km:160,dir:'NO',lat:-25.4667,lon:30.9833,prov:'MP',note:'Hoofstad MP'},
  {name:'Witbank / eMalahleni',km:130,dir:'NW',lat:-25.8833,lon:29.2333,prov:'MP',note:''},
  {name:'Belfast',km:100,dir:'N',lat:-25.6833,lon:30.0333,prov:'MP',note:''},
  {name:'Middelburg (MP)',km:120,dir:'NW',lat:-25.7667,lon:29.4667,prov:'MP',note:''},
  {name:'Lydenburg / Mashishing',km:140,dir:'N',lat:-25.1000,lon:30.4500,prov:'MP',note:''},
  {name:'Newcastle',km:150,dir:'SW',lat:-27.7500,lon:29.9333,prov:'KZN',note:''},
  {name:'Pongola',km:175,dir:'S',lat:-27.3833,lon:31.6167,prov:'KZN',note:''},
  {name:'Vryheid',km:170,dir:'S',lat:-27.7667,lon:30.7833,prov:'KZN',note:''},
  {name:'Barberton',km:170,dir:'O',lat:-25.7833,lon:31.0500,prov:'MP',note:''},
  {name:'Graskop',km:170,dir:'NO',lat:-24.9333,lon:30.8333,prov:'MP',note:'Panorama Route'},
  {name:'Sabie',km:165,dir:'NO',lat:-25.1000,lon:30.7833,prov:'MP',note:'Panorama Route'},
  // 175-250km
  {name:'Pretoria / Tshwane',km:210,dir:'NW',lat:-25.7461,lon:28.1881,prov:'GP',note:'Administratiewe hoofstad'},
  {name:'Johannesburg',km:195,dir:'NW',lat:-26.2041,lon:28.0473,prov:'GP',note:'Grootste stad'},
  {name:'Ladysmith',km:220,dir:'SW',lat:-28.5500,lon:29.7833,prov:'KZN',note:''},
  {name:'Hazyview',km:195,dir:'NO',lat:-25.0500,lon:31.1333,prov:'MP',note:'Kruger toegang'},
  {name:'Komatipoort',km:230,dir:'O',lat:-25.4333,lon:31.9500,prov:'MP',note:'Mozambique grens'},
  {name:'Tzaneen',km:240,dir:'N',lat:-23.8333,lon:30.1667,prov:'LP',note:'Limpopo'},
  {name:'Phalaborwa',km:245,dir:'N',lat:-23.9333,lon:31.1333,prov:'LP',note:'Kruger Noord'},
  {name:'Harrismith',km:200,dir:'SW',lat:-28.2833,lon:29.1333,prov:'FS',note:'Free State'},
  {name:'Dundee',km:200,dir:'SW',lat:-28.1667,lon:30.2333,prov:'KZN',note:''},
  {name:'Estcourt',km:230,dir:'SW',lat:-29.0000,lon:29.8833,prov:'KZN',note:''},
];

const PROV_COLORS = {
  'MP':'var(--accent)', 'GP':'var(--blue)', 'KZN':'var(--orange)',
  'LP':'#9b59b6', 'FS':'#e67e22', 'NW':'#1abc9c',
};

let kaartZoom = 'medium'; // small=50km, medium=150km, large=250km
const ZOOM_LEVELS = {
  small:  {label:'50km',   bbox:'28.5,-27.5,31.5,-25.5',   max:80},
  medium: {label:'150km',  bbox:'27.0,-28.5,33.0,-24.0',   max:160},
  large:  {label:'250km',  bbox:'24.5,-29.5,33.5,-23.0',   max:999},
};

function renderKaart() {
  const z = ZOOM_LEVELS[kaartZoom];
  const filtered = ERMELO_TOWNS.filter(t => t.km <= z.max);

  // Update map iframe
  const iframe = document.getElementById('ermelo-map');
  if (iframe) {
    const [w,sCoord,e,n] = z.bbox.split(',');
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${w}%2C${sCoord}%2C${e}%2C${n}&layer=mapnik&marker=-26.5167%2C29.9833`;
    const loading = document.getElementById('map-loading');
    if (loading) { loading.style.display='flex'; iframe.onload = ()=>{ loading.style.display='none'; }; }
  }

  // Zoom buttons
  const zoomEl = document.getElementById('map-zoom-btns');
  if (zoomEl) {
    zoomEl.innerHTML = Object.entries(ZOOM_LEVELS).map(([k,v])=>
      `<button class="chip${kaartZoom===k?' active':''}" onclick="setKaartZoom('${k}')">${v.label}</button>`
    ).join('');
  }

  // Town chips
  const townsEl = document.getElementById('map-towns');
  if (townsEl) {
    townsEl.innerHTML = filtered.map(t =>
      `<button class="chip" onclick="openTownMap(${t.lat},${t.lon},'${t.name}')"
        style="${t.km===0?'background:var(--accent);color:#0f1f0f;font-weight:700':''}">
        ${t.name} ${t.km>0?`<span style="opacity:.7;font-size:10px">${t.km}km</span>`:'📍'}
      </button>`
    ).join('');
  }

  // Distance cards grouped by range
  const distEl = document.getElementById('map-distances');
  if (!distEl) return;
  const groups = [
    {label:'📍 Plaaslik (0–50km)',  min:0,   max:50},
    {label:'🚛 Naby (50–100km)',     min:51,  max:100},
    {label:'🗺️ Gemiddel (100–175km)',min:101, max:175},
    {label:'✈️ Ver (175–250km)',      min:176, max:999},
  ];
  distEl.innerHTML = groups.map(g => {
    const towns = ERMELO_TOWNS.filter(t => t.km >= g.min && t.km <= g.max);
    if (!towns.length) return '';
    return `<div style="margin-bottom:12px">
      <div class="section-title" style="margin-top:8px">${g.label}</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        ${towns.map(t => `
          <div style="display:flex;align-items:center;gap:10px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;cursor:pointer"
            onclick="openTownMap(${t.lat},${t.lon},'${t.name}')">
            <div style="width:42px;height:42px;border-radius:10px;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${PROV_COLORS[t.prov]||'var(--text3)'};flex-shrink:0">${t.prov}</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:14px">${t.name}${t.note?` <span style="font-size:11px;color:var(--text3);font-weight:400">– ${t.note}</span>`:''}</div>
              <div style="font-size:12px;color:var(--text3)">${t.km===0?'📍 LOBOL Fabriek':t.dir?`${t.dir} van Ermelo`:''}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              ${t.km>0?`<div style="font-size:18px;font-weight:800;font-family:'Syne',sans-serif;color:var(--accent)">${t.km}</div>
              <div style="font-size:10px;color:var(--text3)">km</div>`:'<div style="font-size:20px">📍</div>'}
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function setKaartZoom(z) {
  kaartZoom = z;
  renderKaart();
}

function openTownMap(lat, lon, name) {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  window.open(url, '_blank');
}
