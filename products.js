// ═══════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════
const PROD_CATS=['Alle','Fosfaatlekke (Somer)','Fos/Prot-lekke (Herfs)','Lekke vir Bulle (Crash Course)','Lekke vir Verse','Lekke vir Beeste','Lekke vir Skape'];
const GUIDE_DATA=[
  {id:'spekulasie',title:'Spekulasie Kalwers & Ossies',icon:'🐂',sections:[
    {heading:'GROENVELD / SOMER',items:[
      {product:'Crash Course Somer – 20% proteïen',details:['Hoë vlakke energie + vette','Deurvloei proteïen','Piek somer: blaarryke weiding (geen saad/stingels)','Ligte kalwers: 130–180 kg','Inname: ± 550 g / 100 kg lewende gewig']},
      {product:'LOBOL Energielek – 15% proteïen',details:['Hoë netto energie + vette','Jong groen weiding','Diere: 180 kg+ piek somer','⚠️ Weiding swak → inname verhoog drasties','Inname: ± 550 g / 100 kg lewende gewig']},
    ],note:'Beide groenveldlekke geformuleer vir maksimum groei in kort periodes.'},
    {heading:'HOOI / WINTER',items:[
      {product:'Crash Course 100–250 kg – 22% proteïen',details:['Energie + vette + vismeel proteïen','Saam met hooi of spaarweiding','Diere: 130–200 kg','Inname: ± 550 g / 100 kg lewende gewig']},
      {product:'Crash Course 250–500 kg – 22% proteïen',details:['Hoë beskikbare proteïen + energie','Maksimum spiergroei','Diere: 200 kg+','Inname: ± 550 g / 100 kg lewende gewig']},
    ],note:'"Crash Course" = produksielek soortgelyk aan kragvoer. Minder koste en laer inname as kragvoer.'},
  ]},
  {id:'verse',title:'Uitgroei van Vervangingsverse',icon:'🐄',sections:[
    {heading:'FASE 1: Koei met Kalf (Somer)',subheading:'Jan–Mrt',items:[{product:'25 RPM Somerproduksielek – 20% proteïen',details:['Verbeter melkproduksie drasties','Versies begin vinniger groei wanneer saam lek vreet','Inname: ± 850–1100 g/kop/dag']}]},
    {heading:'FASE 1: Koei met Kalf (Winter)',subheading:'Apr–Okt',items:[{product:'50 RPM Winterproduksielek – 26% proteïen',details:['Verbeter melk: proteïen + vet verhoog','Vinniger versontwikkeling','Vroeër dekking moontlik','Inname: ± 1000–1400 g/kop/dag','Kalwers begin lek vreet: ± 2.5 maande']}]},
    {heading:'FASE 2: Groeifase (Somer)',subheading:'Nov–Des',items:[{product:'Somerfos / P12 Fosfaatlek – 15% proteïen',details:['Stimuleer rumenflora vir groei','Hoog bio-beskikbare fosfaat','Ondersteun vrugbaarheid + groei','Inname: ± 170 g/kop/dag']}]},
    {heading:'FASE 2: Groeifase (Winter)',subheading:'Jan–Okt',items:[{product:'SS Lek – 26% proteïen',details:['Konstante groei sonder vetwording','Werk deur herfs en winter','Teiken: 330 kg @ 16 maande','Inname: ± 680 g/kop/dag','✅ Uierontwikkeling gestimuleer']}]},
  ]},
  {id:'lakterende',title:'Lakterende Koeie',icon:'🍼',sections:[
    {heading:'GROENVELD / SOMER',items:[{product:'25 RPM Somerproduksielek – 20% proteïen',details:['Optimale melkgehalte + energie','Swaarder speenkalwers','Verbeter kondisiepunt','Bevorder herkonsepsie (ovulasie + embrio oorlewing)','Inname: ± 1200 g/kop/dag']}]},
    {heading:'HOOI / WINTER',items:[
      {product:'15 RPM Winterproduksielek – 26% proteïen',details:['Verbeter melkgehalte en speengewigte','Gebruik by matige koue of oesreste','Inname: ± 1200 g/kop/dag']},
      {product:'50 RPM Winterproduksielek – 26% proteïen',details:['Beste aminosuur-profiel proteïenbron','Beter spiergroei + melkkwaliteit','Verbeter kalfinterval','Gebruik tydens koue front / middel-laat winter','Inname: ± 1200 g/kop/dag']},
    ]},
  ]},

  // ── SKAAP GIDSE ────────────────────────────────────────────
  {id:'skaap_intensief',title:'Intensiewe Skaapboerdery (Vleis)',icon:'🐑',sections:[
    {heading:'GROENVELD / SOMER – Ooi 30 Dae Voor Lam',subheading:'Dag 119–147: 60% van fetus se ontwikkeling',items:[{product:'Groenveld Somerproduksielek 23%',details:['60% van fetale ontwikkeling vind plaas in laaste 28 dae','Meerlinge ontwikkel lewenskragtig met korrekte voeding','Inname: ± 300 g/kop/dag']}]},
    {heading:'GROENVELD / SOMER – Ooi met Lam',subheading:'75% van melk geproduseer in eerste 8 weke',items:[{product:'Groenveld Somerproduksielek 23%',details:['Ooi se melk het vetinhoud van tot 8%','Lek verseker dat melkpotensiaal bereik word','Inname: ± 350 g/kop/dag']}]},
    {heading:'HOOI / WINTER – Ooi 30 Dae Voor Lam',subheading:'Aminosuur-profiel stimuleer fetale groei',items:[{product:'Super ME Winterproduksielek 26%',details:['Aminosuur-profiel stimuleer fetale groei by laat dragtige diere','Inname: ± 370 g/kop/dag']}]},
    {heading:'HOOI / WINTER – Ooi met Lam',subheading:'Melkproduksie piek week 3–4',items:[{product:'Super ME Winterproduksielek 26%',details:['Melkproduksie piek tussen week 3–4','Benadeel wolproduksie nie','Inname: ± 420 g/kop/dag']}]},
    {heading:'SPESIALISVOER – Lam Dag 15–60 (Somer & Winter)',items:[{product:'Lamkruip 17%',details:['Op dag 15: voer vir ooi én lam saam – ooi leer lam om te vreet','Sodra lam vreet: gee net lam toegang','Vergemaklik oorgang van melk na vaste voeding','Vrywillige inname: ± 1.3% van lam se lewende gewig']}]},
    {heading:'SPESIALISVOER – Lam Dag 60–110 (Somer & Winter)',items:[{product:'GF Lammervolvoer 16%',details:['Lammers behoort ± 43 kg te weeg teen dag 60','Bevat sintetiese aminosure + ingevoerde vette – spesifiek vir enkelmaagdiere','Inname by moeder: 2.8% van lewende gewig','Inname gespeen: 4.3% van lewende gewig','⚠️ Spuit lammers teen koksidiose & doseer teen melkwurm elke 20 dae','Voorsien ad-lib goeie kwaliteit teffhooi by alle stadiums']}]},
  ]},
  {id:'skaap_ekstensief',title:'Ekstensiewe Skaapboerdery',icon:'🌾',sections:[
    {heading:'RAM VOORBEREIDING – Kort Periode (≤6 weke voor dekking)',items:[{product:'Skaapvolvoer',details:['Voer waar periode van 6 weke of minder beskikbaar is voor dekking','Winter: 2.5% van lewende gewig/dag','Somer: 2.0% van lewende gewig/dag','⚠️ Ramme moet gereeld geoefen word – vrugbaarheid en skrotum omtrek is kritiek']}]},
    {heading:'RAM VOORBEREIDING – Langer Periode / Jong Ramme',items:[{product:'Ramvolvoer',details:['Vir jonger ramme wat vir eerste keer gebruik word','Groei ramme uit tot met dekking','Winter: 2.0% van lewende gewig/dag','Somer: 1.5% van lewende gewig/dag','⚠️ Moenie ramme onnodige hanteer (dip, skeer, inent) binne 30 dae voor dekking nie']}]},
    {heading:'SOMER – Eerste 4 Maande Dragtigheid',items:[{product:'Somer 6 Fosfaatlek 6%',details:['Fosfaat + Minerale supplement','Noodsaaklik vir vitamien- en mineraalaanvulling op groenweiding','Tydperk: Eerste 4 maande van dragtigheid','Inname: ± 25 g/kop/dag']}]},
    {heading:'SOMER – Produksie & Prikkelvoeding',items:[{product:'Groenveld Somerproduksielek 23%',details:['Proteïen/Energie/Minerale supplement','Langketting drasties verbeter','Natuurlike proteïen = 59% – verseker spiergroei en hoë wolopbrengs','Tydperk: 1 maand voor lam tot 2 weke na speen','Dien as prikkelvoeding tydens dekseisoen','Reg keuse vir uitgroei van vervangings ooities','Inname: ± 230–280 g/kop/dag']}]},
    {heading:'WINTER – Eerste 4 Maande Dragtigheid',items:[{product:'LOBOL 2:1:1 Winteronderhoudslek 28%',details:['Proteïen/Minerale supplement','33% van proteïen is natuurlike deurvloei proteïen','Geformuleer vir droë veld gedurende eerste 4 maande dragtigheid','Inname: ± 100–150 g/kop/dag']}]},
    {heading:'WINTER – Produksie & Prikkelvoeding',items:[{product:'Super ME Winterproduksielek 26%',details:['Proteïen/Energie/Minerale supplement','Natuurlike proteïen = 47% + rumen-beskermde vette','Uitstekende melkvloei en vrugbaarheid','Tydperk: 1 maand voor lam tot 2 weke na speen','Dien as prikkelvoeding','Inname: ± 280–380 g/kop/dag']}]},
  ],note:'Produkprys het verbasend minder invloed op wins as wat die boer mag dink. Meet winsgewendheid teen tyd, ouderdom, inname en prestasie.'},
  {id:'skaap_wol',title:'Wolskape & Vervangingsooie',icon:'🧶',sections:[
    {heading:'WOLPRODUKSIE – Sleutel Beginsels',items:[{product:'Groenveld Somerproduksielek 23% (Somer) / Super ME 26% (Winter)',details:['Energie en proteïen is primêr verantwoordelik vir goeie wolproduksie','Wol word gevorm uit hoofsaaklik DNA en proteïen sintese','Deurvloei proteïen ryk aan swaeldraende aminosure is kritiek','Koper: deel van koënsiem wat wolkwaliteit verseker (treksterkte, kleursorpsie, elastisiteit)','Swael: saam met NPN sorg vir optimum produksie van swaeldraende mikrobes','Vitamiene: Biotin, Riboflavin, Foliën- en Pantoteensuur nodig vir wolgroei','Wolproduksie verminder tot 28% sonder korrekte byvoeding tydens dragtigheid/laktasie']}]},
    {heading:'WOLGROEI SIKLUS',items:[{product:'LOBOL 2:1:1 (onderhoud) / Produksielek (produksie)',details:['Goeie wolgroei kom voor net na skeer – skape vreet meer om koue te kompenseer','Voeding het meer direkte invloed op vesel dikte as op vesellengte','Egalige voeding is nodig vir goeie treksterkte van wolvesel','Hoë voedingspeile = dikker vesels met groter kartels','Verlies by ooie met meerlinge groter as by enkellinge','Verlies by lakterende diere groter as by dragtige diere']}]},
    {heading:'VERVANGINGSOOIE – Kritieke Eerste 5 Maande',items:[{product:'Groenveld Somerproduksielek 23% / Lamkruip / GF Lammervolvoer',details:['Potensialiteit van vervangingsooi begin as ongebore fetus','Sonder supplement: 15% minder primêre wol follikels by geboorte','Te min voeding: laer geboortegewig + hoër mortaliteit + swakker wolopbrengs','Gedurende lam se eerste maand: 75% van wol follikels bereik volwassenheid','Lammers kan op 90 dae ouderdom 50% van hul volwasse gewig bereik','Voedingstekort eerste 5 maande = blywende skade aan wolpotensiaal','Na 5 maande: voedingstekort = slegs tydelike verlaging (potensiaal bly behooue)','Kruipvoeding by ooie met tweelinge is ekonomies regverdigbaar']}]},
  ]},
  {id:'droe',title:'Droë / Dragtige Beeste (Volwasse Diere)',icon:'🌿',sections:[
    {heading:'SOMER',items:[
      {product:'Somer 6 P6 Foslek (Nov–Des)',details:['Piek somer: weiding sag, blaarryk, lowergroen','Inname: ± 130 g/kop/dag']},
      {product:'Somerfos 15% (Jan–Feb)',details:['Weiding groen maar in pypstadium','Herfskleur nog afwesig','Inname: ± 200 g/kop/dag']},
      {product:'NPN Fos 27% (Mrt–Apr)',details:['Weiding in saad met herfskleur','Ook vir ontydige droogte','Oorgangslek – bou kondisie voor winter','Inname: ± 220 g/kop/dag']},
    ]},
    {heading:'WINTER',items:[
      {product:'15 RPM Winterproduksielek (Laat Winter)',details:['Keer verlengde interkalfperiode','Inname: ± 1200 g/kop/dag']},
      {product:'4x4 Onderhoud 38% / 430WR Suurveld 43% (Mei–Jul)',details:['Vir winterweiding, hooi of droogte','Maksimum bakteriese massa in rumen','Ondersteun oorwintering','Inname: ± 500 g/kop/dag']},
    ]},
  ]},
  // SUIWEL / MELKBEES GIDSE
  {id:'suiwel1',title:'305 Dae Laktasie Siklus – Suiwelkoei',icon:'🥛',sections:[
    {heading:'A. DROË KOEIE (Belangrikste Groep)',items:[{product:'Droë Periode Bestuur',details:['Rusperiode volwasse: 40 dae min / 60 dae maks','Eerste laktasie: 80 dae rus','Kondisiepunt by opdroog: 3.5 – BEHOU tot kalwing','Fetale groei in droë periode = 65% – moenie buik met kondisie verwar nie','Elke 1kg vet verloor = 33 liter melk MINDER oor laktasie','Ketose-tekens: produksiefluktuasie; haarkleed op rug staan regop','Anioniese soute: 21 dae voor kalwing – staak sodra melkproduksie begin']}]},
    {heading:'B. TOP GROEP & VERSE GROEP',items:[{product:'Produksie Bestuur',details:['Inname = produksie','Bottervet: 50% asetat uit vesel + 50% vette in rantsoen','Energie = beperkende faktor','Hooilengte: NIE korter as 70mm nie','Speeksel (koeksoda) + herkou hou rumen PH 6–6.8','70% van totale NDF = hooi/grasse | NDF 25–35% | ADF 19–22%','Meer as 35% koeie moet te enige tyd herkou','Koeie piek week 7–10 na kalwing','1kg melk hoër piek = ±200 liter MEER oor laktasie','Volwasse koeie vreet ±4% van lewende gewig in top produksie']}]},
    {heading:'C. MIDDEL GROEP (120–240 dae)',items:[{product:'Middel Laktasie Bestuur',details:['Produksie val ±9%/maand','Temperature bo 24°C onderdruk inname – voer in die NAG','Elke 1L melk = ±4L water benodig','Kuilvoer PH onder 4 – middagvoeding apart van oggendvoeding','Voer 20 ure/dag beskikbaar | Kripspasie 70cm/bees']}]},
    {heading:'D. REGMAAK GROEP & E. VARS IN MELK',items:[{product:'Regmaak / Vars Koeie',details:['Regmaak: Forseer verminderde melkproduksie – skuif na hierdie groep op dag 240','Kondisiepunt 3.5 teen einde van siklus','Vars: Propionsuur bevorder maagpapille groei – vergroot absorpsie','Beperk liggaamsreserwe mobilisasie = langer produksieplato']}],note:'Kondisiepuntsiklus: Kalwing(3.5) → Top Groep(2.9) → Middel Groep(3.2) → Regmaak(3.5) → Droë Periode(3.5)'},
  ]},
  {id:'suiwel2',title:'Grootmaak van Verskalwers (Melkras)',icon:'🐮',sections:[
    {heading:'A. GEBOORTE TOT SPEEN (2 maande) – Kolostrum KRITIEK',items:[{product:'Kalfaangvangsmeel 18E + Kolostrum',details:['EERSTE 2L kolostrum BINNE 6 UUR na geboorte','Kolostrum kan gevries word – verhit tot 39°C','Ontsmet naelstring met jodium','Dag 4–10: 4x1L melk/dag | 18E ad-lib | Geen hooi','Dag 25–50: Verminder melk tot 5% van geboortegewig – stimuleer meelinname','Dag 51–60: Net soggens 2.5% melk | 18E ad-lib','Speen as kalf 2–2.2% LG in meel vreet (koue streke: 3.5%)','Gebruik fopspeen – NOOIT eerste maand uit emmer nie','Suurmelk is goeie remedie teen diarree (verlaag PH dermkanaal)']}]},
    {heading:'B. SPEEN TOT 3 MAANDE (±90kg)',items:[{product:'Kalfgroeimeel 16E (ad-lib)',details:['Vervang 18E met Kalfgroeimeel 16E ad-lib','Lusernhooi of goeie tefhooi ad-lib','Sodra versie herkou = rumen funksioneel (2–4 maande)','Meet borsomtrek en ribspronge vir produksiepotensiaal']}]},
    {heading:'C–D. 3 TOT 12 MAANDE (155–215kg)',items:[{product:'Kalfgroeimeel 16E → Suiwelmeel 15%',details:['3–6mnd: Kalfgroeimeel 16E beperk tot 4kg/dag + Somer 6 ad-lib','6–12mnd: Suiwelmeel 15% prot – 3kg/dag + Somer 6 ad-lib','Skakel na hawerweiding','Sou bronstig raak: MOENIE insemineer nie']}]},
    {heading:'E–H. 12 MAANDE TOT KALWING (340–480kg)',items:[{product:'Voerecht 17% → Suiwelmeel Laktasie',details:['12–16mnd: Voerecht 17% – 2.5kg/dag + Somer 6 ad-lib','Dekgewig 340kg – ideale kalwingstyd 24 maande','16mnd–3mnd voor kalf: Voerecht 17% 2kg + 1kg geelmeel + tefhooi ad-lib','Laaste 3mnd: Voerecht 17% 2.5kg/dag + goeie tefhooi','Laaste 2–3 weke: Suiwelmeel + kuilvoer 4kg/dag','Laat verse gereeld deur melkstal loop vir aanpassing']}],note:'Kondisiepuntdoelwitte – 3mnd:2.2 | 6mnd:2.3 | 9mnd:2.4 | 12mnd:2.8 | 15mnd:2.9 | 18mnd:3.2 | 21mnd:3.4 | 24mnd:3.5'},
  ]},
  {id:'suiwel3',title:'Grootmaak van Bulkalwers (Melkras)',icon:'🐂',sections:[
    {heading:'A. GEBOORTE TOT 130kg (Speen dag 52)',items:[{product:'Bulkalf 0-100 Aanvangsmeel',details:['Eerste 2L kolostrum BINNE 4 UUR','Dag 1–3: Kolostrum by moeder','Dag 4–10: 4x1L melk | Bulkalf 0-100 begin | Geen hooi | Voeromset 2.2:1','Dag 11–31: 3x1L melk | Bulkalf 0-100 ad-lib | Voeromset 2.4:1','Dag 31–45: 2x1L melk | Bulkalf 0-100 ad-lib','Dag 46–52: 1x1L melk soggens | Bulkalf 0-100 ad-lib + hooi','Speen dag 52 – Teikengewig: 78kg min','Fopspeen verpligs – NOOIT emmer eerste maand nie','Siek kalf in eerste 2 maande = ±80kg ligter op 6 maande']}]},
    {heading:'B. 130kg TOT 250kg',items:[{product:'Bulkalf 100-220 (ad-lib) + Hooi',details:['Bulkalf 100-220 ad-lib + hooi','Aanpassingsperiode: 50% oud + 50% nuut eerste week','Ruimte: 8m²/kop','Voeromset: ±4.2:1','Groenweiding: Crash Course Somer | Droë weiding: Crash Course 100–250','Teikengroei: 1.2–1.6kg/dag']}]},
    {heading:'C. NA 250kg (Voerkraal / Afrond)',items:[{product:'Semi-Volvoer Rom Rev F3 (melkras) / F2 (vleisras)',details:['Minimum 1.8kg/dag voor afrond','Na aanpassing: voerkrippe ALTYD vol','Leefspasie: 10m²/dier | Voeromset: ±5.8','Teikengewig 6 maande: ±330kg – vetgradering 2','NA 250kg NIE op veldweiding nie']}],note:'Maagwerkings: Salmonella=Advocin+VitB | Dikmelkagtig=Clamoxil+BiosolM | Koksidiose=Sulfamiddel 3dae | Waterig=BiosolM+Phosamine | Lintwurm=Lintex elke 14dae | Respiratories=Nuflor/Mycotil300'},
  ]},

  {id:'voerkraal_beeste',title:'Voerkraal Beeste – LOBOL 300 & ROM REV',icon:'🏗️',sections:[
    {heading:'LOBOL 300 Aanpassing (9–10 Dae)',subheading:'Meng: 200kg LOBOL 300 + 800kg Geelmeel',items:[{product:'LOBOL 300 Beesvoerkraal Konsentraat',details:[
      'Dag 1–3: 1.0% van lewende gewig',
      'Dag 4–6: 1.6% van lewende gewig',
      'Dag 7–9: 2.2% van lewende gewig',
      'Dag 10+: Ad-lib | Na aanpassing: ±3% van LG',
      'Vreetspasie: 50cm/bees | Groepgrootte: 40 diere',
      'Hooi altyd beskikbaar tydens aanpassing',
      '⚠️ Ureum 12.4g/kg – voer streng volgens instruksies',
      '⚠️ Waterige mis = rumen nie reg – vertraag aanpassing',
    ]}],note:'Proewe toon groei van ±1.4kg tot ±2.2kg/dag. Beginmassa: 220kg.'},
    {heading:'ROM REV: F2 Aanpassing (220kg Diere)',subheading:'Klaar gemengde semi-volvoer – geen meng nodig',items:[{product:'ROM REV: F2 (Vleisras) / F3 (Melkras)',details:[
      'Dag 1–3: 3kg/dag | Dag 4–6: 5kg/dag | Dag 7–9: 7kg/dag | Dag 10+: Ad-lib',
      'Proteïen 125g/kg | ME 11.5MJ/kg | Ureum 10g/kg',
      'Voerkrippe ALTYD vol na aanpassing',
      'Leefspasie: 10m²/dier',
    ]}]},
  ]},
  {id:'voerkraal_skape',title:'Voerkraal Skape – LOBOL 250 & Skaapvolvoer',icon:'🐑',sections:[
    {heading:'LOBOL 250 Aanpassing',subheading:'Meng: 250kg LOBOL 250 + 750kg Geelmeel',items:[{product:'LOBOL 250 Skaapvoerkraal Konsentraat',details:[
      'Dag 1–3: 300g/dag | Dag 4–6: 600g/dag | Dag 7–9: 900g/dag | Dag 10+: Ad-lib',
      'Na aanpassing: 3.7% LG kragvoer + 0.6% LG hooi',
      'Ru-proteïen 135g/kg | Ureum 7.5g/kg maks',
      '⚠️ Haarwurm: wag 30 dae ná behandeling voor intensiewe voer',
    ]}]},
    {heading:'Skaapvolvoer – Voordele',items:[{product:'Skaapvolvoer (Volledige Afrondingsrantsoen)',details:[
      'Veiliger as suiwer graan – minder risiko van ooreet',
      'Somer: 4.0% LG | Winter: 4.3% LG',
      'Vreetspasie: 15cm/skaap',
      'Wit/solied vetbedekking | Egalige vetverspreiding | Minder vogverlies in koelkamer',
    ]}]},
  ]},

  {id:'bulle_uitgroei',title:'Uitgroei en Afrond van Bulle',icon:'🐃',sections:[
    {heading:'KOEI MET KALF – Geboorte tot Speen (200kg)',subheading:'Koei op lek | Kalf kry kruipvoeding (Opsioneel)',items:[
      {product:'25 RPM Somerproduksielek 20% (Somer) / 50 RPM Winterproduksielek 26% (Winter)',details:[
        'Somer – Koei & Bulkalf: Inname ± 850–1100 g/kop/dag',
        'Winter – Koei & Bulkalf: Inname ± 1000–1400 g/kop/dag',
      ]},
      {product:'Bulkalf 0-100 Kruipvoeding 17% (Opsioneel)',details:[
        'Somer: Inname = 1.2% van lewende gewig',
        'Winter: Inname = 1.6% van lewende gewig',
        'Koei steeds op lek – kalf kry aanvullende kruipvoeding by ma',
        'Speen op 200kg',
      ]},
    ]},
    {heading:'FASE C: UITGROEIFASE – 200kg tot 460kg',subheading:'Begin regmaak vir skou/veiling op 460kg',items:[
      {product:'Crash Course Somer 22% (Groen weiding)',details:[
        'Groei bulle uit tot 460kg in die somer',
        'Inname: 500g/100kg lewende gewig',
        '"Crash Course" effek = kragvoer sonder die inname en koste',
      ]},
      {product:'Crash Course 250–500 22% (Hooi/Winter)',details:[
        'Groei bulle uit in die winter of wanneer hooi uitgesit word',
        'Inname: 500g/100kg lewende gewig',
        'Teiken: 460kg voor veiling voorbereiding',
      ]},
    ],note:'By die begin van enige voerfase is \'n aanpassingsperiode altyd noodsaaklik. Bulle moet gereeld geoefen word!'},
    {heading:'FASE D: VEILING VOORBEREIDING – 460kg na ±650kg',subheading:'Teiken: ±650kg tussen 24–27 maande',items:[
      {product:'ROM ZB RPM Kragvoer 14.5% (Somer & Winter)',details:[
        'Mielies < 40% insluiting',
        'Organiese minerale: Sink, Kobalt, Selenium, Jodium, Yster',
        'Rumen-beskermde vette (winter)',
        'Inname: 3% van lewende gewig + goeie kwaliteit hooi ad-lib',
      ]},
      {product:'Rom Rev F2 Semi-Volvoer 12.5% (Somer & Winter)',details:[
        'Organiese minerale vir vrugbaarheid en skrotum omtrek',
        'Aminosuur profiel geformuleer',
        'Bevat toksienbinder – beskerm lewerfunksie',
        'Inname: 3.3% van lewende gewig + goeie kwaliteit hooi ad-lib',
      ]},
      {product:'Rom Rev F3 Spesialis Semi-Volvoer 15% (Moeilik Afronding Rasse)',details:[
        'Vir rasse wat moeiliker afrond',
        'Langketting versadigde vette',
        'Organiese minerale vir optimale vrugbaarheid',
        'Voer rantsoen en hooi ad-lib',
        'Inname: 3.3% van lewende gewig',
      ]},
    ],note:'Teikengewig ±650kg wil bereik word tussen 24–27 maande. Bulle moet gereeld geoefen word vir vrugbaarheid en skrotum omtrek.'},
  ]},
];

