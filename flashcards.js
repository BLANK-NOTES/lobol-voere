// ═══════════════════════════════════════════════════════════════
// FLASHCARD LEERSTELSEL — LOBOL Produkte
// ═══════════════════════════════════════════════════════════════

let fcState = null;

function fcInit() {
  if (fcState) return;
  fcState = {
    mode: 'menu',
    catFilter: 'Alle',
    quizType: 'name',
    deck: [],
    idx: 0,
    flipped: false,
    score: { correct: 0, wrong: 0 },
    wrongCards: [],
    quizOptions: [],
    quizAnswer: null,
    quizCorrect: null,
    streak: 0,
    bestStreak: STORE.get('v3_fcStreak', 0),
    progress: STORE.get('v3_fcProgress', {}),
  };
}

function renderFlashcards() {
  fcInit();
  const page = document.getElementById('page-flashcards');
  if (!page) return;
  // Clear and render into page

  if (fcState.mode === 'menu')    page.innerHTML = fcMenu();
  if (fcState.mode === 'study')   page.innerHTML = fcStudyCard();
  if (fcState.mode === 'quiz')    page.innerHTML = fcQuizCard();
  if (fcState.mode === 'results') page.innerHTML = fcResults();
}

// ── HELPERS ────────────────────────────────────────────────────
function fcGetDeck() {
  const all = typeof products !== 'undefined' ? products : [];
  return fcState.catFilter === 'Alle' ? all : all.filter(p => p.category === fcState.catFilter);
}

function fcShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fcProgress(id) {
  return fcState.progress[id] || { seen: 0, correct: 0, wrong: 0 };
}

function fcCatEmoji(cat) {
  const m = {
    'Fosfaatlekke (Somer)': '☀️', 'Fos/Prot-lekke (Herfs)': '🍂',
    'Lekke vir Bulle (Crash Course)': '🐃', 'Lekke vir Verse': '🐄',
    'Lekke vir Beeste': '🐂', 'Lekke vir Skape': '🐑',
    'Voerkraal': '🏗️', 'Suiwel': '🥛', 'Pluimvee': '🐔',
    'Varke': '🐷', 'Perde': '🐴', 'Ander': '🦅',
  };
  return m[cat] || '📦';
}

// ── MENU ───────────────────────────────────────────────────────
function fcMenu() {
  const all = typeof products !== 'undefined' ? products : [];
  const cats = ['Alle', ...new Set(all.map(p => p.category))];
  const deck = fcGetDeck();
  const totalSeen = Object.values(fcState.progress).filter(p => p.seen > 0).length;
  const totalCorrect = Object.values(fcState.progress).reduce((s, p) => s + (p.correct || 0), 0);

  return `<div class="page-header"><h1>🃏 Flitskaarte</h1></div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
    <div class="stat-box"><span class="stat-val">${all.length}</span><span class="stat-lbl">Produkte</span></div>
    <div class="stat-box"><span class="stat-val green">${totalSeen}</span><span class="stat-lbl">Gesien</span></div>
    <div class="stat-box"><span class="stat-val orange">${fcState.bestStreak}</span><span class="stat-lbl">Beste Reeks</span></div>
  </div>

  <div class="card" style="margin-bottom:12px">
    <div style="font-weight:700;font-size:14px;margin-bottom:10px">🎯 Kies Kategorie</div>
    <div class="chips" style="flex-wrap:wrap">
      ${cats.map(c => `<button class="chip${fcState.catFilter===c?' active':''}" onclick="fcSetCat('${c.replace(/'/g,"\\'")}')">
        ${fcCatEmoji(c)} ${c} <span style="opacity:.6;font-size:10px">(${c==='Alle'?all.length:all.filter(p=>p.category===c).length})</span>
      </button>`).join('')}
    </div>
  </div>

  <div class="card" style="margin-bottom:16px">
    <div style="font-weight:700;font-size:14px;margin-bottom:10px">📚 Leermode</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn btn-primary btn-full" onclick="fcStartStudy()" style="justify-content:flex-start;gap:14px;padding:14px">
        <span style="font-size:24px">📖</span>
        <div style="text-align:left"><div style="font-size:15px">Studie Mode</div><div style="font-size:12px;opacity:.8;font-weight:400">Blaai deur kaarte – tik om om te draai en produk te leer</div></div>
      </button>
      <button class="btn btn-secondary btn-full" onclick="fcStartQuiz('name')" style="justify-content:flex-start;gap:14px;padding:14px;border:1px solid var(--border)">
        <span style="font-size:24px">❓</span>
        <div style="text-align:left"><div style="font-size:15px">Ken die Naam</div><div style="font-size:12px;opacity:.7;font-weight:400">Watter produk pas by hierdie beskrywing?</div></div>
      </button>
      <button class="btn btn-secondary btn-full" onclick="fcStartQuiz('price')" style="justify-content:flex-start;gap:14px;padding:14px;border:1px solid var(--border)">
        <span style="font-size:24px">💰</span>
        <div style="text-align:left"><div style="font-size:15px">Ken die Prys</div><div style="font-size:12px;opacity:.7;font-weight:400">Watter prys pas by hierdie produk?</div></div>
      </button>
      <button class="btn btn-secondary btn-full" onclick="fcStartQuiz('usecase')" style="justify-content:flex-start;gap:14px;padding:14px;border:1px solid var(--border)">
        <span style="font-size:24px">🐄</span>
        <div style="text-align:left"><div style="font-size:15px">Ken die Gebruik</div><div style="font-size:12px;opacity:.7;font-weight:400">Waarvoor word hierdie produk gebruik?</div></div>
      </button>
    </div>
  </div>

  ${totalSeen > 0 ? `<div class="card">
    <div style="font-weight:700;font-size:14px;margin-bottom:10px">📊 Jou Vordering</div>
    <div class="fill-bar-wrap" style="height:10px;margin-bottom:6px"><div class="fill-bar" style="width:${Math.round(totalSeen/all.length*100)}%"></div></div>
    <div style="font-size:12px;color:var(--text3)">${totalSeen} van ${all.length} produkte gesien · ${totalCorrect} korrek geantwoord</div>
    <button class="btn btn-danger btn-sm" style="margin-top:10px" onclick="fcResetProgress()">🔄 Herstel Vordering</button>
  </div>` : ''}`;
}

