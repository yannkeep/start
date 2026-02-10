// ═══════════════════════════════════════════════════════════════════════════
// RÉSISTANCE CITOYENNE v3 — APP (UI Rendering)
// New: content display, quiz, search, stats, ARIA, prefill tools
// ═══════════════════════════════════════════════════════════════════════════

var quoteTimer=null;

function renderCurrentView(){
  const main=_q('main');if(!main)return;
  main.setAttribute('tabindex','-1');
  const v=STATE.view;
  _qa('.bnav-btn').forEach(b=>{b.classList.toggle('active',b.dataset.v===v||(b.dataset.v==='hub'&&v==='hub'));b.setAttribute('aria-current',b.classList.contains('active')?'page':'false');});
  switch(v){
    case 'hub':renderHub(main);break;
    case 'missions':renderMissions(main);break;
    case 'mission':renderMission(main);break;
    case 'tools':renderToolsList(main);break;
    case 'tool':renderToolEditor(main);break;
    case 'flashcards':renderFlashcards(main);break;
    case 'trophies':renderTrophies(main);break;
    case 'stats':renderStats(main);break;
    case 'quiz':renderQuiz(main);break;
    default:renderHub(main);
  }
}

// ═══ HUB ═══
function renderHub(el){
  const rank=getRank(),next=getNextRank();
  const pct=Math.min(((STATE.xp-rank.min)/(next.min-rank.min))*100,100);
  const completedMissions=MISSIONS.filter(m=>m.objectives.every(o=>STATE.completedObj.includes(o.id)));
  const totalObj=MISSIONS.reduce((s,m)=>s+m.objectives.length,0);
  const q=QUOTES[Math.floor(Math.random()*QUOTES.length)];
  el.innerHTML=`
  <div class="hub">
    <div class="hub-header"><div class="hub-title">⚔️ QUARTIER GÉNÉRAL</div><div class="hub-sub">Résistance Citoyenne — Intelligence Civile Belge</div></div>
    <div class="hub-rank-card" role="region" aria-label="Progression">
      <div class="rank-big">${rank.icon}</div>
      <div class="rank-info">
        <div class="rank-name" style="color:${rank.color}">${rank.name}</div>
        <div class="rank-bar" role="progressbar" aria-valuenow="${STATE.xp}" aria-valuemin="${rank.min}" aria-valuemax="${next.min}"><div class="rank-fill" style="width:${pct}%"></div></div>
        <div class="rank-xp">${STATE.xp} / ${next.min} XP</div>
      </div>
    </div>
    <div class="hub-stats" role="region" aria-label="Statistiques">
      <div class="hs"><div class="hs-v">${completedMissions.length}/${MISSIONS.length}</div><div class="hs-l">Missions</div></div>
      <div class="hs"><div class="hs-v">${STATE.completedObj.length}/${totalObj}</div><div class="hs-l">Objectifs</div></div>
      <div class="hs"><div class="hs-v">${STATE.completedTools.length}/15</div><div class="hs-l">Outils</div></div>
      <div class="hs"><div class="hs-v">${STATE.achievements.length}/${ACHIEVEMENTS.length}</div><div class="hs-l">Trophées</div></div>
    </div>
    <div class="hub-quote" role="complementary" aria-label="Citation"><div class="hq-text">"${esc(q.t)}"</div><div class="hq-author">— ${esc(q.a)}</div></div>
    <div class="hub-actions">
      <button class="hbtn hbtn-primary" onclick="nav('missions')" aria-label="Voir les missions">🎯 Missions</button>
      <button class="hbtn" onclick="nav('tools')" aria-label="Outils méthodologiques">🛠️ Outils</button>
      <button class="hbtn" onclick="nav('flashcards')" aria-label="Flashcards">📚 Flashcards</button>
      <button class="hbtn" onclick="nav('stats')" aria-label="Statistiques">📊 Stats</button>
    </div>
    <div class="hub-section-title">⚡ Missions en cours</div>
    <div class="hub-missions">
      ${MISSIONS.slice(0,4).map(m=>{
        const done=m.objectives.filter(o=>STATE.completedObj.includes(o.id)).length;
        const total=m.objectives.length;const p=Math.round((done/total)*100);
        return `<div class="hm-card" onclick="nav('mission','${m.id}')" role="button" tabindex="0" aria-label="${esc(m.name)}, ${done} sur ${total} objectifs">
          <div class="hm-icon">${m.icon}</div><div class="hm-info"><div class="hm-name">${esc(m.name)}</div>
          <div class="hm-bar" role="progressbar" aria-valuenow="${done}" aria-valuemax="${total}"><div class="hm-fill" style="width:${p}%"></div></div>
          <div class="hm-pct">${done}/${total}</div></div><div class="hm-arrow">›</div></div>`;
      }).join('')}
    </div>
    <div class="hub-footer">
      <button class="hbtn-sm" onclick="exportProject()" aria-label="Exporter projet">💾 Exporter</button>
      <button class="hbtn-sm" onclick="importProject()" aria-label="Importer projet">📂 Importer</button>
      <button class="hbtn-sm" onclick="resetAll()" aria-label="Réinitialiser">🗑️ Reset</button>
    </div>
  </div>`;
}

