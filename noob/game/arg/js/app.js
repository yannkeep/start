// ═══════════════════════════════════════════════════════════════════════════
// RÉSISTANCE CITOYENNE — APP (UI Rendering)
// ═══════════════════════════════════════════════════════════════════════════

let quoteTimer=null;

function renderCurrentView(){
  const main=$('main');
  if(!main)return;
  const v=STATE.view;
  // Update nav
  $$('.bnav-btn').forEach(b=>b.classList.toggle('active',b.dataset.v===v||(b.dataset.v==='hub'&&v==='hub')));

  switch(v){
    case 'hub': renderHub(main); break;
    case 'missions': renderMissions(main); break;
    case 'mission': renderMission(main); break;
    case 'tools': renderToolsList(main); break;
    case 'tool': renderToolEditor(main); break;
    case 'flashcards': renderFlashcards(main); break;
    case 'trophies': renderTrophies(main); break;
    default: renderHub(main);
  }
}

// ═══ HUB (QG) ═══
function renderHub(el){
  const rank=getRank(), next=getNextRank();
  const pct=Math.min(((STATE.xp-rank.min)/(next.min-rank.min))*100,100);
  const completedMissions=MISSIONS.filter(m=>m.objectives.every(o=>STATE.completedObj.includes(o.id)));
  const totalObj=MISSIONS.reduce((s,m)=>s+m.objectives.length,0);
  const doneObj=STATE.completedObj.length;
  const q=QUOTES[Math.floor(Math.random()*QUOTES.length)];
  
  el.innerHTML=`
  <div class="hub">
    <div class="hub-header">
      <div class="hub-title">⚔️ QUARTIER GÉNÉRAL</div>
      <div class="hub-sub">Résistance Citoyenne — Intelligence Civile Belge</div>
    </div>

    <div class="hub-rank-card">
      <div class="rank-big">${rank.icon}</div>
      <div class="rank-info">
        <div class="rank-name" style="color:${rank.color}">${rank.name}</div>
        <div class="rank-bar"><div class="rank-fill" style="width:${pct}%"></div></div>
        <div class="rank-xp">${STATE.xp} / ${next.min} XP</div>
      </div>
    </div>

    <div class="hub-stats">
      <div class="hs"><div class="hs-v">${completedMissions.length}/${MISSIONS.length}</div><div class="hs-l">Missions</div></div>
      <div class="hs"><div class="hs-v">${doneObj}/${totalObj}</div><div class="hs-l">Objectifs</div></div>
      <div class="hs"><div class="hs-v">${STATE.completedTools.length}/15</div><div class="hs-l">Outils</div></div>
      <div class="hs"><div class="hs-v">${STATE.achievements.length}/${ACHIEVEMENTS.length}</div><div class="hs-l">Trophées</div></div>
    </div>

    <div class="hub-quote">
      <div class="hq-text">"${esc(q.t)}"</div>
      <div class="hq-author">— ${esc(q.a)}</div>
    </div>

    <div class="hub-actions">
      <button class="hbtn hbtn-primary" onclick="nav('missions')">🎯 Missions</button>
      <button class="hbtn" onclick="nav('tools')">🛠️ Outils</button>
      <button class="hbtn" onclick="nav('flashcards')">📚 Flashcards</button>
      <button class="hbtn" onclick="nav('trophies')">🏆 Trophées</button>
    </div>

    <div class="hub-section-title">⚡ Missions en cours</div>
    <div class="hub-missions">
      ${MISSIONS.slice(0,4).map(m=>{
        const done=m.objectives.filter(o=>STATE.completedObj.includes(o.id)).length;
        const total=m.objectives.length;
        const pct=Math.round((done/total)*100);
        return `<div class="hm-card" onclick="nav('mission','${m.id}')">
          <div class="hm-icon">${m.icon}</div>
          <div class="hm-info">
            <div class="hm-name">${esc(m.name)}</div>
            <div class="hm-bar"><div class="hm-fill" style="width:${pct}%"></div></div>
            <div class="hm-pct">${done}/${total} objectifs</div>
          </div>
          <div class="hm-arrow">›</div>
        </div>`;
      }).join('')}
    </div>

    <div class="hub-footer">
      <button class="hbtn-sm" onclick="exportProject()">💾 Exporter</button>
      <button class="hbtn-sm" onclick="importProject()">📂 Importer</button>
      <button class="hbtn-sm" onclick="resetAll()">🗑️ Reset</button>
    </div>
  </div>`;
}