// ── STUDY MODE ─────────────────────────────────────────────────
function fcStartStudy() {
  fcInit();
  fcState.deck = fcShuffle(fcGetDeck());
  fcState.idx = 0;
  fcState.flipped = false;
  fcState.mode = 'study';
  renderFlashcards();
}

function fcStudyCard() {
  const deck = fcState.deck;
  if (!deck.length) return `<div class="empty">Geen produkte in hierdie kategorie nie.</div>`;
  const p = deck[fcState.idx];
  const prog = fcProgress(p.id);
  const pct = Math.round((fcState.idx / deck.length) * 100);

  return `<div class="page-header">
    <button class="icon-btn" onclick="fcState.mode='menu';renderFlashcards()">✕</button>
    <h1 style="flex:1">📖 Studie</h1>
    <span style="font-size:13px;color:var(--text3)">${fcState.idx+1} / ${deck.length}</span>
  </div>

  <div class="fill-bar-wrap" style="margin-bottom:14px;height:6px">
    <div class="fill-bar" style="width:${pct}%"></div>
  </div>

  <!-- FLASHCARD -->
  <div onclick="fcFlip()" style="
    background:${fcState.flipped?'var(--adim)':'var(--card)'};
    border:2px solid ${fcState.flipped?'var(--accent)':'var(--border)'};
    border-radius:18px;padding:28px 20px;
    min-height:260px;cursor:pointer;transition:all .25s;
    display:flex;flex-direction:column;justify-content:center;
    margin-bottom:14px;position:relative">
    <div style="position:absolute;top:12px;right:14px;font-size:11px;color:var(--text3)">${fcCatEmoji(p.category)} ${p.category}</div>
    ${!fcState.flipped ? `
      <div style="text-align:center">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text3);margin-bottom:14px">Produk Naam</div>
        <div style="font-size:22px;font-weight:800;font-family:'Syne',sans-serif;color:var(--text);line-height:1.3;margin-bottom:14px">${escH(p.name)}</div>
        <div style="font-size:12px;color:var(--text3)">💰 R${p.price.toFixed(2)} / ${p.unit}</div>
        <div style="margin-top:20px;font-size:13px;color:var(--text3)">👆 Tik om om te draai</div>
      </div>
    ` : `
      <div>
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--accent);margin-bottom:10px">Produk Inligting</div>
        <div style="font-size:17px;font-weight:800;font-family:'Syne',sans-serif;color:var(--accent);margin-bottom:12px">${escH(p.name)}</div>
        ${p.useCase ? `<div style="background:var(--bg2);border-radius:8px;padding:8px 12px;font-size:13px;color:var(--text2);margin-bottom:8px">🎯 <strong>Gebruik:</strong> ${escH(p.useCase)}</div>` : ''}
        <div style="font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:8px">${escH(p.description || '')}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          <span style="background:var(--bg3);border-radius:6px;padding:4px 10px;font-size:12px">💰 R${p.price.toFixed(2)}</span>
          <span style="background:var(--bg3);border-radius:6px;padding:4px 10px;font-size:12px">📦 ${p.unit}</span>
          ${p.pricePerTon ? `<span style="background:var(--bg3);border-radius:6px;padding:4px 10px;font-size:12px">🏭 R${p.pricePerTon.toFixed(2)}/ton</span>` : ''}
        </div>
      </div>
    `}
  </div>

  <!-- NAVIGATION -->
  <div style="display:flex;gap:8px;margin-bottom:10px">
    <button class="btn btn-secondary" style="flex:1" onclick="fcStudyNav(-1)" ${fcState.idx===0?'disabled':''}>← Vorige</button>
    ${fcState.idx < deck.length-1
      ? `<button class="btn btn-primary" style="flex:2" onclick="fcStudyNav(1)">Volgende →</button>`
      : `<button class="btn btn-primary" style="flex:2;background:var(--orange)" onclick="fcState.mode='menu';renderFlashcards()">✅ Klaar!</button>`
    }
  </div>
  <div style="text-align:center;font-size:12px;color:var(--text3)">👆 Tik op kaart om inligting te sien</div>`;
}