// ═══ MISSIONS LIST ═══
function renderMissions(el){
  const cats=[...new Set(MISSIONS.map(m=>m.cat))];
  // Search
  const sq=STATE.searchQuery.toLowerCase();
  const filtered=sq?MISSIONS.filter(m=>m.name.toLowerCase().includes(sq)||m.brief.toLowerCase().includes(sq)||m.cat.includes(sq)):MISSIONS;
  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('hub')" aria-label="Retour au QG">← QG</button>
      <h2>🎯 Toutes les Missions</h2>
    </div>
    <div class="search-bar"><input type="search" id="missionSearch" placeholder="🔍 Rechercher une mission..." value="${esc(STATE.searchQuery)}" oninput="STATE.searchQuery=this.value;renderCurrentView()" aria-label="Rechercher"></div>
    <div class="page-sub">${filtered.length} mission${filtered.length>1?'s':''} • Toutes accessibles</div>
    <div class="cat-filter" id="catFilter" role="toolbar" aria-label="Filtres par catégorie">
      <button class="cf-btn active" onclick="filterMissions(null,this)" aria-pressed="true">Toutes</button>
      ${cats.map(c=>`<button class="cf-btn" onclick="filterMissions('${c}',this)" aria-pressed="false">${catLabel(c)}</button>`).join('')}
    </div>
    <div class="mission-grid" id="missionGrid">
      ${filtered.map(m=>{
        const done=m.objectives.filter(o=>STATE.completedObj.includes(o.id)).length;
        const total=m.objectives.length;const pct=Math.round((done/total)*100);const complete=done===total;
        return `<div class="m-card ${complete?'m-done':''}" data-cat="${m.cat}" onclick="nav('mission','${m.id}')" role="button" tabindex="0" aria-label="${esc(m.name)}, ${done} sur ${total}">
          <div class="m-top"><span class="m-icon">${m.icon}</span><span class="m-diff">${'★'.repeat(m.difficulty)}${'☆'.repeat(3-m.difficulty)}</span></div>
          <div class="m-name">${esc(m.name)}</div><div class="m-cat">${catLabel(m.cat)}</div>
          <div class="m-bar"><div class="m-fill" style="width:${pct}%"></div></div>
          <div class="m-meta"><span>${done}/${total}</span><span class="m-xp">+${m.xpBase}XP</span></div>
          ${complete?'<div class="m-badge">✓ COMPLÈTE</div>':''}
        </div>`;
      }).join('')}
    </div>
  </div>`;
  unlock('first_mission');
}

function catLabel(c){return{analyse:'🔍 Analyse',media:'📺 Média',juridique:'⚖️ Juridique',doctrine:'⚔️ Doctrine',renseignement:'🔎 OSINT',action:'🏛️ Action',alternative:'🌱 Alternative',strategie:'🤝 Stratégie',logistique:'💰 Logistique'}[c]||c;}

function filterMissions(cat,btn){
  _qa('#catFilter .cf-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});
  btn.classList.add('active');btn.setAttribute('aria-pressed','true');
  _qa('#missionGrid .m-card').forEach(c=>{c.style.display=(!cat||c.dataset.cat===cat)?'':'none';});
}

// ═══ SINGLE MISSION (with content display + quiz) ═══
function renderMission(el){
  const m=MISSIONS.find(x=>x.id===STATE.missionId);
  if(!m){nav('missions');return;}
  const done=m.objectives.filter(o=>STATE.completedObj.includes(o.id)).length;
  const total=m.objectives.length;const pct=Math.round((done/total)*100);
  const complete=done===total;
  const qr=STATE.quizResults[m.id];

  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('missions')" aria-label="Retour aux missions">← Missions</button>
      <h2>${m.icon} ${esc(m.name)}</h2>
      ${complete?'<span class="done-badge">✓ COMPLÈTE</span>':''}
    </div>
    <div class="mission-brief"><div class="mb-label">BRIEFING</div><div class="mb-text">${esc(m.brief)}</div></div>
    <div class="mission-lore" onclick="this.classList.toggle('open')" role="button" tabindex="0" aria-expanded="false">
      <div class="ml-label">📖 Contexte <span class="ml-toggle">▼</span></div>
      <div class="ml-text">${esc(m.lore)}</div>
    </div>
    <div class="mission-intel"><div class="mi-label">📊 RENSEIGNEMENTS</div>
      <div class="mi-grid">${m.intel.map(i=>`<div class="mi-card mi-${i.color}"><div class="mi-val">${i.value}</div><div class="mi-lbl">${esc(i.label)}</div></div>`).join('')}</div>
    </div>
    <div class="mission-progress">
      <div class="mp-bar" role="progressbar" aria-valuenow="${done}" aria-valuemax="${total}"><div class="mp-fill" style="width:${pct}%"></div></div>
      <div class="mp-text">${done}/${total} objectifs • ${pct}% • +${m.xpBase}XP bonus</div>
    </div>
    <div class="mission-objectives" role="list" aria-label="Objectifs">
      <div class="mo-label">🎯 OBJECTIFS</div>
      ${m.objectives.map(o=>{
        const isDone=STATE.completedObj.includes(o.id);
        const isRead=STATE.readContent.includes(o.id);
        const hasContent=!!o.content;
        return `<div class="mo-item ${isDone?'mo-done':''}" role="listitem">
          <div class="mo-header" onclick="toggleObjective('${o.id}')" role="checkbox" aria-checked="${isDone}" tabindex="0">
            <div class="mo-check">${isDone?'✅':'⬜'}</div>
            <div class="mo-text">${esc(o.text)}</div>
            <div class="mo-xp">+${o.xp}</div>
          </div>
          ${hasContent?`<div class="mo-content-toggle">
            <button class="mo-read-btn ${isRead?'read':''}" onclick="event.stopPropagation();toggleContent('${o.id}')" aria-expanded="false" aria-label="Lire le contenu">
              ${isRead?'📖':'📕'} ${isRead?'Relire':'Lire le contenu'}
            </button>
          </div>
          <div class="mo-content" id="content_${o.id}" hidden>
            <div class="mo-content-text">${formatContent(o.content)}</div>
          </div>`:''}
        </div>`;
      }).join('')}
    </div>

    ${m.quiz&&m.quiz.length?`
    <div class="mission-quiz-link">
      <button class="hbtn ${qr&&qr.passed?'hbtn-done':'hbtn-primary'}" onclick="STATE.view='quiz';STATE.missionId='${m.id}';renderCurrentView()" aria-label="Quiz de la mission">
        ${qr?`🎓 Quiz ${qr.passed?'réussi':'échoué'} (${qr.score}/${qr.total})`:'🎓 Passer le quiz de mission'}
      </button>
    </div>`:''}

    ${m.tools&&m.tools.length?`
    <div class="mission-tools"><div class="mt-label">🛠️ OUTILS RECOMMANDÉS</div>
      <div class="mt-grid">${m.tools.map(tk=>{
        const t=TOOLS.find(x=>x.key===tk);if(!t)return'';
        const hasPrefill=m.prefill&&m.prefill[tk];
        return `<button class="mt-btn" onclick="openToolFromMission('${tk}','${m.id}')" aria-label="Outil ${t.name}${hasPrefill?' (pré-rempli)':''}">
          ${t.icon} ${t.name} ${hasPrefill?'<span class="mt-prefill">📋</span>':''}
        </button>`;
      }).join('')}</div>
    </div>`:''}
  </div>`;
}

