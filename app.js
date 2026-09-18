const metricDefinitions = [
  ['Safety','Incidents / near misses','0'],
  ['Safety risk assessment','Trigger level','Low'],
  ['Food safety','Quality triggers','Low'],
  ['CIL packaging','Completion','100%'],
  ['CL packaging','Out of centerline','0'],
  ['Defect handling','Found / fixed','≥1 / ≥1'],
  ['Breakdowns','Breakdowns','0'],
  ['Work process failures','Failures','0'],
  ['Schedule attainment','Produced / scheduled pallets','Meet plan'],
  ['Robert stops','Number of stops','<4 / shift'],
  ['Ingredient overuse','Percent overuse','<0.5%'],
  ['MTBF','Uptime between stops','>115 min'],
  ['Refeed','Number of partials','≤1']
];

const screenshotMetrics = [
  [['0','0','0','—','—'],['green','green','green','empty','empty']],
  [['Low','Low','Low','—','—'],['green','green','green','empty','empty']],
  [['Low','Low','1 high','—','—'],['green','green','red','empty','empty']],
  [['100%','100%','96%','—','—'],['green','green','red','empty','empty']],
  [['0','0','1','—','—'],['green','green','amber','empty','empty']],
  [['0 / 0','1 / 1','2 / 2','—','—'],['red','green','green','empty','empty']],
  [['0','0','0','—','—'],['green','green','green','empty','empty']],
  [['0','0','0','—','—'],['green','green','green','empty','empty']],
  [['9 / 10','12 / 10','12 / 10','—','—'],['red','green','green','empty','empty']],
  [['11','3','4','—','—'],['red','green','amber','empty','empty']],
  [['0.15%','0.16%','0.19%','—','—'],['green','green','green','empty','empty']],
  [['45','140','132','—','—'],['red','green','green','empty','empty']],
  [['0.25','0.50','2','—','—'],['green','green','red','empty','empty']]
];

const metricPlaceholders=['0','Low','Low','100%','0','1 / 1','0','0','10 / 10','3','0.25%','120','1'];

function blankMetrics(){
  return metricDefinitions.map(()=>[Array(5).fill('—'),Array(5).fill('empty')]);
}

function createWeekBoards(withScreenshot=false){
  return {
    S:{all:withScreenshot?clone(screenshotMetrics):blankMetrics(),first:blankMetrics(),second:blankMetrics()},
    T:{all:blankMetrics(),first:blankMetrics(),second:blankMetrics()}
  };
}

function createMetricBoards(){return {current:createWeekBoards(true),next:createWeekBoards(false)}}

const defaultActions = [
  {id:'a1',problem:'Omega non-stop product fill',detail:'Escalated from Sep 13 DDS',line:'S',category:'Reliability',initials:'CB',owner:'Maintenance',due:'Sep 14',age:'3d',status:'Overdue',containment:'Manual observation at every product fill',next:'Validate sensor response under full load'},
  {id:'a2',problem:'Refeed pan variation',detail:'Measure amplitude at three load points',line:'S',category:'Quality',initials:'TR',owner:'Process Eng.',due:'Sep 15',age:'2d',status:'Overdue',containment:'Operator verifies distribution each hour',next:'Compare amplitude against centerline'},
  {id:'a3',problem:'Verify elevator chain tension',detail:'Complete post-changeover inspection',line:'S',category:'Reliability',initials:'CB',owner:'Maintenance',due:'Today',age:'6h',status:'Open',containment:'Inspect before each restart',next:'Record tension after next changeover'},
  {id:'a4',problem:'Run splice detection challenge',detail:'Confirm alarm and reject timing',line:'T',category:'Quality',initials:'AM',owner:'Quality',due:'Today',age:'4h',status:'Open',containment:'Quality observes each roll splice',next:'Run challenge and document response'},
  {id:'a5',problem:'Centerline deviation follow-up',detail:'Verify operator settings',line:'T',category:'Delivery',initials:'JS',owner:'Operations',due:'Today',age:'3h',status:'Open',containment:'Lead checks settings at startup',next:'Compare both shifts against standard'},
  {id:'a6',problem:'Update changeover checklist',detail:'Add elevator inspection point',line:'S',category:'Reliability',initials:'JS',owner:'Operations',due:'Sep 16',age:'1d',status:'Verify',containment:'Use marked-up paper copy',next:'Verify revised checklist on both shifts'},
  {id:'a7',problem:'Review CIL completion gap',detail:'Confirm missed inspection reason',line:'T',category:'Safety',initials:'KL',owner:'Safety',due:'Sep 18',age:'2h',status:'Open',containment:'Lead signs remaining checks',next:'Interview shift team and close process gap'},
  {id:'a8',problem:'Ingredient overuse control limits',detail:'Validate warning threshold',line:'T',category:'Cost',initials:'TR',owner:'Process Eng.',due:'Sep 20',age:'5h',status:'Open',containment:'Review overuse at each break',next:'Test early-warning threshold'}
];

const defaultProjects = [
  {id:'p1',title:'Reduce film-registration rejects',category:'Quality',stage:'Backlog',owner:'AM',summary:'Baseline: 2.4% reject rate',meta:'Impact: $32K',impact:32000,progress:10,next:'Validate defect Pareto by shift'},
  {id:'p2',title:'Ingredient overuse control limits',category:'Cost',stage:'Backlog',owner:'TR',summary:'Baseline: 0.48% average',meta:'Impact: $41K',impact:41000,progress:15,next:'Confirm warning threshold with Finance'},
  {id:'p3',title:'Bucket elevator chain life',category:'Reliability',stage:'In Analysis',owner:'CB',summary:'Root-cause study · 3/5 checks complete',meta:'Due Sep 20',impact:28000,progress:45,next:'Complete chain elongation measurements'},
  {id:'p4',title:'Changeover handoff standard',category:'Delivery',stage:'In Analysis',owner:'JS',summary:'Observe next 3 changeovers',meta:'Due Sep 22',impact:19000,progress:40,next:'Observe second-shift handoff'},
  {id:'p5',title:'Guard interlock visual check',category:'Safety',stage:'Implementing',owner:'KL',summary:'Pilot running on S Line',meta:'68% complete',impact:24000,progress:68,next:'Complete operator qualification'},
  {id:'p6',title:'Refeed pan flow standard',category:'Reliability',stage:'Verifying',owner:'NW',summary:'14-day verification window',meta:'Stops ↓ 61%',impact:40000,progress:90,next:'Complete final five verification days'}
];

