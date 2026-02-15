const CSV_LINK="https://docs.google.com/spreadsheets/d/e/2PACX-1vSCQD7EM8DG1oZVexXto376AAHwiikJWgAENIRfBX_kFV4vqDXduenXAL9m0LUiju8HtdaWrQvOzw8j/pub?gid=613669233&single=true&output=csv";

const BASE_FLAT_SPEED = 40;

const el={
 hero:document.getElementById("hero"),
 heroBlock:document.getElementById("heroBlock"),
 dataSource:document.getElementById("dataSource"),
 baseSPD:document.getElementById("baseSPD"),
 prowSPD:document.getElementById("prowSPD"),
 shell:document.getElementById("shell"),
 set:document.getElementById("set"),
 setHint:document.getElementById("setHint"),
 totalSPD:document.getElementById("totalSPD"),
 manual:document.getElementById("manual"),
 slotSum:document.getElementById("slotSum"),
 enemySPD:document.getElementById("enemySPD"),
 enemySpeedBlock:document.getElementById("enemySpeedBlock"),
 enemyRawBlock:document.getElementById("enemyRawBlock"),
 enemyModule:document.getElementById("enemyModule"),
 enemymanual:document.getElementById("enemymanual"),
 myspd:document.getElementById("myspd"),
 mytm:document.getElementById("mytm"),
 histm:document.getElementById("histm")
};

let DB={};
let lastTotal=null;
let lastEnemy=null;

fetch(CSV_LINK)
.then(r=>r.text())
.then(csv=>{
csv.trim().split("\n").forEach(r=>{
const c=r.split(",");
DB[c[0]]={base:+c[1],prow:+c[2]};
const opt=document.createElement("option");
opt.value=c[0];
opt.textContent=c[0];
el.hero.appendChild(opt);
});
calc();
})
.catch(()=>console.warn("Hero database failed to load"));

document.querySelectorAll("input,select")
.forEach(node=>{
node.addEventListener("input",calc);
node.addEventListener("change",calc);
});

function calc(){

const manualMode=el.dataSource.value==="manual";
el.heroBlock.classList.toggle("hidden",manualMode);

const setVal=Number(el.set.value)||0;
el.setHint.innerText=setVal?`Base SPD multiplier = x${(1+setVal/100).toFixed(2)}`:"";

let B2=0,C2=0;

if(!manualMode){
const heroData=DB[el.hero.value]||{base:0,prow:0};

B2=heroData.base;
C2=heroData.prow;

el.baseSPD.value=B2;
el.prowSPD.value=C2;

el.baseSPD.disabled=true;
el.prowSPD.disabled=true;

}else{

B2=Number(el.baseSPD.value)||0;
C2=Number(el.prowSPD.value)||0;

el.baseSPD.disabled=false;
el.prowSPD.disabled=false;
}

const D2=Number(el.shell.value)||0;
const E2=setVal;

const slotIDs=["mask","transistor","wristwheel","core1","core2","core3"];
const G8=slotIDs.map(id=>Number(document.getElementById(id).value)||0).reduce((a,b)=>a+b,0);
el.slotSum.innerText=G8;

const G10=Number(el.manual.value)||0;

let A4=(G8>0)
?B2*(1+E2/100)+C2+D2+BASE_FLAT_SPEED+G8
:B2*(1+E2/100)+C2+D2+BASE_FLAT_SPEED+G10;

const newTotal=Math.round(A4);

if(lastTotal!==null && lastTotal!==newTotal){
el.totalSPD.classList.remove("update");
void el.totalSPD.offsetWidth;
el.totalSPD.classList.add("update");
}

el.totalSPD.innerText=newTotal;
lastTotal=newTotal;

/* ===== ENEMY CALC ===== */

const B7=Number(el.myspd.value)||0;
const C7=el.mytm.value;
const D7=el.histm.value;

let A7=null;

if(C7!=="")A7=B7/(Number(C7)/100);
else if(D7!=="")A7=B7*(Number(D7)/100);

const enemyValue=A7!==null?Math.round(A7):"";
el.enemySPD.innerText=enemyValue;

if(lastEnemy!==null && lastEnemy!==enemyValue){
el.enemySPD.classList.remove("update");
void el.enemySPD.offsetWidth;
el.enemySPD.classList.add("update");
}
lastEnemy=enemyValue;

const E7=Number(el.enemymanual.value)||0;

let A9=null;

if(A7!==null)
A9=A7-(B2*(1+E2/100))-C2-D2-BASE_FLAT_SPEED;
else if(E7!==0)
A9=E7-(B2*(1+E2/100))-C2-D2-BASE_FLAT_SPEED;

el.enemyModule.innerText=(A9!==null)?Math.round(A9):"";

el.enemySpeedBlock.classList.toggle("showResult",A7!==null);
el.enemyRawBlock.classList.toggle("showResult",A9!==null);
}

function clearAll(){
document.querySelectorAll("input").forEach(inp=>inp.value="");
el.dataSource.value="manual";
el.hero.selectedIndex=0;
calc();
}