function formatContent(text){
  return esc(text).replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/^/,'<p>').replace(/$/,'</p>');
}

function toggleContent(objId){
  const el=_q('content_'+objId);if(!el)return;
  const btn=el.previousElementSibling?.querySelector('.mo-read-btn');
  if(el.hidden){
    el.hidden=false;
    if(btn){btn.setAttribute('aria-expanded','true');}
    markContentRead(objId);
  }else{
    el.hidden=true;
    if(btn){btn.setAttribute('aria-expanded','false');}
  }
}

function openToolFromMission(toolKey,missionId){
  const m=MISSIONS.find(x=>x.id===missionId);
  if(m&&m.prefill&&m.prefill[toolKey]){
    // Apply prefill data
    if(!STATE.toolData[toolKey])STATE.toolData[toolKey]={};
    const existing=STATE.toolData[toolKey];
    const prefill=m.prefill[toolKey];
    Object.keys(prefill).forEach(k=>{
      if(!existing[k]||existing[k].length<3)existing[k]=prefill[k];
    });
    save();
    unlock('prefill_used');
  }
  const t=TOOLS.find(x=>x.key===toolKey);
  if(t)nav('tool',t.id);
}

// ═══ QUIZ VIEW — NEW ═══
function renderQuiz(el){
  const m=MISSIONS.find(x=>x.id===STATE.missionId);
  if(!m||!m.quiz){nav('mission',STATE.missionId);return;}
  const qr=STATE.quizResults[m.id];

  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('mission','${m.id}')" aria-label="Retour à la mission">← ${esc(m.name)}</button>
      <h2>🎓 Quiz</h2>
    </div>
    <div class="quiz-intro">Répondez à ${m.quiz.length} questions. Minimum 60% pour valider.</div>
    <div class="quiz-questions" role="form" aria-label="Quiz">
      ${m.quiz.map((q,i)=>`
      <div class="quiz-q">
        <div class="qq-text">${i+1}. ${esc(q.q)}</div>
        <div class="qq-choices" role="radiogroup" aria-label="Question ${i+1}">
          ${q.choices.map((c,j)=>{
            const wasCorrect=qr?j===q.correct:false;
            const wasSelected=false;
            return `<label class="qq-choice ${qr&&wasCorrect?'qq-correct':''}" tabindex="0">
              <input type="radio" name="quiz_${i}" value="${j}" ${qr?'disabled':''}>
              <span>${esc(c)}</span>
            </label>`;
          }).join('')}
        </div>
      </div>`).join('')}
    </div>
    ${qr?`<div class="quiz-result ${qr.passed?'qr-pass':'qr-fail'}">
      ${qr.passed?'✅':'❌'} Score : ${qr.score}/${qr.total} (${Math.round(qr.score/qr.total*100)}%)
      ${qr.passed?'— Quiz validé!':'— 60% requis. Réessayez!'}
    </div>
    <button class="hbtn" onclick="delete STATE.quizResults['${m.id}'];save();renderCurrentView()">🔄 Recommencer</button>`
    :`<button class="hbtn hbtn-primary" onclick="submitQuiz('${m.id}')">✓ Valider</button>`}
  </div>`;
}

// ═══ TOOLS LIST ═══
function renderToolsList(el){
  const phases=[{key:'voir',label:'👁️ VOIR',desc:'Observer et comprendre'},{key:'juger',label:'⚖️ JUGER',desc:'Analyser et évaluer'},{key:'agir',label:'✊ AGIR',desc:'Planifier et mettre en œuvre'}];
  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('hub')" aria-label="Retour au QG">← QG</button>
      <h2>🛠️ Outils Méthodologiques</h2>
    </div>
    <div class="page-sub">15 outils • VOIR → JUGER → AGIR</div>
    ${phases.map(p=>`
    <div class="tp-section">
      <div class="tp-head"><span class="tp-name">${p.label}</span><span class="tp-desc">${p.desc}</span></div>
      <div class="tool-grid">${TOOLS.filter(t=>t.phase===p.key).map(t=>{
        const isDone=STATE.completedTools.includes(t.id);
        return `<div class="t-card ${isDone?'t-done':''}" onclick="nav('tool',${t.id})" role="button" tabindex="0" aria-label="${t.name}${isDone?' (complété)':''}">
          <div class="t-icon">${t.icon}</div><div class="t-name">${t.name}</div>
          <div class="t-xp">${isDone?'✓':'+'} ${t.xp}XP</div>
        </div>`;
      }).join('')}</div>
    </div>`).join('')}
  </div>`;
}

