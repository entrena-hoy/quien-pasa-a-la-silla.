/* ============================================================
   02-preguntas.js — BANCO DE PREGUNTAS Y ACERTIJOS DE EJEMPLO
   Preguntas (formato nivel|pregunta|A|B|C|D|letra) y acertijos (acertijo|palabra clave) que aparecen por defecto en Configuración. Se pueden reemplazar desde la pantalla de Configuración sin tocar el código.
   ============================================================ */

/* ---- DQ: Banco de preguntas de ejemplo (100). Formato por línea: nivel(1-10)|pregunta|A|B|C|D|letra correcta. ---- */
const DQ=`1|¿Qué es una empresa?|Una unidad que combina recursos para producir bienes o servicios|Un edificio de oficinas|Un tipo de impuesto|Un contrato de trabajo|A
1|¿Quién aporta el capital y es dueño de la empresa?|El gerente siempre|El empleado más antiguo|El Estado|El propietario o socios|D
1|¿Para qué sirve un organigrama?|Calcular costos|Pagar nómina|Mostrar la estructura jerárquica|Hacer publicidad|C
2|¿Cuál es una etapa del proceso administrativo?|Cobrar|Organizar|Importar|Archivar|B
2|La misión de una empresa responde a...|¿Dónde estaremos en 10 años?|¿Para qué existe hoy?|¿Cuánto ganamos?|¿Quién nos vende?|B
2|El recurso humano de una empresa es...|Una máquina|El dinero en caja|El personal que trabaja en ella|El inventario|C
3|¿Quién es el padre de la administración científica?|Henri Fayol|Max Weber|Elton Mayo|Frederick Taylor|D
3|La visión de una empresa describe...|El futuro deseado|Las deudas|Los proveedores|El horario|A
3|Dirigir consiste en...|Fijar metas|Guiar e influir en el personal|Comparar resultados|Diseñar el organigrama|B
4|El DOFA (FODA) analiza...|Solo finanzas|Debilidades, oportunidades, fortalezas y amenazas|Solo la competencia|Solo clientes|B
4|Según Fayol, "unidad de mando" significa que...|Cada empleado recibe órdenes de un solo jefe|Todos mandan por igual|Nadie manda|El jefe no delega|A
4|La mezcla de mercadeo (4P) es...|Personas, procesos, pagos y planes|Producción, personal, política y poder|Producto, precio, plaza y promoción|Proveedor, precio, pedido y pago|C
5|El punto de equilibrio es donde...|Se vende más|Se pierde todo|Se paga el IVA|Los ingresos igualan los costos totales|D
5|La liquidez mide...|El tamaño de la empresa|La capacidad de pagar deudas a corto plazo|El número de clientes|La antigüedad|B
5|Maslow organiza la motivación en...|Una pirámide de necesidades|Un círculo de salarios|Una tabla de ventas|Un árbol de cargos|A
6|Un costo fijo es el que...|Cambia con la producción|No varía con el volumen producido|Solo existe en servicios|Se paga una vez|B
6|El ciclo PHVA (Deming) significa...|Planear, hacer, verificar y actuar|Pagar, hacer, vender y ahorrar|Producir, hallar, vender y atender|Prever, huir, vender y aceptar|A
6|La segmentación de mercado consiste en...|Subir precios|Dividir el mercado en grupos con necesidades similares|Eliminar competidores|Reducir personal|B
7|Las cinco fuerzas de Porter analizan...|El clima laboral|La estructura de costos|La rentabilidad y competencia de un sector|El balance general|C
7|La cadena de valor fue propuesta por...|Michael Porter|Peter Drucker|Philip Kotler|Igor Ansoff|A
7|El flujo de caja muestra...|Las ventas del año|Las entradas y salidas de dinero|Los activos fijos|El patrimonio|B
8|En el balance general, Activo es igual a...|Pasivo más Patrimonio|Ingresos menos gastos|Costos más utilidades|Ventas menos impuestos|A
8|La matriz BCG clasifica...|Empleados por desempeño|Proveedores por precio|Productos según crecimiento y participación|Costos fijos|C
8|La administración por objetivos (APO) fue impulsada por...|Peter Drucker|Frederick Taylor|Henri Fayol|Max Weber|A
9|El Balanced Scorecard mide el desempeño desde...|Solo la perspectiva financiera|Cuatro perspectivas: financiera, clientes, procesos y aprendizaje|Solo el cliente|Solo el personal|B
9|El ROI mide...|El retorno de una inversión|El riesgo país|La rotación de personal|La liquidez|A
9|El gobierno corporativo es...|Un partido político|Un tipo de crédito|Un impuesto|El sistema de reglas con que se dirige y controla la empresa|D
10|Una estrategia de océano azul busca...|Competir solo en precio|Crear mercados nuevos sin competencia directa|Copiar al líder|Reducir la calidad|B
10|El WACC es...|El costo promedio ponderado del capital|Un tipo de contrato|Un índice de inflación|El margen bruto|A
10|La responsabilidad social empresarial implica...|Evitar impuestos|Solo donar dinero|Generar valor cuidando el impacto en la sociedad y el ambiente|Reducir la plantilla|C
1|¿Qué es administrar?|Planear, organizar, dirigir y controlar recursos para lograr objetivos|Solo dar órdenes|Solo vender productos|Solo llevar la contabilidad|A
1|Una empresa que compra y vende productos sin transformarlos es...|Industrial|Comercial|Agrícola|Minera|B
1|¿Cuál es un recurso material de una empresa?|La maquinaria|La cultura|El liderazgo|La motivación|A
1|Los clientes son...|Quienes controlan los impuestos|Quienes dirigen la empresa|Quienes compran los productos o servicios|Quienes surten las materias primas|C
1|Un proveedor es quien...|Compra el producto final|Cobra los impuestos|Suministra materias primas o servicios a la empresa|Dirige a los empleados|C
1|Una empresa privada es aquella que...|No necesita clientes|Es propiedad del gobierno|No tiene empleados|Pertenece a particulares y no al Estado|D
1|El propósito de una empresa comercial es...|Regalar sus productos|Obtener utilidades satisfaciendo necesidades del cliente|Evitar a los clientes|Cerrar pronto|B
2|¿Qué es un objetivo empresarial?|Un error contable|Una máquina|Un tipo de contrato|Un resultado que la empresa quiere alcanzar|D
2|Planear consiste en...|Comparar resultados al final|Contratar personal|Pagar la nómina|Definir metas y los medios para lograrlas|D
2|Organizar implica...|Cobrar facturas|Definir la estructura, tareas y responsabilidades|Hacer publicidad|Fijar el precio|B
2|El control sirve para...|Verificar que lo hecho coincida con lo planeado|Contratar personal|Definir la misión|Pagar impuestos|A
2|Una meta es...|Un impuesto|Un logro concreto y medible en un plazo|Un cargo|Un sueño sin fecha|B
2|Una sociedad es...|Una entidad bancaria|Una empresa formada por dos o más personas|Un negocio de un solo dueño|Un contrato de arriendo|B
2|El sector de servicios ofrece...|Solo maquinaria|Solo alimentos|Solo materias primas|Actividades intangibles como asesorías o transporte|D
3|¿Quién propuso los 14 principios de la administración?|Frederick Taylor|Henri Fayol|Peter Drucker|Elton Mayo|B
3|La teoría de las relaciones humanas destaca...|Solo los costos|El factor humano y la motivación|Solo la maquinaria|Solo la jerarquía|B
3|Taylor propuso...|Eliminar los salarios|Dirigir sin normas|Aplicar métodos científicos para ganar eficiencia|Trabajar sin planear|C
3|La burocracia de Max Weber se basa en...|Decisiones sin normas|Trabajo sin jefes|Improvisación|Reglas, jerarquía y división del trabajo|D
3|La autoridad es...|Un impuesto|El derecho de mandar y exigir obediencia en la organización|Un tipo de salario|Un manual|B
3|El principio de Fayol llamado disciplina significa...|Castigar siempre|Evitar el orden|Trabajar sin reglas|Respeto a las normas y acuerdos|D
3|La jerarquía de una empresa indica...|Los clientes|Las ventas|Los niveles de autoridad|Los colores del logo|C
4|La cultura organizacional es...|Valores, creencias y hábitos compartidos|El balance general|Un tipo de impuesto|La publicidad|A
4|Un presupuesto es...|Un cargo directivo|Un contrato|Un plan financiero de ingresos y gastos|Un inventario|C
4|El mercado meta es...|La competencia|El grupo de clientes al que se dirige la empresa|El lugar de producción|El banco|B
4|El análisis interno del DOFA corresponde a...|Clientes y proveedores|Debilidades y fortalezas|Oportunidades y amenazas|Impuestos y subsidios|B
4|La eficiencia es...|Hacer cosas sin importar el costo|Lograr metas sin recursos|Hacer bien las cosas usando bien los recursos|Ahorrar sin producir|C
4|La eficacia es...|Evitar el control|Lograr los objetivos propuestos|Trabajar más horas|Gastar menos|B
4|Un manual de funciones describe...|Los clientes|Los precios|Los impuestos|Las tareas y responsabilidades de cada cargo|D
5|La rotación de personal mide...|La salida de productos del inventario|Las ventas|La entrada y salida de empleados en un periodo|El capital|C
5|El inventario es...|Las deudas|Los bienes que la empresa tiene para producir o vender|Los empleados|El local|B
5|Un activo corriente es...|Un bien convertible en efectivo en menos de un año|Una deuda a largo plazo|El capital social|Un edificio|A
5|El margen de utilidad compara...|Los activos con los pasivos|Las ventas con los clientes|Los costos con las deudas|La utilidad con las ventas|D
5|La capacitación busca...|Eliminar cargos|Aumentar la rotación|Mejorar conocimientos y habilidades del trabajador|Reducir salarios|C
5|La publicidad es una herramienta de...|Producción|Auditoría|Promoción|Contabilidad|C
5|El liderazgo democrático se caracteriza por...|No decidir nunca|Decidir con participación del equipo|Imponer castigos|Decidir sin escuchar|B
6|El costo variable es el que...|Nunca cambia|Es solo el arriendo|Se paga una sola vez|Cambia según la cantidad producida|D
6|La ventaja competitiva es...|Un impuesto|Lo que hace a la empresa superior a sus rivales|Un préstamo|Un cargo|B
6|El plan de marketing define...|Estrategias para llegar y atender al mercado|El inventario|La nómina|Los impuestos|A
6|El posicionamiento busca...|Subir precios|Reducir empleados|Cambiar de sede|Ocupar un lugar claro en la mente del consumidor|D
6|La evaluación de desempeño sirve para...|Comprar activos|Medir el rendimiento de los trabajadores|Fijar precios|Calcular impuestos|B
6|El ciclo de vida del producto incluye...|Inicio, pausa, fin y regreso|Compra, venta, deuda y pago|Idea, error, deuda y cierre|Introducción, crecimiento, madurez y declive|D
6|Outsourcing es...|Contratar a un tercero para una actividad de la empresa|Despedir a todos|Cerrar una sede|Vender la empresa|A
7|Las utilidades netas son...|Ingresos menos costos, gastos e impuestos|Los activos totales|Solo los gastos|Solo las ventas|A
7|El capital de trabajo es...|Ventas menos costos|Activo corriente menos pasivo corriente|Los activos fijos|Pasivo menos patrimonio|B
7|La planeación estratégica define...|La nómina|El rumbo y los objetivos a largo plazo|El inventario|Las tareas de cada día|B
7|El benchmarking consiste en...|Reducir costos siempre|Compararse con los mejores para aprender y mejorar|Eliminar competidores|Copiar sin permiso|B
7|El empowerment es...|Eliminar equipos|Dar poder y autonomía a los empleados para decidir|Despedir jefes|Quitar autoridad|B
7|La rentabilidad mide...|El inventario|La ganancia respecto a la inversión|La liquidez|El tamaño de la planta|B
7|Una alianza estratégica es...|Una fusión forzada|Un impuesto|Un acuerdo entre empresas para lograr objetivos comunes|Un despido|C
8|El punto de equilibrio se calcula con...|Solo los gastos|Solo las ventas|Solo los activos|Costos fijos, precio y costo variable unitario|D
8|La matriz de Ansoff plantea estrategias de...|Crecimiento por productos y mercados|Impuestos|Nómina|Costos|A
8|La gestión del cambio busca...|Llevar a la organización a nuevas formas de trabajo con menos resistencia|Cerrar áreas|Evitar todo cambio|Despedir personal|A
8|El EBITDA es...|Un impuesto|La utilidad antes de intereses, impuestos, depreciación y amortización|Un inventario|Una deuda|B
8|El apalancamiento financiero consiste en...|Pagar siempre de contado|Vender activos|Reducir ventas|Usar deuda para financiar inversiones y aumentar rendimientos|D
8|La teoría Y de McGregor supone que el empleado...|Es perezoso por naturaleza|Puede ser responsable y automotivado|Necesita vigilancia constante|Rechaza el trabajo|B
8|La logística integra...|Solo publicidad|Solo nómina|Compras, almacenamiento y distribución|Solo contabilidad|C
9|La razón corriente mide...|Deuda sobre patrimonio|Utilidad sobre ventas|Ventas sobre activos|Activo corriente sobre pasivo corriente|D
9|La teoría de las restricciones busca...|Duplicar precios|Identificar y gestionar el cuello de botella|Eliminar al personal|Evitar la producción|B
9|La gestión por competencias evalúa...|Solo la antigüedad|Solo el título|Solo el salario|Conocimientos, habilidades y actitudes|D
9|Un joint venture es...|Una auditoría|Una alianza de empresas para un negocio común|Un despido colectivo|Un impuesto|B
9|El valor presente neto (VPN) sirve para...|Fijar precios|Medir el clima laboral|Calcular la nómina|Evaluar si una inversión es rentable|D
9|La responsabilidad social corporativa se relaciona con...|Solo el Estado|Los grupos de interés o stakeholders|Solo los dueños|Solo los clientes|B
9|La estrategia de diferenciación busca...|Copiar al líder|Competir solo en precio|Reducir la calidad|Ofrecer algo único que el cliente valore|D
10|Las cinco fuerzas de Porter incluyen...|Rivalidad, nuevos entrantes, sustitutos, clientes y proveedores|Solo clientes y precios|Solo empleados|Solo costos|A
10|La TIR es...|Un impuesto|Un salario|Un inventario|La tasa que hace el VPN de una inversión igual a cero|D
10|La estructura de capital se refiere a...|El inventario|El número de cargos|La mezcla de deuda y patrimonio que financia la empresa|Las ventas|C
10|La gestión de riesgos busca...|Evitar toda inversión|Subir costos|Identificar, evaluar y controlar amenazas|Ocultar pérdidas|C
10|La planeación por escenarios permite...|Eliminar el control|Evitar planear|Predecir el futuro con exactitud|Prepararse para futuros posibles e inciertos|D
10|La innovación disruptiva es...|Una mejora mínima|Un cambio de logo|Un recorte de costos|Un cambio que crea nuevos mercados y desplaza a los líderes|D
10|El mapa estratégico del BSC relaciona...|Solo personal|Objetivos de las cuatro perspectivas en causa y efecto|Solo cuentas contables|Solo precios|B`;

/* ---- DR: Acertijos de ejemplo. Formato: acertijo|palabra clave (varias separadas por coma). ---- */
const DR=`Cuanto más me compartes, más crezco. Si me guardas, desaparezco. ¿Qué soy?|conocimiento,saber
Tengo dientes pero no muerdo. ¿Qué soy?|peine
Entre más me quitas, más grande me hago. ¿Qué soy?|hoyo,agujero
Es tuyo, pero los demás lo usan más que tú. ¿Qué es?|nombre
Si me nombras, dejo de existir. ¿Qué soy?|silencio
Todos me necesitan en una empresa, siempre voy hacia adelante y nunca regreso. ¿Qué soy?|tiempo`;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