function switchProdTab(t){
  ['products','guides'].forEach(x=>{
    document.getElementById('prod-'+x+'-tab').style.display=x===t?'':'none';
    document.getElementById('tab-'+x).className='tab-btn'+(x===t?' active':'');
  });
  if(t==='guides') renderGuides();
}

function renderProducts(){
  // Eie Geel banner
  const banner=document.getElementById('eie-banner');
  if(banner){ banner.className='eie-banner'+(eieGeelActive?' on':''); document.getElementById('eie-toggle').className='toggle-pill'+(eieGeelActive?' on':''); }
  // Cats
  const catsEl=document.getElementById('prod-cats');
  catsEl.innerHTML=PROD_CATS.map(c=>`<button class="chip${prodCatFilter===c?' active':''}" onclick="setProdCat('${c}')">${c}</button>`).join('');
  document.getElementById('prod-count').textContent=products.length;
  // List
  const search=(document.getElementById('prod-search')?.value||'').toLowerCase();
  const filtered=products.filter(p=>{
    const catOk=prodCatFilter==='Alle'||p.category===prodCatFilter;
    const srchOk=p.name.toLowerCase().includes(search)||(p.description||'').toLowerCase().includes(search)||(p.useCase||'').toLowerCase().includes(search);
    return catOk&&srchOk;
  });
  const el=document.getElementById('prod-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen produkte gevind nie</div>'; return; }
  el.innerHTML=filtered.map(p=>{
    const disp=getDiscounted(p);
    const open=expandedItems['prod_'+p.id];
    return `<div class="prod-card">
      <div class="prod-row" onclick="toggleExpand('prod_${p.id}');renderProducts()">
        <div style="flex:1"><div class="prod-name">${escH(p.name)}</div><div class="prod-cat">${escH(p.category)}</div></div>
        <div class="prod-right">
          ${eieGeelActive&&disp!==p.price?`<div class="prod-old">R${p.price.toFixed(2)}</div>`:''}
          <div class="prod-price">R${disp.toFixed(2)}</div>
          ${p.pricePerTon?`<div class="prod-unit">R${Number(p.pricePerTon).toFixed(2)}/ton</div>`:''}
          <div class="prod-unit">${escH(p.unit)}</div>
          <span>${open?'▲':'▼'}</span>
        </div>
      </div>
      ${open?`<div class="prod-detail">
        ${p.useCase?`<div class="use-case-tag">🏷 ${escH(p.useCase)}</div>`:''}
        <div class="prod-desc">${escH(p.description||'Geen beskrywing')}</div>
        <button class="btn btn-secondary btn-sm" onclick="openEditProd(${p.id})">✏ Wysig</button>
      </div>`:''}
    </div>`;
  }).join('');
  // Populate add modal cats
  const pacat=document.getElementById('pa-cat');
  if(pacat&&!pacat.options.length) PROD_CATS.slice(1).forEach(c=>{ const o=document.createElement('option'); o.value=o.textContent=c; pacat.appendChild(o); });
}
function setProdCat(c){ prodCatFilter=c; renderProducts(); }
function toggleEieGeel(){
  eieGeelActive=!eieGeelActive; save('v3_eieGeel',eieGeelActive);
  renderProducts();
}
function addProduct(){
  const name=document.getElementById('pa-name').value.trim();
  if(!name) return;
  const p={id:uid(),name,category:document.getElementById('pa-cat').value,price:parseFloat(document.getElementById('pa-price').value)||0,pricePerTon:parseFloat(document.getElementById('pa-perton').value)||0,unit:document.getElementById('pa-unit').value,description:document.getElementById('pa-desc').value,useCase:document.getElementById('pa-use').value};
  products.push(p); save('v3_products',products);
  closeModal('prod-add-modal');
  document.getElementById('pa-name').value='';
  renderProducts();
}
function openEditProd(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  const name=prompt('Naam:',p.name); if(name===null) return;
  const priceStr=prompt('Prys per sak (R):',p.price); if(priceStr===null) return;
  const newPrice=parseFloat(priceStr)||0;
  if(newPrice!==p.price){ priceHistory.unshift({id:uid(),productId:p.id,productName:p.name,oldPrice:p.price,newPrice,date:new Date().toLocaleDateString('af-ZA'),time:new Date().toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'})}); save('v3_priceHistory',priceHistory); }
  const desc=prompt('Beskrywing:',p.description||''); if(desc===null) return;
  const useCase=prompt('Gebruik geval:',p.useCase||''); if(useCase===null) return;
  Object.assign(p,{name,price:newPrice,description:desc,useCase});
  save('v3_products',products); renderProducts();
}
function renderGuides(){
  document.getElementById('guides-list').innerHTML=GUIDE_DATA.map(g=>`
    <div class="guide-card" id="guide-${g.id}">
      <button class="guide-header" onclick="toggleExpand('guide_${g.id}');renderGuides()">
        <span class="guide-icon">${g.icon}</span>
        <span class="guide-title">${g.title}</span>
        <span>${expandedItems['guide_'+g.id]?'▲':'▼'}</span>
      </button>
      ${expandedItems['guide_'+g.id]?`<div class="guide-body">${g.sections.map(s=>renderGuideSection(g.id,s)).join('')}</div>`:''}
    </div>`).join('');
}
function renderGuideSection(gid,s){
  const key=`gsec_${gid}_${s.heading}`;
  return `<div class="gsec">
    <button class="gsec-btn" onclick="toggleExpand('${key}');renderGuides()">
      <div><div class="gsec-head">${s.heading}</div>${s.subheading?`<div class="gsec-sub">${s.subheading}</div>`:''}</div>
      <span>${expandedItems[key]?'▲':'▼'}</span>
    </button>
    ${expandedItems[key]?`<div class="gsec-body">${s.items.map(item=>`<div class="gitem"><div class="gitem-prod">${item.product}</div><ul class="gitem-list">${item.details.map(d=>`<li>${d}</li>`).join('')}</ul></div>`).join('')}${s.note?`<div class="guide-note">💡 ${s.note}</div>`:''}</div>`:''}
  </div>`;
}
function toggleExpand(k){ expandedItems[k]=!expandedItems[k]; }