// ═══════════════════════════════════════════════════════════════
// DATA & STORAGE
// ═══════════════════════════════════════════════════════════════
// STORE is defined in storage.js

// ── DEFAULT PRODUCTS ────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  {id:1,name:"Somer 6 (P6 Foslek) COX REËNBESTAND",category:"Fosfaatlekke (Somer)",price:322,pricePerTon:8049.66,unit:"50kg sak",description:"Bedoel vir piek somer waar weiding nog sag, blaarryk en lowergroen is. Inname: ± 130 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Piek Somer (Nov–Des)"},
  {id:2,name:"P12 Fosfaatlek (Somerfos 12)",category:"Fosfaatlekke (Somer)",price:585,pricePerTon:11700.30,unit:"50kg sak",description:"Fosfaat/proteïenlek vir somer. Stimuleer rumenflora. Inname: ± 170 g/kop/dag.",useCase:"Vervangingsverse – Groeifase Somer (Nov–Des)"},
  {id:3,name:"P12 Fosfaatlek (Somerlek 12) COX REËNBESTAND",category:"Fosfaatlekke (Somer)",price:606,pricePerTon:12120.45,unit:"50kg sak",description:"Reënbestande weergawe van Somerlek 12. Hoog bio-beskikbare fosfaat. Ondersteun vrugbaarheid + groei.",useCase:"Vervangingsverse – Groeifase Somer (Nov–Des)"},
  {id:4,name:"Somerfos 150 COX REËNBESTAND",category:"Fos/Prot-lekke (Herfs)",price:396,pricePerTon:7920.95,unit:"50kg sak",description:"15% proteïen. Vir groen weiding in pypstadium wanneer saad begin stoot. Inname: ± 200 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Jan–Feb"},
  {id:5,name:"NPN Fos",category:"Fos/Prot-lekke (Herfs)",price:378,pricePerTon:7560.96,unit:"50kg sak",description:"27% proteïen. Weiding in saad met herfskleur. Oorgangslek – bou kondisie voor winter. Inname: ± 220 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Mrt–Apr"},
  {id:6,name:"Boost Lick SOMER (Crash Course)",category:"Lekke vir Bulle (Crash Course)",price:320,pricePerTon:6400.80,unit:"50kg sak",description:"20% proteïen. Hoë energie + vette + deurvloei proteïen. Ligte kalwers 130–180 kg. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers & Ossies – Groenveld/Somer"},
  {id:7,name:"HPK Crash Course Somer",category:"Lekke vir Bulle (Crash Course)",price:401,pricePerTon:8020.46,unit:"50kg sak",description:"Hoë prestasie weergawe. 20% proteïen. Piek somer blaarryke weiding. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers & Ossies – Groenveld/Somer (HPK)"},
  {id:8,name:"Crash Course (100–250 kg) BOOSTER",category:"Lekke vir Bulle (Crash Course)",price:368,pricePerTon:7360.07,unit:"50kg sak",description:"22% proteïen. Winter/hooi lek vir kalwers 130–200 kg. Energie + vette + vismeel proteïen. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers – Hooi/Winter | 100–250 kg"},
  {id:9,name:"HPK Crash Course (100–250 kg)",category:"Lekke vir Bulle (Crash Course)",price:456,pricePerTon:9119.80,unit:"50kg sak",description:"HPK weergawe. 22% proteïen. Hoë kwaliteit proteïen vir maksimum spiergroei.",useCase:"Spekulasie Kalwers – Hooi/Winter | 100–250 kg (HPK)"},
  {id:10,name:"Crash Course (250–500 kg) BOOSTER",category:"Lekke vir Bulle (Crash Course)",price:315,pricePerTon:6299.81,unit:"50kg sak",description:"22% proteïen. Swaarder kalwers 200 kg+. Hoë beskikbare proteïen + energie vir maksimum spiergroei. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers – Hooi/Winter | 250–500 kg"},
  {id:11,name:"HPK Crash Course (250–500 kg)",category:"Lekke vir Bulle (Crash Course)",price:422,pricePerTon:8439.07,unit:"50kg sak",description:"HPK weergawe vir swaarder kalwers 250–500 kg. Maksimum spiergroei.",useCase:"Spekulasie Kalwers – Hooi/Winter | 250–500 kg (HPK)"},
  {id:12,name:"SOS Lek – Speenverse SOETVELD (7 mnd oud)",category:"Lekke vir Verse",price:308,pricePerTon:6160.78,unit:"50kg sak",description:"Vir speenverse (7 maande oud) op soetveld. Uierontwikkeling gestimuleer.",useCase:"Vervangingsverse – Fase 1 speenperiode (Soetveld)"},
  {id:13,name:"Bovi SOS – Speenverse SUURVELD (7 mnd oud)",category:"Lekke vir Verse",price:324,pricePerTon:6480.86,unit:"50kg sak",description:"Suurveld weergawe van SOS Lek. Speenverse 7 maande oud. Uierontwikkeling gestimuleer.",useCase:"Vervangingsverse – Fase 1 speenperiode (Suurveld)"},
  {id:14,name:"SS Lek – Ouer Verse (13–18 mnd oud)",category:"Lekke vir Verse",price:332,pricePerTon:6640.40,unit:"50kg sak",description:"26% proteïen. Konstante groei sonder vetwording. Teiken: 330 kg @ 16 maande. Inname: ± 680 g/kop/dag.",useCase:"Vervangingsverse – Groeifase Hooi/Winter"},
  {id:15,name:"HPK SS Lek",category:"Lekke vir Verse",price:431,pricePerTon:8620.93,unit:"50kg sak",description:"HPK weergawe van SS Lek. 26% proteïen. Uierontwikkeling gestimuleer.",useCase:"Vervangingsverse – Groeifase (HPK)"},
  {id:16,name:"Energielek (Groenweiding) Beeste/Skape",category:"Lekke vir Beeste",price:284,pricePerTon:5680.46,unit:"50kg sak",description:"15% proteïen. Jong groen weiding. Diere 180 kg+ in piek somer. Let op: swak weiding = verhoogde inname. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Ossies/Skape – Somer Groenweiding"},
  {id:17,name:"HPK Energielek",category:"Lekke vir Beeste",price:358,pricePerTon:7159.58,unit:"50kg sak",description:"HPK weergawe van Energielek vir beeste en skape op groen weiding.",useCase:"Spekulasie Ossies/Skape – Somer Groenweiding (HPK)"},
  {id:18,name:"4x4 Winter Onderhoudslek (Soetveld)",category:"Lekke vir Beeste",price:285,pricePerTon:5700.70,unit:"50kg sak",description:"38% proteïen. Winterweiding, hooi of droogte. Verseker maks bakteriese massa in rumen. Inname: ± 500 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Soetveld)"},
  {id:19,name:"HPK 4x4",category:"Lekke vir Beeste",price:396,pricePerTon:7919.87,unit:"50kg sak",description:"HPK weergawe van 4x4 Winter Onderhoudslek. 38% proteïen.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Soetveld HPK)"},
  {id:20,name:"BURGERS 430 WR – Winter Onderhoudslek (Suurveld)",category:"Lekke vir Beeste",price:307,pricePerTon:6139.16,unit:"50kg sak",description:"43% proteïen. Suurveld onderhoudslek vir winter/droogte/hooi. Inname: ± 500 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Suurveld)"},
  {id:21,name:"HPK 430 WR",category:"Lekke vir Beeste",price:438,pricePerTon:8759.39,unit:"50kg sak",description:"HPK weergawe van BURGERS 430 WR. 43% proteïen suurveld winterlek.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Suurveld HPK)"},
  {id:22,name:"Beesprodlek Somer (25 RPM)",category:"Lekke vir Beeste",price:308,pricePerTon:6159.81,unit:"50kg sak",description:"20% proteïen. Optimale melkgehalte + energie. Bevorder herkonsepsie. Inname: ± 1200 g/kop/dag.",useCase:"Lakterende Koeie – Somer"},
  {id:23,name:"Beesprodlek Winter (15 RPM)",category:"Lekke vir Beeste",price:287,pricePerTon:5740.48,unit:"50kg sak",description:"26% proteïen. Laat winter lek. Verbeter melkgehalte. Gebruik by matige koue of oesreste. Inname: ± 1200 g/kop/dag.",useCase:"Lakterende Koeie – Laat Winter"},
  {id:24,name:"Beesprodlek Winter (50 RPM)",category:"Lekke vir Beeste",price:314,pricePerTon:6279.19,unit:"50kg sak",description:"26% proteïen. Beste aminosuur-profiel. Hoë vette vir melkkwaliteit. Gebruik tydens koue front. Inname: ± 1200 g/kop/dag.",useCase:"Lakterende Koeie – Middel/Laat Winter"},
  {id:25,name:"HPK 25 RPM (Somer)",category:"Lekke vir Beeste",price:425,pricePerTon:8500.56,unit:"50kg sak",description:"HPK weergawe van 25 RPM Somer Beesprodlek.",useCase:"Lakterende Koeie – Somer (HPK)"},
  {id:26,name:"HPK 15 RPM (Winter)",category:"Lekke vir Beeste",price:379,pricePerTon:7580.96,unit:"50kg sak",description:"HPK weergawe van 15 RPM Winter Beesprodlek.",useCase:"Lakterende Koeie – Laat Winter (HPK)"},
  {id:27,name:"HPK 50 RPM (Winter)",category:"Lekke vir Beeste",price:432,pricePerTon:8640.19,unit:"50kg sak",description:"HPK weergawe van 50 RPM Winter Beesprodlek. Koue front & middel winter.",useCase:"Lakterende Koeie – Middel/Laat Winter (HPK)"},
  // ── SKAAP PRODUKTE ────────────────────────────────────────────
  {id:28,name:"Groenveld Somerproduksielek 23%",category:"Lekke vir Skape",price:298,pricePerTon:5960,unit:"50kg sak",description:"23% proteïen. Geformuleer vir hoë % netto energie. Natuurlike proteïen = 59% – verseker spiergroei en hoë wolopbrengs op groenweiding. Dien as prikkelvoeding tydens dekseisoen. Inname: ± 230–280 g/kop/dag (produksie); ± 300 g/kop/dag (ooi 30 dae voor lam); ± 350 g/kop/dag (ooi met lam).",useCase:"Intensiewe Skaapboerdery – Somer | Ooi 30 dae voor lam & Ooi met lam | Wolskape | Vervangingsooie"},
  {id:29,name:"Super ME Winterproduksielek 26%",category:"Lekke vir Skape",price:312,pricePerTon:6240,unit:"50kg sak",description:"26% proteïen. Natuurlike proteïen = 47%. Rumen-beskermde vette verseker uitstekende melkvloei en vrugbaarheid. Verseker melkproduksie piek tussen week 3–4 sonder om wolproduksie te benadeel. Dien as prikkelvoeding. Inname: ± 370 g/kop/dag (voor lam); ± 420 g/kop/dag (met lam); ± 280–380 g/kop/dag (algemeen).",useCase:"Intensiewe Skaapboerdery – Winter | Ooi voor & met lam | Wolskape"},
  {id:30,name:"LOBOL 2:1:1 Winteronderhoudslek 28%",category:"Lekke vir Skape",price:265,pricePerTon:5300,unit:"50kg sak",description:"28% proteïen. 33% van totale proteïen is natuurlike proteïen met hoë deurvloei waarde. Bevat deurvloei proteïen met swaeldraende aminosure, vette, energie, swael en koper. Geformuleer vir droë veld gedurende eerste 4 maande van dragtigheid. Inname: ± 100–150 g/kop/dag.",useCase:"Ekstensiewe Skaapboerdery – Winter | Eerste 4 maande dragtigheid | Wolskape onderhoud"},
  {id:31,name:"Somer 6 Fosfaatlek 6% Fos (Skape)",category:"Lekke vir Skape",price:195,pricePerTon:3900,unit:"50kg sak",description:"6% Fosfaat / Minerale Supplement. Noodsaaklik vir vitamien- en mineraalaanvulling op groenweiding. Tydperk: Eerste 4 maande van dragtigheid. Inname: ± 25 g/kop/dag.",useCase:"Ekstensiewe Skaapboerdery – Somer | Eerste 4 maande dragtigheid"},
  {id:32,name:"Lamkruip 17%",category:"Lekke vir Skape",price:345,pricePerTon:6900,unit:"25kg sak",description:"17% proteïen. Spesialisvoer vir lammers dag 15–60. Op dag 15 word lamkruip vir ooi en lam gevoer – ooi leer lam om te vreet. Sodra lam vreet, gee net lam toegang. Vergemaklik oorgang van melkfase na vaste voeding. Vrywillige inname: ± 1.3% van lam se lewende gewig.",useCase:"Intensiewe Skaapboerdery – Lam Dag 15–60 (Somer & Winter)"},
  {id:33,name:"GF Lammervolvoer 16%",category:"Lekke vir Skape",price:358,pricePerTon:7160,unit:"50kg sak",description:"16% proteïen. Spesialisvoer vir lammers dag 60–110. Bevat sintetiese aminosure en ingevoerde vette spesifiek vir enkelmaagdiere. Lammers behoort ± 43 kg te weeg teen dag 60. Vrywillige inname: 2.8% van lewende gewig (by moeder); 4.3% (gespeen). NB: Spuit lammers teen koksidiose en doseer teen melkwurm elke 20 dae.",useCase:"Intensiewe Skaapboerdery – Lam Dag 60–110 (Somer & Winter)"},
  {id:34,name:"Skaapvolvoer",category:"Lekke vir Skape",price:285,pricePerTon:5700,unit:"50kg sak",description:"Volvoer vir ramme tussen dekkings (periode 6 weke of minder). Voeding: Winter: 2.5% van lewende gewig/dag; Somer: 2.0% van lewende gewig/dag.",useCase:"Ekstensiewe Skaapboerdery – Ram voorbereiding (kort periode voor dekking)"},
  {id:35,name:"Ramvolvoer",category:"Lekke vir Skape",price:295,pricePerTon:5900,unit:"50kg sak",description:"Volvoer vir ramme wat vir eerste keer gebruik word of langer voorbereidingsperiode het. Groei ramme uit tot met dekking. Voeding: Winter: 2.0% van lewende gewig/dag; Somer: 1.5% van lewende gewig/dag. NB: Ramme moet gereeld geoefen word. Moenie ramme onnodige hanteer binne 30 dae voor dekking nie.",useCase:"Ekstensiewe Skaapboerdery – Ram voorbereiding (langer periode voor dekking)"},
  // ── VOERKRAAL PRODUKTE ──────────────────────────────────────
  {id:36,name:"LOBOL 300 – Beesvoerkraal Konsentraat",category:"Voerkraal",price:420,pricePerTon:8400,unit:"50kg sak",description:"Vetmes-konsentraat vir voerkraal afronding, speenkalwers en C-grade beeste. Bevat koksidiostaat, groeistimulant en medikamente. Meng 200kg LOBOL 300 + 800kg geelmeel = 1000kg finale voer. Geelmeel moet min 80g/kg proteïen bevat.",useCase:"Beesvoerkraal – Afronding | Speenkalwers | C-grade beeste"},
  {id:37,name:"ROM REV: F2 – Semi-Volvoer (Vleisras)",category:"Voerkraal",price:385,pricePerTon:7700,unit:"50kg sak",description:"Klaar gemengde afrondingsvoer vir speenkalwers en C-grade beeste. Proteïen 125g/kg | ME 11.5MJ/kg | Vet 35–55g/kg | Ru-vesel 95g/kg | Fosfor 3.5g/kg | Ureum 10g/kg. Aanpassing 220kg diere: Dag 1–3: 3kg | Dag 4–6: 5kg | Dag 7–9: 7kg | Dag 10: ad-lib.",useCase:"Beesvoerkraal – Speenkalwers | C-grade | Semi-volvoer afrond"},
  {id:38,name:"ROM REV: F3 – Semi-Volvoer (Melkras)",category:"Voerkraal",price:390,pricePerTon:7800,unit:"50kg sak",description:"Klaar gemengde afrondingsvoer spesifiek vir melkraskalwers. Semi-volvoer – net hooi nodig tydens aanpassing. Na aanpassing voerkrippe altyd vol. Leefspasie 10m²/dier.",useCase:"Beesvoerkraal – Melkraskalwers afrond"},
  {id:39,name:"LOBOL 250 – Skaapvoerkraal Konsentraat",category:"Voerkraal",price:395,pricePerTon:7900,unit:"50kg sak",description:"Afrondingskonsentraat vir lammers en skape. Meng 250kg LOBOL 250 + 750kg geelmeel = 1000kg finale voer. Ru-proteïen 135g/kg | Ureum 7.5g/kg maks. Aanpassing: Dag 1–3: 300g | Dag 4–6: 600g | Dag 7–9: 900g | Dag 10: ad-lib. Na aanpassing: 3.7% LG kragvoer + 0.6% LG hooi.",useCase:"Skaapvoerkraal – Lammers | Skape afrond"},
  {id:40,name:"Skaapvolvoer – Volledige Afrondingsrantsoen",category:"Voerkraal",price:310,pricePerTon:6200,unit:"50kg sak",description:"Veilige volledige afrondingsrantsoen vir skape. Minder risiko van ooreet as suiwer graan. Verbeter karkaskwaliteit: wit/solied vetbedekking, egalige vetverspreiding, minder vogverlies in koelkamer. Ru-proteïen 125g/kg | Ru-vesel 110–150g/kg | Ureum 5g/kg. Somer: 4.0% LG | Winter: 4.3% LG.",useCase:"Skaapvoerkraal – Lammers & Skape | Veilige afrond"},
  // ── BULLE PRODUKTE ────────────────────────────────────────────
  {id:41,name:"ROM ZB RPM – Kragvoer vir Bulle",category:"Lekke vir Bulle (Crash Course)",price:445,pricePerTon:8900,unit:"50kg sak",description:"14.5% proteïen. Kragvoer spesifiek vir bul uitgroei en veiling voorbereiding. Mielies < 40% insluiting. Bevat organiese minerale: Sink, Kobalt, Selenium, Jodium, Yster spesifiek vir vrugbaarheid en skrotum omtrek. Rumen-beskermde vette. Inname: 3% van lewende gewig + goeie kwaliteit hooi ad-lib. Somer én Winter.",useCase:"Bulle – Fase D Veiling Voorbereiding (Somer & Winter)"},
  {id:42,name:"Rom Rev F2 – Semi-Volvoer vir Bulle",category:"Lekke vir Bulle (Crash Course)",price:390,pricePerTon:7800,unit:"50kg sak",description:"12.5% proteïen. Semi-volvoer spesifiek geformuleer vir bulle. Organiese minerale vir vrugbaarheid en skrotum omtrek. Aminosuur profiel geformuleer. Bevat toksienbinder vir lewerbeskerm. Insluiting mielies < 40%. Inname: 3.3% van lewende gewig + goeie kwaliteit hooi ad-lib. Somer én Winter.",useCase:"Bulle – Fase D Veiling Voorbereiding (Somer & Winter)"},
  {id:43,name:"Rom Rev F3 – Spesialis Semi-Volvoer vir Bulle",category:"Lekke vir Bulle (Crash Course)",price:415,pricePerTon:8300,unit:"50kg sak",description:"15% proteïen. Spesialis semi-volvoer vir rasse wat moeiliker afrond. Langketting versadigde vette. Aminosuur-profiel geformuleer. Organiese minerale vir optimale vrugbaarheid en skrotum omtrek. Voer rantsoen en hooi ad-lib. Inname: 3.3% van lewende gewig. Teikengewig ±650kg tussen 24–27 maande.",useCase:"Bulle – Moeilik Afronding Rasse | Fase D Veiling"},
  {id:44,name:"Bulkalf 0-100 Kruipvoeding 17%",category:"Lekke vir Bulle (Crash Course)",price:360,pricePerTon:7200,unit:"25kg sak",description:"17% proteïen. Kruipvoeding vir bulkalwers by moeder. Koei steeds op lek – kalf kry aanvullende kruipvoeding. Somer: Inname 1.2% van lewende gewig. Winter: Inname 1.6% van lewende gewig. Opsioneel maar bevorderlik vir groei. Speen op 200kg.",useCase:"Bulkalwers – Geboorte tot Speen (200kg)"},
];

