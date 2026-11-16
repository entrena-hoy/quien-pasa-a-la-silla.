/* ============================================================
   08-juego.js — LÓGICA DE CADA PREGUNTA
   Todo lo que pasa con el jugador en la silla: mostrar pregunta y respuestas, cronómetro, comodines, retiro, acierto/error y paso a la siguiente.
   ============================================================ */

/* ---- nq: Prepara una pregunta nueva. No arranca sola: el monitor la inicia. ---- */
function nq(){think(false);S.q=pick(S.lv);S.go=0;S.sh=0;S.fresh=0;S.sel=null;S.rv=0;S.ret=0;S.late=0;S.unl=0;S.half=0;S.fr=0;S.hid=[];S.t=S.secs;save();rq()}

/* ---- startQ: Botón verde ▶: inicia el cronómetro y el suspenso. ---- */
function startQ(){if(S.go||S.sh<5)return;S.go=1;S.t=S.secs;save();rq();tick();bgm(false);think(true)}

/* ---- revealNext: Muestra la pregunta y luego cada respuesta, una por una. ---- */
function revealNext(){if(S.sh>=5)return;S.sh++;S.fresh=1;tone(700,0,.15,"triangle",.12);rq()}

/* ---- tick: Cuenta regresiva; al llegar a 0 oculta la pregunta y bloquea las respuestas. ---- */
function tick(){clearInterval(iv);iv=setInterval(()=>{S.t--;if(S.t<=0){S.t=0;S.late=1;clearInterval(iv);think(false);snd("late");rq()}else tm()},1000)}

/* ---- tm: Actualiza el número del cronómetro. ---- */
function tm(){const t=$("#tm");if(!t)return;t.className=S.late?"":S.t<=3?"low":"";t.textContent=S.late?"⏰":S.t}

/* ---- rq: DIBUJA LA PREGUNTA: barra superior, escalera de cargos, círculo, pregunta, respuestas y ayudas. ---- */
function rq(){const p=S.pl[S.cur],q=S.q,ca=canAns(),nw=S.fresh;S.fresh=0;const sh=S.go?5:S.sh,hid=S.late&&!S.rv,val=Math.round(S.lv*S.base*((S.late||S.half)?.5:1)),cr=p.c>0?CG[p.c-1]:"SIN CARGO";
$("#top").innerHTML=`<div class="who"><span class="bigav">${AV(p)}</span><div><b>${esc(p.n)}</b><small>Pregunta ${S.lv}/${CG.length}</small></div></div><div class="pts">${S.go&&!S.rv?`Vale <b>${m(val)}</b>`:""}</div><div class="rt2"><button class="lf${p.l5?" used":""}" id="l5">50 y 50</button><button class="lf${p.lf?" used":""}" id="lf">Público</button><button class="lf${p.cm?" used":""}" id="lc">Comodín</button>${S.go?`<div id="tm"></div>`:""}</div>`;
$("#l5").onclick=useL5;$("#lf").onclick=usePb;$("#lc").onclick=useCm;
$("#lad").innerHTML=Array.from({length:CG.length},(_,i)=>CG.length-i).map(l=>`<div class="lr${l==S.lv?" cur":""}${l<S.lv?" done":""}"><b>${l}</b>${CG[l-1]}<em>${m(l*S.base)}</em></div>`).join("");$("#lad").style.setProperty("--rh",Math.min(4.1,40/CG.length)+"vh");
ctr(S.ret?`<small>SE RETIRA COMO</small><b>${cr}</b><b class="mny">${m(p.p)}</b>`:S.rv&&!S.ok?`<b class="nc">${LOST}</b><b class="mny" style="color:#ff6b6b">${m(0)}</b>`:`<b>${CG[S.lv-1]}</b><b class="mny">${m(p.p)}</b>`);
$("#bot").innerHTML=`<div class="hx qh${(hid||sh<1)?" nx":""}${nw&&sh==1?" ent":""}"><div>${hid?"":esc(q.q)}</div></div><div class="op">${q.o.map((t,k)=>{const L="ABCD"[k];return `<div class="hx${S.hid.includes(L)?" gone":""}${sh<k+2?" nx":""}${nw&&sh==k+2?" ent":""}${S.fr?" yl":""}${S.sel==L?" sel":""}${S.rv&&L==q.c?" ok":""}${S.rv&&S.sel==L&&L!=q.c?" bad":""}${S.go&&!ca&&!S.rv&&!S.sel?" lk":""}" data-k="${L}"><div><b>${L}:</b> ${esc(t)}</div></div>`}).join("")}</div>`;
$$(".op .hx").forEach(x=>x.onclick=()=>choose(x.dataset.k));
$("#lpn").innerHTML=S.go&&S.late&&!S.sel&&!S.rv&&!S.unl?`<div class="lfp"><b>⏰ ¡Tiempo! Respuestas bloqueadas.</b><br><small>Elige una ayuda (vale 50%) o retírate:</small><div class="ob"><button id="pl5" ${p.l5?"disabled":""}>🎯 50 y 50</button><button id="ppb" ${p.lf?"disabled":""}>👥 Preguntar al público</button><button id="pcm" ${p.cm?"disabled":""}>🔄 Comodín (nueva pregunta)</button><button id="gup" class="sm">🚪 Me retiro</button></div></div>`:S.fr&&!S.rv?`<div class="lfp2">👥 El público opina… (vale 50%)</div>`:"";
if($("#pl5")){$("#pl5").onclick=useL5;$("#ppb").onclick=usePb;$("#pcm").onclick=useCm;$("#gup").onclick=retire}
tm();const x1=$("#b1"),x2=$("#b2");x2.style.display=(!S.rv&&!S.sel)?"":"none";x2.textContent="🚪 Me retiro";x1.style.display=(S.go&&!S.rv)?"none":"";x1.className=(!S.go&&S.sh>=5)?"play":"";
x1.textContent=!S.go?(S.sh==0?"👁 Mostrar pregunta":S.sh>=5?"▶ Iniciar cronómetro":"👁 Mostrar respuesta "+"ABCD"[S.sh-1]):S.ok?(S.fin?"🏁 Ver resultado final":"➡ Siguiente pregunta"):(S.pl.some(p=>!p.out)?"🧩 Siguiente acertijo":"🏁 Ver resultado final")}