// ═══ TOOL EDITOR ═══
function renderToolEditor(el){
  const t=TOOLS.find(x=>x.id===STATE.toolId);
  if(!t){nav('tools');return;}
  const data=STATE.toolData[t.key]||{};
  const filled=t.fields.filter(f=>(data[f]||'').length>5).length;
  const pct=Math.round((filled/t.fields.length)*100);
  const isDone=STATE.completedTools.includes(t.id);

  el.innerHTML=`
  <div class="page">
    <div class="page-head">
      <button class="back-btn" onclick="nav('tools')" aria-label="Retour aux outils">← Outils</button>
      <h2>${t.icon} ${t.name}</h2>
      ${isDone?'<span class="done-badge">✓</span>':''}
    </div>
    <div class="tool-phase">${capitalize(t.phase)} • +${t.xp}XP</div>
    <div class="tool-help">${esc(t.help)}</div>
    <div class="tool-progress">
      <div class="tp-bar" role="progressbar" aria-valuenow="${filled}" aria-valuemax="${t.fields.length}"><div class="tp-fill" style="width:${pct}%"></div></div>
      <div class="tp-pct">${filled}/${t.fields.length} champs</div>
    </div>
    <div class="tool-fields" role="form" aria-label="Champs de l'outil">
      ${t.fields.map(f=>`
      <div class="tf-group">
        <label class="tf-label" for="tf_${f}">${capitalize(f.replace(/_/g,' '))}</label>
        <textarea id="tf_${f}" class="tf-input" rows="4" placeholder="${capitalize(f)}..." oninput="saveToolField('${t.key}','${f}',this.value)">${esc(data[f]||'')}</textarea>
      </div>`).join('')}
    </div>
    ${!isDone&&pct>=50?`<button class="hbtn hbtn-primary" onclick="completeTool(${t.id});renderCurrentView()">✓ Valider cet outil (+${t.xp}XP)</button>`:''}
    ${pct<50?'<div class="tool-tip">Remplissez au moins 50% des champs (>5 caractères) pour valider.</div>':''}
  </div>`;
}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}

