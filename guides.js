// ═══════════════════════════════════════════════════════════════
// CATTLE GUIDES
// ═══════════════════════════════════════════════════════════════
const SEASONAL=[
  {months:'November – Desember',season:'Piek Somer 🌞',color:'#6fcf47',tasks:['Somer 6 (P6 Foslek) vir droë/dragtige beeste – 130g/kop/dag','Somerfos P12 vir vervangingsverse groeifase – 170g/kop/dag','25 RPM vir lakterende koeie – 1200g/kop/dag','Boost Lick Somer vir spekulasie kalwers (130–180kg) – 550g/100kg LG','Fosfaat stimuleer rumenflora vir maksimum groei op veld','Weiding blaarryk & sag – geen aanvullende proteïen nodig']},
  {months:'Januarie – Februarie',season:'Laat Somer / Vroeë Herfs 🌤️',color:'#e09a3c',tasks:['Somerfos 150 vir droë beeste (weiding pypstadium) – 200g/kop/dag','25 RPM vir koeie met kalwers (Fase 1) – 850–1100g/kop/dag','Crash Course Somer vir spekulasie ossies op groenweiding','Monitor weidingkwaliteit – as weiding verswak, verhoog inname dadelik','Begin dink aan winterstrategie vir Maart/April']},
  {months:'Maart – April',season:'Herfs / Oorgangsperiode 🍂',color:'#e09a3c',tasks:['NPN Fos oorgangslek (27% prot) – 220g/kop/dag – bou kondisie voor winter','50 RPM vir koeie met kalwers (Fase 1 winter) – 1000–1400g/kop/dag','Kalwers begin saam lek vreet ± 2.5 maande – verhoog lek vinnig','Diere moet kondisie opbou voor snerpende koue','Suurveldstreke: pas periodes aan – begin winterlek vroeër']},
  {months:'Mei – Julie',season:'Hoog Winter ❄️',color:'#5ca8e0',tasks:['4x4 Winteronderhoudslek (38% prot) Soetveld – 500g/kop/dag','BURGERS 430 WR (43% prot) Suurveld – 500g/kop/dag','50 RPM vir lakterende koeie tydens koue front – 1200g/kop/dag','Crash Course 250–500kg vir swaarder spekulasie kalwers','Verseker maks bakteriese massa in rumen','Kontroleer kondisiepunt gereeld']},
  {months:'Augustus – Oktober',season:'Laat Winter / Vroeë Lente 🌱',color:'#5ca8e0',tasks:['15 RPM Winterproduksielek (laat winter) – 1200g/kop/dag','SS Lek vir ouer verse (13–18 mnde) – 680g/kop/dag deur winter','Crash Course 100–250kg vir jonger spekulasie kalwers','15 RPM "oortuig" dier van volop somer – keer verlengde interkalfperiode','Begin voorberei vir somerseisoenstrategie teen Oktober']},
];
const BREEDS=[
  {name:'Nguni 🐂',tips:['Uitstekende aanpassingsvermoë – min aanvullende voeding nodig','Gebruik Somerfos en 25 RPM in somer vir optimale kalwers','In winter: 4x4 of 430WR is voldoende','Speengewig gemiddeld 150–180kg – dek verse vroeër (14–16 mnde)','Suurveld-tolerant: gebruik Bovi SOS en BURGERS 430 WR']},
  {name:'Brahman / Simbra 🐄',tips:['Hoë hitte toleransie maar gevoelig vir mineraaltekorte','Fosfaat kritiek – gebruik Somerfos P12 vir beste resultate','Vroeë dekking moontlik (14 mnde) met 50 RPM wintervoeding','Reageer uitstekend op Crash Course lekke vir spekulasie']},
  {name:'Bonsmara 🐂',tips:['Hoë produksiepotentiaal – verdien beter lek kwaliteit (HPK reeks)','25 RPM Somer + 50 RPM Winter vir optimale melkproduksie','Teiken speengewig: 200–230kg met regte lek program','Vervangingsverse: SS Lek + HPK SS Lek vir 330kg @ 16 mnde']},
  {name:'Drakensberger 🐄',tips:['Uitstekend in suurveldstreke – gebruik suurveld spesifieke lekke','Bovi SOS vir speenverse, BURGERS 430 WR vir winter','Goeie melkproduksie – 50 RPM gee beste resultate in winter']},
  {name:'Beefmaster 🐂',tips:['Swaarder rasse – gebruik 250–500kg Crash Course vir spekulasie','Hoë energie behoefte: LOBOL Energielek vir vetmesting op veld','Lakterende koeie produseer ryker melk met 50 RPM']},
];
const DOSAGE=[
  {title:'Lakterende Koeie',rows:[{p:'25 RPM (Somer)',i:'1200g/kop/dag',n:'Optimale melk + herkonsepsie'},{p:'15 RPM (Laat Winter)',i:'1200g/kop/dag',n:'Matige koue / oesreste'},{p:'50 RPM (Winter)',i:'1200g/kop/dag',n:'Koue front / middel winter'}]},
  {title:'Droë / Dragtige Beeste',rows:[{p:'Somer 6 P6 Foslek',i:'130g/kop/dag',n:'Piek somer (Nov–Des)'},{p:'Somerfos 150',i:'200g/kop/dag',n:'Pypstadium weiding (Jan–Feb)'},{p:'NPN Fos',i:'220g/kop/dag',n:'Herfs oorgangslek (Mrt–Apr)'},{p:'4x4 / 430WR',i:'500g/kop/dag',n:'Hoog winter (Mei–Jul)'},{p:'15 RPM',i:'1200g/kop/dag',n:'Laat winter onderhoud'}]},
  {title:'Spekulasie Kalwers & Ossies',rows:[{p:'Boost Lick Somer',i:'550g/100kg LG',n:'130–180kg op groenweiding'},{p:'LOBOL Energielek',i:'550g/100kg LG',n:'180kg+ piek somer'},{p:'Crash Course 100–250kg',i:'550g/100kg LG',n:'Winter / hooi'},{p:'Crash Course 250–500kg',i:'550g/100kg LG',n:'Winter / hooi'}]},
  {title:'Vervangingsverse',rows:[{p:'25 RPM (Fase 1 Somer)',i:'850–1100g/kop/dag',n:'Koei + kalf Jan–Mrt'},{p:'50 RPM (Fase 1 Winter)',i:'1000–1400g/kop/dag',n:'Koei + kalf Apr–Okt'},{p:'Somerfos P12 (Fase 2 Somer)',i:'170g/kop/dag',n:'Groeifase Nov–Des'},{p:'SS Lek (Fase 2 Winter)',i:'680g/kop/dag',n:'Groeifase Jan–Okt'}]},
  {title:'Intensiewe Skaapboerdery – Somer',rows:[{p:'Groenveld Somerproduksielek 23%',i:'300g/kop/dag',n:'Ooi 30 dae voor lam'},{p:'Groenveld Somerproduksielek 23%',i:'350g/kop/dag',n:'Ooi met lam (laktasie)'},{p:'Groenveld Somerproduksielek 23%',i:'230–280g/kop/dag',n:'Algemene produksie / prikkelvoeding'}]},
  {title:'Intensiewe Skaapboerdery – Winter',rows:[{p:'Super ME Winterproduksielek 26%',i:'370g/kop/dag',n:'Ooi 30 dae voor lam'},{p:'Super ME Winterproduksielek 26%',i:'420g/kop/dag',n:'Ooi met lam (laktasie)'},{p:'Super ME Winterproduksielek 26%',i:'280–380g/kop/dag',n:'Algemene produksie / prikkelvoeding'}]},
  {title:'Skaap Lammer Voeding',rows:[{p:'Lamkruip 17%',i:'1.3% van LG/dag',n:'Lam dag 15–60 (vrywillig)'},{p:'GF Lammervolvoer 16%',i:'2.8% van LG/dag',n:'Lam dag 60–110 by moeder'},{p:'GF Lammervolvoer 16%',i:'4.3% van LG/dag',n:'Lam dag 60–110 gespeen'}]},
  {title:'Ekstensiewe Skape & Ram Voorbereiding',rows:[{p:'Somer 6 Fosfaatlek 6%',i:'25g/kop/dag',n:'Eerste 4 maande dragtigheid (somer)'},{p:'LOBOL 2:1:1 Winteronderhoud 28%',i:'100–150g/kop/dag',n:'Eerste 4 maande dragtigheid (winter)'},{p:'Skaapvolvoer',i:'2.5% LG/dag (W) / 2.0% (S)',n:'Ram – kort periode voor dekking'},{p:'Ramvolvoer',i:'2.0% LG/dag (W) / 1.5% (S)',n:'Ram – jong / lang periode voor dekking'}]},
];
let guideTab='kalender';
function switchGuideTab(t){
  guideTab=t;
  ['kalender','ras','dosering'].forEach(x=>{
    document.getElementById('guide-'+x+'-tab').style.display=x===t?'':'none';
    document.getElementById('tab-'+x).className='tab-btn'+(x===t?' active':'');
  });
  renderCattleGuides();
}
function renderCattleGuides(){
  if(guideTab==='kalender'){
    const el=document.getElementById('guide-kalender-tab');
    el.innerHTML=`<p style="font-size:13px;color:var(--text3);margin-bottom:14px">Klik op enige maand om die aanbevole lekstrategie te sien.</p>`+
    SEASONAL.map((s,i)=>{
      const open=expandedItems['seas_'+i];
      return `<div class="guide-card" style="margin-bottom:8px;${open?'border-color:'+s.color:''}">
        <button class="guide-header" onclick="toggleExpand('seas_${i}');renderCattleGuides()">
          <span style="color:${s.color};font-size:14px">●</span>
          <span class="guide-title" style="font-size:14px">${s.months} — ${s.season}</span>
          <span>${open?'▲':'▼'}</span>
        </button>
        ${open?`<div class="guide-body"><ul class="gitem-list" style="padding:8px 4px">${s.tasks.map(t=>`<li style="margin-bottom:8px;color:var(--text2);font-size:13px">${t}</li>`).join('')}</ul></div>`:''}
      </div>`;
    }).join('')+`
    <div class="section-title" style="margin-top:16px">Jaarsiklus Oorsig</div>
    <div class="month-bar">${['Nov','Des','Jan','Feb','Mrt','Apr','Mei','Jun','Jul','Aug','Sep','Okt'].map((m,i)=>{
      const col=i<2?'#6fcf47':i<4?'#e09a3c':i<6?'#e09a3c':i<9?'#5ca8e0':'#6fcf47';
      const phase=i<2?'Piek Somer':i<4?'Laat Somer':i<6?'Herfs':i<9?'Winter':'Lente';
      return `<div class="month-item" style="border-color:${col}"><div class="month-name">${m}</div><div class="month-phase" style="color:${col}">${phase}</div></div>`;
    }).join('')}</div>`;
  } else if(guideTab==='ras'){
    document.getElementById('guide-ras-tab').innerHTML=`<p style="font-size:13px;color:var(--text3);margin-bottom:14px">Spesifieke wenke vir gewilde rasse in Suid-Afrika.</p>`+
    BREEDS.map((b,i)=>{
      const open=expandedItems['breed_'+i];
      return `<div class="guide-card" style="margin-bottom:8px">
        <button class="guide-header" onclick="toggleExpand('breed_${i}');renderCattleGuides()">
          <span class="guide-title">${b.name}</span><span>${open?'▲':'▼'}</span>
        </button>
        ${open?`<div class="guide-body"><ul class="gitem-list" style="padding:8px 4px">${b.tips.map(t=>`<li style="margin-bottom:8px;color:var(--text2);font-size:13px">${t}</li>`).join('')}</ul></div>`:''}
      </div>`;
    }).join('');
  } else {
    document.getElementById('guide-dosering-tab').innerHTML=`<p style="font-size:13px;color:var(--text3);margin-bottom:14px">Aanbevole innamesyfers per produk en dierkategorie.</p>`+
    DOSAGE.map(table=>`<div class="dosage-section">
      <div class="dosage-title">${table.title}</div>
      <div class="dosage-wrap"><table class="dosage-table">
        <thead><tr><th>Produk</th><th>Inname</th><th>Notas</th></tr></thead>
        <tbody>${table.rows.map(r=>`<tr><td class="dos-prod">${r.p}</td><td class="dos-intake">${r.i}</td><td class="dos-notes">${r.n}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>`).join('')+`<div class="guide-note" style="margin-top:16px">💡 LG = Lewende Gewig. Alle innamesyfers is riglyne — monitor werklike inname en pas aan vir jou plaas.</div>`;
  }
}
