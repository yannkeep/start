// ═══════════════════════════════════════════════════════════════════════════
// RÉSISTANCE CITOYENNE v3 — GAME ENGINE
// Fixed: XP economy, quiz system, ARIA, content tracking
// ═══════════════════════════════════════════════════════════════════════════

var SAVE_KEY='resistance_citoyenne_v3';

var STATE={
  xp:0, achievements:[], theme:'dark', view:'hub',
  missionId:null, toolId:null,
  completedObj:[], completedTools:[],
  toolData:{}, files:[], fcStats:{reviewed:0,sessions:0},
  readContent:[], // NEW: track which objective content has been read
  quizResults:{}, // NEW: {missionId: {score, total, passed}}
  project:{}, visitedViews:[], timestamps:[], totalTime:0,
  searchQuery:'' // NEW: global search
};

var fcState=null;

// ═══ UTILITIES ═══
var _q=id=>document.getElementById(id);
var _qa=s=>document.querySelectorAll(s);
var esc=s=>{if(typeof s!=='string')return s||'';return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};

function toast(msg,type='info'){
  const c=_q('toasts');if(!c)return;
  const el=document.createElement('div');
  el.className=`toast t-${type}`;
  el.setAttribute('role','alert');
  el.setAttribute('aria-live','assertive');
  el.innerHTML=msg;
  c.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('show'));
  setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),400);},3500);
}

function vibrate(ms=15){try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}}

// ═══ XP & RANKS ═══
function getRank(xp){return[...RANKS].reverse().find(r=>(xp||STATE.xp)>=r.min)||RANKS[0];}
function getNextRank(xp){const idx=RANKS.findIndex(r=>r.name===getRank(xp).name);return RANKS[idx+1]||RANKS[RANKS.length-1];}
function addXP(amount){
  const old=getRank();STATE.xp+=amount;const nw=getRank();
  updateXPBar();
  if(nw.name!==old.name){toast(`🎉 <strong>Rang ${nw.icon} ${nw.name}</strong> débloqué!`,'success');vibrate(50);}
  save();
}
function updateXPBar(){
  const rank=getRank(),next=getNextRank();
  const pct=Math.min(((STATE.xp-rank.min)/(next.min-rank.min))*100,100);
  const el=_q('xpRank');if(el)el.textContent=rank.name;
  const bar=_q('xpFill');if(bar){bar.style.width=pct+'%';bar.setAttribute('aria-valuenow',STATE.xp);}
  const cur=_q('xpCur');if(cur)cur.textContent=STATE.xp;
  const mx=_q('xpMax');if(mx)mx.textContent=next.min;
  const ico=_q('xpIcon');if(ico)ico.textContent=rank.icon;
}

// ═══ ACHIEVEMENTS ═══
function unlock(id){
  if(STATE.achievements.includes(id))return;
  const a=ACHIEVEMENTS.find(x=>x.id===id);if(!a)return;
  STATE.achievements.push(id);addXP(a.xp);
  toast(`🏆 <strong>${a.name}</strong> — ${a.desc} (+${a.xp}XP)`,'success');
  vibrate(30);save();
}

// ═══ CONTENT READING — NEW ═══
function markContentRead(objId){
  if(STATE.readContent.includes(objId))return;
  STATE.readContent.push(objId);
  if(STATE.readContent.length===1)unlock('first_read');
  addXP(5); // +5XP per content read (recurring source!)
  toast('📖 Contenu étudié (+5XP)','info');
  save();
}

// ═══ OBJECTIVES ═══
function completeObjective(objId){
  if(STATE.completedObj.includes(objId))return;
  STATE.completedObj.push(objId);
  let xp=0;
  MISSIONS.forEach(m=>{const o=m.objectives.find(x=>x.id===objId);if(o)xp=o.xp;});
  if(xp)addXP(xp);
  toast(`✅ Objectif complété (+${xp}XP)`,'success');vibrate();

  STATE.timestamps.push(Date.now());
  const recent=STATE.timestamps.filter(t=>Date.now()-t<300000);
  if(recent.length>=3)unlock('speed_run');
  if(STATE.completedObj.length===1)unlock('first_obj');

  // Check mission completion — NOW AWARDS xpBase!
  MISSIONS.forEach(m=>{
    const allDone=m.objectives.every(o=>STATE.completedObj.includes(o.id));
    if(allDone&&!STATE.achievements.includes('mission_done_'+m.id)){
      // Award mission bonus XP (was never distributed before!)
      addXP(m.xpBase);
      toast(`🎖️ Mission "${m.name}" complète! (+${m.xpBase}XP bonus)`,'success');
      unlock('mission_complete');
      if(m.id==='troisguerres')unlock('three_guerres');
      // Track per-mission completion (for preventing double xpBase)
      STATE.achievements.push('mission_done_'+m.id);
    }
  });

  const completedMissions=MISSIONS.filter(m=>m.objectives.every(o=>STATE.completedObj.includes(o.id)));
  if(completedMissions.length>=5)unlock('five_missions');
  if(completedMissions.length>=MISSIONS.length)unlock('all_missions');

  save();
  if(typeof renderCurrentView==='function')renderCurrentView();
}