// ═══ FLASHCARDS ═══
function renderFlashcards(el){
  const fcFiles=STATE.files.filter(isFlashcardFile);
  if(fcFiles.length===0){
    el.innerHTML=`
    <div class="page">
      <div class="page-head"><button class="back-btn" onclick="nav('hub')">← QG</button><h2>📚 Flashcards</h2></div>
      <div class="fc-empty"><div class="fce-icon">📚</div><div class="fce-title">Aucun jeu de flashcards</div>
        <div class="fce-text">Importez un CSV ou chargez les 40 cartes de démo.</div>
        <div class="fce-actions">
          <button class="hbtn hbtn-primary" onclick="loadDemoFlashcards()">🎯 Charger 40 cartes démo</button>
          <button class="hbtn" onclick="document.getElementById('fcFileInput').click()">📥 Importer CSV</button>
        </div>
      </div>
      <input type="file" id="fcFileInput" hidden accept=".csv,.json" onchange="handleFiles(this.files);this.value=''">
    </div>`;return;
  }
  if(!fcState||!fcFiles.find(f=>f.id===fcState.fileId)){
    const f=fcFiles[0];
    fcState={fileId:f.id,cards:[...f.data],index:0,flipped:false,good:0,bad:0,shuffled:false};
  }
  const card=fcState.cards[fcState.index];
  const progress=((fcState.index+1)/fcState.cards.length)*100;

  el.innerHTML=`
  <div class="page">
    <div class="page-head"><button class="back-btn" onclick="nav('hub')">← QG</button><h2>📚 Flashcards</h2></div>
    <div class="fc-toolbar">
      <select class="fc-select" onchange="fcChangeFile(this.value)" aria-label="Choisir un jeu">
        ${fcFiles.map(f=>`<option value="${f.id}" ${f.id===fcState.fileId?'selected':''}>${esc(f.name)} (${f.data.length})</option>`).join('')}
      </select>
      <button class="hbtn-sm" onclick="fcShuffle()" aria-label="Mélanger">🔀</button>
      <button class="hbtn-sm" onclick="loadDemoFlashcards()" aria-label="Charger démo">➕</button>
      <button class="hbtn-sm" onclick="document.getElementById('fcFileInput2').click()" aria-label="Importer">📥</button>
    </div>
    <input type="file" id="fcFileInput2" hidden accept=".csv" onchange="handleFiles(this.files);this.value=''">
    <div class="fc-card-wrap" onclick="fcFlip()" role="button" tabindex="0" aria-label="Retourner la carte">
      <div class="fc-card ${fcState.flipped?'flipped':''}">
        <div class="fc-inner">
          <div class="fc-front"><div class="fc-label">QUESTION</div><div class="fc-question">${esc(card.question)}</div><div class="fc-tap">Touchez / Espace</div></div>
          <div class="fc-back"><div class="fc-label">RÉPONSE</div><div class="fc-answer">${esc(card.answer)}</div></div>
        </div>
      </div>
    </div>
    <div class="fc-progress-wrap"><div class="fc-pbar"><div class="fc-pfill" style="width:${progress}%"></div></div><div class="fc-counter">${fcState.index+1} / ${fcState.cards.length}</div></div>
    ${fcState.flipped?`<div class="fc-rating">
      <button class="fcr-btn fcr-good" onclick="fcMark('good')" aria-label="Je savais">✓ Je savais</button>
      <button class="fcr-btn fcr-bad" onclick="fcMark('bad')" aria-label="À revoir">✗ À revoir</button>
    </div>`:''}
    <div class="fc-nav">
      <button class="hbtn" onclick="fcPrev()" ${fcState.index===0?'disabled':''} aria-label="Carte précédente">⬅️ Préc.</button>
      <button class="hbtn hbtn-primary" onclick="fcFlip()" aria-label="Retourner">🔄</button>
      <button class="hbtn" onclick="fcNext()" ${fcState.index>=fcState.cards.length-1?'disabled':''} aria-label="Carte suivante">Suiv. ➡️</button>
    </div>
    <div class="fc-stats-row">
      <span>Session: ${fcState.good+fcState.bad}</span>
      ${fcState.good?`<span class="fcs-good">✓ ${fcState.good}</span>`:''}
      ${fcState.bad?`<span class="fcs-bad">✗ ${fcState.bad}</span>`:''}
      <span>Total: ${STATE.fcStats.reviewed}</span>
    </div>
  </div>`;
}

