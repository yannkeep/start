// ═══════════════════════════════════════════════════════════════════════════
// RÉSISTANCE CITOYENNE — GAME ENGINE
// State management, XP, persistence, events, utilities
// ═══════════════════════════════════════════════════════════════════════════

const SAVE_KEY = 'resistance_citoyenne_v2';

const STATE = {
  xp: 0,
  achievements: [],
  theme: 'dark',
  view: 'hub',        // hub|missions|mission|tools|tool|flashcards|trophies|warroom
  missionId: null,
  toolId: null,
  completedObj: [],    // objective ids
  completedTools: [],  // tool ids
  toolData: {},        // {toolKey: {field: value}}
  files: [],
  fcStats: { reviewed:0, sessions:0 },
  project: {},
  visitedViews: [],
  timestamps: [],      // for speed_run tracking
  totalTime: 0         // minutes
};

let fcState = null;

// ═══ UTILITIES ═══
const $=id=>document.getElementById(id);
const $$=s=>document.querySelectorAll(s);
const esc=s=>{if(typeof s!=='string')return s||'';return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};

function toast(msg, type='info') {
  const c=$('toasts');
  if(!c)return;
  const el=document.createElement('div');
  el.className=`toast t-${type}`;
  el.innerHTML=msg;
  c.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('show'));
  setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),400);},3500);
}

function vibrate(ms=15){try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}}

// ═══ XP & RANKS ═══
function getRank(xp){
  return [...RANKS].reverse().find(r=>(xp||STATE.xp)>=r.min)||RANKS[0];
}
function getNextRank(xp){
  const idx=RANKS.findIndex(r=>r.name===getRank(xp).name);
  return RANKS[idx+1]||RANKS[RANKS.length-1];
}
function addXP(amount){
  const old=getRank();
  STATE.xp+=amount;
  const nw=getRank();
  updateXPBar();
  if(nw.name!==old.name){
    toast(`🎉 <strong>Rang ${nw.icon} ${nw.name}</strong> débloqué!`,'success');
    vibrate(50);
  }
  save();
}
function updateXPBar(){
  const rank=getRank(), next=getNextRank();
  const pct=Math.min(((STATE.xp-rank.min)/(next.min-rank.min))*100,100);
  const el=$('xpRank'); if(el)el.textContent=rank.name;
  const bar=$('xpFill'); if(bar)bar.style.width=pct+'%';
  const cur=$('xpCur'); if(cur)cur.textContent=STATE.xp;
  const mx=$('xpMax'); if(mx)mx.textContent=next.min;
  const ico=$('xpIcon'); if(ico)ico.textContent=rank.icon;
}

// ═══ ACHIEVEMENTS ═══
function unlock(id){
  if(STATE.achievements.includes(id))return;
  const a=ACHIEVEMENTS.find(x=>x.id===id);
  if(!a)return;
  STATE.achievements.push(id);
  addXP(a.xp);
  toast(`🏆 <strong>${a.name}</strong> — ${a.desc} (+${a.xp}XP)`,'success');
  vibrate(30);
  save();
}

// ═══ OBJECTIVES ═══
function completeObjective(objId){
  if(STATE.completedObj.includes(objId))return;
  STATE.completedObj.push(objId);
  // Find XP
  let xp=0;
  MISSIONS.forEach(m=>{
    const o=m.objectives.find(x=>x.id===objId);
    if(o)xp=o.xp;
  });
  if(xp)addXP(xp);
  toast(`✅ Objectif complété (+${xp}XP)`,'success');
  vibrate();

  // Track timestamp for speed_run
  STATE.timestamps.push(Date.now());
  const recent=STATE.timestamps.filter(t=>Date.now()-t<300000);
  if(recent.length>=3)unlock('speed_run');

  // Check first objective
  if(STATE.completedObj.length===1)unlock('first_obj');

  // Check mission completion
  MISSIONS.forEach(m=>{
    const allDone=m.objectives.every(o=>STATE.completedObj.includes(o.id));
    if(allDone){
      unlock('mission_complete');
      if(m.id==='troisguerres')unlock('three_guerres');
    }
  });

  // Check 5 missions done
  const completedMissions=MISSIONS.filter(m=>m.objectives.every(o=>STATE.completedObj.includes(o.id)));
  if(completedMissions.length>=5)unlock('five_missions');
  if(completedMissions.length>=MISSIONS.length)unlock('all_missions');

  save();
  // Re-render current view
  if(typeof renderCurrentView==='function')renderCurrentView();
}

