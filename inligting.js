// ═══════════════════════════════════════════════════════════════
// INLIGTING & GIDSE
// ═══════════════════════════════════════════════════════════════
const INFO_CATS = [
  {id:'melkbeeste', label:'Melkbeeste', icon:'🐄'},
  {id:'skape',      label:'Skape',      icon:'🐑'},
  {id:'beeste',     label:'Beeste',     icon:'🐂'},
  {id:'vetmesting', label:'Vetmesting', icon:'🥩'},
  {id:'bulle',      label:'Bulle',      icon:'🐃'},
  {id:'lobol515',   label:'LOBOL 515',  icon:'⭐'},
  {id:'maatskappy', label:'Maatskappy', icon:'🏢'},
  {id:'krediet',    label:'Krediet Aansoek', icon:'📝'},
];

let activInfoCat = 'melkbeeste';
let infoExpanded = {};

const INFO_DATA = {
  melkbeeste: [
    {id:'laktasie',icon:'🥛',title:'305 Dae Laktasie Siklus',blocks:[
      {title:'A. Droë Koeie (Belangrikste Groep)',items:['Rusperiode: 40 dae (min) / 60 dae (maks) | Eerste laktasie: 80 dae','Kondisiepunt by opdroog: 3.5 – BEHOU tot kalwing','Fetale groei = 65% in droë periode – moenie buik met kondisie verwar','Elke 1kg vet verloor = 33 liter melk MINDER oor laktasie','Ketose-tekens: produksiefluktuasie | haarkleed op rug staan regop','Anioniese soute: 21 dae voor kalwing – staak sodra melk begin']},
      {title:'B. Top Groep & Verse Groep',items:['Inname = produksie','Hooilengte NIE korter as 70mm nie','Speeksel (koeksoda) + herkou hou rumen PH 6–6.8','NDF 25–35% | ADF 19–22% | 70% NDF van hooi/grasse','35%+ koeie moet te enige tyd herkou','Piek week 7–10 na kalwing','⭐ 1kg melk hoër piek = ±200 liter MEER oor laktasie','Volwasse koeie vreet ±4% van LG in top produksie']},
      {title:'C. Middel Groep (120–240 dae)',items:['Produksie val ±9%/maand','Temperature bo 24°C onderdruk inname – voer in die nag','1L melk = ±4L water benodig','Voer 20 ure/dag beskikbaar | Kripspasie 70cm/bees']},
      {title:'D. Regmaak Groep & E. Vars in Melk',items:['Regmaak: Skuif op dag 240 – forceer verminderde produksie','Kondisiepunt 3.5 teen einde van siklus','Vars: Propionsuur bevorder maagpapille groei','Beperk mobilisasie = langer produksieplato']},
    ],highlight:'Kondisiepuntsiklus: Kalwing(3.5) → Top Groep(2.9) → Middel(3.2) → Regmaak(3.5) → Droë Periode(3.5)'},
    {id:'verskalwers',icon:'🐮',title:'Grootmaak van Verskalwers',blocks:[
      {title:'Geboorte tot Speen (2 maande) – Kolostrum KRITIEK',items:['Eerste 2L kolostrum BINNE 6 UUR na geboorte – immuniteit oordrag','Kolostrum kan gevries word – verhit tot 39°C voor gebruik','Ontsmet naelstring met jodium | Plaas in droë hok (UV strale steriliseer)','Dag 4–10: 4x1L melk/dag | 18E ad-lib | GEEN HOOI','Dag 25–50: Verminder melk na 5% van geboortegewig – stimuleer meelinname','Dag 51–60: Soggens net 2.5% melk | 18E ad-lib','Speen as kalf 2–2.2% LG in meel vreet','⚠️ NOOIT eerste maand uit emmer – gebruik fopspeen altyd']},
      {title:'Speen tot 3 Maande (±90kg)',items:['Vervang 18E met Kalfgroeimeel 16E ad-lib','Lusernhooi of goeie tefhooi ad-lib','Sodra versie herkou = rumen is funksioneel','Meet borsomtrek + ribspronge vir produksiepotensiaal']},
      {title:'3 tot 6 Maande (±155kg)',items:['Kalfgroeimeel 16E beperk tot 4kg/dag','Weiding + Somer 6 Fosfaatlek ad-lib']},
      {title:'6 tot 12 Maande (±215kg)',items:['Suiwelmeel 15% prot – beperk 3kg/dag','Hawerweiding + Somer 6 ad-lib','Bronstig maar MOENIE insemineer nie']},
      {title:'12 tot 16 Maande (Dekgewig 340kg)',items:['Voerecht 17% – 2.5kg/dag + Somer 6 ad-lib','Waak teen oorvet kondisie','⚠️ Moenie voer totaal onttrek nie – opblaas risiko']},
      {title:'16 Maande tot Kalwing (340–480kg)',items:['Voerecht 17%: 2kg/dag + 1kg geelmeel + tefhooi','Laaste 3 maande: 2.5kg/dag + kuilvoer 4kg/dag','Laaste 2–3 weke: Suiwelmeel + laat gereeld deur melkstal stap']},
    ],
    table:{headers:['Ras','Geboortegewig','Dekgewig','Skofhoogte','Groei/dag','Gewig by kalwing'],rows:[['Holstein','40kg','310–360kg','120–130cm','0.60–0.70 kg/dag','480–510kg'],['Ayrshire','32kg','250–280kg','110–120cm','0.50–0.55 kg/dag','410–430kg'],['Jersey','25kg','205–230kg','100–110cm','0.40–0.45 kg/dag','330–350kg']]},
    warning:'Kondisiepuntdoelwitte: 3mnd=2.2 | 6mnd=2.3 | 9mnd=2.4 | 12mnd=2.8 | 15mnd=2.9 | 18mnd=3.2 | 21mnd=3.4 | 24mnd=3.5 | Ideale kalwingstyd = 24 maande'},
    {id:'bulkalwers_melk',icon:'🐂',title:'Grootmaak van Bulkalwers (Melkras)',blocks:[
      {title:'Geboorte tot 130kg (Speen dag 52)',items:['Eerste 2L kolostrum BINNE 4 UUR na geboorte','Dag 1–3: Kolostrum by moeder','Dag 4–10: 4x1L melk/dag | Bulkalf 0-100 begin | GEEN HOOI | Voeromset 2.2:1','Dag 11–31: 3x1L melk | Bulkalf 0-100 ad-lib | Voeromset 2.4:1','Dag 31–45: 2x1L melk | Bulkalf 0-100 ad-lib','Dag 46–52: 1x1L melk soggens | Bulkalf 0-100 ad-lib + hooi','Speen dag 52 – Teikengewig: 78kg min','⚠️ Siek kalf in eerste 2 maande = ±80kg ligter op 6 maande','Voorsorg: Dectomax 1cc | Enting Paratifus & Pasteurella | Vit A direk na geboorte']},
      {title:'130kg tot 250kg',items:['Bulkalf 100-220 ad-lib + hooi','Aanpassingsperiode: 50% oud + 50% nuut vir 1 week','Ruimte: 8m²/kop | Voeromset: ±4.2:1','Groenweiding: Crash Course Somer | Droë weiding: Crash Course 100–250','Teikengroei: 1.2–1.6kg/dag | Inname: 500g/dag per 100kg LG']},
      {title:'Na 250kg (Voerkraal)',items:['Minimum 1.8kg/dag voor afrond','Semi-volvoer Rom Rev F3 (melkras) / F2 (vleisras)','Voerkrippe ALTYD vol na aanpassing','Leefspasie 10m²/dier | Voeromset ±5.8','Teikengewig 6 maande: ±330kg – vetgradering 2','⚠️ NA 250kg NIE op veldweiding hou nie']},
    ],danger:'Maagwerkings: Salmonella=Advocin+VitB | Dikmelkagtig=Clamoxil+BiosolM | Koksidiose=Sulfamiddel 3dae | Waterig=BiosolM+Phosamine | Lintwurm=Lintex elke 14dae | Respiratories=Nuflor/Mycotil300'},
  ],
  skape: [
    {id:'intensief_skaap',icon:'🐑',title:'Intensiewe Skaapboerdery (Vleis)',blocks:[
      {title:'Ooi 30 Dae Voor Lam – Somer',items:['Groenveld Somerproduksielek 23%','60% van fetale groei in laaste 28 dae dragtigheid','Meerlinge ontwikkel lewenskragtig met korrekte voeding','Inname: ± 300 g/kop/dag']},
      {title:'Ooi met Lam – Somer',items:['Groenveld Somerproduksielek 23%','75% van ooi se melk geproduseer in eerste 8 weke laktasie','Ooi se melk vetinhoud: tot 8%','Inname: ± 350 g/kop/dag']},
      {title:'Ooi voor & met Lam – Winter',items:['Super ME Winterproduksielek 26%','Aminosuur-profiel stimuleer fetale groei','Melkproduksie piek week 3–4 sonder skade aan wolproduksie','Voor lam: ± 370 g/kop/dag | Met lam: ± 420 g/kop/dag']},
      {title:'Lam Dag 15–60 (Somer & Winter)',items:['Lamkruip 17%','Op dag 15: voer vir ooi én lam saam – ooi leer lam om te vreet','Sodra lam vreet: gee net lam toegang','Vrywillige inname: ± 1.3% van lam se lewende gewig','Voorsien ad-lib goeie kwaliteit tefhooi by alle stadiums']},
      {title:'Lam Dag 60–110 (Somer & Winter)',items:['GF Lammervolvoer 16%','Bevat sintetiese aminosure + ingevoerde vette – spesifiek vir enkelmaagdiere','Lammers behoort ± 43 kg te weeg teen dag 60','Inname by moeder: 2.8% LG | Gespeen: 4.3% LG','⚠️ Spuit teen koksidiose + doseer teen melkwurm elke 20 dae']},
    ]},
    {id:'ekstensief_skaap',icon:'🌾',title:'Ekstensiewe Skaapboerdery',blocks:[
      {title:'Supplement Strategie',items:['Somer 6 Fosfaatlek 6% – eerste 4 maande dragtigheid (25g/kop/dag)','Groenveld Somerproduksielek 23% – produksie & prikkelvoeding (230–280g/dag)','LOBOL 2:1:1 Winteronderhoudslek 28% – eerste 4 maande dragtigheid winter (100–150g/dag)','Super ME Winterproduksielek 26% – produksie & prikkelvoeding winter (280–380g/dag)']},
      {title:'Ram Voorbereiding',items:['Kort periode (≤6 weke): Skaapvolvoer – Winter 2.5% LG/dag | Somer 2.0% LG/dag','Langer periode / jong ramme: Ramvolvoer – Winter 2.0% LG/dag | Somer 1.5% LG/dag','⚠️ Ramme moet gereeld geoefen word – vrugbaarheid & skrotum omtrek is kritiek','⚠️ Moenie ramme hanteer (dip/skeer/inent) binne 30 dae voor dekking nie']},
    ]},
    {id:'wolskape',icon:'🧶',title:'Wolskape & Vervangingsooie',blocks:[
      {title:'Wolproduksie Beginsels',items:['Energie + proteïen primêr verantwoordelik vir goeie wolproduksie','Deurvloei proteïen ryk aan swaeldraende aminosure is kritiek','Koper: deel van koënsiem wat wolkwaliteit verseker (treksterkte, kleursorpsie, elastisiteit)','Swael: saam met NPN – optimum swaeldraende mikrobes','Wolproduksie kan tot 28% verminder sonder korrekte byvoeding tydens dragtigheid/laktasie','Voeding het meer direkte invloed op veseldikte as op vesellengte']},
      {title:'Vervangingsooie – Eerste 5 Maande Kritiek',items:['Sonder supplement: 15% minder primêre wol follikels by geboorte','Te min voeding = laer geboortegewig + hoër mortaliteit + swakker wolopbrengs','Lammers kan op 90 dae ouderdom 50% van volwasse gewig bereik','Voedingstekort eerste 5 maande = BLYWENDE skade aan wolpotensiaal','Na 5 maande: voedingstekort = slegs tydelike verlaging (potensiaal bly behooue)','Kruipvoeding by ooie met tweelinge is ekonomies regverdigbaar']},
    ]},
  ],
  beeste: [
    {id:'spekulasie_ossies',icon:'🐂',title:'Spekulasie Kalwers & Ossies',blocks:[
      {title:'Groenveld / Somer',items:['Crash Course Somer 20% – ligte kalwers 130–180kg – 550g/100kg LG','LOBOL Energielek 15% – 180kg+ in piek somer – 550g/100kg LG','⚠️ Swak weiding = inname verhoog drasties – hou dop']},
      {title:'Hooi / Winter',items:['Crash Course 100–250kg 22% – 130–200kg op hooi – 550g/100kg LG','Crash Course 250–500kg 22% – 200kg+ – maksimum spiergroei – 550g/100kg LG','"Crash Course" = produksielek soortgelyk aan kragvoer – minder koste, laer inname']},
    ]},
    {id:'vervangingsverse_bees',icon:'🐄',title:'Uitgroei van Vervangingsverse (Vleisras)',blocks:[
      {title:'Fase 1: Koei met Kalf – Somer (Jan–Mrt)',items:['25 RPM Somerproduksielek 20%','Verbeter melkproduksie drasties','Versies begin vinniger groei wanneer saam lek vreet','Inname: ± 850–1100 g/kop/dag']},
      {title:'Fase 1: Koei met Kalf – Winter (Apr–Okt)',items:['50 RPM Winterproduksielek 26%','Verbeter melk proteïen + vet | Vroeër dekking moontlik','Kalwers begin lek vreet ± 2.5 maande','Inname: ± 1000–1400 g/kop/dag']},
      {title:'Fase 2: Groeifase – Somer (Nov–Des)',items:['Somerfos / P12 Fosfaatlek 15% – stimuleer rumenflora – 170g/kop/dag','Teiken: 330kg @ 16 maande']},
      {title:'Fase 2: Groeifase – Winter (Jan–Okt)',items:['SS Lek 26% – konstante groei sonder vetwording – 680g/kop/dag','Uierontwikkeling word ook gestimuleer']},
    ]},
    {id:'droe_dragtig',icon:'🌿',title:'Droë / Dragtige Beeste (Volwasse)',blocks:[
      {title:'Somer Seisoene',items:['Nov–Des (Piek Somer): Somer 6 P6 Foslek – 130g/kop/dag','Jan–Feb (Pypstadium weiding): Somerfos 15% – 200g/kop/dag','Mrt–Apr (Herfs / Saadstadium): NPN Fos 27% – 220g/kop/dag – bou kondisie voor winter']},
      {title:'Winter',items:['Mei–Jul: 4x4 Onderhoud 38% (Soetveld) of BURGERS 430WR 43% (Suurveld) – 500g/kop/dag','Laat Winter: 15 RPM 26% – keer verlengde interkalfperiode – 1200g/kop/dag']},
    ]},
  ],
  vetmesting: [
    {id:'vetmesting_beeste',icon:'🥩',title:'Vetmesting van Beeste',blocks:[
      {title:'Crashkurs Groenweiding',items:['Crash Course Somer – 130–180kg op blaarryke groenweiding','Energielek – 180kg+ op groenweiding – 550g/100kg LG','HPK weergawes beskikbaar vir beter groei resultate']},
      {title:'Crashkurs Droogte / Hooi',items:['Crash Course 100–250kg – 130–200kg diere op hooi','Crash Course 250–500kg – 200kg+ diere op hooi of droë weiding','Inname 550g/100kg LG – teikengroei 1.2–1.6kg/dag']},
      {title:'Semi-Volvoer Voerkraal',items:['Rom Rev F2 (vleisraskalwers) of Rom Rev F3 (melkraskalwers)','Na aanpassing: voerkrippe altyd vol | Leefspasie 10m²/dier','Voeromset ±5.8 | Teikengewig 6 maande: ±330kg']},
    ]},
    {id:'vetmesting_skape',icon:'🐑',title:'Vetmesting van Skape',blocks:[
      {title:'Lammer Vetmesting',items:['GF Lammervolvoer 16% – dag 60–110 – 2.8% LG (by moeder) / 4.3% (gespeen)','Spuit teen koksidiose + doseer teen melkwurm elke 20 dae','Lammers behoort ±43kg te weeg teen dag 60']},
      {title:'Intensiewe Afrond',items:['Voer ad-lib met goeie kwaliteit tefhooi','Verseker genoeg water beskikbaar','Monitor inname en groei gereeld']},
    ]},
  ],
  bulle: [
    {id:'bulle_voorbereiding',icon:'🐃',title:'Bulle – Voorbereiding en Bestuur',blocks:[
      {title:'Ram Voorbereiding (Skape)',items:['Kort periode ≤6 weke voor dekking: Skaapvolvoer – Winter 2.5% LG/dag | Somer 2.0% LG/dag','Langer periode / eerste keer: Ramvolvoer – Winter 2.0% LG/dag | Somer 1.5% LG/dag','⚠️ Ramme gereeld oefen – vrugbaarheid + skrotum omtrek is KRITIEK','⚠️ Geen hanteer (dip/skeer/inent) 30 dae voor dekking nie']},
      {title:'Bul Voorbereiding (Beeste)',items:['Gebruik HPK lekke vir bulle in die dekseisoen','Kondisiepunt moet goed wees voor dekseisoen','Organiese vitamiene en minerale vir vrugbaarheid is ingesluit in LOBOL lekke','Monitor kondisiepunt deurlopend – magere bulle = swak vrugbaarheid']},
      {title:'Voeding Tydens Paring',items:['Groenveld Somerproduksielek 23% dien ook as prikkelvoeding tydens dekseisoen','Super ME Winterproduksielek 26% dien ook as prikkelvoeding','Verseker optimale voeding vir spermproduksie en vrugbaarheid']},
    ],warning:'Vrugbaarheid en skrotum omtrek is kritiek – kry \'n veekundige om bulle voor die dekseisoen te evalueer'},
  ],
  lobol515: [
    {id:'lobol515_info',icon:'⭐',title:'LOBOL 515 Produksieprogram',blocks:[
      {title:'Wat is LOBOL 515?',items:['LOBOL 515 is \'n spesialis produksieprogramme vir maksimale dierlike prestasie','Gebaseer op dekades van navorsing en praktykervaring in Suid-Afrikaanse toestande','Formuleer vir die spesifieke behoeftes van verskillende dierklasse en seisoene','HPK (Hoë Prestasie Kwaliteit) weergawes beskikbaar vir top resultate']},
      {title:'HPK vs Standaard Produkte',items:['Standaard produkte: geformuleer vir gemiddelde toestande en bekostigbaarheid','HPK produkte: optimale aminosuur-profiel, hoër vette, beste moontlike proteïenbronne','HPK aanbeveel vir: melkkoei afrond, vervangings ooities, hoë-waarde diere','HPK beskikbaar vir: 25/15/50 RPM, Energielek, 4x4, 430WR, SS Lek, Crash Course']},
      {title:'LOBOL Se Formuleringsbeginsel',items:['Elke produk geformuleer vir spesifieke dierklasse, seisoene en produksiedoelwitte','Inname riglyne gebaseer op navorsing – pas aan vir plaas toestande','Proteïenbronne gekies vir aminosuur-kwaliteit, nie net % proteïen nie','Energie deur vette in produksielekke – sinvolle manier om energie te verhoog','Fosfaat: slegs bio-beskikbare vorme gebruik']},
    ],highlight:'Kontak LOBOL se tegniese span vir \'n persoonlike rantsoenplan vir jou plaas'},
  ],
  maatskappy: [
    {id:'maatskappy_info',icon:'🏢',title:'Oor LOBOL',blocks:[
      {title:'Wie is LOBOL?',items:['LOBOL is \'n Suid-Afrikaanse diervoer vervaardigingsbedryf','Spesialiseer in lek- en aanvullingsprodukte vir beeste, skape, melkbeeste en ander diere','Produkte geformuleer deur kundiges met uitgebreide praktiese ervaring','Dek \'n wye reeks van seisoensgebonde produkte – Somer en Winter formuleerings']},
      {title:'Produk Reekse',items:['Lekke vir Beeste – RPM reeks, 4x4, BURGERS 430 WR','Lekke vir Bulle (Crash Course) – 100–250kg en 250–500kg','Lekke vir Verse – SOS, SS Lek reeks','Fosfaatlekke – P6, P12 Somerfos reeks','Lekke vir Skape – Groenveld, Super ME, LOBOL 2:1:1','Suiwel produkte – Voerecht, Kalfaangvangsmeel, Bulkalf reeks','HPK (Hoë Prestasie Kwaliteit) weergawes van alle hoofprodukte']},
      {title:'Kwaliteitsversekering',items:['Slegs beste bio-beskikbare fosfaat word gebruik','Aminosuur-profiel proteïene vir kwaliteit resultate','Produksamestelling geformuleer vir Suid-Afrikaanse toestande','Gereelde navorsing en produk-opdatering']},
    ],highlight:'Kontak ons tegniese span vir voedingsadvies en plaasbesoeke'},
  ],
  krediet: [],
};

