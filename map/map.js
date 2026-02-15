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

/* ===== MAP SCALE SYSTEM ===== */
/* NAJWAŻNIEJSZA POPRAWKA */

const mapImg = document.querySelector(".mapImage");
const wrapper = document.querySelector(".mapWrapper");

function applyMapScale(){

if(!mapImg.naturalWidth) return;

const naturalWidth = mapImg.naturalWidth;
const currentWidth = mapImg.clientWidth;

const scale = currentWidth / naturalWidth;

/* wrapper działa w naturalnym rozmiarze grafiki */
wrapper.style.width = naturalWidth + "px";
wrapper.style.transform = `scale(${scale})`;

}

/* kiedy mapa się załaduje */
if(mapImg.complete){
applyMapScale();
}else{
mapImg.onload = applyMapScale;
}

/* przy resize */
window.addEventListener("resize", applyMapScale);