const defaultStandards = [
  {id:'d1',type:'SOP',title:'Packaging Line Changeover',code:'SOP-PAK-014',version:6,updated:'Sep 15',owner:'Operations',scope:'S + T Lines',summary:'Defines the verified changeover sequence, ownership and release checks.'},
  {id:'d2',type:'OPL',title:'Bucket Elevator Chain Check',code:'OPL-MNT-027',version:2,updated:'Sep 14',owner:'Maintenance',scope:'S Line',summary:'One-point inspection for chain tension, tracking and wear.'},
  {id:'d3',type:'FS',title:'Food Safety Trigger Response',code:'SOP-QA-008',version:4,updated:'Sep 9',owner:'Quality',scope:'All Packaging',summary:'Immediate containment and escalation requirements after a food-safety trigger.'},
  {id:'d4',type:'SOP',title:'Film Splice Detection Challenge',code:'SOP-PAK-031',version:3,updated:'Sep 7',owner:'Engineering',scope:'T Line',summary:'Challenge method and acceptance criteria for splice detection.'}
];

const clone = value => JSON.parse(JSON.stringify(value));
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const STORAGE_KEY = 'dds-hub-demo-v4';

function freshState(){
  return {metricBoards:createMetricBoards(),currentActions:clone(defaultActions),nextActions:null,projects:clone(defaultProjects),standards:clone(defaultStandards),commitments:[false,false,true],settings:{reminders:true,escalation:true,threshold:24}};
}

function loadState(){
  try{
    const stored=JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored && stored.metricBoards && stored.currentActions && stored.projects && stored.standards ? stored : freshState();
  }catch(error){return freshState()}
}

let state=loadState();
let activeLine='S';
let activeWeek='current';
let activeShift='all';
let actionFilter='all';
let actionQuery='';

function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}

function showToast(message){
  const toast=document.getElementById('toast');
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove('show'),2300);
}

function lineName(){return activeLine}

function parsePalletCount(value){
  const match=String(value).match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
  return match?{produced:Number(match[1]),scheduled:Number(match[2])}:null;
}

function formatPalletCount(count){return `${count.produced} / ${count.scheduled}`}

function palletVariance(count,short=false){
  const difference=count.produced-count.scheduled;
  if(difference===0)return short?'on plan':'Plan met';
  if(short)return difference>0?`+${difference}`:`−${Math.abs(difference)}`;
  const pallets=Math.abs(difference)===1?'pallet':'pallets';
  return difference>0?`${difference} ${pallets} ahead`:`${Math.abs(difference)} ${pallets} behind`;
}

function metricStatus(rowIndex,value){
  if(!value||value==='—')return 'empty';
  const text=String(value).trim().toLowerCase();
  const number=Number.parseFloat(text.replace('%',''));
  if(rowIndex===0)return Number.isFinite(number)&&number===0?'green':'red';
  if(rowIndex===1||rowIndex===2)return text.includes('low')?'green':text.includes('medium')||text.includes('watch')?'amber':'red';
  if(rowIndex===3)return number>=100?'green':number>=98?'amber':'red';
  if(rowIndex===4)return number===0?'green':number===1?'amber':'red';
  if(rowIndex===5){const pair=text.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);return pair&&Number(pair[1])>=1&&Number(pair[2])>=1?'green':'red'}
  if(rowIndex===6||rowIndex===7)return number===0?'green':'red';
  if(rowIndex===8){const count=parsePalletCount(value);return !count?'amber':count.produced>=count.scheduled?'green':'red'}
  if(rowIndex===9)return number<4?'green':number===4?'amber':'red';
  if(rowIndex===10)return number<0.5?'green':number===0.5?'amber':'red';
  if(rowIndex===11)return number>115?'green':number>=100?'amber':'red';
  if(rowIndex===12)return number<=1?'green':'red';
  return 'amber';
}

function activeBoard(){return state.metricBoards[activeWeek][activeLine][activeShift]}

function getLineMetrics(){return clone(activeBoard())}

function currentMetrics(){
  const rows=getLineMetrics();
  return metricDefinitions.map((definition,index)=>[...definition,rows[index][0],rows[index][1]]);
}

function getDayLabels(){
  return activeWeek==='current'?['Monday 14','Tuesday 15','Wednesday 16','Thursday 17','Friday 18']:['Monday 21','Tuesday 22','Wednesday 23','Thursday 24','Friday 25'];
}

function latestEntryDay(rows=currentMetrics()){
  for(let dayIndex=4;dayIndex>=0;dayIndex-=1){
    if(rows.some(row=>row[3][dayIndex]!=='—'))return dayIndex;
  }
  return -1;
}

function firstBlankDay(rows=currentMetrics()){
  const blank=Array.from({length:5},(_,dayIndex)=>dayIndex).find(dayIndex=>rows.every(row=>row[3][dayIndex]==='—'));
  return blank===undefined?Math.max(latestEntryDay(rows),0):blank;
}

