const towers = document.querySelectorAll(".tower");

/* ===== LOAD SAVED ===== */

towers.forEach(t=>{
const saved = localStorage.getItem("gvg_"+t.dataset.id);
if(saved) t.value = saved;

t.addEventListener("input",()=>{
localStorage.setItem("gvg_"+t.dataset.id, t.value);
});
});

/* ===== CLEAR ===== */

function clearMap(){

if(!confirm("Clear all tower names?")) return;

towers.forEach(t=>{
t.value="";
localStorage.removeItem("gvg_"+t.dataset.id);
});

}