function fcFlip() {
  fcInit();
  fcState.flipped = !fcState.flipped;
  // Mark as seen
  if (fcState.flipped) {
    const p = fcState.deck[fcState.idx];
    const pr = fcProgress(p.id);
    pr.seen = (pr.seen || 0) + 1;
    fcState.progress[p.id] = pr;
    STORE.set('v3_fcProgress', fcState.progress);
  }
  renderFlashcards();
}

function fcStudyNav(dir) {
  fcInit();
  fcState.idx = Math.max(0, Math.min(fcState.deck.length - 1, fcState.idx + dir));
  fcState.flipped = false;
  renderFlashcards();
}

// ── QUIZ MODE ──────────────────────────────────────────────────
function fcStartQuiz(type) {
  fcInit();
  fcState.quizType = type;
  fcState.deck = fcShuffle(fcGetDeck());
  fcState.idx = 0;
  fcState.score = { correct: 0, wrong: 0 };
  fcState.wrongCards = [];
  fcState.quizAnswer = null;
  fcState.quizCorrect = null;
  fcState.streak = 0;
  fcState.mode = 'quiz';
  fcBuildOptions();
  renderFlashcards();
}

function fcBuildOptions() {
  fcInit();
  const all = typeof products !== 'undefined' ? products : [];
  const p = fcState.deck[fcState.idx];
  if (!p) return;

  let correct, getOpt, label;
  if (fcState.quizType === 'name') {
    correct = p.name;
    getOpt = x => x.name;
  } else if (fcState.quizType === 'price') {
    correct = `R${p.price.toFixed(2)}`;
    getOpt = x => `R${x.price.toFixed(2)}`;
  } else {
    correct = p.useCase || p.category;
    getOpt = x => x.useCase || x.category;
  }

  // Pick 3 wrong options from all products
  const others = fcShuffle(all.filter(x => x.id !== p.id)).slice(0, 3);
  const opts = fcShuffle([correct, ...others.map(getOpt)]);
  fcState.quizOptions = opts;
  fcState.quizAnswer = null;
  fcState.quizCorrect = correct;
}