function renderMetrics(){
  const rows=currentMetrics();
  const activeDay=latestEntryDay(rows);
  document.getElementById('metricBody').innerHTML=rows.map((row,rowIndex)=>`<tr><td>${escapeHtml(row[0])}</td><td>${escapeHtml(row[1])}</td><td class="target">${escapeHtml(row[2])}</td>${row[3].map((value,dayIndex)=>`<td${dayIndex===activeDay?' class="today-col"':''}><button class="metric-cell ${row[4][dayIndex]}" data-row="${rowIndex}" data-day="${dayIndex}" aria-label="${escapeHtml(`${row[0]}, ${getDayLabels()[dayIndex]}: ${value==='—'?'enter value':value}`)}">${escapeHtml(value)}</button></td>`).join('')}</tr>`).join('');
  document.querySelectorAll('.metric-cell').forEach(cell=>cell.addEventListener('click',()=>{
    const rowIndex=Number(cell.dataset.row),dayIndex=Number(cell.dataset.day);
    currentMetrics()[rowIndex][3][dayIndex]==='—'?openDailyEntry(dayIndex):openMetricDetail(rowIndex,dayIndex);
  }));
  renderKpis(rows);
}

function renderKpis(rows){
  const dayIndex=latestEntryDay(rows);
  const value=index=>dayIndex<0?'—':rows[index][3][dayIndex];
  const color=index=>dayIndex<0?'empty':rows[index][4][dayIndex];
  const set=(id,noteId,text,note,status)=>{
    document.getElementById(id).textContent=text;
    const noteEl=document.getElementById(noteId);
    noteEl.textContent=note;
    noteEl.className=status==='green'?'good':status==='empty'?'':'warn';
  };
  if(dayIndex<0){
    set('kpiSafety','kpiSafetyNote','—','No values entered','empty');
    set('kpiQuality','kpiQualityNote','—','No values entered','empty');
    set('kpiSchedule','kpiScheduleNote','—','No values entered','empty');
    set('kpiOveruse','kpiOveruseNote','—','No values entered','empty');
    set('kpiMtbf','kpiMtbfNote','—','No values entered','empty');
    return;
  }
  set('kpiSafety','kpiSafetyNote',`${value(0)} incidents`,color(0)==='green'?'On target':'Action required',color(0));
  set('kpiQuality','kpiQualityNote',value(2),color(2)==='green'?'On target':'Watch',color(2));
  const schedule=parsePalletCount(value(8));
  const scheduleText=schedule?`${formatPalletCount(schedule)} pallets`:value(8);
  set('kpiSchedule','kpiScheduleNote',scheduleText,schedule?palletVariance(schedule):'Check pallet entry',color(8));
  set('kpiOveruse','kpiOveruseNote',value(10),color(10)==='green'?'Below 0.5%':'Above limit',color(10));
  set('kpiMtbf','kpiMtbfNote',`${value(11)} min`,color(11)==='green'?'Above target':'Below target',color(11));
}

function openMetricDetail(rowIndex,dayIndex){
  const row=currentMetrics()[rowIndex];
  const days=getDayLabels();
  const status={green:'On target',amber:'Watch',red:'Action required'}[row[4][dayIndex]]||'No entry';
  const palletCount=rowIndex===8?parsePalletCount(row[3][dayIndex]):null;
  const actual=palletCount?`${formatPalletCount(palletCount)} pallets`:row[3][dayIndex];
  const actions=[{label:'Close',kind:'ghost',run:closeWorkspace},{label:'Edit this day',kind:'ghost',run:()=>openDailyEntry(dayIndex)}];
  if(row[4][dayIndex]==='red'||row[4][dayIndex]==='amber') actions.push({label:'Create corrective action',kind:'primary',run:()=>{closeWorkspace();openActionModal(`${row[0]} — ${row[1]} (${days[dayIndex]})`)}});
  openWorkspace({eyebrow:`${lineName()} LINE · CONTROL BOARD`,title:row[1],body:`<div class="detail-grid"><div><span>Production line</span><strong>${escapeHtml(lineName())} Line</strong></div><div><span>Day</span><strong>${days[dayIndex]}</strong></div><div><span>Actual</span><strong>${escapeHtml(actual)}</strong></div><div><span>Target</span><strong>${escapeHtml(row[2])}</strong></div></div><div class="detail-callout ${row[4][dayIndex]}"><strong>${status}</strong><p>${row[4][dayIndex]==='green'?'No action is required. Continue the current centerline.':'Review the abnormality, document containment and assign an owner.'}</p></div>`,actions});
}

function openDailyEntry(dayIndex=firstBlankDay()){
  const rows=currentMetrics();
  const days=getDayLabels();
  const shiftText={all:'All Shifts',first:'1st Shift',second:'2nd Shift'}[activeShift];
  const inputs=metricDefinitions.map((definition,rowIndex)=>`<label>${escapeHtml(definition[0])} · ${escapeHtml(definition[1])} · Target ${escapeHtml(definition[2])}<input id="metricInput${rowIndex}" data-metric-input="${rowIndex}" value="${rows[rowIndex][3][dayIndex]==='—'?'':escapeHtml(rows[rowIndex][3][dayIndex])}" placeholder="${escapeHtml(metricPlaceholders[rowIndex])}"></label>`).join('');
  openWorkspace({eyebrow:`${lineName()} LINE · DAILY ENTRY`,title:`Enter ${days[dayIndex]} values`,body:`<form class="workspace-form" id="dailyEntryForm"><label class="full">Day<select id="dailyEntryDay">${days.map((day,index)=>`<option value="${index}" ${index===dayIndex?'selected':''}>${day}</option>`).join('')}</select></label><div class="detail-section" style="grid-column:1/-1"><span>${escapeHtml(shiftText)}</span><p>Enter the actual result for each metric. Blank fields remain empty; status colors are calculated from the original targets.</p></div>${inputs}</form>`,actions:[{label:'Cancel',kind:'ghost',run:closeWorkspace},{label:'Save daily values',kind:'primary',run:()=>saveDailyEntry(dayIndex)}]});
  document.getElementById('dailyEntryForm').addEventListener('submit',event=>{event.preventDefault();saveDailyEntry(dayIndex)});
  document.getElementById('dailyEntryDay').addEventListener('change',event=>openDailyEntry(Number(event.target.value)));
  document.getElementById('metricInput0').focus();
}

