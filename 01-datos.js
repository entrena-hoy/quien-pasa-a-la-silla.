/* ============================================================
   01-datos.js — DATOS INICIALES Y ESTADO GLOBAL
   Aquí viven los valores por defecto (cargos) y las variables globales que comparte todo el juego. Si quieres otros cargos de ejemplo, edita CG_DEF.
   ============================================================ */

/* ---- CG_DEF: Cargos de ejemplo, de MENOR a MAYOR. El monitor los cambia en Configuración (3 a 15). EM: emojis de respaldo si un jugador no tuviera avatar. ---- */
const CG_DEF=["Practicante","Auxiliar Administrativo","Analista","Coordinador","Jefe de Área","Gerente de Área","Subdirector","Director","Vicepresidente","Gerente General (CEO)"],EM=["🦊","🐼","🦁","🐯","🐸","🦄","🐵","🐙","🦉","🐧"];

/* ---- CG: Cargos de la partida actual (se llena desde Configuración). ---- */
let CG=CG_DEF.slice();

/* ---- TOT: Premio total posible; se recalcula al iniciar. Se usa en la regla del 80% para ocupar el cargo más alto. ---- */
let TOT=110000;

/* ---- S: ESTADO GLOBAL. S=partida actual · iv=temporizador · PL=jugadores · RA/RT=respuestas y tiempos del acertijo · AC=audio · TH=latido de suspenso · MU=silencio · CF=configuración elegida · NX=acción de Enter/Espacio · LOST=texto cuando pierde · UNIT=unidad del premio. ---- */
let S=null,iv=null,PL=[],RA={},RT={},AC=null,TH=null,MU=false,CF=null,NX=null,LOST='NO CONTRATADO',UNIT='$';