// ═══ MISSIONS LIST ═══
function renderMissions(el){
  const cats=[...new Set(MISSIONS.map(m=>m.cat))];
  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('hub')">← QG</button>
      <h2>🎯 Toutes les Missions</h2>
    </div>
    <div class="page-sub">12 missions • Toutes accessibles • Aucun niveau requis</div>
    <div class="cat-filter" id="catFilter">
      <button class="cf-btn active" onclick="filterMissions(null,this)">Toutes</button>
      ${cats.map(c=>`<button class="cf-btn" onclick="filterMissions('${c}',this)">${catLabel(c)}</button>`).join('')}
    </div>
    <div class="mission-grid" id="missionGrid">
      ${MISSIONS.map(m=>{
        const done=m.objectives.filter(o=>STATE.completedObj.includes(o.id)).length;
        const total=m.objectives.length;
        const pct=Math.round((done/total)*100);
        const complete=done===total;
        return `<div class="m-card ${complete?'m-done':''}" data-cat="${m.cat}" onclick="nav('mission','${m.id}')">
          <div class="m-top">
            <span class="m-icon">${m.icon}</span>
            <span class="m-diff">${'★'.repeat(m.difficulty)}${'☆'.repeat(3-m.difficulty)}</span>
          </div>
          <div class="m-name">${esc(m.name)}</div>
          <div class="m-cat">${catLabel(m.cat)}</div>
          <div class="m-bar"><div class="m-fill" style="width:${pct}%"></div></div>
          <div class="m-meta">
            <span>${done}/${total}</span>
            <span class="m-xp">+${m.xpBase}XP</span>
          </div>
          ${complete?'<div class="m-badge">✓ COMPLÈTE</div>':''}
        </div>`;
      }).join('')}
    </div>
  </div>`;
  unlock('first_mission');
}

function catLabel(c){
  return{analyse:'🔍 Analyse',media:'📺 Média',juridique:'⚖️ Juridique',doctrine:'⚔️ Doctrine',
         renseignement:'🔎 OSINT',action:'🏛️ Action',alternative:'🌱 Alternative',
         strategie:'🤝 Stratégie',logistique:'💰 Logistique'}[c]||c;
}

function filterMissions(cat,btn){
  $$('#catFilter .cf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  $$('#missionGrid .m-card').forEach(c=>{
    c.style.display=(!cat||c.dataset.cat===cat)?'':'none';
  });
}

// ═══ SINGLE MISSION ═══
function renderMission(el){
  const m=MISSIONS.find(x=>x.id===STATE.missionId);
  if(!m){nav('missions');return;}
  const done=m.objectives.filter(o=>STATE.completedObj.includes(o.id)).length;
  const total=m.objectives.length;
  const pct=Math.round((done/total)*100);
  const complete=done===total;

  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('missions')">← Missions</button>
      <h2>${m.icon} ${esc(m.name)}</h2>
      ${complete?'<span class="done-badge">✓ COMPLÈTE</span>':''}
    </div>

    <div class="mission-brief">
      <div class="mb-label">BRIEFING</div>
      <div class="mb-text">${esc(m.brief)}</div>
    </div>

    <div class="mission-lore" onclick="this.classList.toggle('open')">
      <div class="ml-label">📖 Contexte historique <span class="ml-toggle">▼</span></div>
      <div class="ml-text">${esc(m.lore)}</div>
    </div>

    <div class="mission-intel">
      <div class="mi-label">📊 RENSEIGNEMENTS</div>
      <div class="mi-grid">
        ${m.intel.map(i=>`<div class="mi-card mi-${i.color}">
          <div class="mi-val">${i.value}</div>
          <div class="mi-lbl">${esc(i.label)}</div>
        </div>`).join('')}
      </div>
    </div>

    <div class="mission-progress">
      <div class="mp-bar"><div class="mp-fill" style="width:${pct}%"></div></div>
      <div class="mp-text">${done}/${total} objectifs • ${pct}% • +${m.xpBase}XP total</div>
    </div>

    <div class="mission-objectives">
      <div class="mo-label">🎯 OBJECTIFS</div>
      ${m.objectives.map(o=>{
        const isDone=STATE.completedObj.includes(o.id);
        return `<div class="mo-item ${isDone?'mo-done':''}" onclick="toggleObjective('${o.id}')">
          <div class="mo-check">${isDone?'✅':'⬜'}</div>
          <div class="mo-text">${esc(o.text)}</div>
          <div class="mo-xp">+${o.xp}</div>
        </div>`;
      }).join('')}
    </div>

    ${m.tools&&m.tools.length?`
    <div class="mission-tools">
      <div class="mt-label">🛠️ OUTILS RECOMMANDÉS</div>
      <div class="mt-grid">
        ${m.tools.map(tk=>{
          const t=TOOLS.find(x=>x.key===tk);
          if(!t)return'';
          const isDone=STATE.completedTools.includes(t.id);
          return `<button class="mt-btn ${isDone?'mt-done':''}" onclick="nav('tool',${t.id})">
            ${t.icon} ${t.name} ${isDone?'✓':''}
          </button>`;
        }).join('')}
      </div>
    </div>`:''}
  </div>`;
}