function toggleObjective(objId){
  if(STATE.completedObj.includes(objId)){
    STATE.completedObj=STATE.completedObj.filter(x=>x!==objId);
    save();
    if(typeof renderCurrentView==='function')renderCurrentView();
  } else {
    completeObjective(objId);
  }
}

// ═══ TOOL COMPLETION ═══
function completeTool(toolId){
  if(STATE.completedTools.includes(toolId))return;
  const t=TOOLS.find(x=>x.id===toolId);
  if(!t)return;
  STATE.completedTools.push(toolId);
  addXP(t.xp);
  toast(`🛠️ <strong>${t.name}</strong> complété (+${t.xp}XP)`,'success');
  if(STATE.completedTools.length===1)unlock('first_tool');
  const voir=TOOLS.filter(t=>t.phase==='voir').every(t=>STATE.completedTools.includes(t.id));
  const juger=TOOLS.filter(t=>t.phase==='juger').every(t=>STATE.completedTools.includes(t.id));
  const agir=TOOLS.filter(t=>t.phase==='agir').every(t=>STATE.completedTools.includes(t.id));
  if(voir)unlock('voir_done');
  if(juger)unlock('juger_done');
  if(agir)unlock('agir_done');
  if(STATE.completedTools.length>=15)unlock('all_tools');
  save();
}

function saveToolField(toolKey,field,value){
  if(!STATE.toolData[toolKey])STATE.toolData[toolKey]={};
  STATE.toolData[toolKey][field]=value;
  save();
}

// ═══ NAVIGATION ═══
function nav(view, id){
  STATE.view=view;
  if(id!==undefined){
    if(view==='mission')STATE.missionId=id;
    if(view==='tool')STATE.toolId=id;
  }
  // Track visited views for explorer achievement
  if(!STATE.visitedViews.includes(view))STATE.visitedViews.push(view);
  if(STATE.visitedViews.length>=6)unlock('explorer');

  if(view==='missions'&&!STATE.achievements.includes('first_mission')){}
  
  renderCurrentView();
  window.scrollTo(0,0);
  save();
}

// ═══ PERSISTENCE ═══
function save(){
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      xp:STATE.xp, achievements:STATE.achievements, theme:STATE.theme,
      completedObj:STATE.completedObj, completedTools:STATE.completedTools,
      toolData:STATE.toolData, files:STATE.files, fcStats:STATE.fcStats,
      project:STATE.project, visitedViews:STATE.visitedViews, totalTime:STATE.totalTime
    }));
  }catch(e){console.error('Save error:',e)}
}

function load(){
  try{
    const s=localStorage.getItem(SAVE_KEY);
    if(!s)return;
    const d=JSON.parse(s);
    Object.assign(STATE,{
      xp:d.xp||0, achievements:d.achievements||[], theme:d.theme||'dark',
      completedObj:d.completedObj||[], completedTools:d.completedTools||[],
      toolData:d.toolData||{}, files:d.files||[], fcStats:d.fcStats||{reviewed:0,sessions:0},
      project:d.project||{}, visitedViews:d.visitedViews||[], totalTime:d.totalTime||0
    });
  }catch(e){console.error('Load error:',e)}
}

