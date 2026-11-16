/* ============================================================
   07-pantallas.js — PANTALLAS PREVIAS Y ACERTIJO
   Configuración, presentación (intro), cuadro de jugadores, estructura del escenario y la ronda del acertijo que decide quién pasa a la silla.
   ============================================================ */

/* ---- stage: PRESENTACIÓN: círculo que se forma, luces, estrellas y lema. Hay dos variantes que se eligen al azar cada vez. ---- */
function stage(){const v2=rnd(2)==1;think(false);
$("#app").innerHTML=`<div class="bg ${v2?"intro2":"intro"}"><div class="beams"><i></i><i></i><i></i><i></i></div><div class="ray"></div><div class="emb"><svg class="rings" viewBox="0 0 200 200"><circle pathLength="1" cx="100" cy="100" r="97" style="animation-delay:.4s"/><circle pathLength="1" cx="100" cy="100" r="89" style="animation-delay:1s"/><circle pathLength="1" cx="100" cy="100" r="81" style="animation-delay:1.6s"/><circle pathLength="1" cx="100" cy="100" r="73" style="animation-delay:2.2s"/></svg><i></i><i></i><i></i><div class="core"></div><div class="etx"><small>¡QUIÉN PASA A</small><b>LA SILLA!</b></div></div></div><div class="tag" style="animation-delay:${v2?1.6:5.2}s">Tú respondes, yo pregunto</div><div class="bar"><button id="ct" style="visibility:hidden">Continuar ▶</button><button id="mu" class="sm">${MU?"🔇":"🔊"}</button></div>`;
if(MUS.bg)bgm(true);else snd("intro");setTimeout(sparks,v2?800:3500);if(v2)setTimeout(fw,1400);
NX=null;setTimeout(()=>{const c=$("#ct");if(c){c.style.visibility="visible";NX=players}},v2?3500:6500);$("#ct").onclick=players;$("#mu").onclick=muteT}