function toggleObjective(objId){
  if(STATE.completedObj.includes(objId)){
    STATE.completedObj=STATE.completedObj.filter(x=>x!==objId);save();
    if(typeof renderCurrentView==='function')renderCurrentView();
  }else{completeObjective(objId);}
}

// ═══ QUIZ SYSTEM — NEW ═══
function submitQuiz(missionId){
  const m=MISSIONS.find(x=>x.id===missionId);if(!m||!m.quiz)return;
  let score=0;
  m.quiz.forEach((q,i)=>{
    const sel=document.querySelector(`input[name="quiz_${i}"]:checked`);
    if(sel&&parseInt(sel.value)===q.correct)score++;
  });
  const total=m.quiz.length;
  const passed=score/total>=0.6;
  STATE.quizResults[missionId]={score,total,passed,date:Date.now()};

  if(passed){
    addXP(25);unlock('quiz_pass');
    if(score===total)unlock('quiz_perfect');
    toast(`🎓 Quiz réussi : ${score}/${total} (+25XP)`,'success');
  }else{
    toast(`Quiz : ${score}/${total} — 60% requis pour valider`,'warning');
  }
  save();
  if(typeof renderCurrentView==='function')renderCurrentView();
}

// ═══ TOOL COMPLETION ═══
function completeTool(toolId){
  if(STATE.completedTools.includes(toolId))return;
  const t=TOOLS.find(x=>x.id===toolId);if(!t)return;
  STATE.completedTools.push(toolId);addXP(t.xp);
  toast(`🛠️ <strong>${t.name}</strong> complété (+${t.xp}XP)`,'success');
  if(STATE.completedTools.length===1)unlock('first_tool');
  const voir=TOOLS.filter(t=>t.phase==='voir').every(t=>STATE.completedTools.includes(t.id));
  const juger=TOOLS.filter(t=>t.phase==='juger').every(t=>STATE.completedTools.includes(t.id));
  const agir=TOOLS.filter(t=>t.phase==='agir').every(t=>STATE.completedTools.includes(t.id));
  if(voir)unlock('voir_done');if(juger)unlock('juger_done');if(agir)unlock('agir_done');
  if(STATE.completedTools.length>=15)unlock('all_tools');
  save();
}

function saveToolField(toolKey,field,value){
  if(!STATE.toolData[toolKey])STATE.toolData[toolKey]={};
  STATE.toolData[toolKey][field]=value;save();
}

// ═══ NAVIGATION ═══
function nav(view,id){
  STATE.view=view;
  if(id!==undefined){
    if(view==='mission')STATE.missionId=id;
    if(view==='tool')STATE.toolId=id;
  }
  if(!STATE.visitedViews.includes(view))STATE.visitedViews.push(view);
  if(STATE.visitedViews.length>=6)unlock('explorer');
  renderCurrentView();
  window.scrollTo(0,0);
  // Focus management for accessibility
  setTimeout(()=>{const h=_q('main');if(h)h.focus();},100);
  save();
}

// ═══ PERSISTENCE ═══
function save(){
  try{localStorage.setItem(SAVE_KEY,JSON.stringify({
    xp:STATE.xp,achievements:STATE.achievements,theme:STATE.theme,
    completedObj:STATE.completedObj,completedTools:STATE.completedTools,
    toolData:STATE.toolData,files:STATE.files,fcStats:STATE.fcStats,
    readContent:STATE.readContent,quizResults:STATE.quizResults,
    project:STATE.project,visitedViews:STATE.visitedViews,totalTime:STATE.totalTime
  }));}catch(e){console.error('Save:',e)}
}

function load(){
  try{const s=localStorage.getItem(SAVE_KEY);if(!s)return;
  const d=JSON.parse(s);
  Object.assign(STATE,{
    xp:d.xp||0,achievements:d.achievements||[],theme:d.theme||'dark',
    completedObj:d.completedObj||[],completedTools:d.completedTools||[],
    toolData:d.toolData||{},files:d.files||[],fcStats:d.fcStats||{reviewed:0,sessions:0},
    readContent:d.readContent||[],quizResults:d.quizResults||{},
    project:d.project||{},visitedViews:d.visitedViews||[],totalTime:d.totalTime||0
  });}catch(e){console.error('Load:',e)}
}

function resetAll(){
  if(!confirm('⚠️ Réinitialiser TOUTE la progression?'))return;
  localStorage.removeItem(SAVE_KEY);location.reload();
}

// ═══ THEMES ═══
function setTheme(t){STATE.theme=t;document.documentElement.dataset.theme=t;_qa('[data-th]').forEach(b=>b.classList.toggle('active',b.dataset.th===t));save();}