/* ---- choose: El monitor marca la respuesta que dio el jugador. ---- */
function choose(k){if(!canAns()||S.hid.includes(k))return;clearInterval(iv);think(false);tone(500,0,.3,"triangle",.15);S.sel=k;rq();setTimeout(res,1500)}

/* ---- res: RESULTADO: si acierta suma premio y cargo; si falla pierde todo y queda eliminado. ---- */
function res(){const p=S.pl[S.cur];clearInterval(iv);think(false);S.rv=1;S.ok=S.sel==S.q.c;snd(S.ok?"ok":"bad");if(S.ok){p.c++;p.p+=Math.round(S.lv*S.base*((S.late||S.half)?.5:1));if(S.lv>=CG.length)S.fin=1}else{p.out=1;p.c=0;p.p=0;p.nc=1}save();rq()}

/* ---- useL5: Comodín 50 y 50: quita dos respuestas falsas (vale la mitad). ---- */
function useL5(){const p=S.pl[S.cur];if(!p||!S.go||p.l5||S.sel||S.rv)return;p.l5=1;S.half=1;S.unl=1;S.hid=["A","B","C","D"].filter(x=>x!=S.q.c).sort(()=>Math.random()-.5).slice(0,2);save();rq()}

/* ---- usePb: Comodín Público: las cuatro respuestas quedan en amarillo (vale la mitad). ---- */
function usePb(){const p=S.pl[S.cur];if(!p||!S.go||p.lf||S.sel||S.rv)return;p.lf=1;S.half=1;S.unl=1;S.fr=1;save();rq()}

/* ---- retire: Pide confirmación para retirar al jugador. ---- */
function retire(){const p=S.pl[S.cur];if(!p||S.sel||S.rv)return;dlg("¿Confirmas que "+p.n+" se retira?",doRetire)}

/* ---- doRetire: Retiro: el jugador conserva su cargo y su dinero; salen fuegos artificiales. ---- */
function doRetire(){const p=S.pl[S.cur];if(!p||S.sel||S.rv)return;clearInterval(iv);think(false);S.ret=1;S.rv=1;S.ok=0;p.out=1;p.ret=1;save();rq();snd("ok");fw()}

/* ---- useCm: Comodín: cambia la pregunta por otra del mismo nivel (vale la mitad). ---- */
function useCm(){const p=S.pl[S.cur];if(!p||!S.go||p.cm||S.sel||S.rv)return;p.cm=1;clearInterval(iv);think(false);S.q=pick(S.lv);S.go=0;S.sh=0;S.fresh=0;S.late=0;S.unl=0;S.fr=0;S.hid=[];S.half=1;S.t=S.secs;save();rq()}

/* ---- act1: Botón principal / Espacio / Enter: avanza al siguiente paso. ---- */
function act1(){document.activeElement&&document.activeElement.blur();if(S.ph=="riddle"){S.rw!=null?seatP(S.rw):verify()}else if(!S.go){S.sh<5?revealNext():startQ()}else if(S.rv)next()}

/* ---- act2: Botón secundario: otro acertijo, o retirar al jugador. ---- */
function act2(){if(S.ph=="riddle"){S.ri++;S.ra=0;S.rs=null;S.rw=null;RA={};RT={};rr()}else if(S.ph=="q")retire()}

/* ---- next: Pasa a la siguiente pregunta, al siguiente acertijo o al final. ---- */
function next(){const f=$("#fw");if(f)f.remove();if(S.fin||!S.pl.some(p=>!p.out)){fin();return}
if(S.ok){S.lv++;nq()}else{S.ph="riddle";S.ri++;S.ra=0;S.rs=null;S.rw=null;RA={};RT={};S.cur=-1;S.ret=0;save();view()}}

