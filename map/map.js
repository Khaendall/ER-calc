function updateScale(){

const base = document.querySelector(".mapBase");
const wrapper = document.getElementById("mapScale");

const scale = Math.min(
window.innerWidth / base.offsetWidth,
1
);

wrapper.style.transform = `scale(${scale})`;
}

window.addEventListener("resize",updateScale);
window.addEventListener("load",updateScale);

function clearMap(){
document.querySelectorAll(".tower").forEach(el=>el.value="");
}
