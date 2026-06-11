// JAVA SCRIPT MASTER
// ==================== CURSOR PERSONALIZADO - VERSIÓN DEFINITIVA ====================
const cursor = document.getElementById("cursor");

if (window.innerWidth > 768 && cursor) {
  cursor.style.opacity = "0";
  let mouseTimer;
  let cursorVisible = false;

  function mostrarCursor() {
    if (!cursorVisible) {
      cursor.style.opacity = "1";
      cursorVisible = true;
    }
  }
  function ocultarCursor() {
    if (cursorVisible) {
      cursor.style.opacity = "0";
      cursorVisible = false;
    }
  }

  document.addEventListener("mousemove", function(e) {
    cursor.style.left = (e.clientX - 12.5) + "px";
    cursor.style.top = (e.clientY - 12.5) + "px";
    mostrarCursor();
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => { ocultarCursor(); }, 1500);
  });

  document.addEventListener("mouseleave", function() {
    ocultarCursor();
    clearTimeout(mouseTimer);
  });

  document.addEventListener("mouseenter", function(e) {
    if (e.clientX > 0 && e.clientY > 0) {
      mostrarCursor();
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => { ocultarCursor(); }, 1500);
    }
  });

  setTimeout(() => { ocultarCursor(); }, 100);
} else if (cursor) {
  cursor.style.display = "none";
}

// Función crear onda
function crearOnda(x, y, tamanio = 30, color = "rgba(255,0,0,0.8)") {
  const onda = document.createElement("div");
  onda.classList.add("onda-click");
  onda.style.left = x + "px";
  onda.style.top = y + "px";
  onda.style.width = tamanio + "px";
  onda.style.height = tamanio + "px";
  onda.style.border = `3px solid ${color}`;
  document.body.appendChild(onda);
  setTimeout(() => onda.remove(), 600);
}
function aplicarHoverImagenes() {
  document.querySelectorAll(".swiper-slide img").forEach(img => {
    img.removeEventListener("mouseenter", img._mouseEnterHandler);
    img.removeEventListener("mouseleave", img._mouseLeaveHandler);

    const mouseEnterHandler = () => {
      if (cursor && window.innerWidth > 768) {
        cursor.style.transform = "scale(1.5)";
        cursor.style.borderColor = "#ffffff";
        cursor.style.boxShadow = "0 0 25px rgba(255,255,255,0.9)";
      }
    };
    const mouseLeaveHandler = () => {
      if (cursor && window.innerWidth > 768) {
        cursor.style.transform = "scale(1)";
        cursor.style.borderColor = "#ff0000";
        cursor.style.boxShadow = "0 0 15px rgba(255,0,0,0.6)";
      }
    };

    img.addEventListener("mouseenter", mouseEnterHandler);
    img.addEventListener("mouseleave", mouseLeaveHandler);
    img._mouseEnterHandler = mouseEnterHandler;
    img._mouseLeaveHandler = mouseLeaveHandler;
  });
}

function aplicarHoverBotones() {
  document.querySelectorAll(".swiper-button-prev, .swiper-button-next").forEach(btn => {
    btn.removeEventListener("mouseenter", btn._mouseEnterHandler);
    btn.removeEventListener("mouseleave", btn._mouseLeaveHandler);

    const mouseEnterHandler = () => {
      if (cursor && window.innerWidth > 768) {
        cursor.style.transform = "scale(1.4)";
        cursor.style.borderColor = "#ffffff";
        cursor.style.backgroundColor = "rgba(255,0,0,0.2)";
      }
    };
    const mouseLeaveHandler = () => {
      if (cursor && window.innerWidth > 768) {
        cursor.style.transform = "scale(1)";
        cursor.style.borderColor = "#ff0000";
        cursor.style.backgroundColor = "rgba(255,0,0,0.05)";
      }
    };

    btn.addEventListener("mouseenter", mouseEnterHandler);
    btn.addEventListener("mouseleave", mouseLeaveHandler);
    btn._mouseEnterHandler = mouseEnterHandler;
    btn._mouseLeaveHandler = mouseLeaveHandler;
  });
}