// ═══ TOOLS LIST ═══
function renderToolsList(el){
  const phases=['voir','juger','agir'];
  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('hub')">← QG</button>
      <h2>🛠️ Outils Méthodologiques</h2>
    </div>
    <div class="page-sub">VOIR → JUGER → AGIR • ${STATE.completedTools.length}/15 complétés</div>
    <div class="cat-filter">
      <button class="cf-btn active" onclick="filterTools2(null,this)">Tous</button>
      <button class="cf-btn" onclick="filterTools2('voir',this)">👁️ VOIR</button>
      <button class="cf-btn" onclick="filterTools2('juger',this)">⚖️ JUGER</button>
      <button class="cf-btn" onclick="filterTools2('agir',this)">✊ AGIR</button>
    </div>
    <div class="tool-grid" id="toolGrid">
      ${TOOLS.map(t=>{
        const isDone=STATE.completedTools.includes(t.id);
        return `<div class="t-card ${isDone?'t-done':''}" data-phase="${t.phase}" onclick="nav('tool',${t.id})">
          <div class="t-top">
            <span class="t-icon">${t.icon}</span>
            <span class="t-phase tp-${t.phase}">${t.phase.toUpperCase()}</span>
          </div>
          <div class="t-name">${t.name}</div>
          <div class="t-xp">+${t.xp}XP</div>
          ${isDone?'<div class="t-badge">✓</div>':''}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function filterTools2(phase,btn){
  btn.parentElement.querySelectorAll('.cf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  $$('#toolGrid .t-card').forEach(c=>{
    c.style.display=(!phase||c.dataset.phase===phase)?'':'none';
  });
}

// ═══ TOOL EDITOR ═══
function renderToolEditor(el){
  const t=TOOLS.find(x=>x.id===STATE.toolId);
  if(!t){nav('tools');return;}
  const isDone=STATE.completedTools.includes(t.id);
  const saved=STATE.toolData[t.key]||{};

  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('tools')">← Outils</button>
      <h2>${t.icon} ${t.name}</h2>
      <span class="t-phase tp-${t.phase}">${t.phase.toUpperCase()}</span>
    </div>
    <div class="tool-help-box">${esc(t.help)}</div>
    <div class="tool-form">
      ${t.fields.map(f=>`
        <div class="tf-group">
          <label class="tf-label">${capitalize(f.replace(/_/g,' '))}</label>
          <textarea class="tf-area" id="tf_${f}" placeholder="Développez ici..." 
            oninput="saveToolField('${t.key}','${f}',this.value)">${esc(saved[f]||'')}</textarea>
        </div>
      `).join('')}
    </div>
    <div class="tool-actions">
      ${isDone
        ?`<button class="hbtn" disabled>✓ Complété (+${t.xp}XP)</button>`
        :`<button class="hbtn hbtn-primary" onclick="validateTool(${t.id},'${t.key}')">✅ Marquer comme complété (+${t.xp}XP)</button>`
      }
    </div>
  </div>`;
}

function validateTool(id,key){
  const t=TOOLS.find(x=>x.id===id);
  if(!t)return;
  const saved=STATE.toolData[key]||{};
  const filled=t.fields.filter(f=>saved[f]&&saved[f].trim().length>5);
  if(filled.length<Math.ceil(t.fields.length/2)){
    toast('Remplissez au moins la moitié des champs (>5 caractères)','error');
    return;
  }
  completeTool(id);
  renderCurrentView();
}

function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}

// ═══ FLASHCARDS ═══
function renderFlashcards(el){
  const fcFiles=STATE.files.filter(isFlashcardFile);
  
  if(fcFiles.length===0){
    el.innerHTML=`
    <div class="page">
      <div class="page-head">
        <button class="back-btn" onclick="nav('hub')">← QG</button>
        <h2>📚 Flashcards</h2>
      </div>
      <div class="fc-empty">
        <div class="fce-icon">📚</div>
        <div class="fce-title">Aucun jeu de flashcards</div>
        <div class="fce-text">Importez un CSV (colonnes question/answer) ou chargez les 40 cartes de démo.</div>
        <div class="fce-actions">
          <button class="hbtn hbtn-primary" onclick="loadDemoFlashcards()">🎯 Charger 40 cartes démo</button>
          <button class="hbtn" onclick="document.getElementById('fcFileInput').click()">📥 Importer CSV</button>
        </div>
      </div>
      <input type="file" id="fcFileInput" hidden accept=".csv,.json" onchange="handleFiles(this.files);this.value=''">
    </div>`;
    return;
  }

  // Init session if needed
  if(!fcState||!fcFiles.find(f=>f.id===fcState.fileId)){
    const f=fcFiles[0];
    fcState={fileId:f.id, cards:[...f.data], index:0, flipped:false, good:0, bad:0, shuffled:false};
  }

  const card=fcState.cards[fcState.index];
  const progress=((fcState.index+1)/fcState.cards.length)*100;

  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('hub')">← QG</button>
      <h2>📚 Flashcards</h2>
    </div>
    <div class="fc-toolbar">
      <select class="fc-select" onchange="fcChangeFile(this.value)">
        ${fcFiles.map(f=>`<option value="${f.id}" ${f.id===fcState.fileId?'selected':''}>${esc(f.name)} (${f.data.length})</option>`).join('')}
      </select>
      <button class="hbtn-sm" onclick="fcShuffle()">🔀</button>
      <button class="hbtn-sm" onclick="loadDemoFlashcards()">➕ Démo</button>
      <button class="hbtn-sm" onclick="document.getElementById('fcFileInput2').click()">📥</button>
    </div>
    <input type="file" id="fcFileInput2" hidden accept=".csv" onchange="handleFiles(this.files);this.value=''">

    <div class="fc-card-wrap" onclick="fcFlip()">
      <div class="fc-card ${fcState.flipped?'flipped':''}">
        <div class="fc-inner">
          <div class="fc-front">
            <div class="fc-label">QUESTION</div>
            <div class="fc-question">${esc(card.question)}</div>
            <div class="fc-tap">Touchez pour retourner</div>
          </div>
          <div class="fc-back">
            <div class="fc-label">RÉPONSE</div>
            <div class="fc-answer">${esc(card.answer)}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="fc-progress-wrap">
      <div class="fc-pbar"><div class="fc-pfill" style="width:${progress}%"></div></div>
      <div class="fc-counter">${fcState.index+1} / ${fcState.cards.length}</div>
    </div>

    ${fcState.flipped?`
    <div class="fc-rating">
      <button class="fcr-btn fcr-good" onclick="fcMark('good')">✓ Je savais</button>
      <button class="fcr-btn fcr-bad" onclick="fcMark('bad')">✗ À revoir</button>
    </div>`:''}

    <div class="fc-nav">
      <button class="hbtn" onclick="fcPrev()" ${fcState.index===0?'disabled':''}>⬅️ Préc.</button>
      <button class="hbtn hbtn-primary" onclick="fcFlip()">🔄 Retourner</button>
      <button class="hbtn" onclick="fcNext()" ${fcState.index>=fcState.cards.length-1?'disabled':''}>Suiv. ➡️</button>
    </div>

    <div class="fc-stats-row">
      <span>Session: ${fcState.good+fcState.bad} cartes</span>
      ${fcState.good?`<span class="fcs-good">✓ ${fcState.good}</span>`:''}
      ${fcState.bad?`<span class="fcs-bad">✗ ${fcState.bad}</span>`:''}
      <span>Total révisé: ${STATE.fcStats.reviewed}</span>
    </div>
  </div>`;
}

function fcFlip(){if(!fcState)return;fcState.flipped=!fcState.flipped;renderCurrentView();}
function fcNext(){
  if(!fcState||fcState.index>=fcState.cards.length-1)return;
  fcState.index++;fcState.flipped=false;renderCurrentView();
}
function fcPrev(){
  if(!fcState||fcState.index<=0)return;
  fcState.index--;fcState.flipped=false;renderCurrentView();
}
function fcShuffle(){
  if(!fcState)return;
  for(let i=fcState.cards.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [fcState.cards[i],fcState.cards[j]]=[fcState.cards[j],fcState.cards[i]];
  }
  fcState.index=0;fcState.flipped=false;fcState.shuffled=true;
  toast('🔀 Cartes mélangées');renderCurrentView();
}
function fcMark(type){
  if(!fcState)return;
  if(type==='good')fcState.good++;else fcState.bad++;
  STATE.fcStats.reviewed++;
  if(STATE.fcStats.reviewed>=100)unlock('fc_master');
  // Check for perfect session at end
  if(fcState.index>=fcState.cards.length-1){
    STATE.fcStats.sessions++;
    unlock('fc_session');
    if(fcState.bad===0&&fcState.good>=10)unlock('fc_perfect');
    toast(`🎉 Session finie! ${fcState.good}/${fcState.good+fcState.bad} correct`,'success');
  }
  save();
  fcNext();
}
function fcChangeFile(id){
  const f=STATE.files.find(x=>x.id==id);
  if(!f||!isFlashcardFile(f))return;
  fcState={fileId:f.id,cards:[...f.data],index:0,flipped:false,good:0,bad:0,shuffled:false};
  renderCurrentView();
}

// ═══ TROPHIES ═══
function renderTrophies(el){
  const unlocked=STATE.achievements;
  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('hub')">← QG</button>
      <h2>🏆 Trophées & Rangs</h2>
    </div>
    <div class="page-sub">${unlocked.length}/${ACHIEVEMENTS.length} trophées débloqués</div>

    <div class="ranks-section">
      <h3>Rangs</h3>
      <div class="ranks-grid">
        ${RANKS.map(r=>{
          const achieved=STATE.xp>=r.min;
          return `<div class="rank-card ${achieved?'rk-done':'rk-locked'}">
            <div class="rk-icon">${r.icon}</div>
            <div class="rk-name" style="color:${achieved?r.color:'var(--text-3)'}">${r.name}</div>
            <div class="rk-min">${r.min} XP</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="trophies-section">
      <h3>Trophées</h3>
      <div class="trophy-grid">
        ${ACHIEVEMENTS.map(a=>{
          const got=unlocked.includes(a.id);
          return `<div class="trophy-card ${got?'tr-done':'tr-locked'}">
            <div class="tr-icon">${got?a.icon:'🔒'}</div>
            <div class="tr-name">${got?a.name:'???'}</div>
            <div class="tr-desc">${a.desc}</div>
            <div class="tr-xp">${got?`✓ +${a.xp}XP`:`+${a.xp}XP`}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// ═══ KEYBOARD ═══
document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
  if(STATE.view==='flashcards'&&fcState){
    if(e.key===' '||e.key==='Enter'){e.preventDefault();fcFlip();}
    else if(e.key==='ArrowRight'){e.preventDefault();fcNext();}
    else if(e.key==='ArrowLeft'){e.preventDefault();fcPrev();}
  }
  if(e.key==='Escape'){
    if(STATE.view==='mission')nav('missions');
    else if(STATE.view==='tool')nav('tools');
    else nav('hub');
  }
});

// ═══ SWIPE SUPPORT ═══
let touchStartX=0;
document.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX;},{passive:true});
document.addEventListener('touchend',e=>{
  const diff=e.changedTouches[0].screenX-touchStartX;
  if(STATE.view==='flashcards'&&fcState){
    if(diff>60)fcPrev();
    else if(diff<-60)fcNext();
  }
},{passive:true});

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded',()=>{
  initEngine();
  renderCurrentView();
});