function saveDailyEntry(dayIndex){
  const board=activeBoard();
  metricDefinitions.forEach((definition,rowIndex)=>{
    let value=document.getElementById(`metricInput${rowIndex}`).value.trim()||'—';
    if(rowIndex===8){const count=parsePalletCount(value);if(count)value=formatPalletCount(count)}
    board[rowIndex][0][dayIndex]=value;
    board[rowIndex][1][dayIndex]=metricStatus(rowIndex,value);
  });
  saveState();closeWorkspace();updateContext();showToast(`${lineName()} Line · ${getDayLabels()[dayIndex]} values saved`);
}

function currentActionSet(){return activeWeek==='next'?(state.nextActions||[]):state.currentActions}

function filteredActions(){
  return currentActionSet().filter(action=>{
    const lineMatch=action.line===activeLine;
    const filterMatch=actionFilter==='all'||(actionFilter==='mine'&&action.owner==='Operations')||(actionFilter==='overdue'&&action.status==='Overdue')||(actionFilter==='today'&&action.due==='Today');
    const queryMatch=Object.values(action).join(' ').toLowerCase().includes(actionQuery.toLowerCase());
    return lineMatch&&filterMatch&&queryMatch;
  });
}

function renderActions(){
  const actions=filteredActions();
  document.getElementById('actionTableBody').innerHTML=actions.length?actions.map(action=>`<tr class="action-row" data-action-id="${action.id}" tabindex="0"><td>${escapeHtml(action.problem)}<small>${escapeHtml(action.detail)}</small></td><td><span class="line-chip">${action.line}</span></td><td>${escapeHtml(action.category)}</td><td><div class="owner-chip"><span class="mini-avatar">${action.initials}</span><span>${escapeHtml(action.owner)}</span></div></td><td>${escapeHtml(action.due)}</td><td>${escapeHtml(action.age)}</td><td><span class="status-badge status-${action.status.toLowerCase().replace(' ','-')}">${escapeHtml(action.status)}</span></td></tr>`).join(''):`<tr><td colspan="7"><div class="empty-state"><strong>No matching actions</strong><span>Change the filters or create a new action.</span></div></td></tr>`;
  document.querySelectorAll('.action-row').forEach(row=>{
    const open=()=>openActionDetail(row.dataset.actionId);
    row.addEventListener('click',open);
    row.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
  });
  updateActionCounts();
}

function updateActionCounts(){
  const set=currentActionSet().filter(action=>action.line===activeLine);
  document.getElementById('allCount').textContent=set.length;
  document.getElementById('mineCount').textContent=set.filter(action=>action.owner==='Operations').length;
  document.getElementById('overdueCount').textContent=set.filter(action=>action.status==='Overdue').length;
  document.getElementById('todayCount').textContent=set.filter(action=>action.due==='Today').length;
  const openCount=set.filter(action=>['Open','Overdue'].includes(action.status)).length;
  document.querySelector('.nav-count').textContent=openCount;
}

function findAction(id){return currentActionSet().find(action=>action.id===id)}

function openActionDetail(id){
  const action=findAction(id);
  if(!action)return;
  const nextLabel=action.status==='Verify'?'Close action':action.status==='Closed'?'Reopen action':'Send to verification';
  openWorkspace({eyebrow:`${action.line} LINE · ${action.category.toUpperCase()}`,title:action.problem,body:`<div class="detail-grid"><div><span>Owner</span><strong>${escapeHtml(action.initials)} · ${escapeHtml(action.owner)}</strong></div><div><span>Status</span><strong>${escapeHtml(action.status)}</strong></div><div><span>Due</span><strong>${escapeHtml(action.due)}</strong></div><div><span>Age</span><strong>${escapeHtml(action.age)}</strong></div></div><div class="detail-section"><span>Problem / action</span><p>${escapeHtml(action.detail)}</p></div><div class="detail-section"><span>Containment</span><p>${escapeHtml(action.containment||'Not yet documented')}</p></div><div class="detail-section"><span>Next step</span><p>${escapeHtml(action.next||'Not yet assigned')}</p></div>`,actions:[{label:'Open line dashboard',kind:'ghost',run:()=>{activeLine=action.line;document.getElementById('lineSelect').value=action.line;closeWorkspace();showView('dashboard');updateContext()}},{label:nextLabel,kind:'primary',run:()=>advanceAction(action.id)}]});
}

function advanceAction(id){
  const action=findAction(id);
  if(!action)return;
  action.status=action.status==='Verify'?'Closed':action.status==='Closed'?'Open':'Verify';
  action.age=action.status==='Closed'?'—':action.age;
  saveState();
  closeWorkspace();
  renderActions();
  showToast(`Action moved to ${action.status}`);
}

function openActionModal(problem=''){
  document.getElementById('modalBackdrop').hidden=false;
  document.getElementById('problemInput').value=problem;
  document.getElementById('actionLine').value=activeLine;
  document.getElementById('actionDue').value=activeWeek==='next'?'2026-09-25':'2026-09-18';
  document.getElementById('actionContainment').value='';
  document.getElementById('actionNext').value='';
  document.getElementById('problemInput').focus();
}

function closeActionModal(){document.getElementById('modalBackdrop').hidden=true}

function formatDue(dateString){
  if(dateString==='2026-09-18')return 'Today';
  const date=new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime())?dateString:date.toLocaleDateString('en-US',{month:'short',day:'numeric'});
}

