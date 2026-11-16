/* ============================================================
   05-avatares.js — AVATARES
   Generador de avatares en SVG y ventana para personalizarlos (piel, peinado, gafas, ropa, accesorios, fondo). Para agregar opciones, edita las paletas y la función AV.
   ============================================================ */

/* ---- UID: Contador para dar un identificador único a cada avatar. ---- */
let UID=0;

/* ---- SK: PALETAS de avatares: piel (SK), cabello (HC), ropa (TC) y fondos (BG). Agrega colores aquí. ---- */
const SK=["#FFDFC4","#F1C27D","#D9A066","#B07A4B","#8D5524","#5C3A21"],HC=["#1b1b1f","#4a2c17","#a0522d","#e6c35c","#d62d65","#2f6bff","#7b3cff","#cfd8e3"],TC=["#ff3d8b","#2ee6d6","#ffd23f","#7b5cff","#ff6b35","#2f6bff","#1b1b1f","#f2f2f2"],BG=[["#7b5cff","#2ee6d6"],["#ff3d8b","#ffd23f"],["#2f6bff","#7b3cff"],["#14a83a","#2ee6d6"],["#ff6b35","#ff3d8b"],["#1b1b1f","#7b5cff"]];

/* ---- rav: Avatar al azar. ---- */
function rav(){return{s:rnd(6),h:rnd(6),hc:rnd(8),e:rnd(3),g:rnd(4),t:rnd(5),tc:rnd(8),a:rnd(4),bg:rnd(6)}}

