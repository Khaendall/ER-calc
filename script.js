const CSV_LINK="https://docs.google.com/spreadsheets/d/e/2PACX-1vSCQD7EM8DG1oZVexXto376AAHwiikJWgAENIRfBX_kFV4vqDXduenXAL9m0LUiju8HtdaWrQvOzw8j/pub?gid=613669233&single=true&output=csv";

let DB={};

fetch(CSV_LINK)
.then(r=>r.text())
.then(csv=>{
const rows=csv.trim().split("\n");
rows.forEach(r=>{
const c=r.split(",");
DB[c[0]]={base:Number(c[1]),prow:Number(c[2])};

const opt=document.createElement("option");
opt.value=c[0];
opt.textContent=c[0];
hero.appendChild(opt);
});
loadState();
calc();
});

document.querySelectorAll("input,select")
.forEach(e=>e.addEventListener("input",()=>{
saveState();
calc();
}));

function calc(){

const heroName=hero.value;
const heroData=DB[heroName]||{base:0,prow:0};

const B2=heroData.base;
const C2=heroData.prow;
const D2=num("shell");
const E2=num("set");

baseSPD.innerText=B2;
prowSPD.innerText=C2;

const slotIDs=["mask","transistor","wristwheel","core1","core2","core3"];
const G8=slotIDs.map(id=>num(id)).reduce((a,b)=>a+b,0);

slotSum.innerText=G8;

const G10=num("manual");

// BLOCKING
if(G8>0) manual.disabled=true;
else manual.disabled=false;

if(G10>0) slotIDs.forEach(id=>document.getElementById(id).disabled=true);
else slotIDs.forEach(id=>document.getElementById(id).disabled=false);

// TOTAL SPEED
let A4;
if(G8>0)
A4=B2*(1+E2/100)+C2+D2+40+G8;
else
A4=B2*(1+E2/100)+C2+D2+40+G10;

totalSPD.innerText=Math.round(A4);

// ENEMY SPEED
const B7=num("myspd");
const C7=mytm.value;
const D7=histm.value;

let A7="";
if(C7!=="") A7=B7/(Number(C7)/100);
else if(D7!=="") A7=B7*(Number(D7)/100);

enemySPD.innerText=A7?Math.round(A7):"";

// ENEMY MODULE
const E7=num("enemymanual");

let A9="";
if(A7!=="")
A9=A7-(B2*(1+E2/100))-C2-D2-40;
else if(E7!==0)
A9=E7-(B2*(1+E2/100))-C2-D2-40;

enemyModule.innerText=A9?Math.round(A9):"";

// HIDE TOTAL SPEED IN SCENARIO 2/3
if(A7!=="" || E7!==0)
totalSPD.style.visibility="hidden";
else
totalSPD.style.visibility="visible";
}

function num(id){
return Number(document.getElementById(id).value)||0;
}

function saveState(){
const data={};
document.querySelectorAll("input,select").forEach(el=>{
data[el.id]=el.value;
});
localStorage.setItem("etheriaCalc",JSON.stringify(data));
}

function loadState(){
const data=JSON.parse(localStorage.getItem("etheriaCalc")||"{}");
Object.keys(data).forEach(id=>{
if(document.getElementById(id))
document.getElementById(id).value=data[id];
});
}

function clearAll(){
localStorage.removeItem("etheriaCalc");
document.querySelectorAll("input").forEach(el=>el.value="");
calc();
}