function createAction(event){
  event.preventDefault();
  const problem=document.getElementById('problemInput').value.trim();
  if(!problem)return;
  const [initials,owner]=document.getElementById('actionOwner').value.split('|');
  const target=activeWeek==='next'?(state.nextActions||(state.nextActions=[])):state.currentActions;
  target.unshift({id:`a${Date.now()}`,problem,detail:document.getElementById('actionNext').value.trim()||'Created from DDS dashboard',line:document.getElementById('actionLine').value,category:document.getElementById('actionCategory').value,initials,owner,due:formatDue(document.getElementById('actionDue').value),age:'Now',status:'Open',containment:document.getElementById('actionContainment').value.trim(),next:document.getElementById('actionNext').value.trim()});
  saveState();
  closeActionModal();
  renderActions();
  showToast(`${document.getElementById('actionLine').value} Line action created`);
}

const projectStages=['Backlog','In Analysis','Implementing','Verifying','Verified'];
const stageTargets={Backlog:'backlogCards','In Analysis':'analysisCards',Implementing:'implementingCards',Verifying:'verifyingCards'};
const tagClasses={Safety:'safe-tag',Quality:'quality-tag',Delivery:'delivery-tag',Cost:'cost-tag',Reliability:'reliability-tag'};

function renderProjects(){
  Object.values(stageTargets).forEach(id=>document.getElementById(id).innerHTML='');
  state.projects.filter(project=>project.stage!=='Verified').forEach(project=>{
    const target=document.getElementById(stageTargets[project.stage]);
    target.insertAdjacentHTML('beforeend',`<article class="project-card" data-project-id="${project.id}" tabindex="0"><span class="tag ${tagClasses[project.category]||'delivery-tag'}">${escapeHtml(project.category.toUpperCase())}</span><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p>${project.stage==='Implementing'?`<div class="progress"><i style="width:${project.progress}%"></i></div>`:''}${project.stage==='Verifying'?'<div class="spark-bars"><i style="height:70%"></i><i style="height:52%"></i><i style="height:43%"></i><i style="height:28%"></i><i style="height:20%"></i></div>':''}<footer><span class="mini-avatar">${escapeHtml(project.owner)}</span><small>${escapeHtml(project.meta)}</small></footer></article>`);
  });
  document.querySelectorAll('.kanban-col').forEach(column=>{
    column.querySelector('header b').textContent=state.projects.filter(project=>project.stage===column.dataset.stage).length;
  });
  document.querySelectorAll('.project-card').forEach(card=>{
    const open=()=>openProject(card.dataset.projectId);
    card.addEventListener('click',open);
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
  });
  const active=state.projects.filter(project=>project.stage!=='Verified');
  const summaries=document.querySelectorAll('.pipeline-summary strong');
  summaries[0].textContent=active.length;
  summaries[1].textContent=`$${Math.round(state.projects.reduce((sum,project)=>sum+project.impact,0)/1000)}K`;
  summaries[3].textContent=4+state.projects.filter(project=>project.stage==='Verified').length;
}

function openProject(id){
  const project=state.projects.find(item=>item.id===id);
  if(!project)return;
  const currentIndex=projectStages.indexOf(project.stage);
  const nextStage=projectStages[currentIndex+1];
  openWorkspace({eyebrow:`CI PROJECT · ${project.category.toUpperCase()}`,title:project.title,body:`<div class="detail-grid"><div><span>Stage</span><strong>${escapeHtml(project.stage)}</strong></div><div><span>Owner</span><strong>${escapeHtml(project.owner)}</strong></div><div><span>Progress</span><strong>${project.progress}%</strong></div><div><span>Annual impact</span><strong>$${project.impact.toLocaleString()}</strong></div></div><div class="progress large"><i style="width:${project.progress}%"></i></div><div class="detail-section"><span>Current condition</span><p>${escapeHtml(project.summary)}</p></div><div class="detail-section"><span>Next gate</span><p>${escapeHtml(project.next)}</p></div>`,actions:[{label:'Close',kind:'ghost',run:closeWorkspace},nextStage?{label:nextStage==='Verified'?'Mark verified':`Advance to ${nextStage}`,kind:'primary',run:()=>advanceProject(project.id)}:null].filter(Boolean)});
}

function advanceProject(id){
  const project=state.projects.find(item=>item.id===id);
  if(!project)return;
  const next=projectStages[projectStages.indexOf(project.stage)+1];
  if(!next)return;
  project.stage=next;
  project.progress={Backlog:15,'In Analysis':40,Implementing:70,Verifying:90,Verified:100}[next];
  saveState();
  closeWorkspace();
  renderProjects();
  showToast(next==='Verified'?'Improvement verified and sustained':`Project advanced to ${next}`);
}

function openOpportunityForm(){
  openWorkspace({eyebrow:'CONTINUOUS IMPROVEMENT',title:'Submit an opportunity',body:`<form class="workspace-form" id="opportunityForm"><label class="full">Opportunity<input id="opportunityTitle" required placeholder="What should be improved?"></label><label>Category<select id="opportunityCategory"><option>Safety</option><option>Quality</option><option>Delivery</option><option>Cost</option><option>Reliability</option></select></label><label>Owner initials<input id="opportunityOwner" maxlength="2" value="JS"></label><label class="full">Current condition<textarea id="opportunitySummary" placeholder="Describe the baseline or loss"></textarea></label><label>Annual impact ($)<input id="opportunityImpact" type="number" min="0" value="10000"></label><label>Next step<input id="opportunityNext" value="Validate baseline with the team"></label></form>`,actions:[{label:'Cancel',kind:'ghost',run:closeWorkspace},{label:'Add to backlog',kind:'primary',run:createOpportunity}]});
}

