const boxData=[

{ x:25.93, y:21.20, type:"red" },
{ x:25.93, y:15.5, type:"red" },
{ x:25.93, y:9.85, type:"red" },

{ x:37.90, y:25, type:"purple" },
{ x:37.90, y:19.30, type:"purple" },

{ x:17.21, y:35, type:"purple" },
{ x:17.21, y:29.30, type:"purple" },

{ x:12.93, y:42.60, type:"yellow" },
{ x:49.80, y:20.11, type:"yellow" },

{ x:61.79, y:25.27, type:"purple" },
{ x:61.79, y:19.65, type:"purple" },

{ x:50.14, y:34.30, type:"blue" },
{ x:39.21, y:40.3, type:"blue" },
{ x:27.29, y:47.57, type:"blue" },

{ x:18.21, y:63.20, type:"purple" },
{ x:18.21, y:57.55, type:"purple" },

{ x:49.1, y:54.6, type:"purple" },
{ x:49.1, y:49, type:"purple" },

{ x:73.5, y:54.72, type:"purple" },
{ x:73.5, y:49.1, type:"purple" },

{ x:56.64, y:79, type:"purple" },
{ x:56.64, y:73.3, type:"purple" },

{ x:61.2, y:47.52, type:"blue" },
{ x:67.79, y:34.02, type:"blue" },

{ x:83.36, y:61, type:"blue" },
{ x:69.36, y:66.5, type:"blue" },

{ x:42.64, y:60.97, type:"blue" },
{ x:31.36, y:68.50, type:"blue" },

{ x:72.64, y:83.72, type:"blue" },
{ x:86.50, y:79.35, type:"blue" },

];

const container=document.getElementById("boxes");

function smartFitText(input){

const box=input.parentElement;

/* ⭐ START SIZE = % HEIGHT BOXA */
let size=box.clientHeight*0.45;

input.style.fontSize=size+"px";

while(input.scrollWidth>input.clientWidth && size>8){
size-=0.5;
input.style.fontSize=size+"px";
}
}

function refreshAll(){
document.querySelectorAll(".map-box input").forEach(i=>{
smartFitText(i);
});
}

boxData.forEach(b=>{

const div=document.createElement("div");
div.className=`map-box ${b.type}`;
div.style.left=b.x+"%";
div.style.top=b.y+"%";

const input=document.createElement("input");

input.addEventListener("input",()=>smartFitText(input));

div.appendChild(input);
container.appendChild(div);

});

window.addEventListener("resize",refreshAll);
window.addEventListener("load",refreshAll);

document.getElementById("clearBtn").onclick=()=>{
document.querySelectorAll(".map-box input").forEach(i=>{
i.value="";
});
refreshAll();
};