function agregarEfectoTransicion(swiperInstance) {
  swiperInstance.on('slideChangeTransitionStart', () => {
    setTimeout(() => {
      const slideActivo = document.querySelector(".swiper-slide-active");
      if (slideActivo) {
        const img = slideActivo.querySelector("img");
        if (img) {
          img.style.animation = "destello 0.3s ease-out";
          setTimeout(() => { if (img) img.style.animation = ""; }, 300);
        }
      }
    }, 50);
  });
}
const rompecabezas = document.getElementById("rompecabezas");
for (let fila = 0; fila < 6; fila++) {
  for (let col = 0; col < 6; col++) {
    const index = fila * 6 + col + 1;
    const pieza = document.createElement("img");
    pieza.src = `img/cuadro${index}.png`;
    pieza.classList.add("pieza");
    pieza.style.gridRow = fila + 1;
    pieza.style.gridColumn = col + 1;
    rompecabezas.appendChild(pieza);
  }
}

const tl = gsap.timeline();
const esMovil = window.innerWidth <= 768;
const esHorizontal = (window.innerWidth <= 896 && window.matchMedia("(orientation: landscape)").matches);

const duracionPiezas = esMovil ? 2.5 : 2;
const staggerPiezas = esMovil ? 0.04 : 0.05;
const tiempoEspera = esMovil ? 2.5 : 1.8;
const duracionDesvanecer = esMovil ? 1.5 : 1;

tl.from(".pieza", { opacity: 0, scale: 0.5, duration: duracionPiezas, stagger: staggerPiezas, ease: "power2.out" });
function forzarInicioEnTop() {
  window.scrollTo(0, 0);
  const contenedor = document.getElementById("contenedor-carruseles");
  if (contenedor && contenedor.style.display !== "none") contenedor.style.display = "none";
  if (rompecabezas) { rompecabezas.style.opacity = "1"; rompecabezas.style.display = "grid"; }
}
window.addEventListener("load", forzarInicioEnTop);
window.addEventListener("pageshow", forzarInicioEnTop);
setTimeout(forzarInicioEnTop, 100);

function detectarNavegadorProblemas() {
  const ua = navigator.userAgent.toLowerCase();
  const esOpera = ua.includes('opr') || ua.includes('opera');
  const esOperaMini = ua.includes('opera mini');
  const esIE = ua.includes('trident') || ua.includes('msie');
  if (esOpera || esOperaMini || esIE) document.body.classList.add('navegador-antiguo');
  if (esOperaMini) {
    if (cursor) cursor.style.display = 'none';
    document.querySelectorAll('.onda-click').forEach(el => el.remove());
  }
}
detectarNavegadorProblemas();
// Efecto táctil móviles/tablets
(function() {
  const esTactil = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (!esTactil) return;
  let touchRing = null;

  function crearAro() {
    if (touchRing) return touchRing;
    touchRing = document.createElement('div');
    touchRing.id = 'touch-ring';
    touchRing.style.cssText = `
      position: fixed;
      width: 60px;
      height: 60px;
      border: 3px solid #ff0000;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
      transition: transform 0.1s ease-out, opacity 0.1s ease-out;
      box-shadow: 0 0 15px rgba(255,0,0,0.5);
      background: rgba(255,0,0,0.15);
    `;
    document.body.appendChild(touchRing);
    return touchRing;
  }

  function mostrarAro(x, y) {
    const aro = crearAro();
    aro.style.left = x + 'px';
    aro.style.top = y + 'px';
    aro.style.transform = 'translate(-50%, -50%) scale(1)';
    aro.style.opacity = '1';
  }

  function ocultarAro() {
    if (!touchRing) return;
    touchRing.style.transform = 'translate(-50%, -50%) scale(0)';
    touchRing.style.opacity = '0';
  }

  document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    if (touch) {
      mostrarAro(touch.clientX, touch.clientY);
    }
  });

  document.addEventListener('touchmove', function(e) {
    if (!touchRing) return;
    const touch = e.touches[0];
    if (touch && touchRing.style.opacity === '1') {
      touchRing.style.left = touch.clientX + 'px';
      touchRing.style.top = touch.clientY + 'px';
    }
  });

  document.addEventListener('touchend', function() {
    ocultarAro();
  });

  document.addEventListener('touchcancel', function() {
    ocultarAro();
  });
})();