function createOpportunity(){
  const title=document.getElementById('opportunityTitle').value.trim();
  if(!title){document.getElementById('opportunityTitle').focus();return}
  const impact=Number(document.getElementById('opportunityImpact').value)||0;
  state.projects.push({id:`p${Date.now()}`,title,category:document.getElementById('opportunityCategory').value,stage:'Backlog',owner:document.getElementById('opportunityOwner').value.trim().toUpperCase()||'OP',summary:document.getElementById('opportunitySummary').value.trim()||'Baseline to be confirmed',meta:`Impact: $${Math.round(impact/1000)}K`,impact,progress:5,next:document.getElementById('opportunityNext').value.trim()||'Validate baseline'});
  saveState();closeWorkspace();renderProjects();showToast('Opportunity added to the CI backlog');
}

function renderStandards(){
  const query=document.getElementById('standardSearch').value.toLowerCase();
  const type=document.getElementById('standardType').value;
  const docs=state.standards.filter(doc=>(type==='all'||doc.type===type)&&Object.values(doc).join(' ').toLowerCase().includes(query));
  document.getElementById('documentGrid').innerHTML=docs.length?docs.map(doc=>`<article class="document-card" data-doc-id="${doc.id}" tabindex="0"><div class="doc-icon ${doc.type==='OPL'?'opl':doc.type==='FS'?'fs':'sop'}">${doc.type}</div><div><h3>${escapeHtml(doc.title)}</h3><p>${escapeHtml(doc.code)} · Version ${doc.version}</p><small>Updated ${escapeHtml(doc.updated)} · Owner: ${escapeHtml(doc.owner)}</small></div><span class="doc-open">›</span></article>`).join(''):`<div class="empty-state wide"><strong>No standards found</strong><span>Change the search or upload a new standard.</span></div>`;
  document.querySelectorAll('.document-card').forEach(card=>{
    const open=()=>openStandard(card.dataset.docId);
    card.addEventListener('click',open);
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
  });
}

function openStandard(id){
  const doc=state.standards.find(item=>item.id===id);
  if(!doc)return;
  openWorkspace({eyebrow:`${doc.type} · CONTROLLED COPY`,title:doc.title,body:`<div class="detail-grid"><div><span>Document number</span><strong>${escapeHtml(doc.code)}</strong></div><div><span>Revision</span><strong>Version ${doc.version}</strong></div><div><span>Owner</span><strong>${escapeHtml(doc.owner)}</strong></div><div><span>Applies to</span><strong>${escapeHtml(doc.scope)}</strong></div></div><div class="document-preview"><span>${doc.type}</span><h3>${escapeHtml(doc.title)}</h3><p>${escapeHtml(doc.summary)}</p><small>Controlled copy · Updated ${escapeHtml(doc.updated)}</small></div>`,actions:[{label:'Download demo copy',kind:'ghost',run:()=>downloadStandard(doc)},{label:'Start new revision',kind:'primary',run:()=>reviseStandard(doc.id)}]});
}

function downloadStandard(doc){
  const content=`${doc.title}\n${doc.code} · Version ${doc.version}\nOwner: ${doc.owner}\nScope: ${doc.scope}\n\n${doc.summary}\n\nDEMO CONTROLLED COPY`;
  const url=URL.createObjectURL(new Blob([content],{type:'text/plain'}));
  const link=document.createElement('a');link.href=url;link.download=`${doc.code}-v${doc.version}-demo.txt`;link.click();URL.revokeObjectURL(url);
  showToast('Demo document downloaded');
}

function reviseStandard(id){
  const doc=state.standards.find(item=>item.id===id);if(!doc)return;
  doc.version+=1;doc.updated='Today';saveState();closeWorkspace();renderStandards();showToast(`${doc.code} advanced to Version ${doc.version}`);
}

function openStandardForm(){
  openWorkspace({eyebrow:'STANDARDS LIBRARY',title:'Upload a standard',body:`<form class="workspace-form" id="standardForm"><label class="full">Document title<input id="standardTitle" required placeholder="Standard title"></label><label>Type<select id="standardTypeInput"><option>SOP</option><option>OPL</option><option value="FS">Food safety</option></select></label><label>Document number<input id="standardCode" value="SOP-PAK-"></label><label>Owner<input id="standardOwner" value="Operations"></label><label>Scope<select id="standardScope"><option>S + T Lines</option><option>S Line</option><option>T Line</option><option>All Packaging</option></select></label><label class="full">Purpose<textarea id="standardSummary" placeholder="What does this standard control?"></textarea></label></form>`,actions:[{label:'Cancel',kind:'ghost',run:closeWorkspace},{label:'Upload demo document',kind:'primary',run:createStandard}]});
}

function createStandard(){
  const title=document.getElementById('standardTitle').value.trim();if(!title){document.getElementById('standardTitle').focus();return}
  state.standards.unshift({id:`d${Date.now()}`,type:document.getElementById('standardTypeInput').value,title,code:document.getElementById('standardCode').value.trim()||'DRAFT',version:1,updated:'Today',owner:document.getElementById('standardOwner').value.trim()||'Operations',scope:document.getElementById('standardScope').value,summary:document.getElementById('standardSummary').value.trim()||'Draft standard awaiting review.'});
  saveState();closeWorkspace();renderStandards();showToast('Standard added to the library');
}

function openHistory(){
  openWorkspace({eyebrow:'STOP HISTORY',title:`${lineName()} Line · Top recurring stops`,body:`<div class="history-chart"><div><span>Bucket elevator chain</span><i style="width:92%"></i><b>42 min</b></div><div><span>Film registration</span><i style="width:68%"></i><b>31 min</b></div><div><span>Product refeed</span><i style="width:46%"></i><b>21 min</b></div><div><span>Jaw obstruction</span><i style="width:29%"></i><b>13 min</b></div></div><div class="history-table"><div><b>Mon</b><span>8 stops</span><strong>34 min</strong></div><div><b>Tue</b><span>5 stops</span><strong>26 min</strong></div><div><b>Wed</b><span>7 stops</span><strong>29 min</strong></div></div>`,actions:[{label:'Close',kind:'primary',run:closeWorkspace}]});
}

