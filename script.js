let lastTotal=null;

document.querySelectorAll("input,select")
.forEach(e=>e.addEventListener("input",()=>calc()));

function calc(){

/* ===== AUTO LOCK TURN METERS ===== */
histm.disabled = mytm.value!=="";
mytm.disabled = histm.value!=="";

/* ===== SET BONUS HINT ===== */
const setVal = Number(set.value)||0;
setHint.innerText = setVal?`Base SPD multiplier = x${(1+setVal/100).toFixed(2)}`:"";

/* ===== CALCULATIONS (Twoja logika bez zmian) ===== */

const B2=Number(baseSPD.value)||0;
const C2=Number(prowSPD.value)||0;
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

if(lastTotal!==null && lastTotal!==newTotal){
totalSPD.classList.remove("update");
void totalSPD.offsetWidth;
totalSPD.classList.add("update");
}

totalSPD.innerText=newTotal;
lastTotal=newTotal;

const B7=Number(myspd.value)||0;
const C7=mytm.value;
const D7=histm.value;

let A7="";
if(C7!=="")A7=B7/(Number(C7)/100);
else if(D7!=="")A7=B7*(Number(D7)/100);

enemySPD.innerText=A7?Math.round(A7):"";

const E7=Number(enemymanual.value)||0;

let A9="";
if(A7!=="")A9=A7-(B2*(1+E2/100))-C2-D2-40;
else if(E7!==0)A9=E7-(B2*(1+E2/100))-C2-D2-40;

enemyModule.innerText=A9?Math.round(A9):"";
}

function clearAll(){
document.querySelectorAll("input").forEach(el=>el.value="");
calc();
}

calc();