/* ---- setup: PANTALLA DE CONFIGURACIÓN: cargos, texto de pérdida, premio, tiempo, tema, música, acertijos y preguntas. Aquí se valida todo antes de empezar. ---- */
function setup(){clearInterval(iv);think(false);bgm(false);const sv=load(),f0=$("#fw");if(f0)f0.remove();S=null;NX=null;const cf=lcfg()||{};
$("#app").innerHTML=`<div class="st"><h1>⚙ ¡Quién pasa a la silla! — Configuración</h1><small>«Tú respondes, yo pregunto». Esta pantalla es solo para ti, antes de proyectar.</small>
<label>Cargos o niveles, de MENOR a MAYOR (uno por línea, entre 3 y 15). Pueden ser laborales, académicos o de juego.</label><textarea id="cg" style="min-height:160px">${esc(cf.cg||CG_DEF.join("\n"))}</textarea>
<div class="row"><label>Texto cuando pierde <input id="lo" value="${esc(cf.lo||"NO CONTRATADO")}" style="width:220px"></label><label>Unidad del premio <input id="un" value="${esc(cf.un||"$")}" style="width:90px"></label><label>Valor de la 1.ª pregunta <input id="bs" type="number" value="${cf.bs||2000}" min="1" style="width:120px"></label><label>Segundos por pregunta <input id="sc" type="number" value="${cf.sc||10}" min="5" max="60" style="width:90px"></label></div>
<label>Tema visual <select id="tm0"><option value="-1">🎲 Cambia cada vez (aleatorio)</option>${TEMAS.map((t,i)=>`<option value="${i}">${t.n}</option>`).join("")}</select></label>
<h3>🎵 Música</h3><div class="row"><label>Escenario <select id="mbg"></select></label><label>Suspenso <select id="msu"></select></label><label>Volumen <input id="mv" type="range" min="0" max="100" value="${Math.round(MUS.vol*100)}"></label></div>
<div class="row"><input id="ml" placeholder="Pega un enlace de Spotify, YouTube o SoundCloud" style="flex:1"><button id="mb" class="sm">Cargar reproductor</button></div>
<small>Sube tus canciones a la carpeta «musica» (ver guía) o usa un archivo de tu computador. Usa solo música que tengas derecho a reproducir en público.</small>
<label>Acertijos: acertijo|palabra clave (varias claves separadas por coma)</label><textarea id="rd">${esc(cf.rd||DR)}</textarea>
<label>Preguntas: nivel (1-10)|pregunta|A|B|C|D|letra correcta. (Los 10 niveles se reparten entre tus cargos.)</label><textarea id="qs" style="min-height:260px">${esc(cf.qs||DQ)}</textarea>
<small>Luego: Enter o ▶ abre la presentación · otro Enter muestra el cuadro de jugadores · otro Enter, el acertijo. En juego: A B C D · 5 = 50 y 50 · 6 = público · 7 = comodín · Espacio = siguiente paso.</small>
<div class="row"><button id="go">▶ Iniciar presentación</button>${sv&&sv.pl?'<button id="rs" class="sm">↻ Reanudar partida</button>':''}</div></div>`;
$("#tm0").value=cf.tm==null?-1:cf.tm;$("#tm0").onchange=()=>{const v=+$("#tm0").value;applyTheme(v>=0?v:pickTheme())};
fillMus();$("#mv").oninput=()=>{MUS.vol=$("#mv").value/100;[MUS.bgEl,MUS.suEl].forEach(a=>a&&(a.volume=MUS.vol))};
$("#mb").onclick=()=>{const u=embedUrl($("#ml").value);if(!u){dlg("No reconocí ese enlace. Usa uno de Spotify, YouTube o SoundCloud.");return}MUS.emb=u;showEmb(true)};
const go=()=>{const qs=$("#qs").value.split("\n").map(l=>l.split("|").map(x=>x.trim())).filter(a=>a.length>=7&&+a[0]>=1&&+a[0]<=10&&"ABCD".includes(a[6].toUpperCase())).map((a,i)=>({id:i,l:+a[0],q:a[1],o:a.slice(2,6),c:a[6].toUpperCase()}));
const rd=$("#rd").value.split("\n").map(l=>l.split("|").map(x=>x.trim())).filter(a=>a.length>=2&&a[0]&&a[1]).map(a=>({q:a[0],k:a[1].split(",").map(x=>x.trim()).filter(Boolean)}));
const cg=$("#cg").value.split("\n").map(x=>x.trim()).filter(Boolean).slice(0,15);
if(cg.length<3){dlg("Escribe al menos 3 cargos o niveles.");return}
if(!qs.length||!rd.length){dlg("Revisa el formato de acertijos y preguntas.");return}
CG=cg;LOST=$("#lo").value.trim()||"NO CONTRATADO";UNIT=$("#un").value.trim()||"$";
try{localStorage.setItem("qsa4c",JSON.stringify({cg:$("#cg").value,lo:LOST,un:UNIT,bs:$("#bs").value,sc:$("#sc").value,tm:$("#tm0").value,mbg:MUS.bg,msu:MUS.sus,mv:$("#mv").value,qs:$("#qs").value,rd:$("#rd").value}))}catch(e){}
CF={qs,rd,secs:+$("#sc").value||10,base:Math.max(1,+$("#bs").value||2000)};const tv=+$("#tm0").value;if(tv>=0)applyTheme(tv);ac();showEmb(false);stage()};
$("#go").onclick=go;NX=go;
if($("#rs"))$("#rs").onclick=()=>{S=sv;S.base=S.base||2000;CG=S.cg||CG_DEF.slice();LOST=S.lost||"NO CONTRATADO";UNIT=S.unit||"$";TOT=S.base*CG.length*(CG.length+1)/2;CF={qs:S.qs,rd:S.rd,secs:S.secs,base:S.base};PL=S.pl;RA={};RT={};if(S.ph=="q"&&!S.rv){S.sh=0;S.go=0;S.sel=null;S.late=0;S.unl=0;S.half=0;S.fr=0;S.hid=[]}S.ph=="final"?fin():shell()}}

/* ---- players: Cuadro donde se escriben los jugadores y se personalizan sus avatares. ---- */
function players(){clearInterval(iv);think(false);const f0=$("#fw");if(f0)f0.remove();if(!CF){setup();return}S=null;PL=[];
$("#app").innerHTML=`<div class="bg"><div class="ray"></div><div class="emb"><i></i><i></i><i></i><div class="core"></div><div class="etx"><small>JUGADORES</small><b id="ct">0/10</b></div></div></div><div class="pbox"><div><input id="nm" placeholder="Nombre del jugador" maxlength="18"> <button id="ad">+ Agregar</button></div><div id="pl" class="row" style="justify-content:center;margin-top:2vh"></div></div><div class="bar"><button id="gp">▶ Continuar</button><button id="mu" class="sm">${MU?"🔇":"🔊"}</button><button id="b3" class="sm">⚙ Configuración</button></div>`;
const ad=()=>{const v=$("#nm").value.trim();if(!v||PL.length>=10)return;PL.push({n:v,av:rav(),c:0,p:0,out:0,tb:0,l5:0,lf:0,cm:0});$("#nm").value="";drs();aed(PL.length-1)};
$("#ad").onclick=ad;$("#nm").onkeydown=e=>{if(e.key=="Enter")ad()};$("#gp").onclick=startGame;$("#mu").onclick=muteT;$("#b3").onclick=setup;NX=startGame;drs();$("#nm").focus();sparks();bgm(true)}

