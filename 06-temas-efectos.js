/* ============================================================
   06-temas-efectos.js — TEMAS VISUALES Y EFECTOS
   Paletas de color (un tema distinto cada vez que se abre el juego), estrellitas del escenario y fuegos artificiales.
   ============================================================ */

/* ---- TEMAS: TEMAS VISUALES: cada uno define los colores del escenario. Agrega o cambia temas aquí. ---- */
const TEMAS=[
{n:"Aurora",v:{bgA:"#7b5cff",bgB:"#3a1d8f",bgC:"#0a0620",h1:"#4b2bb5",h2:"#1a0d52",gd:"#2ee6d6",or:"#ff6bd6",lt:"#c9b8ff"}},
{n:"Atardecer",v:{bgA:"#ff7a59",bgB:"#b02d7a",bgC:"#1a0a2e",h1:"#8a2a86",h2:"#2a0f48",gd:"#ffd23f",or:"#ff8a5c",lt:"#ffd9c4"}},
{n:"Neón",v:{bgA:"#ff2bd6",bgB:"#3a0a6b",bgC:"#05010f",h1:"#3a0a6b",h2:"#12032a",gd:"#2ee6ff",or:"#ff2bd6",lt:"#9ff3ff"}},
{n:"Galaxia",v:{bgA:"#2f6bff",bgB:"#0b1f66",bgC:"#010214",h1:"#0e2a86",h2:"var(--h2)",gd:"#e8c34a",or:"#ff9a00",lt:"#9cc4ff"}},
{n:"Menta pop",v:{bgA:"#2ee6a8",bgB:"#0b6e7a",bgC:"#03181f",h1:"#0f7a84",h2:"#043b45",gd:"#ffe14a",or:"#ff6b9b",lt:"#bdfff0"}}];

/* ---- applyTheme: Aplica un tema (cambia las variables de color de la página). ---- */
function applyTheme(i){const t=TEMAS[i%TEMAS.length],s=document.documentElement.style;for(const k in t.v)s.setProperty("--"+k,t.v[k])}

/* ---- pickTheme: Elige un tema distinto al de la vez anterior. ---- */
function pickTheme(){let i=rnd(TEMAS.length),l=-1;try{l=+localStorage.getItem("qsa4t")}catch(e){}if(i==l)i=(i+1)%TEMAS.length;try{localStorage.setItem("qsa4t",i)}catch(e){}return i}

/* ---- sparks: Estrellitas que salen hacia los lados del círculo. ---- */
function sparks(){const o=$("#sp"),bg=$(".bg");if(o)o.remove();if(!bg)return;const cv=document.createElement("canvas");cv.id="sp";cv.width=innerWidth;cv.height=innerHeight;bg.insertBefore(cv,bg.querySelector(".emb"));const x=cv.getContext("2d");let P=[];const lt=(getComputedStyle(document.documentElement).getPropertyValue("--lt")||"#d6e6ff").trim();
(function f(){if(!document.body.contains(cv))return;const e=$(".emb");x.clearRect(0,0,cv.width,cv.height);
if(e){const r=e.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,R=r.width/2;
if(Math.random()<.7){const d=Math.random()<.5?-1:1;P.push({x:cx+d*R*(.95+Math.random()*.25),y:cy+(Math.random()-.5)*R*1.5,vx:d*(.8+Math.random()*2.8),vy:(Math.random()-.5)*.3,l:1,dc:.006,s:1.5+Math.random()*3.5,t:Math.random()*6})}
if(Math.random()<.25)P.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:0,vy:0,l:1,dc:.012,s:1+Math.random()*2,t:Math.random()*6})}
P=P.filter(q=>q.l>0);P.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.l-=q.dc;q.t+=.3;const a=Math.max(0,q.l)*(.55+.45*Math.sin(q.t)),s=q.s;x.globalAlpha=a;x.fillStyle=lt;
if(q.vx){x.fillRect(q.x-Math.sign(q.vx)*s*7,q.y,Math.sign(q.vx)*s*7,1)}
x.beginPath();x.moveTo(q.x,q.y-2*s);x.lineTo(q.x+.5*s,q.y-.5*s);x.lineTo(q.x+2*s,q.y);x.lineTo(q.x+.5*s,q.y+.5*s);x.lineTo(q.x,q.y+2*s);x.lineTo(q.x-.5*s,q.y+.5*s);x.lineTo(q.x-2*s,q.y);x.lineTo(q.x-.5*s,q.y-.5*s);x.closePath();x.fill()});
requestAnimationFrame(f)})()}

/* ---- fw: Fuegos artificiales (retiro, podio y presentación). ---- */
function fw(){const o=$("#fw");if(o)o.remove();const cv=document.createElement("canvas");cv.id="fw";cv.width=innerWidth;cv.height=innerHeight;document.body.appendChild(cv);const x=cv.getContext("2d");let P=[],n=0;
(function f(){if(!document.body.contains(cv))return;if(n++%25==0){const cx=Math.random()*cv.width,cy=Math.random()*cv.height*.55,hu=Math.random()*360;for(let i=0;i<70;i++){const a=Math.random()*6.28,s=2+Math.random()*6;P.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,hu})}}
x.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.vx*=.985;p.l-=.011;x.globalAlpha=Math.max(p.l,0);x.fillStyle=`hsl(${p.hu},100%,60%)`;x.beginPath();x.arc(p.x,p.y,3,0,6.28);x.fill()});requestAnimationFrame(f)})()}