const DEFAULT_DUTIES = [
  {id:1,title:"Vloer skoonmaak",category:"Skoonmaak",priority:"medium",notes:"Vee en was alle areas wanneer nie besig nie"},
  {id:2,title:"Tel & verifieer voorraad",category:"Voorraad",priority:"high",notes:"Volledige fisiese telling, dateer stelsel op"},
  {id:3,title:"Kontroleer verouderde voorraad",category:"Voorraad",priority:"high",notes:"Trek enige verouderde sakke, kwarantyn area"},
  {id:4,title:"Kontroleer lae voorraadartikels",category:"Voorraad",priority:"high",notes:"Merk enigiets onder minimum vlakke"},
  {id:5,title:"Masjinerie skoonmaak",category:"Skoonmaak",priority:"medium",notes:"Reinig alle meng- en verpakkingstoerusting"},
  {id:6,title:"Organiseer pakhuisrakke",category:"Skoonmaak",priority:"low",notes:"Stapel sakke netjies, eerste in eerste uit"},
  {id:7,title:"Kontroleer vragmotor bande & olie",category:"Instandhouding",priority:"medium",notes:"Voor elke rit – kyk bande, olie, water"},
  {id:8,title:"Vervaldatum kontrole op alle sakke",category:"Voorraad",priority:"high",notes:"Merk enige sakke nader as 30 dae aan verval"},
  {id:9,title:"Veiligheidsrondgang doen",category:"Veiligheid",priority:"medium",notes:"Kontroleer brandblussers, eerste hulp kis, nooduitgange"},
  {id:10,title:"Klante oproepe / opvolg",category:"Admin",priority:"medium",notes:"Skakel klante wat bestellings geplaas het maar nie afgehaal het nie"},
];
const DEFAULT_REMINDERS = [
  {id:1,title:"Bedek vragmotors met seildoek",time:"18:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],notes:"Alle vragmotors moet bedek wees voor donker",active:true},
  {id:2,title:"Oggend vragmotor inspeksie",time:"06:30",days:["Mon","Tue","Wed","Thu","Fri","Sat"],notes:"Verwyder seildoeke, kontroleer vragmotor toestande voor laai",active:true},
  {id:3,title:"Weeklikse voorraadverslag",time:"17:00",days:["Fri"],notes:"Weeklikse voorraad rekonsiliasie",active:true},
  {id:4,title:"Middagete breek – werknemers",time:"13:00",days:["Mon","Tue","Wed","Thu","Fri"],notes:"Verseker alle werknemers neem middagete",active:true},
  {id:5,title:"Sluit fabriek",time:"17:30",days:["Mon","Tue","Wed","Thu","Fri","Sat"],notes:"Kontroleer alle deure, hekke, beligting voor jy sluit",active:true},
];
const DEFAULT_CUSTOMERS = [
  {id:1,name:"Jan Botha",farm:"Botha se Plaas",phone:"082 111 2233",area:"Ermelo",type:"Beeste",notes:"Gereelde klant – verkies 50 RPM en SS Lek",eieGeel:false},
  {id:2,name:"Piet van der Merwe",farm:"Van der Merwe Plaas",phone:"083 444 5566",area:"Carolina",type:"Beeste & Skape",notes:"Groot spekulasie operasie",eieGeel:true},
  {id:3,name:"Maria Nkosi",farm:"Nkosi Boerdery",phone:"076 789 0011",area:"Badplaas",type:"Pluimvee",notes:"Bestel maandeliks",eieGeel:false},
];
const DEFAULT_WORKERS = [
  {id:1,name:"Sipho Dlamini",role:"Pakhuiswerker",phone:"071 123 4567",active:true,notes:""},
  {id:2,name:"Thabo Nkosi",role:"Pakhuiswerker",phone:"082 234 5678",active:true,notes:""},
  {id:3,name:"Maria Mokoena",role:"Vloer Toesighouer",phone:"073 345 6789",active:true,notes:""},
];

const DEFAULT_DRIVERS = [
  {id:1,name:"Hendrick",phone:"",licenseCode:"EC",notes:"",active:true},
  {id:2,name:"William",phone:"",licenseCode:"EC",notes:"",active:true},
  {id:3,name:"2boy",phone:"",licenseCode:"C",notes:"",active:true},
];

// Fleet: registered trucks with capacity settings
const DEFAULT_FLEET = [
  {id:1,name:"Vragmotor 1",emoji:"🚛",truckCapacity:600,hasTrailer:false,trailerCapacity:0,notes:""},
  {id:2,name:"Vragmotor 2",emoji:"🚛",truckCapacity:400,hasTrailer:true,trailerCapacity:200,notes:""},
];

const PROD_CATS=['Alle','Fosfaatlekke (Somer)','Fos/Prot-lekke (Herfs)','Lekke vir Bulle (Crash Course)','Lekke vir Verse','Lekke vir Beeste','Lekke vir Skape','Voerkraal','Suiwel','Pluimvee','Varke','Perde','Ander'];

const INTAKE_MAP={'Lekke vir Beeste':{mode:'fixed',g:1200},'Lekke vir Verse':{mode:'fixed',g:680},'Lekke vir Bulle (Crash Course)':{mode:'per100',g:550},'Fosfaatlekke (Somer)':{mode:'fixed',g:170},'Fos/Prot-lekke (Herfs)':{mode:'fixed',g:210},'Lekke vir Skape':{mode:'fixed',g:300},'Voerkraal':{mode:'per100',g:30},'Suiwel':{mode:'fixed',g:1200}};

// ── STATE ───────────────────────────────────────────────────────
let products = STORE.get('v3_products', DEFAULT_PRODUCTS);
let duties = STORE.get('v3_duties', DEFAULT_DUTIES);
let reminders = STORE.get('v3_reminders', DEFAULT_REMINDERS);
let factoryStock = STORE.get('v3_stock', []);
let truckCounts = STORE.get('v3_trucks', []);
let customers = STORE.get('v3_customers', DEFAULT_CUSTOMERS);
let sales = STORE.get('v3_sales', []);
let deliveries = STORE.get('v3_deliveries', []);
let notes = STORE.get('v3_notes', [{id:1,type:'Algemeen',title:'Welkom by LOBOL!',body:'Gebruik hierdie blad vir vinnige notas en herinneringe.',pinned:true,color:'green',createdAt:new Date().toLocaleDateString('af-ZA')}]);
let workers = STORE.get('v3_workers', DEFAULT_WORKERS);
let drivers = STORE.get('v3_drivers', DEFAULT_DRIVERS);
let fleet = STORE.get('v3_fleet', DEFAULT_FLEET);
let priceHistory = STORE.get('v3_priceHistory', []);
let eieGeelActive = STORE.get('v3_eieGeel', false);
let assignments = STORE.get('v3_assignments', {});
let workerGroups = STORE.get('v3_workerGroups', []);
let truckHistory = STORE.get('v3_truckHistory', []);
let healthRecords = STORE.get('v3_health', []);
let studyNotes = STORE.get('v3_studyNotes', []);
let dutyDone = STORE.get('v3_dutyDone', []);
let dutyDoneDate = STORE.get('v3_dutyDoneDate', '');
let calcItems = [];
let currentTruckId = null;
let newSaleItems = [];
let newCustEieGeel = false;
let notePinned = false;
let noteColor = 'default';
let newDelivStops = [];
let cmpSelected = [];
let prodCatFilter = 'Alle';
let stockFilter = 'Alle';
let dutyFilter = 'Alle';
let delivFilter = 'Alle';
let noteTypeFilter = 'Alle';
let expandedItems = {};

// Reset duty done list daily
function checkDutyReset(){
  const today = new Date().toDateString();
  if(dutyDoneDate !== today){ dutyDone=[]; dutyDoneDate=today; save('v3_dutyDone',dutyDone); save('v3_dutyDoneDate',dutyDoneDate); }
}