function updateContext(){
  const isCurrent=activeWeek==='current';
  const shiftText={all:'All Shifts',first:'1st Shift',second:'2nd Shift'}[activeShift];
  document.getElementById('boardLineChip').textContent=`${lineName()} Line`;
  document.getElementById('weekLabel').textContent=`Week of ${isCurrent?'September 14–18':'September 21–25'}, 2026 · ${shiftText}`;
  const labels=isCurrent?['Mon 14','Tue 15','Wed 16','Thu 17','Fri 18']:['Mon 21','Tue 22','Wed 23','Thu 24','Fri 25'];
  const activeDay=latestEntryDay();
  document.getElementById('metricHead').innerHTML=`<tr><th>Category</th><th>Metric</th><th>Target</th>${labels.map((label,index)=>`<th${index===activeDay?' class="today-col"':''}>${label}</th>`).join('')}</tr>`;
  renderMetrics();renderActions();
}

function showView(id){
  document.querySelectorAll('.page').forEach(page=>page.classList.toggle('active',page.id===id));
  document.querySelectorAll('.nav-item').forEach(item=>item.classList.toggle('active',item.dataset.view===id));
  hideSuitePopover();
  if(id==='actions')renderActions();
  if(id==='pipeline')renderProjects();
  if(id==='standards')renderStandards();
  window.scrollTo(0,0);
}

const workspace=document.getElementById('workspaceBackdrop');
function openWorkspace({eyebrow,title,body,actions=[]}){
  document.getElementById('workspaceEyebrow').textContent=eyebrow;
  document.getElementById('workspaceTitle').textContent=title;
  document.getElementById('workspaceBody').innerHTML=body;
  const actionArea=document.getElementById('workspaceActions');
  actionArea.innerHTML=actions.map((action,index)=>`<button class="btn ${action.kind==='primary'?'primary':'ghost'}" data-workspace-action="${index}">${escapeHtml(action.label)}</button>`).join('');
  actions.forEach((action,index)=>actionArea.querySelector(`[data-workspace-action="${index}"]`).addEventListener('click',action.run));
  workspace.hidden=false;
  document.getElementById('workspaceClose').focus();
}
function closeWorkspace(){workspace.hidden=true}

function startNewWeek(){
  state.nextActions=state.currentActions.filter(action=>!['Verify','Closed'].includes(action.status)).map(action=>({...clone(action),id:`n${action.id}`,detail:`Carried from Sep 14–18 · ${action.detail}`,due:action.due==='Today'?'Sep 21':action.due,age:action.age==='Now'?'3d':action.age}));
  activeWeek='next';document.getElementById('weekSelect').value='next';saveState();document.getElementById('weekBackdrop').hidden=true;updateContext();showToast(`New week started · ${state.nextActions.length} actions carried forward`);
}

function openSettings(){
  openWorkspace({eyebrow:'DDS SETTINGS',title:'Demo controls',body:`<div class="settings-list"><label><div><strong>Owner reminders</strong><span>Show reminder behavior for actions due today.</span></div><input type="checkbox" id="settingReminders" ${state.settings.reminders?'checked':''}></label><label><div><strong>Automatic escalation</strong><span>Flag actions that remain open past the threshold.</span></div><input type="checkbox" id="settingEscalation" ${state.settings.escalation?'checked':''}></label><label><div><strong>Escalation threshold</strong><span>Hours before an open action becomes overdue.</span></div><select id="settingThreshold"><option value="12">12 hours</option><option value="24">24 hours</option><option value="48">48 hours</option></select></label></div><button class="danger-link" id="resetDemoBtn">Reset all demo data</button>`,actions:[{label:'Cancel',kind:'ghost',run:closeWorkspace},{label:'Save settings',kind:'primary',run:saveSettings}]});
  document.getElementById('settingThreshold').value=String(state.settings.threshold);
  document.getElementById('resetDemoBtn').addEventListener('click',confirmReset);
}

function saveSettings(){
  state.settings.reminders=document.getElementById('settingReminders').checked;
  state.settings.escalation=document.getElementById('settingEscalation').checked;
  state.settings.threshold=Number(document.getElementById('settingThreshold').value);
  saveState();closeWorkspace();showToast('DDS settings saved');
}

function confirmReset(){
  openWorkspace({eyebrow:'RESET DEMO',title:'Restore the original sample data?',body:'<div class="detail-callout red"><strong>This clears your demo changes</strong><p>Entered daily values, created actions, project moves, uploaded standards and settings will return to the original sample state.</p></div>',actions:[{label:'Cancel',kind:'ghost',run:openSettings},{label:'Reset demo',kind:'primary',run:resetDemo}]});
}

function resetDemo(){
  state=freshState();activeWeek='current';activeLine='S';activeShift='all';actionFilter='all';actionQuery='';
  document.getElementById('weekSelect').value='current';document.getElementById('lineSelect').value='S';document.getElementById('shiftSelect').selectedIndex=0;
  saveState();closeWorkspace();renderAll();showView('dashboard');showToast('Demo restored to its original state');
}

