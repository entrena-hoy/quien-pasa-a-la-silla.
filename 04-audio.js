/* ============================================================
   04-audio.js — SONIDO Y MÚSICA
   Sonidos sintetizados (no requieren archivos), música propia del monitor (carpeta musica/ o archivo del computador) y reproductor incrustado de Spotify, YouTube o SoundCloud.
   ============================================================ */

/* ---- ac: Activa el audio del navegador (necesita un clic o tecla del usuario). ---- */
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state=="suspended")AC.resume();return AC}

/* ---- tone: Genera un tono musical simple; base de todos los efectos de sonido. ---- */
function tone(f,t0,d,ty,v,f2){const a=ac();if(!a||MU)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+t0;o.type=ty||"sine";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime((v||.15)*(MUS.vol/.6),t+.05);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.05)}

/* ---- snd: Efectos: intro, acierto, error y fin de tiempo. ---- */
function snd(k){if(k=="intro"){tone(60,0,6,"sine",.22,120);tone(80,0,3.5,"sawtooth",.1,400);[0,1,2,3,4].forEach(i=>tone(220*Math.pow(1.5,i%3),1+i*.7,1.8,"triangle",.12));tone(440,5,2,"triangle",.16);tone(660,5,2,"triangle",.14)}
else if(k=="ok"){[523,659,784,1047].forEach((f,i)=>tone(f,i*.14,.9,"triangle",.18))}
else if(k=="bad"){tone(220,0,.5,"sawtooth",.15,110);tone(165,.4,1,"sawtooth",.15,70)}
else if(k=="late"){tone(900,0,.15,"square",.1);tone(900,.25,.15,"square",.1)}}

/* ---- MUS: Estado de la música: biblioteca, pista de escenario, pista de suspenso, volumen y reproductor incrustado. ---- */
let MUS={lib:[],bg:"",sus:"",vol:.6,bgEl:null,suEl:null,emb:""};

/* ---- loadLib: Lee musica/musica.json (la lista de canciones de tu carpeta). Solo funciona publicado en internet. ---- */
function loadLib(){try{fetch("musica/musica.json").then(r=>r.json()).then(j=>{MUS.lib=j.canciones||[];if($("#mbg"))fillMus()}).catch(()=>{})}catch(e){}}

/* ---- mkAudio: Crea un reproductor de audio en bucle con el volumen elegido. ---- */
function mkAudio(src){const a=new Audio(src);a.loop=true;a.volume=MUS.vol;a._s=src;return a}

/* ---- bgm: Enciende o apaga la música de escenario (intro, jugadores y acertijos). ---- */
function bgm(on){try{if(on&&MUS.bg&&!MU){if(!MUS.bgEl||MUS.bgEl._s!=MUS.bg)MUS.bgEl=mkAudio(MUS.bg);MUS.bgEl.volume=MUS.vol;MUS.bgEl.play().catch(()=>{})}else if(MUS.bgEl)MUS.bgEl.pause()}catch(e){}}

/* ---- msel: Llena una lista desplegable de música y permite elegir un archivo del computador. ---- */
function msel(id,k){const s=$(id);s.innerHTML=`<option value="">— Sonidos del juego —</option>`+MUS.lib.map(c=>`<option value="musica/${esc(c.archivo)}">${esc(c.titulo)}${c.autor?" — "+esc(c.autor):""}</option>`).join("")+`<option value="__f">📁 Archivo de mi computador…</option>`;
s.value=[...s.options].some(o=>o.value==MUS[k])?MUS[k]:"";
s.onchange=()=>{if(s.value=="__f"){const f=document.createElement("input");f.type="file";f.accept="audio/*";f.onchange=()=>{if(!f.files[0])return;const u=URL.createObjectURL(f.files[0]);s.add(new Option("📁 "+f.files[0].name,u),s.options[s.options.length-1]);s.value=u;MUS[k]=u};f.click();s.value=""}else MUS[k]=s.value}}

/* ---- fillMus: Actualiza las dos listas de música en Configuración. ---- */
function fillMus(){msel("#mbg","bg");msel("#msu","sus")}

/* ---- embedUrl: Convierte un enlace de Spotify, YouTube o SoundCloud en un reproductor incrustado. ---- */
function embedUrl(l){l=(l||"").trim();let m;if(m=l.match(/open\.spotify\.com\/(?:intl-\w+\/)?(track|album|playlist|episode|show|artist)\/(\w+)/))return"https://open.spotify.com/embed/"+m[1]+"/"+m[2];if(m=l.match(/(?:youtu\.be\/|v=)([\w-]{11})/))return"https://www.youtube.com/embed/"+m[1];if(m=l.match(/[?&]list=([\w-]+)/))return"https://www.youtube.com/embed/videoseries?list="+m[1];if(/soundcloud\.com\//.test(l))return"https://w.soundcloud.com/player/?url="+encodeURIComponent(l);return""}

/* ---- showEmb: Muestra u oculta el reproductor incrustado (abajo a la derecha). ---- */
function showEmb(show){let p=$("#mpn");if(!p){if(!MUS.emb)return;p=document.createElement("div");p.id="mpn";document.body.appendChild(p)}
if(MUS.emb&&p.dataset.u!=MUS.emb){p.dataset.u=MUS.emb;p.innerHTML=`<iframe src="${MUS.emb}" width="320" height="152" allow="autoplay; encrypted-media; clipboard-write" loading="lazy" style="border:0;border-radius:12px"></iframe>`}p.classList.toggle("mph",!show)}

/* ---- togEmb: Botón 🎵 del juego: muestra u oculta el reproductor. ---- */
function togEmb(){if(!MUS.emb){dlg("Primero pega un enlace de Spotify, YouTube o SoundCloud en Configuración, sección Música.");return}const p=$("#mpn");showEmb(!p||p.classList.contains("mph"))}

/* ---- think: Música de suspenso mientras corre el tiempo: tu pista elegida o un latido sintetizado. ---- */
function think(on){clearInterval(TH);TH=null;if(MUS.suEl)MUS.suEl.pause();
if(on&&!MU){if(MUS.sus){if(!MUS.suEl||MUS.suEl._s!=MUS.sus)MUS.suEl=mkAudio(MUS.sus);MUS.suEl.currentTime=0;MUS.suEl.volume=MUS.vol;MUS.suEl.play().catch(()=>{})}
else{let n=0;const b=()=>{tone(n%4?98:73,0,.5,"sine",.24);tone(147,0,.6,"triangle",.05);n++};b();TH=setInterval(b,700)}}}

/* ---- muteT: Botón de silencio. ---- */
function muteT(){MU=!MU;if(MU){think(false);bgm(false)}const m=$("#mu");if(m)m.textContent=MU?"🔇":"🔊"}

/* ---- beep: Pitido simple (sin uso actual; se conserva por compatibilidad). ---- */
function beep(){try{const a=new AudioContext(),o=a.createOscillator();o.connect(a.destination);o.frequency.value=440;o.start();o.stop(a.currentTime+.5)}catch(e){}}

