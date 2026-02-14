const CSV_LINK="https://docs.google.com/spreadsheets/d/e/2PACX-1vSCQD7EM8DG1oZVexXto376AAHwiikJWgAENIRfBX_kFV4vqDXduenXAL9m0LUiju8HtdaWrQvOzw8j/pub?gid=613669233&single=true&output=csv";

let DB={};
let lastTotal=null;

/* ================= LOAD HERO DATABASE ================= */

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
calc(); // IMPORTANT: ustawia UI po załadowaniu
});

/* ================= LISTENERS ================= */
/* FIX: select potrzebuje change + input */

document.querySelectorAll("input,select")
.forEach(e=>{
e.addEventListener("input",calc);
e.addEventListener("change",calc);
});

function calc(){

/* ===== DATA SOURCE ===== */

const manualMode=dataSource.value==="manual";

/* ===== HERO BLOCK VISIBILITY (smooth collapse) ===== */
heroBlock.classList.toggle("hidden",manualMode);

/* ===== SET BONUS HINT ===== */

const setVal = Number(set.value)||0;
setHint.innerText = setVal
?`Base SPD multiplier = x${(1+setVal/100).toFixed(2)}`
:"";

/* ===== BASE / PROWESS SOURCE ===== */

let B2=0,C2=0;

if(!manualMode){
const heroData=DB[hero.value]||{base:0,prow:0};

B2=heroData.base;
C2=heroData.prow;

baseSPD.value=B2;
prowSPD.value=C2;

baseSPD.classList.add("dbMode");
prowSPD.classList.add("dbMode");
baseSPD.classList.remove("manualMode");
prowSPD.classList.remove("manualMode");

}else{

B2=Number(baseSPD.value)||0;
C2=Number(prowSPD.value)||0;

baseSPD.classList.remove("dbMode");
prowSPD.classList.remove("dbMode");
baseSPD.classList.add("manualMode");
prowSPD.classList.add("manualMode");
}

/* ===== MAIN CALC ===== */

const D2=Number(shell.value)||0;
const E2=setVal;

const slotIDs=["mask","transistor","wristwheel","core1","core2","core3"];
const G8=slotIDs.map(id=>Number(document.getElementById(id).value)||0).reduce((a,b)=>a+b,0);

slotSum.innerText=G8;

const G10=Number(manual.value)||0;

let A4=(G8>0)
?B2*(1+E2/100)+C2+D2+40+G8
:B2*(1+E2/100)+C2+D2+40+G10;

const newTotal=Math.round(A4);

/* ===== TOTAL SPEED ANIMATION ===== */

if(lastTotal!==null && lastTotal!==newTotal){
totalSPD.classList.remove("update");
void totalSPD.offsetWidth;
totalSPD.classList.add("update");
}

totalSPD.innerText=newTotal;
lastTotal=newTotal;

/* ===== ENEMY CALC ===== */

const B7=Number(myspd.value)||0;
const C7=mytm.value;
const D7=histm.value;

let A7="";
if(C7!=="") A7=B7/(Number(C7)/100);
else if(D7!=="") A7=B7*(Number(D7)/100);

enemySPD.innerText=A7?Math.round(A7):"";

const E7=Number(enemymanual.value)||0;

let A9="";
if(A7!=="")
A9=A7-(B2*(1+E2/100))-C2-D2-40;
else if(E7!==0)
A9=E7-(B2*(1+E2/100))-C2-D2-40;

enemyModule.innerText=A9?Math.round(A9):"";
}

function clearAll(){
document.querySelectorAll("input").forEach(el=>el.value="");
calc();
}
