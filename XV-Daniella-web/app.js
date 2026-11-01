(function () {
  var C = window.CONFIG, I = C.img;
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var paras = function (list) {
    return list.map(function (t) { return "<p>" + esc(t).replace(/\*(.+?)\*/g, '<span class="highlight">$1</span>') + "</p>"; }).join("");
  };
  var title = function (t) { return '<h2 class="title">' + esc(t) + "</h2>"; };
  var heart = '<div class="heart" aria-hidden="true">&#9829;</div>';
  var sprig = '<img src="' + I.rosasRamo + '" alt="" aria-hidden="true" class="sprig">';
  var flowers = function (src, cls) { return '<img src="' + src + '" alt="" aria-hidden="true" class="' + cls + '">'; };
  var torn = function (src, alt, cls) {
    return '<div class="torn ' + (cls || "") + '"><img src="' + src + '" alt="' + esc(alt) + '">' +
      '<span class="edge top" style="background-image:url(' + I.bordeA + ')"></span>' +
      '<span class="edge bottom" style="background-image:url(' + I.bordeB + ')"></span></div>';
  };
  var ICONS = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    envelope: '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    whatsapp: '<path d="m4 20 1.3-4.4a8.2 8.2 0 1 1 3.2 3.2L4 20Z"/><path d="M9 8.5c-.6.6-.7 1.7.2 3.1s2.3 2.7 3.7 3.2c1 .3 1.9-.2 2.3-.9l-1.6-1.2-.9.7c-.9-.4-1.7-1.2-2.2-2.2l.7-.9L10 8.5Z"/>',
    note: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'
  };
  var icon = function (n, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[n] + "</svg>";
  };

  // Invitado personalizado: index.html?n=Juan%20Pérez&c=2
  var params = new URLSearchParams(location.search);
  var guest = params.get("n");
  var seats = Math.max(parseInt(params.get("c"), 10) || 0, 0);
  var seatsText = seats + (seats === 1 ? " puesto reservado" : " puestos reservados");

  document.title = C.tituloPagina;
  document.querySelector('meta[name="description"]').content = C.descripcion;

  var guestHtml = guest
    ? '<div class="guest"><p class="guest-for">Esta invitación es especialmente para</p>' +
      '<p class="guest-name">' + esc(guest) + "</p>" +
      (seats ? '<p class="guest-seats">' + seatsText + "</p>" : "") +
      "</div>"
    : "";

  var cells = ["Días", "Horas", "Min", "Seg"].map(function (label, i) {
    return '<div class="cd-cell"><div class="cd-num" data-cd="' + i + '">00</div><div class="cd-label">' + label + "</div></div>";
  }).join("");

  document.getElementById("app").innerHTML =
    (C.mostrarIntro
      ? '<div class="intro" id="intro">' +
        '<video id="introVideo" src="' + I.video + "#t=" + (C.inicioIntro || 0.001) + '"' + (I.posterVideo ? ' poster="' + I.posterVideo + '"' : "") + ' preload="auto"' + (C.abrirAlTocar ? "" : " autoplay") + ' muted playsinline></video>' +
        '<div class="intro-hint" id="introHint"><span>' + esc(C.textoTocaPantalla) + "</span></div>" +
        '<button class="intro-skip" id="introSkip">SALTAR</button></div>'
      : "") +

    '<audio id="song" preload="auto" src="' + I.cancion + (C.inicioCancion ? "#t=" + C.inicioCancion : "") + '"></audio>' +
    '<button class="music-btn" id="musicBtn" aria-label="Reproducir música" hidden>' + icon("note", "note") + "</button>" +

    '<main id="main">' +
    // Portada
    '<section class="cover">' + flowers(I.rosasEsquina, "flowers-top") +
    '<p class="phrase">' + esc(C.frase) + "</p>" +
    '<div class="mono-top" aria-label="' + esc(C.inicialesPortada.join(" ")) + '"><span>' + esc(C.inicialesPortada[0]) + "</span><i></i><span>" + esc(C.inicialesPortada[1]) + "</span></div>" +
    '<p class="kicker">' + esc(C.encabezado) + "</p>" + heart + "</section>" +
    torn(I.fotoPrincipal, C.nombre) +
    guestHtml +
    // Mensaje y padres
    '<section class="block"><div class="reveal text">' + paras(C.mensaje) + "</div>" +
    (C.padres && C.padres.length
      ? heart + '<div class="reveal"><p class="parents-intro">' + esc(C.textoPadres) + "</p>" +
        '<div class="parents">' + C.padres.map(function (n) { return "<p>" + esc(n) + "</p>"; }).join("") + "</div></div>"
      : "") +
    "</section>" +
    // Nombre y fecha
    '<section class="block name-block"><div class="reveal">' +
    C.nombreLineas.map(function (l) { return '<h1 class="big-name">' + esc(l) + "</h1>"; }).join("") +
    '<div class="date-line"><p class="date-month">' + esc(C.mes) + "</p>" +
    '<div class="date-row"><span>' + esc(C.diaSemana) + "</span><b>" + esc(C.dia) + "</b><span>" + esc(C.anio) + "</span></div></div>" +
    sprig + "</div></section>" +
    // Cuenta regresiva
    '<section class="band">' +
    '<span class="edge top" style="background-image:url(' + I.bordeA + ')"></span>' +
    '<div class="reveal">' + title(C.tituloConteo) +
    '<div id="countdown"><div class="countdown">' + cells + "</div></div></div>" +
    '<span class="edge bottom" style="background-image:url(' + I.bordeB + ')"></span>' +
    "</section>" +
    // Hora y lugar
    '<section class="block"><div class="reveal">' +
    '<div class="event-item">' + icon("clock") + title("Hora") +
    '<p class="event-main">' + esc(C.hora) + "</p>" +
    (C.horaFin ? '<p class="event-sub">hasta las ' + esc(C.horaFin) + "</p>" : "") + "</div>" +
    '<div class="event-item">' + icon("pin") + title("Ubicación") +
    '<p class="event-main">' + esc(C.lugar) + "</p>" +
    C.direccion.map(function (l) { return '<p class="event-sub">' + esc(l) + "</p>"; }).join("") +
    '<div class="mt"><a class="btn" href="' + esc(C.linkMapa) + '" target="_blank" rel="noreferrer">' + esc(C.textoBotonMapa) + "</a></div></div>" +
    "</div></section>" +
    // Retrato
    torn(I.fotoSegunda, C.nombreCorto) +
    '<section class="block with-roses">' + flowers(I.rosasEsquina, "flowers-side") + '<div class="reveal">' +
    (C.fraseVintage ? '<p class="vintage-quote">' + esc(C.fraseVintage) + "</p>" : "") +
    "</div></section>" +
    // Galería
    '<section class="block no-side"><div class="reveal">' + title(C.tituloGaleria) +
    '<p class="slide-note">Desliza para ver <span class="slide-hint">↔</span></p>' +
    '<div class="gallery-wrap">' +
    '<button class="gallery-arrow prev" type="button" aria-label="Foto anterior">‹</button>' +
    '<div class="gallery" id="gallery">' + C.galeria.map(function (src, i) {
      return '<div class="gallery-item"><img src="' + src + '" alt="' + esc(C.nombreCorto) + ", fotografía " + (i + 1) + '" loading="lazy" draggable="false"></div>';
    }).join("") + "</div>" +
    '<button class="gallery-arrow next" type="button" aria-label="Foto siguiente">›</button>' +
    "</div>" +
    '<div class="gallery-dots">' + C.galeria.map(function (_, i) {
      return '<button type="button" aria-label="Ver foto ' + (i + 1) + '" data-i="' + i + '"></button>';
    }).join("") + "</div>" +
    "</div></section>" +
    // Dress code
    '<section class="block"><div class="reveal">' + title(C.tituloDress) +
    '<p class="script-title">' + esc(C.estiloDress) + "</p>" +
    (I.dressPareja ? '<img src="' + I.dressPareja + '" alt="Vestido largo para ellas y traje formal para ellos" loading="lazy" class="dress-pareja">' : "") +
    (!I.dressPareja && (I.dressElla || I.dressEl)
      ? '<div class="dress-imgs">' +
        (I.dressElla ? '<img src="' + I.dressElla + '" alt="Vestido para ellas" loading="lazy">' : "") +
        (I.dressEl ? '<img src="' + I.dressEl + '" alt="Traje para ellos" loading="lazy">' : "") + "</div>"
      : "") +
    '<p class="text reserved">' + esc(C.textoColoresReservados) + "</p>" +
    (I.dressColores
      ? '<img src="' + I.dressColores + '" alt="' + esc(C.coloresReservados.map(function (c) { return c.nombre; }).join(", ")) + '" loading="lazy" class="dress-colores">'
      : '<div class="swatches" role="img" aria-label="' + esc(C.coloresReservados.map(function (c) { return c.nombre; }).join(", ")) + '">' + C.coloresReservados.map(function (c) {
        return '<i style="background:' + c.color + '"></i>';
      }).join("") + "</div>") + "</div></section>" +
    // Obsequios
    '<section class="block no-top"><div class="reveal">' + heart + icon("envelope") + title(C.tituloRegalos) +
    '<div class="text mt">' + paras(C.textoRegalos) + "</div>" +
    (C.datosBancarios && C.datosBancarios.banco
      ? '<div class="bank-card"><p class="bank-title">Datos bancarios</p>' +
        '<dl><dt>Banco</dt><dd>' + esc(C.datosBancarios.banco) + "</dd>" +
        "<dt>Tipo de cuenta</dt><dd>" + esc(C.datosBancarios.tipo) + "</dd>" +
        "<dt>N° de cuenta</dt><dd>" + esc(C.datosBancarios.numero) + "</dd>" +
        (C.datosBancarios.titular ? "<dt>Titular</dt><dd>" + esc(C.datosBancarios.titular) + "</dd>" : "") +
        "</dl></div>"
      : "") +
    "</div></section>" +
    // Confirmación
    '<section class="block no-top"><div class="reveal">' + heart + icon("whatsapp") + title(C.tituloConfirmar) +
    '<div class="text mt">' + paras(C.textoConfirmar) + "</div>" +
    '<form class="rsvp-form" id="rsvpForm" novalidate>' +
    '<label class="rsvp-label" for="rsvpName">' + esc(C.textoCampoNombre) + "</label>" +
    '<input class="rsvp-input" id="rsvpName" name="nombre" autocomplete="name" placeholder="Nombre y apellido" value="' + esc(guest || "") + '">' +
    '<div class="rsvp-choice" role="radiogroup" aria-label="¿Podrás asistir?">' +
    '<label><input type="radio" name="asiste" value="si"><span>' + esc(C.opcionSi) + "</span></label>" +
    '<label><input type="radio" name="asiste" value="no"><span>' + esc(C.opcionNo) + "</span></label>" +
    "</div>" +
    '<p class="rsvp-error" id="rsvpError" role="alert" hidden></p>' +
    '<button class="btn" type="submit">' + icon("whatsapp", "btn-icon") + esc(C.textoBotonConfirmar) + "</button>" +
    "</form>" +
    "</div></section>" +
    // Cierre
    torn(I.fotoCierre, C.nombreCorto, "closing-photo") +
    '<section class="block closing"><div class="reveal">' +
    '<p class="text">' + esc(C.despedida) + "</p>" +
    '<p class="closing-name">' + esc(C.nombre) + "</p>" +
    '<p class="closing-date">' + esc(C.fechaCorta) + "</p>" +
    (C.iniciales
      ? '<p class="closing-name">' + esc(C.iniciales) + "</p>"
      : (I.monograma ? '<img src="' + I.monograma + '" alt="Monograma" loading="lazy" class="monogram">' : "")) +
    "</div></section>" +
    flowers(I.rosasEsquina, "flowers-bottom") +
    "</main>";

  // ---- Galería: flechas, puntos y arrastre con el mouse ----
  var gallery = document.getElementById("gallery");
  var gItems = gallery.querySelectorAll(".gallery-item");
  var gWrap = gallery.parentNode, gDots = document.querySelectorAll(".gallery-dots button");
  function current() {
    var mid = gallery.scrollLeft + gallery.clientWidth / 2, best = 0;
    gItems.forEach(function (it, i) {
      if (Math.abs(it.offsetLeft + it.offsetWidth / 2 - mid) < Math.abs(gItems[best].offsetLeft + gItems[best].offsetWidth / 2 - mid)) best = i;
    });
    return best;
  }
  function goTo(i) {
    i = Math.max(0, Math.min(gItems.length - 1, i));
    var it = gItems[i];
    gallery.scrollTo({ left: it.offsetLeft - (gallery.clientWidth - it.offsetWidth) / 2, behavior: "smooth" });
  }
  function refresh() {
    var scrollable = gallery.scrollWidth > gallery.clientWidth + 2;
    gWrap.classList.toggle("scrollable", scrollable);
    document.querySelector(".gallery-dots").hidden = !scrollable;
    var c = current();
    gDots.forEach(function (d, i) { d.classList.toggle("active", i === c); });
  }
  gWrap.querySelector(".prev").addEventListener("click", function () { goTo(current() - 1); });
  gWrap.querySelector(".next").addEventListener("click", function () { goTo(current() + 1); });
  gDots.forEach(function (d) { d.addEventListener("click", function () { goTo(+d.dataset.i); }); });
  gallery.addEventListener("scroll", refresh, { passive: true });
  window.addEventListener("resize", refresh);
  refresh();
  var drag = null;
  gallery.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse") return;
    drag = { x: e.clientX, left: gallery.scrollLeft, moved: false };
    gallery.classList.add("dragging");
  });
  window.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (Math.abs(dx) > 3) drag.moved = true;
    gallery.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", function () {
    if (!drag) return;
    gallery.classList.remove("dragging");
    var moved = drag.moved; drag = null;
    if (moved) goTo(current());
  });

  // ---- Formulario de confirmación ----
  document.getElementById("rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("rsvpName").value.trim();
    var choice = this.querySelector('input[name="asiste"]:checked');
    var error = document.getElementById("rsvpError");
    var problem = !name ? "Escribe tu nombre, por favor." : !choice ? "Elige si podrás asistir o no." : !C.whatsapp ? "Aún no está configurado el número de WhatsApp." : "";
    error.textContent = problem;
    error.hidden = !problem;
    if (problem) return;
    var text = (choice.value === "si" ? C.mensajeSi : C.mensajeNo).replace("{nombre}", name) + (seats ? " (" + seatsText + ")" : "");
    window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text), "_blank");
  });

  // ---- Aparición al hacer scroll ----
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // ---- Cuenta regresiva ----
  var target = new Date(C.fechaEvento).getTime();
  var nums = document.querySelectorAll("[data-cd]");
  function tick() {
    var d = Math.max(0, target - Date.now());
    if (d === 0) {
      document.getElementById("countdown").innerHTML =
        '<p class="big-day">' + esc(C.textoGranDia) + "</p>";
      clearInterval(timer);
      return;
    }
    [Math.floor(d / 864e5), Math.floor(d / 36e5 % 24), Math.floor(d / 6e4 % 60), Math.floor(d / 1e3 % 60)].forEach(function (v, i) {
      nums[i].textContent = String(v).padStart(2, "0");
    });
  }
  var timer = setInterval(tick, 1000);
  tick();

  // ---- Música ----
  var song = document.getElementById("song"), btn = document.getElementById("musicBtn"), main = document.getElementById("main");
  song.volume = 0.8;
  // Empieza (y vuelve a empezar al terminar) en el segundo indicado en config.js
  var songStart = C.inicioCancion || 0;
  song.addEventListener("loadedmetadata", function () { if (song.currentTime < songStart) song.currentTime = songStart; });
  song.addEventListener("ended", function () { song.currentTime = songStart; song.play().catch(function () {}); });
  song.addEventListener("play", function () { btn.classList.add("playing"); btn.setAttribute("aria-label", "Pausar música"); });
  song.addEventListener("pause", function () { btn.classList.remove("playing"); btn.setAttribute("aria-label", "Reproducir música"); });
  btn.addEventListener("click", function (e) { e.stopPropagation(); song.paused ? song.play().catch(function () {}) : song.pause(); });

  function startMusic() {
    var started = false;
    var tryPlay = function () {
      if (started) return;
      song.play().then(function () { started = true; off(); }).catch(function () {});
    };
    var off = function () {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
    tryPlay();
    window.addEventListener("pointerdown", tryPlay);
    window.addEventListener("touchstart", tryPlay);
    window.addEventListener("scroll", tryPlay, { passive: true });
  }

  function showContent() {
    main.classList.add("visible");
    btn.hidden = false;
    startMusic();
  }

  // ---- Intro en video ----
  var intro = document.getElementById("intro");
  if (!intro) { showContent(); return; }
  var video = document.getElementById("introVideo"), closing = false;
  video.addEventListener("loadedmetadata", function () {
    if (C.inicioIntro && video.currentTime < C.inicioIntro) video.currentTime = C.inicioIntro;
  });
  if (C.vestidoChampagne) recolorVideo(video);
  function closeIntro() {
    if (closing) return;
    closing = true;
    showContent();
    intro.classList.add("out");
    var v0 = video.volume, step = 0;
    var fade = setInterval(function () { step++; video.volume = Math.max(0, v0 * (1 - step / 10)); if (step >= 10) clearInterval(fade); }, 100);
    setTimeout(function () { intro.remove(); }, 1200);
  }
  intro.addEventListener("click", function () {
    video.muted = false; video.volume = 1; video.play().catch(closeIntro);
    song.play().catch(function () {});
    var hint = document.getElementById("introHint"); if (hint) hint.remove();
  });
  video.addEventListener("timeupdate", function () { if (video.currentTime >= C.segundosIntro) closeIntro(); });
  video.addEventListener("ended", closeIntro);
  document.getElementById("introSkip").addEventListener("click", function (e) { e.stopPropagation(); closeIntro(); });

  // ---- Cambia los rojos del video (vestido) a champán, en vivo con WebGL ----
  function recolorVideo(video) {
    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;   // sin WebGL se ve el video original
    var vs = "attribute vec2 p; varying vec2 uv; void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }";
    var fs = [
      "precision mediump float; uniform sampler2D t; varying vec2 uv;",
      "void main(){",
      "  vec3 c = texture2D(t, uv).rgb;",
      "  float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b)), d = mx - mn + 1e-5;",
      "  float sat = d / (mx + 1e-5);",
      "  float h = mx == c.r ? mod((c.g - c.b) / d, 6.) : (mx == c.g ? (c.b - c.r) / d + 2. : (c.r - c.g) / d + 4.);",
      "  h *= 60.;",
      "  float red = (h < 22. || h > 330.) ? smoothstep(.2, .34, mx) : 0.;",
      "  float w = clamp((sat - .3) / .2, 0., 1.) * red;",
      "  float lum = dot(c, vec3(.299, .587, .114));",
      "  float L = clamp(lum * 1.45 + .14, 0., 1.);",
      "  vec3 champ = vec3(.97, .85, .64), deep = vec3(.42, .27, .13);",
      "  vec3 n = clamp(mix(deep, champ, L) + max(L - .7, 0.) * .2, 0., 1.);",
      "  gl_FragColor = vec4(mix(c, n, w), 1.);",
      "}"].join(" ");
    function shader(type, src) { var sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh); return sh; }
    var prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    canvas.className = "intro-canvas";
    video.after(canvas);
    function draw() {
      if (!canvas.isConnected) return;
      if (video.readyState >= 2) {
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth; canvas.height = video.videoHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        video.classList.add("hidden-under-canvas");
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }
})();