function fcFlip(){if(!fcState)return;fcState.flipped=!fcState.flipped;renderCurrentView();}
function fcNext(){if(!fcState||fcState.index>=fcState.cards.length-1)return;fcState.index++;fcState.flipped=false;renderCurrentView();}
function fcPrev(){if(!fcState||fcState.index<=0)return;fcState.index--;fcState.flipped=false;renderCurrentView();}
function fcShuffle(){if(!fcState)return;for(let i=fcState.cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[fcState.cards[i],fcState.cards[j]]=[fcState.cards[j],fcState.cards[i]];}fcState.index=0;fcState.flipped=false;toast('🔀 Mélangé');renderCurrentView();}
function fcMark(type){
  if(!fcState)return;
  if(type==='good')fcState.good++;else fcState.bad++;
  STATE.fcStats.reviewed++;
  if(STATE.fcStats.reviewed>=100)unlock('fc_master');
  if(fcState.index>=fcState.cards.length-1){
    STATE.fcStats.sessions++;unlock('fc_session');
    if(fcState.bad===0&&fcState.good>=10)unlock('fc_perfect');
    toast(`🎉 Session! ${fcState.good}/${fcState.good+fcState.bad}`,'success');
  }
  save();fcNext();
}
function fcChangeFile(id){const f=STATE.files.find(x=>x.id==id);if(!f||!isFlashcardFile(f))return;fcState={fileId:f.id,cards:[...f.data],index:0,flipped:false,good:0,bad:0,shuffled:false};renderCurrentView();}