function renderInfoAccordion(items, id){
  return items.map((item,i) => {
    const key = id+'_'+i;
    const open = infoExpanded[key];
    return `<div class="info-section">
      <div class="info-section-header" onclick="toggleInfoSection('${key}')">
        <div class="info-section-icon">${item.icon}</div>
        <div class="info-section-title">${item.title}</div>
        <span>${open?'▲':'▼'}</span>
      </div>
      ${open ? `<div class="info-section-body">
        ${item.blocks.map(b=>`
          <div class="info-block">
            <div class="info-block-title">${b.title}</div>
            <ul class="info-list">${b.items.map(li=>`<li>${li}</li>`).join('')}</ul>
          </div>`).join('')}
        ${item.table?`<div class="info-table-wrap"><table class="info-table"><thead><tr>${item.table.headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${item.table.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}
        ${item.highlight?`<div class="info-highlight">💡 ${item.highlight}</div>`:''}
        ${item.warning?`<div class="info-warning">⚠️ ${item.warning}</div>`:''}
        ${item.danger?`<div class="info-danger">🚨 ${item.danger}</div>`:''}
      </div>` : ''}
    </div>`;
  }).join('');
}

function renderKredietForm(){
  return `<div class="card krediet-form">
    <h3 style="margin-bottom:8px">📝 Krediet Aansoek – LOBOL</h3>
    <p style="font-size:13px;color:var(--text3);margin-bottom:12px">Vul die onderstaande in om \'n krediet aansoek voor te berei. Stoor en druk af vir indiening.</p>
    <div class="krediet-field"><label>Volle Naam / Besigheid Naam</label><input type="text" id="kred-naam" placeholder="Bv. Jan Botha Boerdery"/></div>
    <div class="krediet-field"><label>ID Nommer / Registrasie Nommer</label><input type="text" id="kred-id" placeholder=""/></div>
    <div class="krediet-field"><label>Telefoonnommer</label><input type="tel" id="kred-tel" placeholder="082 xxx xxxx"/></div>
    <div class="krediet-field"><label>E-pos Adres</label><input type="email" id="kred-email" placeholder="naam@plaas.co.za"/></div>
    <div class="krediet-field"><label>Plaas / Streek</label><input type="text" id="kred-plaas" placeholder="Bv. Ermelo, Mpumalanga"/></div>
    <div class="krediet-field"><label>Tipe Boerdery</label>
      <select id="kred-tipe"><option>Beeste</option><option>Skape</option><option>Melkbeeste</option><option>Pluimvee</option><option>Gemengde Boerdery</option><option>Ander</option></select>
    </div>
    <div class="krediet-field"><label>Maandelikse Aankope (geskatte bedrag)</label><input type="text" id="kred-bedrag" placeholder="Bv. R 5 000 / maand"/></div>
    <div class="krediet-field"><label>Kredietlimiet Aangevra</label><input type="text" id="kred-limiet" placeholder="Bv. R 20 000"/></div>
    <div class="krediet-field"><label>Bank Besonderhede (Bank / Rekening naam)</label><input type="text" id="kred-bank" placeholder="Bv. FNB – Jan Botha"/></div>
    <div class="krediet-field"><label>Handtekening / Datum</label><input type="text" id="kred-datum" placeholder="${new Date().toLocaleDateString('af-ZA')}"/></div>
    <div class="krediet-field"><label>Addisionele Notas</label><textarea rows="3" id="kred-notas" placeholder="Enige ander inligting..."></textarea></div>
    <div class="krediet-submit-row">
      <button class="btn btn-primary" onclick="printKrediet()">🖨️ Druk / Stoor as PDF</button>
      <button class="btn btn-secondary" onclick="saveKrediet()">💾 Stoor Aansoek</button>
    </div>
    <div id="kred-saved-msg"></div>
  </div>`;
}

function renderInligting(){
  // Category buttons
  document.getElementById('info-cats').innerHTML = INFO_CATS.map(c=>`
    <button class="info-cat-btn${activInfoCat===c.id?' active':''}" onclick="setInfoCat('${c.id}')">
      <div class="info-cat-icon">${c.icon}</div>
      <div class="info-cat-label">${c.label}</div>
    </button>`).join('');
  // Content
  const area = document.getElementById('info-content-area');
  if(activInfoCat === 'krediet'){
    area.innerHTML = renderKredietForm();
  } else if(activInfoCat === 'lobol515'){
    area.innerHTML = `<div style="text-align:center;margin-bottom:12px"><div class="lobol515-badge">⭐ LOBOL 515</div></div>` + renderInfoAccordion(INFO_DATA.lobol515, 'lobol515');
  } else {
    const items = INFO_DATA[activInfoCat] || [];
    area.innerHTML = items.length ? renderInfoAccordion(items, activInfoCat) : `<div class="empty">Inligting binnekort beskikbaar.</div>`;
  }
}

function setInfoCat(id){ activInfoCat=id; infoExpanded={}; renderInligting(); }
function toggleInfoSection(key){ infoExpanded[key]=!infoExpanded[key]; renderInligting(); }

function printKrediet(){
  const fields = ['kred-naam','kred-id','kred-tel','kred-email','kred-plaas','kred-tipe','kred-bedrag','kred-limiet','kred-bank','kred-datum','kred-notas'];
  const labels = ['Naam','ID Nommer','Telefoon','E-pos','Plaas/Streek','Tipe Boerdery','Maandelikse Aankope','Kredietlimiet','Bank','Datum','Notas'];
  const win = window.open('','_blank');
  win.document.write('<html><head><title>LOBOL Krediet Aansoek</title><style>body{font-family:Arial,sans-serif;max-width:600px;margin:40px auto;color:#000}h1{color:#2a6e00}table{width:100%;border-collapse:collapse}td{padding:8px;border-bottom:1px solid #ccc;vertical-align:top}td:first-child{font-weight:bold;width:40%}</style></head><body>');
  win.document.write('<h1>LOBOL – Krediet Aansoek</h1><p>Datum: '+new Date().toLocaleDateString('af-ZA')+'</p><table>');
  fields.forEach((f,i)=>{ win.document.write('<tr><td>'+labels[i]+'</td><td>'+(document.getElementById(f)?.value||'')+'</td></tr>'); });
  win.document.write('</table><br><br><p>Handtekening: _______________________</p></body></html>');
  win.document.close(); win.print();
}

function saveKrediet(){
  const data={};
  ['kred-naam','kred-id','kred-tel','kred-email','kred-plaas','kred-tipe','kred-bedrag','kred-limiet','kred-bank','kred-datum','kred-notas'].forEach(f=>{ data[f]=document.getElementById(f)?.value||''; });
  STORE.set('v3_krediet',data);
  document.getElementById('kred-saved-msg').innerHTML='<div class="import-ok" style="margin-top:8px;padding:8px;border-radius:8px;font-size:12px">✅ Aansoek gestoor!</div>';
}

initTheme();
checkDutyReset();
buildNav();
navTo('dashboard');
setInterval(()=>{ if(currentPage==='dashboard') renderDashboard(); if(currentPage==='reminders') renderReminders(); },60000);
setInterval(()=>{ if(currentPage==='dashboard'&&weatherCache){ weatherCacheTime=0; loadWeather(); } },15*60*1000);