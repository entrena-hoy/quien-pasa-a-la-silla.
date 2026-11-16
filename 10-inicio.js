/* ============================================================
   10-inicio.js — TECLADO Y ARRANQUE
   Atajos de teclado y la línea que inicia todo el juego. Debe cargarse al final.
   ============================================================ */

/* ---- iniciar: INICIO: carga música y tema guardados, aplica un tema y abre Configuración. ---- */
function iniciar(){const c=lcfg()||{};MUS.vol=(+c.mv||60)/100;if((c.mbg||"").indexOf("musica/")==0)MUS.bg=c.mbg;if((c.msu||"").indexOf("musica/")==0)MUS.sus=c.msu;applyTheme(c.tm!=null&&+c.tm>=0?+c.tm:pickTheme());loadLib();setup()}

/* ---- teclado: ATAJOS: Espacio/Enter siguiente paso · A B C D respuestas · 5, 6 y 7 comodines. ---- */
document.onkeydown=e=>{if($("#dlg")||$("#aed"))return;const tag=e.target.tagName,sp=e.code=="Space"||e.key=="Enter";
if(NX&&!/INPUT|TEXTAREA|BUTTON/.test(tag)&&sp){e.preventDefault();NX();return}
if(!S||!$("#b1")||/INPUT|TEXTAREA/.test(tag))return;const k=e.key.toUpperCase();
if(S.ph=="q"&&k.length==1&&"ABCD".includes(k)){choose(k);return}
if(S.ph=="q"&&k=="5"){useL5();return}if(S.ph=="q"&&k=="6"){usePb();return}if(S.ph=="q"&&k=="7"){useCm();return}
if(sp){e.preventDefault();act1()}};

/* ---- arranque: Inicia el juego. Debe ser lo último que se carga. ---- */
iniciar();

