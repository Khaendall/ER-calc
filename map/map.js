const boxLayer = document.getElementById("boxLayer");

const BOXES = [

/* --- RED (3) --- */
{ x: 21.5, y: 16.5, color:"red"},
{ x: 21.5, y: 22.0, color:"red"},
{ x: 21.5, y: 27.5, color:"red"},

/* --- PURPLE TOP LEFT (2) --- */
{ x: 10.5, y: 30.0, color:"purple"},
{ x: 10.5, y: 35.5, color:"purple"},

/* --- YELLOW LEFT (1) --- */
{ x: 13.5, y: 45.5, color:"yellow"},

/* --- PURPLE TOP MID (1) --- */
{ x: 36.5, y: 25.0, color:"purple"},

/* --- YELLOW MID (1) --- */
{ x: 47.0, y: 21.5, color:"yellow"},

/* --- PURPLE TOP RIGHT (2) --- */
{ x: 62.0, y: 24.5, color:"purple"},
{ x: 62.0, y: 30.0, color:"purple"},

/* --- CYAN MAIN ROW --- */
{ x: 34.0, y: 43.0, color:"cyan"},
{ x: 44.0, y: 42.5, color:"cyan"},
{ x: 54.5, y: 42.5, color:"cyan"},
{ x: 65.0, y: 42.5, color:"cyan"},

/* --- CYAN CENTER STACK --- */
{ x: 38.5, y: 48.5, color:"cyan"},
{ x: 48.5, y: 48.5, color:"cyan"},
{ x: 58.0, y: 48.5, color:"cyan"},

/* --- PURPLE CENTER (2) --- */
{ x: 48.0, y: 54.5, color:"purple"},
{ x: 48.0, y: 59.5, color:"purple"},

/* --- CYAN LEFT LOWER --- */
{ x: 28.0, y: 53.5, color:"cyan"},
{ x: 28.0, y: 60.5, color:"cyan"},

/* --- CYAN RIGHT LOWER --- */
{ x: 67.0, y: 55.0, color:"cyan"},
{ x: 76.5, y: 55.0, color:"cyan"},

/* --- PURPLE RIGHT MID --- */
{ x: 67.0, y: 50.0, color:"purple"},
{ x: 76.5, y: 50.0, color:"purple"},

/* --- CYAN BOTTOM --- */
{ x: 30.0, y: 67.0, color:"cyan"},
{ x: 44.0, y: 67.0, color:"cyan"},
{ x: 58.0, y: 67.0, color:"cyan"},
{ x: 72.0, y: 67.0, color:"cyan"},

/* --- PURPLE BOTTOM STACK --- */
{ x: 45.0, y: 74.0, color:"purple"},
{ x: 45.0, y: 79.0, color:"purple"},

/* --- CYAN FAR RIGHT --- */
{ x: 86.0, y: 61.0, color:"cyan"}

];

function createBox(data){

    const box = document.createElement("input");
    box.type = "text";
    box.className = "mapBox " + data.color;

    box.style.left = data.x + "%";
    box.style.top  = data.y + "%";
    box.style.transform = "translate(-50%,-50%)";

    boxLayer.appendChild(box);
}

BOXES.forEach(createBox);

document.getElementById("clearAllBtn").onclick = () => {
    document.querySelectorAll(".mapBox").forEach(b=>b.value="");
};