function resetAll(){
  if(!confirm('⚠️ Réinitialiser TOUTE la progression? Cette action est irréversible.'))return;
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

// ═══ THEMES ═══
function setTheme(t){
  STATE.theme=t;
  document.documentElement.dataset.theme=t;
  $$('[data-th]').forEach(b=>b.classList.toggle('active',b.dataset.th===t));
  save();
}

// ═══ FILES ═══
function handleFiles(fileList){
  Array.from(fileList).forEach(file=>{
    const reader=new FileReader();
    const ext=file.name.split('.').pop().toLowerCase();
    reader.onload=e=>{
      const content=e.target.result;
      let data=null;
      if(ext==='json'){try{data=JSON.parse(content)}catch{toast('JSON invalide','error');return}}
      else if(ext==='csv'){data=parseCSV(content)}
      else{data=content}
      STATE.files.push({
        id:Date.now()+Math.random(), name:file.name, type:ext,
        data, raw:content,
        created:new Date().toISOString()
      });
      unlock('first_file');
      if(STATE.files.length>=10)unlock('collector');
      toast(`✓ ${file.name} importé`,'success');
      save();
      if(typeof renderCurrentView==='function')renderCurrentView();
    };
    reader.readAsText(file);
  });
}

function parseCSV(text){
  const lines=text.trim().split('\n');
  if(lines.length<2)return[];
  const headers=csvLine(lines[0]);
  return lines.slice(1).map(line=>{
    const vals=csvLine(line);
    const obj={};
    headers.forEach((h,i)=>{
      const hl=h.toLowerCase().trim();
      let key=h;
      if(['question','q','front','recto'].some(k=>hl.includes(k)))key='question';
      else if(['answer','réponse','reponse','a','back','verso'].some(k=>hl.includes(k)))key='answer';
      obj[key]=vals[i]||'';
    });
    return obj;
  }).filter(r=>Object.values(r).some(v=>v.trim()));
}

function csvLine(line){
  const r=[];let c='',q=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"'){if(q&&line[i+1]==='"'){c+='"';i++}else q=!q}
    else if((ch===','||ch===';')&&!q){r.push(c.trim());c=''}
    else c+=ch;
  }
  r.push(c.trim());return r;
}

function isFlashcardFile(f){
  return f.type==='csv'&&Array.isArray(f.data)&&f.data.length>0&&f.data[0].question&&f.data[0].answer;
}

function loadDemoFlashcards(){
  const data=DEMO_FLASHCARDS.map(d=>({question:d.q,answer:d.a}));
  STATE.files.push({
    id:Date.now(), name:'flashcards-resistance-40.csv', type:'csv',
    data, raw:'question,answer\n'+data.map(d=>`"${d.question}","${d.answer}"`).join('\n'),
    created:new Date().toISOString()
  });
  unlock('first_file');
  toast('🎯 40 flashcards chargées!','success');
  save();
  renderCurrentView();
}

// ═══ EXPORT ═══
function exportProject(){
  const data={
    version:'2.0', exported:new Date().toISOString(),
    state:{xp:STATE.xp, achievements:STATE.achievements, completedObj:STATE.completedObj,
           completedTools:STATE.completedTools, toolData:STATE.toolData,
           files:STATE.files, fcStats:STATE.fcStats, project:STATE.project}
  };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`resistance-projet-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  unlock('exporter');
  toast('💾 Projet exporté!','success');
}

function importProject(){
  const input=document.createElement('input');
  input.type='file';input.accept='.json';
  input.onchange=e=>{
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const d=JSON.parse(ev.target.result);
        if(d.state){
          Object.assign(STATE,d.state);
          save();
          renderCurrentView();
          updateXPBar();
          toast('✓ Projet importé!','success');
        }
      }catch(err){toast('Fichier invalide','error')}
    };
    reader.readAsText(e.target.files[0]);
  };
  input.click();
}

// ═══ INIT ═══
function initEngine(){
  load();
  setTheme(STATE.theme);
  updateXPBar();
  // Check time achievement
  const h=new Date().getHours();
  if(h>=0&&h<5)unlock('night_owl');
  // Track time
  setInterval(()=>{STATE.totalTime++;save();},60000);
}
