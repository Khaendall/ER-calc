const container=document.getElementById("boxes");

if(container){

const STORAGE_KEY="gvg-map-names";

let savedData=[];
try{
savedData=JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}catch(e){
savedData=[];
}

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
{ x:86.50, y:79.35, type:"blue" }

];

function saveAllNames(){
const values=[...document.querySelectorAll(".map-box input")]
.map(i=>i.value);
localStorage.setItem(STORAGE_KEY,JSON.stringify(values));
}

function smartFitText(input){

const box=input.parentElement;
let size = box.clientWidth * 0.16;
size = Math.min(size, 26);

input.style.fontSize = size + "px";

while(input.scrollWidth > input.clientWidth && size > 8){
size -= 0.5;
input.style.fontSize = size + "px";
}
}

function refreshAll(){
document.querySelectorAll(".map-box input")
.forEach(i=>smartFitText(i));
}

const order={red:0,yellow:1,purple:2,blue:3};
const sortedData=[...boxData].sort((a,b)=>order[a.type]-order[b.type]);

const nameList=document.getElementById("nameList");
const allBoxes=[];

sortedData.forEach((b,index)=>{

const div=document.createElement("div");
div.className=`map-box ${b.type}`;
div.style.left=b.x+"%";
div.style.top=b.y+"%";

const input=document.createElement("input");

if(savedData[index]){
input.value=savedData[index];
}

let listInput=null;

if(nameList){

const row=document.createElement("div");

listInput=document.createElement("input");
listInput.placeholder=`${b.type.toUpperCase()} ${index+1}`;

if(savedData[index]){
listInput.value=savedData[index];
}

row.appendChild(listInput);
nameList.appendChild(row);
}

input.addEventListener("input",()=>{
if(listInput) listInput.value=input.value;
smartFitText(input);
saveAllNames();
});

if(listInput){
listInput.addEventListener("input",()=>{
input.value=listInput.value;
smartFitText(input);
saveAllNames();
});
}

if(listInput){
listInput.addEventListener("focus",()=>{
allBoxes.forEach(box=>box.classList.remove("active"));
div.classList.add("active");
});
}

div.appendChild(input);
container.appendChild(div);
allBoxes.push(div);

});

window.addEventListener("resize",refreshAll);
window.addEventListener("load",refreshAll);

/* ===== EXPORT ===== */

const copyBtn=document.getElementById("copyAllBtn");

if(copyBtn){
copyBtn.onclick=()=>{

const lines=[...document.querySelectorAll("#nameList input")]
.map((input,index)=>{

const name=input.value.trim();
if(!name) return null;

const type=sortedData[index].type;
const number=index+1;

return `${type}#${number} ${name}`;

})
.filter(v=>v!==null);

navigator.clipboard.writeText(lines.join("\n"));

copyBtn.textContent="Copied!";
setTimeout(()=>copyBtn.textContent="Copy All",1000);

};
}

/* ===================================================
   ⭐ IMPORT MODAL VERSION (NOWA WERSJA)
=================================================== */

function importDefenseList(text){

const mapInputs=document.querySelectorAll(".map-box input");
const listInputs=document.querySelectorAll("#nameList input");

const lines=text.split("\n");

lines.forEach(line=>{

const match=line.match(/^(\w+)[#\s]+(\d+)\s+(.+)$/i);
if(!match) return;

const type=match[1].toLowerCase();
const number=parseInt(match[2],10);
const name=match[3];

const index=sortedData.findIndex(
(b,i)=>b.type===type && (i+1)===number
);

if(index===-1) return;

if(mapInputs[index]){
mapInputs[index].value=name;
smartFitText(mapInputs[index]);
}

if(listInputs[index]){
listInputs[index].value=name;
}

});

saveAllNames();
refreshAll();
}

/* ===== MODAL EVENTS ===== */

const importBtn=document.getElementById("importBtn");
const importModal=document.getElementById("importModal");
const confirmImportBtn=document.getElementById("confirmImportBtn");
const closeImportBtn=document.getElementById("closeImportBtn");
const importTextarea=document.getElementById("importTextarea");

if(importBtn && importModal){

importBtn.onclick=()=>{
importModal.style.display="flex";
importTextarea.value="";
};

}

if(closeImportBtn){
closeImportBtn.onclick=()=>{
importModal.style.display="none";
};
}

if(confirmImportBtn){
confirmImportBtn.onclick=()=>{
importDefenseList(importTextarea.value);
importModal.style.display="none";
};
}

}
