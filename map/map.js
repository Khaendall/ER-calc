const data = [

{c:"red",x:17,y:16},
{c:"red",x:17,y:21},
{c:"red",x:17,y:26},

{c:"yellow",x:33,y:18},
{c:"yellow",x:13,y:40},

{c:"purple",x:10,y:28},
{c:"purple",x:10,y:33},

{c:"purple",x:42,y:22},
{c:"purple",x:42,y:27},

{c:"purple",x:66,y:33},
{c:"purple",x:66,y:38},

{c:"purple",x:26,y:60},
{c:"purple",x:26,y:65},

{c:"purple",x:46,y:52},
{c:"purple",x:46,y:57},

{c:"purple",x:72,y:54},
{c:"purple",x:72,y:59},

{c:"purple",x:52,y:72},
{c:"purple",x:52,y:77},

/* ==== BLUE (11) ==== */
{c:"blue",x:28,y:36},
{c:"blue",x:38,y:36},
{c:"blue",x:48,y:36},
{c:"blue",x:58,y:36},

{c:"blue",x:24,y:44},
{c:"blue",x:34,y:44},
{c:"blue",x:44,y:44},
{c:"blue",x:54,y:44},

{c:"blue",x:64,y:66},
{c:"blue",x:76,y:66},
{c:"blue",x:86,y:66},

];

const wrap = document.getElementById("boxes");

data.forEach(d=>{
const div=document.createElement("div");
div.className=`map-box ${d.c}`;
div.style.left=d.x+"%";
div.style.top=d.y+"%";

const input=document.createElement("input");
div.appendChild(input);

wrap.appendChild(div);
});

document.getElementById("clearBtn").onclick=()=>{
document.querySelectorAll(".map-box input").forEach(i=>i.value="");
};