// ═══ TROPHIES ═══
function renderTrophies(el){
  const unlocked=STATE.achievements;
  el.innerHTML=`
  <div class="page">
    <div class="page-head"><button class="back-btn" onclick="nav('hub')">← QG</button><h2>🏆 Trophées & Rangs</h2></div>
    <div class="page-sub">${unlocked.length}/${ACHIEVEMENTS.length} trophées</div>
    <div class="ranks-section"><h3>Rangs</h3>
      <div class="ranks-grid">${RANKS.map(r=>{
        const a=STATE.xp>=r.min;
        return `<div class="rank-card ${a?'rk-done':'rk-locked'}"><div class="rk-icon">${r.icon}</div><div class="rk-name" style="color:${a?r.color:'var(--t3)'}">${r.name}</div><div class="rk-min">${r.min} XP</div></div>`;
      }).join('')}</div>
    </div>
    <div class="trophies-section"><h3>Trophées</h3>
      <div class="trophy-grid">${ACHIEVEMENTS.map(a=>{
        const got=unlocked.includes(a.id);
        return `<div class="trophy-card ${got?'tr-done':'tr-locked'}"><div class="tr-icon">${got?a.icon:'🔒'}</div><div class="tr-name">${got?a.name:'???'}</div><div class="tr-desc">${a.desc}</div><div class="tr-xp">${got?`✓ +${a.xp}XP`:`+${a.xp}XP`}</div></div>`;
      }).join('')}</div>
    </div>
  </div>`;
}