/* ---- startGame: Crea la partida con los jugadores y la configuración y pasa al acertijo. ---- */
function startGame(){if(PL.length<2){dlg("Agrega al menos 2 jugadores.");return}TOT=CF.base*CG.length*(CG.length+1)/2;RA={};RT={};S={base:CF.base,cg:CG.slice(),lost:LOST,unit:UNIT,pl:PL,qs:CF.qs,rd:CF.rd,secs:CF.secs,sh:0,fresh:0,ph:"riddle",ri:0,ra:0,rs:null,rw:null,cur:-1,lv:1,q:null,go:0,sel:null,rv:0,ok:0,ret:0,late:0,unl:0,half:0,fr:0,hid:[],used:{},fin:0,t:0};save();shell()}

/* ---- shell: Arma el escenario del juego (círculo, barra superior, escalera, zona de preguntas y botones). ---- */
function shell(){clearInterval(iv);NX=null;$("#app").innerHTML=`<div class="bg"><div class="ray"></div><div class="emb"><i></i><i></i><i></i><div class="core"></div><div class="etx" id="ctr"><small>¡QUIÉN PASA A</small><b>LA SILLA!</b></div></div></div><div id="top"></div><div id="lad"></div><div id="lpn"></div><div id="bot"></div><div class="bar"><button id="b1"></button><button id="b2" class="sm"></button><button id="mu" class="sm">${MU?"🔇":"🔊"}</button><button id="mp" class="sm">🎵</button><button id="b3" class="sm">⌂ Menú</button></div>`;
$("#b1").onclick=act1;$("#b2").onclick=act2;$("#mu").onclick=muteT;$("#mp").onclick=togEmb;$("#b3").onclick=()=>dlg("¿Volver a la configuración? La partida queda guardada.",setup);view();sparks()}

/* ---- view: Muestra el acertijo o la pregunta según la fase. ---- */
function view(){S.ph=="q"?rq():rr()}

/* ---- rr: RONDA DEL ACERTIJO: tabla donde el monitor escribe la respuesta de cada jugador. ---- */
function rr(){bgm(true);const act=S.pl.map((p,i)=>i).filter(i=>!S.pl[i].out),R=S.rd[S.ri%S.rd.length];
$("#top").innerHTML=`<div class="who"><span class="bigav">🧩</span><div><b>ACERTIJO</b><small>Quien acierte primero pasa a la silla</small></div></div>`;$("#lpn").innerHTML="";$("#lad").innerHTML="";ctr("<small>ESTA RONDA</small><b>🧩 ACERTIJO</b>");
$("#bot").innerHTML=`<div class="hx qh"><div>${esc(R.q)}${S.ra?`<br><b style="color:#5bff8a">➜ ${esc(R.k[0])}</b>`:""}</div></div><div class="rt">${act.map(i=>`<div class="rw${S.rw===i?" win":""}"><span>${AV(S.pl[i])} ${esc(S.pl[i].n)}</span><input data-i="${i}" value="${esc(RA[i]||"")}" placeholder="Respuesta…"><b>${S.rs?(S.rs[i]?"✔":"✖"):""}</b></div>`).join("")}</div>${S.rs&&S.rw==null?`<p class="lfp2">Nadie acertó: usa «Otro acertijo»</p>`:""}<div class="ob"><button class="sm" id="vr">${S.ra?"🙈 Ocultar respuesta":"👁 Ver respuesta"}</button></div>`;
$$(".rt input").forEach(x=>x.oninput=()=>{const i=+x.dataset.i;RA[i]=x.value;if(x.value.trim()){RT[i]=RT[i]||Date.now()}else delete RT[i];if(S.rs){S.rs=null;S.rw=null;bar()}});
$("#vr").onclick=()=>{S.ra=!S.ra;rr()};bar()}

/* ---- bar: Actualiza los botones de la barra durante el acertijo. ---- */
function bar(){const b1=$("#b1"),b2=$("#b2");if(S.ph=="riddle"){b1.style.display=b2.style.display="";b1.textContent=S.rw!=null?"🪑 Pasar a la silla: "+S.pl[S.rw].n:"✔ Verificar respuestas";b2.textContent="🧩 Otro acertijo"}}

/* ---- verify: Revisa las respuestas del acertijo y elige a quien acertó primero. ---- */
function verify(){const R=S.rd[S.ri%S.rd.length];S.rs={};let best=null;S.pl.forEach((p,i)=>{if(p.out)return;const ok=!!RA[i]&&R.k.some(k=>nrm(RA[i]).includes(nrm(k)));S.rs[i]=ok;if(ok&&(best==null||(RT[i]||1e15)<(RT[best]||1e15)))best=i});S.rw=best;rr()}

/* ---- seatP: Sienta a un jugador en la silla (empieza en el primer cargo). ---- */
function seatP(i){S.cur=i;S.lv=1;S.ph="q";nq()}