/* ---- AV: DIBUJA EL AVATAR en SVG según sus opciones. Para añadir peinados, gafas o accesorios, edita esta función y la lista R de aed(). ---- */
function AV(p){if(!p.av)return p.a||"🙂";const v=p.av,id="g"+(++UID),sk=SK[v.s],hc=HC[v.hc],tc=TC[v.tc],tc2=TC[(v.tc+3)%8],b=BG[v.bg];
let back="",hood="",front="",gl="",ac="",eye="";
if(v.h==2)back=`<circle cx="50" cy="30" r="23" fill="${hc}"/><circle cx="32" cy="38" r="10" fill="${hc}"/><circle cx="68" cy="38" r="10" fill="${hc}"/>`;
if(v.h==3)back=`<path d="M27 44Q25 18 50 17Q75 18 73 44L76 76Q64 72 62 62L38 62Q36 72 24 76Z" fill="${hc}"/>`;
if(v.t==0)hood=`<path d="M30 71Q50 88 70 71Q66 64 50 64Q34 64 30 71Z" fill="#0006"/><path d="M44 80V92M56 80V92" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`;
if(v.t==1)hood=`<path d="M41 70Q50 82 59 70Z" fill="${sk}"/>`;
if(v.t==2)hood=`<path d="M50 72V100" stroke="#0007" stroke-width="2"/><path d="M40 70L50 78L60 70" stroke="#fff9" stroke-width="3" fill="none"/>`;
if(v.t==3)hood=`<path d="M42 70L50 92L58 70Z" fill="#fff"/><path d="M50 76L47 90L50 94L53 90Z" fill="#e23"/>`;
if(v.t==4)hood=`<path d="M10 100Q12 86 24 80M90 100Q88 86 76 80" stroke="#fff" stroke-width="4" fill="none"/><text x="50" y="97" font-size="14" fill="#fff" text-anchor="middle" font-weight="800">7</text>`;
const top=`<path d="M30 40Q31 21 50 21Q69 21 70 40Q63 31 50 31Q37 31 30 40Z" fill="${hc}"/>`;
if(v.h==1)front=top;
if(v.h==2)front=`<path d="M32 38Q50 24 68 38Q60 30 50 30Q40 30 32 38Z" fill="${hc}"/>`;
if(v.h==3)front=`<path d="M31 40Q34 22 52 22Q68 24 69 40Q58 30 44 32Q36 34 31 40Z" fill="${hc}"/>`;
if(v.h==4)front=`<path d="M30 40Q27 17 52 15Q74 15 70 38Q62 25 46 27Q36 29 30 40Z" fill="${hc}"/>`;
if(v.h==5)front=top+`<circle cx="50" cy="13" r="8" fill="${hc}"/>`;
const ec="#1b1b1f";
eye=v.e==0?`<circle cx="43" cy="46" r="2.3" fill="${ec}"/><circle cx="57" cy="46" r="2.3" fill="${ec}"/>`:v.e==1?`<path d="M40 47Q43 43 46 47M54 47Q57 43 60 47" stroke="${ec}" stroke-width="2" fill="none" stroke-linecap="round"/>`:`<circle cx="43" cy="46" r="2.3" fill="${ec}"/><path d="M54 47Q57 43 60 47" stroke="${ec}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
if(v.g==1)gl=`<g fill="none" stroke="${ec}" stroke-width="2"><circle cx="43" cy="46" r="6.5"/><circle cx="57" cy="46" r="6.5"/></g>`;
if(v.g==2)gl=`<g fill="none" stroke="${ec}" stroke-width="2"><rect x="36" y="41" width="12" height="10" rx="3"/><rect x="52" y="41" width="12" height="10" rx="3"/><path d="M48 45H52"/></g>`;
if(v.g==3)gl=`<path d="M35 42H65V48Q65 54 58 54Q52 54 51 48H49Q48 54 42 54Q35 54 35 48Z" fill="#111"/><path d="M38 44L44 44" stroke="#fff6" stroke-width="1.5"/>`;
if(v.a==1)ac=`<path d="M30 36Q32 15 50 15Q68 15 70 36Z" fill="${tc2}"/><path d="M62 34Q84 34 86 40L62 40Z" fill="${tc2}" stroke="#0004"/>`;
if(v.a==2)ac=`<path d="M29 48Q27 14 50 14Q73 14 71 48" fill="none" stroke="#222" stroke-width="4"/><rect x="25" y="44" width="7" height="14" rx="3" fill="${tc2}"/><rect x="68" y="44" width="7" height="14" rx="3" fill="${tc2}"/>`;
if(v.a==3)ac=`<circle cx="31" cy="55" r="2.2" fill="#ffd23f"/><circle cx="69" cy="55" r="2.2" fill="#ffd23f"/>`;
return `<svg class="avt" viewBox="0 0 100 100" width="1em" height="1em" style="vertical-align:-.15em;border-radius:50%"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b[0]}"/><stop offset="1" stop-color="${b[1]}"/></linearGradient><clipPath id="c${id}"><circle cx="50" cy="50" r="50"/></clipPath></defs><g clip-path="url(#c${id})"><rect width="100" height="100" fill="url(#${id})"/>${back}<path d="M10 100Q12 72 50 70Q88 72 90 100Z" fill="${tc}"/><rect x="43" y="56" width="14" height="18" rx="6" fill="${sk}"/>${hood}<circle cx="31" cy="47" r="4" fill="${sk}"/><circle cx="69" cy="47" r="4" fill="${sk}"/><ellipse cx="50" cy="45" rx="19" ry="22" fill="${sk}"/>${front}<path d="M39 40L47 39M53 39L61 40" stroke="${ec}" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>${eye}<path d="M43 54Q50 61 57 54" stroke="#7a2b2b" stroke-width="2.2" fill="none" stroke-linecap="round"/>${gl}${ac}</g></svg>`}

/* ---- aed: Ventana para personalizar el avatar de un jugador. ---- */
function aed(i){const p=PL[i];if(!p||$("#aed"))return;const o=document.createElement("div");o.id="aed";document.body.appendChild(o);
const R=[["Piel","s",SK],["Peinado","h",["Calvo","Corto","Rizado","Largo","Moderno","Moño"]],["Color de cabello","hc",HC],["Ojos","e",["Normal","Sonriente","Guiño"]],["Gafas","g",["Sin gafas","Redondas","Cuadradas","De sol"]],["Ropa","t",["Hoodie","Camiseta","Chaqueta","Blazer","Deportiva"]],["Color de ropa","tc",TC],["Accesorio","a",["Ninguno","Gorra","Audífonos","Aretes"]],["Fondo","bg",BG]];
const dr=()=>{o.innerHTML=`<div class="aeb"><div class="apv"><div class="pv">${AV(p)}</div><b>${esc(p.n)}</b><button id="ra" class="sm">🎲 Aleatorio</button><button id="ok">✔ Listo</button></div><div class="aro">${R.map(([t,k,L],r)=>`<div class="ar2"><b>${t}</b>${L.map((x,j)=>typeof x=="string"&&x[0]!="#"?`<button class="ob2${p.av[k]==j?" on":""}" data-r="${r}" data-j="${j}">${x}</button>`:`<button class="sw${p.av[k]==j?" on":""}" data-r="${r}" data-j="${j}" style="background:${Array.isArray(x)?`linear-gradient(135deg,${x[0]},${x[1]})`:x}"></button>`).join("")}</div>`).join("")}</div></div>`;
$$("#aed [data-r]").forEach(b=>b.onclick=()=>{p.av[R[b.dataset.r][1]]=+b.dataset.j;dr()});$("#ra").onclick=()=>{p.av=rav();dr()};$("#ok").onclick=()=>{o.remove();drs();const n=$("#nm");if(n)n.focus()}};dr()}

/* ---- drs: Redibuja la lista de jugadores (clic en el avatar para editarlo). ---- */
function drs(){const e=$("#pl");if(!e)return;e.innerHTML=PL.map((p,i)=>`<span class="chip"><i class="ea" data-e="${i}" title="Personalizar avatar">${AV(p)}</i> ${esc(p.n)} <b data-x="${i}">✖</b></span>`).join("");$("#ct").textContent=PL.length+"/10";$$("[data-x]").forEach(b=>b.onclick=()=>{PL.splice(+b.dataset.x,1);drs()});$$(".ea").forEach(e=>e.onclick=()=>aed(+e.dataset.e))}

