function updateScale(){

const base = document.querySelector(".mapBase");
const wrapper = document.getElementById("mapScale");

if(!base || !wrapper) return;

const maxWidth = window.innerWidth - 40;
const scale = Math.min(maxWidth / 1441, 1);

wrapper.style.transform = `scale(${scale})`;
}

window.addEventListener("resize",updateScale);
window.addEventListener("load",updateScale);

/* ===== CLEAR ALL ===== */

function clearMap(){
document.querySelectorAll(".tower").forEach(el=>el.value="");
}