const suitePopover=document.getElementById('suitePopover');
function showSuitePopover(kind){
  const apps=`<div class="popover-title">Microsoft 365</div><div class="app-grid"><button data-goto="dashboard"><b>▦</b><span>DDS</span></button><button data-goto="actions"><b>✓</b><span>Actions</span></button><button data-goto="pipeline"><b>↗</b><span>CI Pipeline</span></button><button data-goto="standards"><b>▤</b><span>Standards</span></button></div>`;
  const profile=`<div class="profile-card"><span class="avatar large">OP</span><div><strong>Operations user</strong><small>Packaging · Demo profile</small></div></div><button class="popover-row" data-goto="actions">View my actions <span>›</span></button><button class="popover-row" data-settings>Demo settings <span>›</span></button>`;
  suitePopover.innerHTML=kind==='apps'?apps:profile;
  suitePopover.hidden=false;
  document.getElementById('appLauncherBtn').setAttribute('aria-expanded',kind==='apps'?'true':'false');
  suitePopover.querySelectorAll('[data-goto]').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.goto)));
  suitePopover.querySelectorAll('[data-settings]').forEach(button=>button.addEventListener('click',()=>{hideSuitePopover();openSettings()}));
}
function hideSuitePopover(){suitePopover.hidden=true;document.getElementById('appLauncherBtn').setAttribute('aria-expanded','false')}

function syncDemo(){
  const footer=document.getElementById('syncBtn');
  footer.classList.add('syncing');
  footer.querySelector('small').textContent='Syncing…';
  setTimeout(()=>{const time=new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});footer.classList.remove('syncing');footer.querySelector('small').textContent=`Today, ${time}`;showToast('Lists, actions and standards are up to date')},700);
}

function renderCommitments(){
  document.querySelectorAll('.check').forEach((button,index)=>{
    button.classList.toggle('done',state.commitments[index]);
    button.textContent=state.commitments[index]?'✓':'';
  });
}

function renderAll(){updateContext();renderProjects();renderStandards();renderCommitments()}

document.querySelectorAll('.nav-item').forEach(item=>item.addEventListener('click',()=>showView(item.dataset.view)));
document.querySelectorAll('.nav-goto').forEach(item=>item.addEventListener('click',()=>showView(item.dataset.goto)));
document.getElementById('lineSelect').addEventListener('change',event=>{activeLine=event.target.value;updateContext();showToast(`Showing ${lineName()} Line`)});
document.getElementById('shiftSelect').addEventListener('change',event=>{activeShift={0:'all',1:'first',2:'second'}[event.target.selectedIndex];updateContext();showToast(`Showing ${event.target.value}`)});
document.getElementById('weekSelect').addEventListener('change',event=>{activeWeek=event.target.value;updateContext();if(activeWeek==='next'&&!state.nextActions)showToast('Next week is ready to be started')});
document.getElementById('enterValuesBtn').addEventListener('click',()=>openDailyEntry());
document.getElementById('presentBtn').addEventListener('click',()=>{document.body.classList.toggle('presentation');document.getElementById('presentBtn').textContent=document.body.classList.contains('presentation')?'◉ Exit presentation':'◉ Present DDS'});
document.getElementById('newWeekBtn').addEventListener('click',()=>document.getElementById('weekBackdrop').hidden=false);
document.getElementById('confirmWeek').addEventListener('click',startNewWeek);
document.getElementById('weekClose').addEventListener('click',()=>document.getElementById('weekBackdrop').hidden=true);
document.getElementById('weekCancel').addEventListener('click',()=>document.getElementById('weekBackdrop').hidden=true);
document.getElementById('weekBackdrop').addEventListener('click',event=>{if(event.target.id==='weekBackdrop')event.currentTarget.hidden=true});

document.getElementById('addActionBtn').addEventListener('click',()=>openActionModal());
document.querySelectorAll('.add-action').forEach(button=>button.addEventListener('click',()=>openActionModal()));
document.querySelectorAll('.stop-item').forEach(button=>button.addEventListener('click',()=>openActionModal(button.dataset.action)));
document.querySelectorAll('.overdue-action').forEach(button=>button.addEventListener('click',()=>{const action=currentActionSet().find(item=>item.problem===button.dataset.actionName);if(action)openActionDetail(action.id)}));
document.getElementById('historyBtn').addEventListener('click',openHistory);
document.getElementById('modalClose').addEventListener('click',closeActionModal);
document.getElementById('cancelBtn').addEventListener('click',closeActionModal);
document.getElementById('modalBackdrop').addEventListener('click',event=>{if(event.target.id==='modalBackdrop')closeActionModal()});
document.getElementById('actionForm').addEventListener('submit',createAction);

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));button.classList.add('active');actionFilter=button.dataset.filter;renderActions()}));
document.getElementById('actionSearch').addEventListener('input',event=>{actionQuery=event.target.value;renderActions()});
document.getElementById('submitOpportunityBtn').addEventListener('click',openOpportunityForm);
document.getElementById('uploadStandardBtn').addEventListener('click',openStandardForm);
document.getElementById('standardSearch').addEventListener('input',renderStandards);
document.getElementById('standardType').addEventListener('change',renderStandards);

document.querySelectorAll('.check').forEach((button,index)=>button.addEventListener('click',()=>{state.commitments[index]=!state.commitments[index];saveState();renderCommitments();showToast(state.commitments[index]?'Commitment completed':'Commitment reopened')}));
document.getElementById('workspaceClose').addEventListener('click',closeWorkspace);
workspace.addEventListener('click',event=>{if(event.target===workspace)closeWorkspace()});
document.getElementById('settingsBtn').addEventListener('click',openSettings);
document.getElementById('appLauncherBtn').addEventListener('click',event=>{event.stopPropagation();suitePopover.hidden?showSuitePopover('apps'):hideSuitePopover()});
document.getElementById('profileBtn').addEventListener('click',event=>{event.stopPropagation();showSuitePopover('profile')});
document.getElementById('syncBtn').addEventListener('click',syncDemo);
document.addEventListener('click',event=>{if(!suitePopover.hidden&&!suitePopover.contains(event.target)&&!event.target.closest('#appLauncherBtn')&&!event.target.closest('#profileBtn'))hideSuitePopover()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeActionModal();closeWorkspace();document.getElementById('weekBackdrop').hidden=true;hideSuitePopover();if(document.body.classList.contains('presentation'))document.getElementById('presentBtn').click()}});

renderAll();
