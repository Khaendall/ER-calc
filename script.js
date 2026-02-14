const CSV_LINK="https://docs.google.com/spreadsheets/d/e/2PACX-1vSCQD7EM8DG1oZVexXto376AAHwiikJWgAENIRfBX_kFV4vqDXduenXAL9m0LUiju8HtdaWrQvOzw8j/pub?gid=613669233&single=true&output=csv";

let DB={};
let lastTotal=null;

fetch(CSV_LINK)
.then(r=>r.text())
.then(csv=>{
csv.trim().split("\n").forEach(r=>{
const c=r.split(",");
DB[c[0]]={base:+c[1],prow:+c[2]};
const opt=document.createElement("option");
opt.value=c[0];
opt.textContent=c[0];
hero.appendChild(opt);
});
loadState();
calc();
});

document.querySelectorAll("input,select")
.forEach(e=>e.addEventListener("input",()=>{saveState();calc();}));

function animateNumber(el,start,end){
const duration=180;
const startTime=performance.now();
function frame(t){
const p=Math.min((t-startTime)/duration,1);
el.innerText=Math.round(start+(end-start)*p);
if(p<1)requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
}

function calc(){

const manualMode=dataSource.value==="manual";

heroBlock.classList.toggle("hidden",manualMode);

let B2=0,C2=0;

if(!manualMode){
const heroData=DB[hero.value]||{base:0,prow:0};
B2=heroData.base;
C2=heroData.prow;
baseSPD.value=B2;
prowSPD.value=C2;
baseSPD.disabled=true;
prowSPD.disabled=true;
baseSPD.classList.add("dbMode");
prowSPD.classList.add("dbMode");
baseSPD.classList.remove("manualMode");
prowSPD.classList.remove("manualMode");
}else{
B2=+baseSPD.value||0;
C2=+prowSPD.value||0;
baseSPD.disabled=false;
prowSPD.disabled=false;
baseSPD.classList.remove("dbMode");
prowSPD.classList.remove("dbMode");
baseSPD.classList.add("manualMode");
prowSPD.classList.add("manualMode");
}

const D2=num("shell");
const E2=num("set");

const slots=["mask","transistor","wristwheel","core1","core2","core3"];
const G8=slots.map(id=>num(id)).reduce((a,b)=>a+b,0);
slotSum.innerText=G8;

const G10=num("manual");

manual.disabled=G8>0;
slots.forEach(id=>document.getElementById(id).disabled=G10>0);

let A4=(G8>0)
?B2*(1+E2/100)+C2+D2+40+G8
:B2*(1+E2/100)+C2+D2+40+G10;

const newTotal=Math.round(A4);

if(lastTotal!==null && lastTotal!==newTotal){
totalSPD.classList.remove("update");
void totalSPD.offsetWidth;
totalSPD.classList.add("update");
animateNumber(totalSPD,lastTotal,newTotal);
}else{
totalSPD.innerText=newTotal;
}

lastTotal=newTotal;

const B7=num("myspd");
const C7=mytm.value;
const D7=histm.value;

let A7="";
if(C7!=="")A7=B7/(+C7/100);
else if(D7!=="")A7=B7*(+D7/100);

enemySPD.innerText=A7?Math.round(A7):"";

const E7=num("enemymanual");

let A9="";
if(A7!=="")A9=A7-(B2*(1+E2/100))-C2-D2-40;
else if(E7!==0)A9=E7-(B2*(1+E2/100))-C2-D2-40;

enemyModule.innerText=A9?Math.round(A9):"";
}

function num(id){return +document.getElementById(id).value||0;}

function saveState(){
const data={};
document.querySelectorAll("input,select").forEach(el=>data[el.id]=el.value);
localStorage.setItem("etheriaCalc",JSON.stringify(data));
}

function loadState(){
const saved=JSON.parse(localStorage.getItem("etheriaCalc")||"{}");

if(!saved.dataSource)saved.dataSource="manual";

Object.keys(saved).forEach(id=>{
if(document.getElementById(id))document.getElementById(id).value=saved[id];
});
}

function clearAll(){
localStorage.removeItem("etheriaCalc");
location.reload();
}
