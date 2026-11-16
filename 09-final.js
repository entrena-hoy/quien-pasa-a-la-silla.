/* ============================================================
   09-final.js — PODIO FINAL Y DESEMPATE
   Pantalla final en escalera con fuegos artificiales y la pregunta de desempate.
   ============================================================ */

/* ---- fin: PODIO FINAL: columnas en escalera (una por cargo y una de «pierde»), avatares, dinero y fuegos artificiales. ---- */
function fin(){clearInterval(iv);think(false);snd('ok');NX=null;S.ph="final";save();const top=Math.max(...S.pl.map(key)),g=S.pl.map((p,i)=>i).filter(i=>key(S.pl[i])==top),w=S.pl[g[0]],H=Math.max(200,Math.floor(innerHeight*.48));
const sub=g.length>1?"Empatan: "+g.map(i=>AV(S.pl[i])+" "+esc(S.pl[i].n)).join(" · "):seat(w)==CG.length?"¡"+esc(w.n)+" ocupa el cargo más alto ("+CG[CG.length-1]+") con "+m(w.p)+"!":"El cargo más alto ("+CG[CG.length-1]+") queda vacante: nadie llegó al 80% ("+m(TOT*.8)+")";
const N=CG.length;let cols="";for(let l=0;l<=N;l++){const occ=S.pl.map((p,i)=>i).filter(i=>seat(S.pl[i])==l),hh=Math.round(H*(.14+.86*l/N));
cols+=`<div class="pw" style="max-width:${(92/(N+1)).toFixed(1)}vw"><div class="pav">${occ.map(i=>`<div class="pa${g.includes(i)?" win":""}" style="animation-delay:${l*.4+2}s"><span>${g.includes(i)&&g.length==1?"👑":""}</span><i>${AV(S.pl[i])}</i><small>${esc(S.pl[i].n)}<br>${m(S.pl[i].p)}</small></div>`).join("")}</div><div class="pb" style="--h:${hh}px;animation-delay:${l*.2}s;background:linear-gradient(${l?`hsl(${Math.round(220-l*170/N)},75%,${Math.round(38+l*20/N)}%),hsl(${Math.round(220-l*170/N)},75%,22%)`:"#c4161c,#6a0a10"})"><b>${l||"✖"}</b>${l?CG[l-1]:LOST}</div></div>`}
$("#app").innerHTML=`<div class="fin"><h1>${g.length>1?"⚖ ¡EMPATE por el cargo más alto!":`🏆 ${AV(w)} ${esc(w.n)} · ${seat(w)?CG[seat(w)-1]:"Sin cargo"}`}</h1><p>${sub}</p><div class="pod">${cols}</div></div><div class="bar">${g.length>1?'<button id="tbk">⚖ Pregunta de desempate</button>':''}<button id="nw" class="sm">↺ Nueva partida</button></div><div id="ov" hidden></div>`;
$("#nw").onclick=()=>CF?players():setup();if($("#tbk"))$("#tbk").onclick=()=>tbk(g);setTimeout(fw,4200)}

/* ---- tbk: Pregunta de desempate entre los jugadores empatados en el cargo más alto. ---- */
function tbk(g){const lvl=Math.max(1,Math.min(CG.length,S.pl[g[0]].c||1)),q=pick(lvl),o=$("#ov");o.hidden=false;
o.innerHTML=`<h2>⚖ Desempate · cargo en disputa: ${CG[lvl-1]}</h2><div class="hx qh"><div>${esc(q.q)}</div></div><div class="op">${q.o.map((t,k)=>`<div class="hx"><div><b>${"ABCD"[k]}:</b> ${esc(t)}</div></div>`).join("")}</div><p style="text-align:center"><button id="sa" class="sm">👁 Ver respuesta</button> <b id="an" style="color:#5bff8a"></b></p><p style="text-align:center">Marca quién acertó:</p><div class="avs">${g.map(i=>`<button class="av" data-i="${i}"><span>${AV(S.pl[i])}</span>${esc(S.pl[i].n)}</button>`).join("")}</div><div class="ob"><button id="tk">✔ Aplicar resultado</button><button id="tc" class="sm">Cancelar</button></div>`;
const ok=new Set();$("#sa").onclick=()=>{$("#an").textContent="➜ "+q.c};
$$("#ov .av").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;ok.has(i)?ok.delete(i):ok.add(i);b.classList.toggle("on",ok.has(i))});
$("#tk").onclick=()=>{ok.forEach(i=>S.pl[i].tb++);o.hidden=true;fin()};$("#tc").onclick=()=>{o.hidden=true}}

