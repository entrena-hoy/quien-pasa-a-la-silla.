/* ============================================================
   03-utiles.js — UTILIDADES GENERALES
   Funciones pequeñas que usan todas las pantallas: atajos del DOM, guardado, formato de dinero, reglas de puesto y selección de preguntas, ventanas de aviso.
   ============================================================ */

/* ---- lcfg: Lee la última configuración guardada (cargos, textos, música, preguntas). ---- */
function lcfg(){try{return JSON.parse(localStorage.getItem("qsa4c"))}catch(e){return null}}

/* ---- ctr: Cambia el texto del centro del círculo. ---- */
function ctr(x){const e=$("#ctr");if(e)e.innerHTML=x}

/* ---- esc: Convierte texto a HTML seguro (evita que un nombre rompa la pantalla). ---- */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---- nrm: Normaliza texto (minúsculas, sin tildes) para comparar respuestas de acertijos. ---- */
const nrm=s=>String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();

/* ---- save: Guarda la partida en el navegador para poder reanudarla. ---- */
function save(){try{localStorage.setItem("qsa4",JSON.stringify(S))}catch(e){}}

/* ---- load: Lee la partida guardada. ---- */
function load(){try{return JSON.parse(localStorage.getItem("qsa4"))}catch(e){return null}}

/* ---- seat: REGLA DE PUESTO: devuelve en qué cargo queda un jugador según sus aciertos. El cargo más alto exige el 80% del premio total. ---- */
const seat=p=>{const N=CG.length;return p.c>=N?(p.p>=TOT*.8?N:N-1):Math.min(N-1,p.c)};

/* ---- key: Valor para ordenar jugadores (aciertos, dinero y desempate). ---- */
const key=p=>p.c*1e9+p.p*10+p.tb;

/* ---- m: Da formato al premio con la unidad elegida ($, puntos, etc.). ---- */
const m=n=>UNIT=="$"?"$ "+Number(n).toLocaleString("es-CO"):Number(n).toLocaleString("es-CO")+" "+UNIT;

/* ---- canAns: Dice si ahora se puede responder (tiempo corriendo o desbloqueado por una ayuda). ---- */
const canAns=()=>S.go&&!S.sel&&!S.rv&&(!S.late||S.unl);

/* ---- pick: Elige una pregunta que no haya salido en la partida. Reparte los 10 niveles del banco entre tus cargos. ---- */
function pick(L){const bl=Math.max(1,Math.min(10,Math.ceil(L*10/CG.length)));let pool=S.qs.filter(q=>q.l==bl);if(!pool.length)pool=S.qs;let c=pool.filter(q=>!S.used[q.id]);if(!c.length){pool.forEach(q=>delete S.used[q.id]);c=pool}const q=c[Math.floor(Math.random()*c.length)];S.used[q.id]=1;return q}

/* ---- rnd: Número entero al azar entre 0 y n-1. ---- */
const rnd=n=>Math.floor(Math.random()*n);

/* ---- dlg: Ventana de aviso o confirmación dentro del juego (el navegador bloquea las ventanas normales). ---- */
function dlg(msg,yes){const o=$("#dlg");if(o)o.remove();const d=document.createElement("div");d.id="dlg";d.innerHTML=`<div class="dbx"><p>${esc(msg)}</p><div class="ob">${yes?'<button id="dy">Sí</button><button id="dn" class="sm">Cancelar</button>':'<button id="dn">Entendido</button>'}</div></div>`;document.body.appendChild(d);if($("#dy"))$("#dy").onclick=()=>{d.remove();yes()};$("#dn").onclick=()=>d.remove()}

