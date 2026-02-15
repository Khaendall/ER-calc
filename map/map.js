const REF_WIDTH = 1441;
const REF_HEIGHT = 752;

const BOXES = [

/* ===== RED (3) ===== */
{ x:470, y:120, type:"purple"},
{ x:470, y:160, type:"purple"},
{ x:470, y:200, type:"purple"},

/* ===== LEFT PURPLE (2) ===== */
{ x:220, y:220, type:"purple"},
{ x:220, y:260, type:"purple"},

/* ===== YELLOW (2) ===== */
{ x:350, y:300, type:"yellow"},
{ x:740, y:140, type:"yellow"},

/* ===== TOP RIGHT PURPLE (2) ===== */
{ x:980, y:160, type:"purple"},
{ x:980, y:200, type:"purple"},

/* ===== CYAN GRID ===== */
{ x:560,y:260,type:"cyan"},
{ x:700,y:260,type:"cyan"},
{ x:840,y:260,type:"cyan"},
{ x:460,y:300,type:"cyan"},
{ x:600,y:300,type:"cyan"},
{ x:740,y:300,type:"cyan"},
{ x:880,y:300,type:"cyan"},
{ x:460,y:340,type:"cyan"},
{ x:600,y:340,type:"cyan"},
{ x:740,y:340,type:"cyan"},
{ x:880,y:340,type:"cyan"},
{ x:560,y:380,type:"cyan"},
{ x:700,y:380,type:"cyan"},
{ x:840,y:380,type:"cyan"},
{ x:980,y:380,type:"cyan"},
{ x:1100,y:380,type:"cyan"},
{ x:1200,y:380,type:"cyan"},

/* ===== LOWER PURPLE ===== */
{ x:720,y:420,type:"purple"},
{ x:720,y:460,type:"purple"},
{ x:960,y:420,type:"purple"},
{ x:960,y:460,type:"purple"}

];

const mapImage = document.getElementById("mapImage");
const boxLayer = document.getElementById("boxLayer");

function renderBoxes(){

    boxLayer.innerHTML = "";

    const scaleX = mapImage.clientWidth / REF_WIDTH;
    const scaleY = mapImage.clientHeight / REF_HEIGHT;

    BOXES.forEach((b,i)=>{

        const div = document.createElement("input");
        div.className = `map-box box-${b.type}`;
        div.style.left = (b.x * scaleX) + "px";
        div.style.top  = (b.y * scaleY) + "px";

        div.value = localStorage.getItem("box_"+i) || "";

        div.addEventListener("input",()=>{
            localStorage.setItem("box_"+i, div.value);
        });

        boxLayer.appendChild(div);
    });
}

mapImage.onload = renderBoxes;
window.addEventListener("resize", renderBoxes);

document.getElementById("clearAllBtn").onclick = ()=>{
    localStorage.clear();
    renderBoxes();
};
