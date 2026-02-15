const boxLayer = document.getElementById("boxLayer");
const STORAGE_KEY = "gvg-defense-map";

/*
Współrzędne są zapisane względem referencji:
1441 x 752
(left = x/1441 * 100%)
(top  = y/752  * 100%)
*/

const boxes = [

/* ===== CZERWONE (3) ===== */
{ id:"r1", x:425, y:90,  color:"red" },
{ id:"r2", x:425, y:140, color:"red" },
{ id:"r3", x:425, y:190, color:"red" },

/* ===== ŻÓŁTE (2) ===== */
{ id:"y1", x:675, y:150, color:"yellow" },
{ id:"y2", x:265, y:300, color:"yellow" },

/* ===== FIOLETOWE (14) ===== */
{ id:"p1", x:200, y:220, color:"purple" },
{ id:"p2", x:200, y:260, color:"purple" },

{ id:"p3", x:580, y:180, color:"purple" },
{ id:"p4", x:580, y:220, color:"purple" },

{ id:"p5", x:830, y:180, color:"purple" },
{ id:"p6", x:830, y:220, color:"purple" },

{ id:"p7", x:1010, y:350, color:"purple" },
{ id:"p8", x:1010, y:390, color:"purple" },

{ id:"p9", x:1040, y:470, color:"purple" },
{ id:"p10", x:1040, y:510, color:"purple" },

{ id:"p11", x:620, y:360, color:"purple" },
{ id:"p12", x:620, y:400, color:"purple" },

{ id:"p13", x:520, y:520, color:"purple" },
{ id:"p14", x:520, y:560, color:"purple" },

/* ===== NIEBIESKIE (11) ===== */
{ id:"b1", x:420, y:300, color:"blue" },
{ id:"b2", x:520, y:300, color:"blue" },
{ id:"b3", x:700, y:300, color:"blue" },
{ id:"b4", x:900, y:300, color:"blue" },

{ id:"b5", x:420, y:360, color:"blue" },
{ id:"b6", x:520, y:360, color:"blue" },
{ id:"b7", x:700, y:360, color:"blue" },
{ id:"b8", x:900, y:360, color:"blue" },

{ id:"b9", x:380, y:430, color:"blue" },
{ id:"b10", x:780, y:430, color:"blue" },
{ id:"b11", x:1150, y:420, color:"blue" },
];

const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

boxes.forEach(b => {

    const el = document.createElement("input");

    el.className = `defense-box ${b.color}`;
    el.style.left = (b.x / 1441 * 100) + "%";
    el.style.top  = (b.y / 752  * 100) + "%";

    el.value = saved[b.id] || "";

    el.addEventListener("input", () => {
        saved[b.id] = el.value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        autoResizeText(el);
    });

    autoResizeText(el);
    boxLayer.appendChild(el);
});

function autoResizeText(el){
    let size = 14;
    el.style.fontSize = size + "px";

    while(el.scrollWidth > el.clientWidth && size > 8){
        size--;
        el.style.fontSize = size + "px";
    }
}

document.getElementById("clearAllBtn").onclick = () => {
    localStorage.removeItem(STORAGE_KEY);
    document.querySelectorAll(".defense-box").forEach(b=>b.value="");
};
