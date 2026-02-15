/* ===== LOCAL STORAGE SAVE ===== */

const towers = document.querySelectorAll(".tower");

towers.forEach(input => {

const key = "tower_" + input.dataset.id;
const saved = localStorage.getItem(key);

if(saved){
input.value = saved;
}

input.addEventListener("input", () => {
localStorage.setItem(key, input.value);
});

});

/* ===== CLEAR MAP ===== */

function clearMap(){

document.querySelectorAll(".tower").forEach(el=>{
el.value="";
localStorage.removeItem("tower_"+el.dataset.id);
});

}