// ═══ FILES ═══
function handleFiles(fileList){
  Array.from(fileList).forEach(file=>{
    const reader=new FileReader();const ext=file.name.split('.').pop().toLowerCase();
    reader.onload=e=>{
      const content=e.target.result;let data=null;
      if(ext==='json'){try{data=JSON.parse(content)}catch{toast('JSON invalide','error');return}}
      else if(ext==='csv'){data=parseCSV(content)}else{data=content}
      STATE.files.push({id:Date.now()+Math.random(),name:file.name,type:ext,data,raw:content,created:new Date().toISOString()});
      unlock('first_file');if(STATE.files.length>=10)unlock('collector');
      toast(`✓ ${file.name} importé`,'success');save();
      if(typeof renderCurrentView==='function')renderCurrentView();
    };reader.readAsText(file);
  });
}

function parseCSV(text){
  const lines=text.trim().split('\n');if(lines.length<2)return[];
  const headers=csvLine(lines[0]);
  return lines.slice(1).map(line=>{
    const vals=csvLine(line);const obj={};
    headers.forEach((h,i)=>{
      const hl=h.toLowerCase().trim();let key=h;
      if(['question','q','front','recto'].some(k=>hl.includes(k)))key='question';
      else if(['answer','réponse','reponse','a','back','verso'].some(k=>hl.includes(k)))key='answer';
      obj[key]=vals[i]||'';
    });return obj;
  }).filter(r=>Object.values(r).some(v=>v.trim()));
}

function csvLine(line){
  const r=[];let c='',q=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"'){if(q&&line[i+1]==='"'){c+='"';i++}else q=!q}
    else if((ch===','||ch===';')&&!q){r.push(c.trim());c=''}
    else c+=ch;
  }r.push(c.trim());return r;
}

function isFlashcardFile(f){return f.type==='csv'&&Array.isArray(f.data)&&f.data.length>0&&f.data[0].question&&f.data[0].answer;}

function loadDemoFlashcards(){
  const data=DEMO_FLASHCARDS.map(d=>({question:d.q,answer:d.a}));
  STATE.files.push({id:Date.now(),name:'flashcards-resistance-40.csv',type:'csv',data,raw:'q,a\n'+data.map(d=>`"${d.question}","${d.answer}"`).join('\n'),created:new Date().toISOString()});
  unlock('first_file');toast('🎯 40 flashcards chargées!','success');save();renderCurrentView();
}

// ═══ EXPORT ═══
function exportProject(){
  const data={version:'3.0',exported:new Date().toISOString(),state:{xp:STATE.xp,achievements:STATE.achievements,completedObj:STATE.completedObj,completedTools:STATE.completedTools,toolData:STATE.toolData,files:STATE.files,fcStats:STATE.fcStats,readContent:STATE.readContent,quizResults:STATE.quizResults,project:STATE.project}};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download=`resistance-projet-${new Date().toISOString().slice(0,10)}.json`;a.click();
  URL.revokeObjectURL(a.href);unlock('exporter');toast('💾 Projet exporté!','success');
}

function importProject(){
  const input=document.createElement('input');input.type='file';input.accept='.json';
  input.onchange=e=>{const reader=new FileReader();reader.onload=ev=>{
    try{const d=JSON.parse(ev.target.result);if(d.state){Object.assign(STATE,d.state);save();renderCurrentView();updateXPBar();toast('✓ Projet importé!','success');}}catch(err){toast('Fichier invalide','error')}
  };reader.readAsText(e.target.files[0]);};input.click();
}

// ═══ STATS HELPERS — NEW ═══
function getStats(){
  const completedM=MISSIONS.filter(m=>m.objectives.every(o=>STATE.completedObj.includes(o.id)));
  const totalObj=MISSIONS.reduce((s,m)=>s+m.objectives.length,0);
  const quizDone=Object.keys(STATE.quizResults).length;
  const quizPassed=Object.values(STATE.quizResults).filter(r=>r.passed).length;
  const maxXP=MISSIONS.reduce((s,m)=>s+m.xpBase+m.objectives.reduce((ss,o)=>ss+o.xp,0),0)+TOOLS.reduce((s,t)=>s+t.xp,0)+ACHIEVEMENTS.reduce((s,a)=>s+a.xp,0);
  return{completedM:completedM.length,totalM:MISSIONS.length,doneObj:STATE.completedObj.length,totalObj,completedTools:STATE.completedTools.length,achievements:STATE.achievements.length,totalAchiev:ACHIEVEMENTS.length,readContent:STATE.readContent.length,quizDone,quizPassed,maxXP,fcReviewed:STATE.fcStats.reviewed,fcSessions:STATE.fcStats.sessions};
}

// ═══ INIT ═══
function initEngine(){
  load();setTheme(STATE.theme);updateXPBar();
  const h=new Date().getHours();if(h>=0&&h<5)unlock('night_owl');
  setInterval(()=>{STATE.totalTime++;save();},60000);
}