// ═══ STATS VIEW — NEW ═══
function renderStats(el){
  const s=getStats();
  const rank=getRank();
  const maxContent=MISSIONS.reduce((s,m)=>s+m.objectives.filter(o=>o.content).length,0);
  el.innerHTML=`
  <div class="page">
    <div class="page-head"><button class="back-btn" onclick="nav('hub')">← QG</button><h2>📊 Statistiques</h2></div>
    <div class="stats-grid">
      <div class="stat-card"><div class="sc-icon">🎯</div><div class="sc-val">${s.completedM}/${s.totalM}</div><div class="sc-label">Missions complètes</div></div>
      <div class="stat-card"><div class="sc-icon">✅</div><div class="sc-val">${s.doneObj}/${s.totalObj}</div><div class="sc-label">Objectifs cochés</div></div>
      <div class="stat-card"><div class="sc-icon">📖</div><div class="sc-val">${s.readContent}/${maxContent}</div><div class="sc-label">Contenus lus</div></div>
      <div class="stat-card"><div class="sc-icon">🎓</div><div class="sc-val">${s.quizPassed}/${s.quizDone}</div><div class="sc-label">Quiz réussis</div></div>
      <div class="stat-card"><div class="sc-icon">🛠️</div><div class="sc-val">${s.completedTools}/15</div><div class="sc-label">Outils complétés</div></div>
      <div class="stat-card"><div class="sc-icon">🏆</div><div class="sc-val">${s.achievements}/${s.totalAchiev}</div><div class="sc-label">Trophées</div></div>
      <div class="stat-card"><div class="sc-icon">📚</div><div class="sc-val">${s.fcReviewed}</div><div class="sc-label">Flashcards révisées</div></div>
      <div class="stat-card"><div class="sc-icon">⏱️</div><div class="sc-val">${STATE.totalTime}m</div><div class="sc-label">Temps total</div></div>
    </div>
    <div class="stats-xp">
      <h3>Économie XP</h3>
      <div class="xp-breakdown">
        <div class="xpb-row"><span>XP actuel</span><strong>${STATE.xp}</strong></div>
        <div class="xpb-row"><span>Rang</span><strong>${rank.icon} ${rank.name}</strong></div>
        <div class="xpb-row"><span>Prochain rang</span><strong>${getNextRank().icon} ${getNextRank().name} (${getNextRank().min}XP)</strong></div>
      </div>
    </div>
    <div class="stats-missions"><h3>Détail par mission</h3>
      ${MISSIONS.map(m=>{
        const md=m.objectives.filter(o=>STATE.completedObj.includes(o.id)).length;
        const mt=m.objectives.length;
        const mr=m.objectives.filter(o=>STATE.readContent.includes(o.id)).length;
        const mc=m.objectives.filter(o=>o.content).length;
        const qr=STATE.quizResults[m.id];
        return `<div class="sm-row">
          <span class="sm-icon">${m.icon}</span>
          <span class="sm-name">${esc(m.name)}</span>
          <span class="sm-obj">${md}/${mt} obj</span>
          <span class="sm-read">${mr}/${mc} 📖</span>
          <span class="sm-quiz">${qr?`${qr.score}/${qr.total} ${qr.passed?'✅':'❌'}`:'—'}</span>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

// ═══ KEYBOARD ═══
document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(STATE.view==='flashcards'&&fcState){
    if(e.key===' '||e.key==='Enter'){e.preventDefault();fcFlip();}
    else if(e.key==='ArrowRight'){e.preventDefault();fcNext();}
    else if(e.key==='ArrowLeft'){e.preventDefault();fcPrev();}
  }
  if(e.key==='Escape'){
    if(STATE.view==='mission')nav('missions');
    else if(STATE.view==='tool')nav('tools');
    else if(STATE.view==='quiz')nav('mission',STATE.missionId);
    else if(STATE.view==='stats')nav('hub');
    else nav('hub');
  }
});

// Enter on role=button elements
document.addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ')&&e.target.getAttribute('role')==='button'){
    e.preventDefault();e.target.click();
  }
});

// ═══ SWIPE ═══
var touchStartX=0;
document.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX;},{passive:true});
document.addEventListener('touchend',e=>{
  const diff=e.changedTouches[0].screenX-touchStartX;
  if(STATE.view==='flashcards'&&fcState){if(diff>60)fcPrev();else if(diff<-60)fcNext();}
},{passive:true});

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded',()=>{initEngine();renderCurrentView();});