function fcQuizCard() {
  const deck = fcState.deck;
  if (fcState.idx >= deck.length) {
    fcState.mode = 'results';
    return fcResults();
  }
  const p = deck[fcState.idx];
  const pct = Math.round((fcState.idx / deck.length) * 100);
  const answered = fcState.quizAnswer !== null;
  const typeLabel = {
    name: 'Watter produk pas by hierdie beskrywing?',
    price: 'Wat kos hierdie produk per sak?',
    usecase: 'Waarvoor word hierdie produk gebruik?',
  }[fcState.quizType];

  const questionContent = {
    name: `<div style="font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:8px">${escH(p.description || '')}</div>
           ${p.useCase ? `<div style="font-size:12px;color:var(--accent)">🎯 ${escH(p.useCase)}</div>` : ''}
           <div style="font-size:12px;color:var(--text3);margin-top:6px">${fcCatEmoji(p.category)} ${p.category}</div>`,
    price: `<div style="font-size:22px;font-weight:800;font-family:'Syne',sans-serif;margin-bottom:8px">${escH(p.name)}</div>
            <div style="font-size:12px;color:var(--text3)">${fcCatEmoji(p.category)} ${p.category}</div>`,
    usecase: `<div style="font-size:22px;font-weight:800;font-family:'Syne',sans-serif;margin-bottom:8px">${escH(p.name)}</div>
              <div style="font-size:13px;color:var(--text2)">${escH(p.description || '')}</div>`,
  }[fcState.quizType];

  return `<div class="page-header">
    <button class="icon-btn" onclick="fcState.mode='menu';renderFlashcards()">✕</button>
    <h1 style="flex:1">❓ Vasvra</h1>
    <div style="display:flex;flex-direction:column;align-items:flex-end">
      <span style="font-size:13px;color:var(--text3)">${fcState.idx+1} / ${deck.length}</span>
      <span style="font-size:11px;color:var(--accent)">🔥 ${fcState.streak} reeks</span>
    </div>
  </div>

  <div style="display:flex;gap:8px;margin-bottom:12px">
    <div style="flex:1;background:var(--adim);border-radius:8px;padding:6px 10px;text-align:center">
      <div style="font-size:18px;font-weight:800;color:var(--accent)">${fcState.score.correct}</div>
      <div style="font-size:10px;color:var(--text3)">KORREK</div>
    </div>
    <div style="flex:1;background:var(--rdim);border-radius:8px;padding:6px 10px;text-align:center">
      <div style="font-size:18px;font-weight:800;color:var(--red)">${fcState.score.wrong}</div>
      <div style="font-size:10px;color:var(--text3)">VERKEERD</div>
    </div>
  </div>

  <div class="fill-bar-wrap" style="margin-bottom:14px;height:6px">
    <div class="fill-bar" style="width:${pct}%"></div>
  </div>

  <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px 14px;margin-bottom:14px">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text3);margin-bottom:10px">${typeLabel}</div>
    ${questionContent}
  </div>

  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
    ${fcState.quizOptions.map((opt, i) => {
      let bg = 'var(--bg3)'; let border = 'var(--border)'; let col = 'var(--text)';
      if (answered) {
        if (opt === fcState.quizCorrect) { bg='var(--adim)'; border='var(--accent)'; col='var(--accent)'; }
        else if (opt === fcState.quizAnswer && opt !== fcState.quizCorrect) { bg='var(--rdim)'; border='var(--red)'; col='var(--red)'; }
      }
      return `<button onclick="fcAnswer('${opt.replace(/'/g, "\\'")}')" ${answered?'disabled':''}
        style="width:100%;text-align:left;padding:14px 16px;background:${bg};border:2px solid ${border};
        border-radius:12px;color:${col};font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;
        cursor:${answered?'default':'pointer'};transition:all .15s">
        <span style="opacity:.5;margin-right:8px">${['A','B','C','D'][i]}</span> ${escH(opt)}
        ${answered && opt === fcState.quizCorrect ? ' ✓' : ''}
        ${answered && opt === fcState.quizAnswer && opt !== fcState.quizCorrect ? ' ✗' : ''}
      </button>`;
    }).join('')}
  </div>

  ${answered ? `<button class="btn btn-primary btn-full" onclick="fcNextQuiz()">
    ${fcState.idx < deck.length-1 ? 'Volgende Vraag →' : '📊 Sien Resultate'}
  </button>` : ''}`;
}

