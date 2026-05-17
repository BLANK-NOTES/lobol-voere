// ═══════════════════════════════════════════════════════════════
// EXPORT / BACKUP
// ═══════════════════════════════════════════════════════════════
function dl(content,filename,type='text/csv'){
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
function toCSV(headers,rows){
  const esc=v=>{ const s=String(v??''); return s.includes(',')||s.includes('"')||s.includes('\n')?`"${s.replace(/"/g,'""')}"`:''; };
  return [headers,...rows].map(r=>r.map(esc).join(',')).join('\n');
}
function renderExport(){

  // iPhone backup section
  document.getElementById('iphone-export-section').innerHTML = `
    <div style="background:var(--card);border:2px solid var(--accent);border-radius:14px;padding:16px;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="font-size:28px">📱</div>
        <div>
          <div style="font-weight:700;font-size:15px">iPhone / iPad Rugsteun</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">Stoor alle data as ʼn lêer na jou iPhone Files app</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <button class="btn btn-primary btn-full" onclick="downloadBackupNow()" style="font-size:15px;padding:14px">
          💾 Stoor Data na iPhone Files
        </button>
        <label class="btn btn-secondary btn-full" style="cursor:pointer;font-size:15px;padding:14px;justify-content:center">
          📤 Laai Rugsteun In (Herstel Data)
          <input type="file" accept=".json" onchange="restoreFromFile(this)" style="display:none"/>
        </label>
      </div>
      <div style="margin-top:10px;background:var(--odim);border-radius:8px;padding:10px 12px;font-size:12px;color:var(--orange)">
        ⚠️ <strong>iPhone gebruikers:</strong> Stoor data gereeld! Safari kan data verwyder wanneer telefoon se stoorspasie laag is. Stoor elke dag as jy nuwe data ingevoer het.
      </div>
    </div>`;

  const date=new Date().toLocaleDateString('af-ZA').replace(/\//g,'-');
  document.getElementById('export-stats').innerHTML=`
    <div class="exp-stat"><span class="exp-stat-val">${products.length}</span><span class="exp-stat-lbl">Produkte</span></div>
    <div class="exp-stat"><span class="exp-stat-val">${factoryStock.length}</span><span class="exp-stat-lbl">Voorraad</span></div>
    <div class="exp-stat"><span class="exp-stat-val">${sales.length}</span><span class="exp-stat-lbl">Verkope</span></div>
    <div class="exp-stat"><span class="exp-stat-val">${customers.length}</span><span class="exp-stat-lbl">Klante</span></div>`;
  const exports=[
    {label:'Produkte',sub:`${products.length} produkte met pryse`,fn:()=>dl(toCSV(['ID','Naam','Kategorie','Prys','Prys/ton','Eenheid','Beskrywing','Gebruik'],products.map(p=>[p.id,p.name,p.category,p.price,p.pricePerTon||'',p.unit,p.description||'',p.useCase||''])),`LOBOL_Produkte_${date}.csv`)},
    {label:'Fabrieksvoorraad',sub:`${factoryStock.length} items`,fn:()=>dl(toCSV(['Naam','Hoeveelheid','Min Vlak','Eenheid','Status','Vervaldatum','Prys','Waarde','Notas'],factoryStock.map(i=>[i.name,i.qty,i.minQty||0,i.unit,i.status,i.expiryDate||'',i.price,(i.qty||0)*(i.price||0),i.notes||''])),`LOBOL_Voorraad_${date}.csv`)},
    {label:'Verkope',sub:`${sales.length} bestellings`,fn:()=>{ const rows=[]; sales.forEach(s=>(s.items||[{name:'',qty:'',price:'',total:s.total}]).forEach(i=>rows.push([s.customerName,s.date,s.status,i.name,i.qty,i.price,i.total,s.notes||'']))); dl(toCSV(['Klant','Datum','Status','Produk','Hoeveelheid','Prys','Totaal','Notas'],rows),`LOBOL_Verkope_${date}.csv`); }},
    {label:'Vragmotor Laailyste',sub:`${truckCounts.length} vragmotors`,fn:()=>{ const rows=[]; truckCounts.forEach(t=>t.items.forEach(i=>rows.push([t.name,t.date,i.name,i.qty,i.price,i.total,t.delivered?'Afgelewer':'Aktief']))); dl(toCSV(['Vragmotor','Datum','Produk','Sakke','Prys','Totaal','Status'],rows),`LOBOL_Vragmotors_${date}.csv`); }},
    {label:'Klante',sub:`${customers.length} klante`,fn:()=>dl(toCSV(['Naam','Plaas','Telefoon','Area','Tipe','Eie Geel','Notas'],customers.map(c=>[c.name,c.farm||'',c.phone||'',c.area||'',c.type||'',c.eieGeel?'Ja':'Nee',c.notes||''])),`LOBOL_Klante_${date}.csv`)},
  ];
  if(priceHistory.length) exports.push({label:'Prysgeskiedenis',sub:`${priceHistory.length} veranderings`,fn:()=>dl(toCSV(['Produk','Ou Prys','Nuwe Prys','Datum','Tyd'],priceHistory.map(h=>[h.productName,h.oldPrice,h.newPrice,h.date,h.time||''])),`LOBOL_Prysgeskiedenis_${date}.csv`)});
  document.getElementById('export-list').innerHTML=exports.map((e,i)=>`<button class="export-btn" onclick="window._exports[${i}]()"><div class="export-btn-icon">📊</div><div><div class="export-btn-label">${e.label}</div><div class="export-btn-sub">${e.sub}</div></div><span style="color:var(--text3)">⬇</span></button>`).join('');
  window._exports=exports.map(e=>e.fn);
}
function exportFullBackup(){
  const data={exportDate:new Date().toISOString(),version:'3.0',products,duties,reminders,factoryStock,truckCounts,customers,sales,deliveries,notes,workers,priceHistory};
  dl(JSON.stringify(data,null,2),`LOBOL_Rugsteun_${new Date().toLocaleDateString('af-ZA').replace(/\//g,'-')}.json`,'application/json');
}
function importBackup(e){
  const file=e.target.files?.[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!data.version||!data.products) throw new Error('Ongeldige lêer');
      if(data.products) { products=data.products; save('v3_products',products); }
      if(data.factoryStock) { factoryStock=data.factoryStock; save('v3_stock',factoryStock); }
      if(data.sales) { sales=data.sales; save('v3_sales',sales); }
      if(data.customers) { customers=data.customers; save('v3_customers',customers); }
      if(data.duties) { duties=data.duties; save('v3_duties',duties); }
      if(data.notes) { notes=data.notes; save('v3_notes',notes); }
      if(data.workers) { workers=data.workers; save('v3_workers',workers); }
      if(data.priceHistory) { priceHistory=data.priceHistory; save('v3_priceHistory',priceHistory); }
      document.getElementById('import-msg').innerHTML='<div class="import-msg import-ok">✅ Rugsteun suksesvol herstel!</div>';
      renderExport();
    }catch(err){
      document.getElementById('import-msg').innerHTML=`<div class="import-msg import-err">❌ Fout: ${err.message}</div>`;
    }
  };
  reader.readAsText(file); e.target.value='';
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
initTheme();
checkDutyReset();
buildNav();
navTo('dashboard');
setInterval(()=>{ if(currentPage==='dashboard') renderDashboard(); if(currentPage==='reminders') renderReminders(); },60000);
setInterval(()=>{ if(currentPage==='dashboard'&&weatherCache){ weatherCacheTime=0; loadWeather(); } },15*60*1000);