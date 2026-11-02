/* =========================================================
   CONFIGURACIÓN DE LA INVITACIÓN
   Cambia aquí todos los datos. No necesitas tocar otros archivos.
   Las imágenes van en la carpeta "assets" (reemplázalas con el
   mismo nombre o cambia la ruta aquí).
   ========================================================= */
window.CONFIG = {
  // ---- Pestaña del navegador / vista previa al compartir ----
  tituloPagina: "Mis XV años · Daniella Yaneth Cedeño Elizondro",
  descripcion: "Invitación a los XV años de Daniella Yaneth Cedeño Elizondro — 19 de diciembre de 2026, Hotel Sheraton.",

  // ---- Panel de enlaces (panel.html) ----
  linkSitio: "https://jadeinkinvitacionesdigitales-source.github.io/mis-xv-Daniella-Yaneth/XV-Daniella-web/",   // dirección de la invitación publicada
  mensajeEnlace: "Hola, {nombre}. Te invito a mis XV años. Esta es tu invitación personalizada:",

  // ---- Portada ----
  encabezado: "Mis XV años",
  nombre: "Daniella Yaneth Cedeño Elizondro",
  nombreLineas: ["Daniella Yaneth", "Cedeño Elizondro"],   // el nombre grande, una línea por renglón
  inicialesPortada: ["D", "C"],     // las letras grandes de arriba
  nombreCorto: "Daniella",            // se usa en textos ("detalle especial con ...")
  frase: "El comienzo de un nuevo capítulo",

  // ---- Fecha del evento (cuenta regresiva) ----
  // Formato: AAAA-MM-DDTHH:MM:SS-05:00  (-05:00 = hora de Panamá y Colombia)
  fechaEvento: "2026-12-19T19:30:00-05:00",

  // ---- Mensaje de bienvenida (un párrafo por línea) ----
  mensaje: [
    "Hay días que se esperan con mucha ilusión, cuando finalmente llegan, se sienten aún más especiales.",
    "Mis 15 años son uno de esos momentos que quiero atesorar en mi corazón y recordar siempre, rodeada de mi familia, mis buenos amigos y la bendición de Dios.",
    "Por eso, me encantaría que hicieras parte de esta celebración especial e importante para mí, y que juntos hagamos de esta noche un recuerdo inolvidable."
  ],

  // ---- Padres (deja la lista vacía [] para ocultar esta parte) ----
  textoPadres: "Con la bendición de Dios y el amor de mis padres",
  padres: ["Santiago Elias Cedeño De León", "Mixila Yaneth Elizondro Rojas"],

  // ---- Cuenta regresiva ----
  tituloConteo: "CADA DÍA QUE PASA NOS ACERCA MÁS A ESTA NOCHE, FALTAN",
  textoGranDia: "¡Llegó el gran día!",

  // ---- Fecha, hora y lugar ----
  diaSemana: "Sábado",
  dia: "19",
  mes: "Diciembre",
  anio: "2026",
  hora: "7:30 PM",
  horaFin: "2:00 AM",              // vacío "" para no mostrar hora de cierre
  lugar: "Hotel Sheraton",
  direccion: [],                    // líneas de dirección, ej: ["Vía Israel", "Ciudad de Panamá"]
  linkMapa: "https://www.google.com/maps/search/?api=1&query=Hotel+Sheraton",   // PENDIENTE: pegar el link exacto de Google Maps
  textoBotonMapa: "Cómo llegar",

  // ---- Retrato vintage (después de fecha y lugar) ----
  fraseVintage: "Como en los viejos tiempos, una noche para recordar por siempre.",

  // ---- Galería ----
  tituloGaleria: "Mis fotos",
  galeria: ["assets/foto-salon.webp", "assets/foto-6.jpg", "assets/foto-8.jpg", "assets/foto-escalera.webp"],

  // ---- Código de vestimenta ----
  tituloDress: "Código de vestimenta",
  estiloDress: "Formal",
  textoColoresReservados: "Te pedimos amablemente que no utilices estos colores en tu vestimenta, están reservados para la quinceañera.",
  coloresReservados: [
    { nombre: "ROJO VINO", color: "#5E0F1E", borde: true },
    { nombre: "ROJO", color: "#C4122B", borde: true },
    { nombre: "DORADO", color: "#D4A94E", borde: true }
  ],

  // ---- Regalos ----
  tituloRegalos: "Obsequios",
  // Pon *entre asteriscos* las palabras que quieras resaltar
  textoRegalos: [
    "Tu presencia es el regalo más bonito para mí.",
    "Si deseas consentirme con un detalle, puedes hacerlo a través de *lluvia de sobres*."
  ],
  // Datos bancarios (deja banco en "" para ocultar la tarjeta)
  datosBancarios: {
    banco: "",
    tipo: "",
    numero: "",
    titular: ""                   // opcional
  },

  // ---- Confirmación por WhatsApp ----
  tituloConfirmar: "Confirma tu asistencia",
  textoConfirmar: [
    "Queremos preparar cada detalle especialmente para ti.",
    "Por favor confirma tu asistencia."
  ],
  whatsapp: "50766166861",        // número que recibe las respuestas, con indicativo, sin + ni espacios
  // Formulario: el invitado escribe su nombre y elige si va o no. {nombre} se reemplaza.
  textoCampoNombre: "Tu nombre",
  opcionSi: "Sí asistiré",
  opcionNo: "No podré asistir",
  mensajeSi: "Hola, soy {nombre}. ✅ Confirmo que SÍ asistiré a los XV años de Daniella Yaneth Cedeño Elizondro.",
  mensajeNo: "Hola, soy {nombre}. Lamentablemente NO podré asistir a los XV años de Daniella Yaneth Cedeño Elizondro.",
  textoBotonConfirmar: "Enviar por WhatsApp",

  // ---- Cierre ----
  despedida: "Nos encantará compartir contigo el comienzo de este nuevo capítulo.",
  fechaCorta: "19 · 12 · 2026",
  iniciales: "",                // monograma con letras; vacío "" para usar la imagen de monograma

  // ---- Música ----
  inicioCancion: 0,               // segundo donde empieza a sonar la canción (0 = desde el principio)

  // ---- Intro en video ----
  mostrarIntro: true,
  vestidoChampagne: false,         // cambia el vestido rojo del video a color champán (false = colores originales)
  abrirAlTocar: true,             // el sobre espera cerrado hasta que el invitado lo toque
  inicioIntro: 0,                 // segundo en que empieza el video
  segundosIntro: 99,             // el video se cierra solo a los X segundos (o al terminar)
  textoTocaPantalla: "Toca el sobre para abrir",

  // ---- Imágenes y multimedia ----
  img: {
    rosasEsquina: "assets/rosas-esquina.webp",   // rosas de portada, frase y final
    rosasRamo: "assets/rosas-ramo.webp",         // ramo pequeño bajo la fecha
    bordeA: "assets/borde-crema-a.svg",
    bordeB: "assets/borde-crema-b.svg",
    video: "assets/intro-sobre.mp4",
    posterVideo: "",                    // imagen mientras carga el video (la original tenía máscara)
    cancion: "assets/cancion-landslide.mp3",
    fotoPrincipal: "assets/principal-rosa.webp",
    fotoCierre: "assets/cierre-cortinas.webp",    // foto grande del final
    fotoSegunda: "assets/segunda-puertas.webp",   // segunda foto, completa
    dressPareja: "assets/dress-linea.webp",   // imagen del dress code con la pareja (vacío = usa dressElla y dressEl)
    dressElla: "",                      // ilustración de vestido por separado (vacío = no se muestra)
    dressEl: "",                        // ilustración de traje por separado (vacío = no se muestra)
    dressColores: "assets/dress-colores.webp",   // círculos de colores reservados (vacío = círculos simples)
    monograma: ""                        // imagen de monograma del final (vacío = no se muestra)
  }
};