function fcAnswer(chosen) {
  fcInit();
  if (fcState.quizAnswer !== null) return;
  const p = fcState.deck[fcState.idx];
  const isCorrect = chosen === fcState.quizCorrect;
  fcState.quizAnswer = chosen;

  const pr = fcProgress(p.id);
  pr.seen = (pr.seen || 0) + 1;
  if (isCorrect) {
    pr.correct = (pr.correct || 0) + 1;
    fcState.score.correct++;
    fcState.streak++;
    if (fcState.streak > fcState.bestStreak) {
      fcState.bestStreak = fcState.streak;
      STORE.set('v3_fcStreak', fcState.bestStreak);
    }
  } else {
    pr.wrong = (pr.wrong || 0) + 1;
    fcState.score.wrong++;
    fcState.streak = 0;
    fcState.wrongCards.push(p);
  }
  fcState.progress[p.id] = pr;
  STORE.set('v3_fcProgress', fcState.progress);
  renderFlashcards();
}

function fcNextQuiz() {
  fcInit();
  fcState.idx++;
  if (fcState.idx >= fcState.deck.length) {
    fcState.mode = 'results';
  } else {
    fcBuildOptions();
  }
  renderFlashcards();
}

// ── RESULTS ────────────────────────────────────────────────────
function fcResults() {
  const total = fcState.score.correct + fcState.score.wrong;
  const pct = total > 0 ? Math.round((fcState.score.correct / total) * 100) : 0;
  const medal = pct >= 90 ? '🏆' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '📚';
  const msg = pct >= 90 ? 'Uitstekend!' : pct >= 70 ? 'Goed gedaan!' : pct >= 50 ? 'Nie sleg nie!' : 'Oefen meer!';

  return `<div class="page-header">
    <h1>📊 Resultate</h1>
  </div>

  <div style="text-align:center;padding:24px 16px;background:var(--card);border:1px solid var(--border);border-radius:18px;margin-bottom:16px">
    <div style="font-size:56px;margin-bottom:8px">${medal}</div>
    <div style="font-size:32px;font-weight:800;font-family:'Syne',sans-serif;color:var(--accent)">${pct}%</div>
    <div style="font-size:18px;font-weight:700;margin:4px 0">${msg}</div>
    <div style="font-size:13px;color:var(--text3)">${fcState.score.correct} korrek · ${fcState.score.wrong} verkeerd · ${total} vrae</div>
    ${fcState.streak > 0 ? `<div style="margin-top:8px;font-size:13px;color:var(--orange)">🔥 Beste reeks: ${fcState.bestStreak}</div>` : ''}
  </div>

  ${fcState.wrongCards.length > 0 ? `
    <div style="margin-bottom:16px">
      <div class="section-title">❌ Hersien hierdie (${fcState.wrongCards.length})</div>
      ${fcState.wrongCards.map(p => `
        <div style="background:var(--rdim);border:1px solid var(--red);border-radius:10px;padding:12px;margin-bottom:6px">
          <div style="font-weight:700;font-size:14px;color:var(--red)">${escH(p.name)}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:4px">${escH(p.useCase || p.category)}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">💰 R${p.price.toFixed(2)} · ${p.unit}</div>
        </div>`).join('')}
    </div>` : ''}

  <div style="display:flex;flex-direction:column;gap:8px">
    <button class="btn btn-primary btn-full" onclick="fcStartQuiz(fcState.quizType)">🔄 Probeer Weer</button>
    ${fcState.wrongCards.length > 0 ? `<button class="btn btn-secondary btn-full" onclick="fcRetryWrong()">❌ Oefen Slegs Verkeerdes (${fcState.wrongCards.length})</button>` : ''}
    <button class="btn btn-secondary btn-full" onclick="fcState.mode='menu';renderFlashcards()">🏠 Terug na Menu</button>
  </div>`;
}

function fcRetryWrong() {
  fcInit();
  fcState.deck = fcShuffle(fcState.wrongCards);
  fcState.idx = 0;
  fcState.score = { correct: 0, wrong: 0 };
  fcState.wrongCards = [];
  fcState.quizAnswer = null;
  fcState.quizCorrect = null;
  fcState.mode = 'quiz';
  fcBuildOptions();
  renderFlashcards();
}

function fcSetCat(cat) {
  fcInit();
  fcState.catFilter = cat;
  renderFlashcards();
}

function fcResetProgress() {
  fcInit();
  if (!confirm('Herstel alle leervordering?')) return;
  fcState.progress = {};
  fcState.bestStreak = 0;
  STORE.set('v3_fcProgress', {});
  STORE.set('v3_fcStreak', 0);
  renderFlashcards();
}
