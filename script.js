// ==================== CREAR PIEZAS DEL ROMPECABEZAS ====================
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

// JAVA SCRIPT MASTER
// ==================== CURSOR PERSONALIZADO - VERSIÓN DEFINITIVA ====================
const cursor = document.getElementById("cursor");

// Solo para PC
if (window.innerWidth > 768 && cursor) {
  // Ocultar cursor al inicio
  cursor.style.opacity = "0";
  
  let mouseTimer;
  let cursorVisible = false;
  
  // Función para mostrar el cursor
  function mostrarCursor() {
    if (!cursorVisible) {
      cursor.style.opacity = "1";
      cursorVisible = true;
    }
  }
  
  // Función para ocultar el cursor
  function ocultarCursor() {
    if (cursorVisible) {
      cursor.style.opacity = "0";
      cursorVisible = false;
    }
  }
  
  // Mover el cursor con el mouse
  document.addEventListener("mousemove", function(e) {
    cursor.style.left = (e.clientX - 12.5) + "px";
    cursor.style.top = (e.clientY - 12.5) + "px";
    
    mostrarCursor();
    
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      ocultarCursor();
    }, 1500);
  });
  
  // Ocultar cursor cuando sale de la ventana
  document.addEventListener("mouseleave", function() {
    ocultarCursor();
    clearTimeout(mouseTimer);
  });
  
  // Mostrar cursor cuando entra a la ventana
  document.addEventListener("mouseenter", function(e) {
    if (e.clientX > 0 && e.clientY > 0) {
      mostrarCursor();
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        ocultarCursor();
      }, 1500);
    }
  });
  
  // Forzar que el cursor se oculte después de cargar la página
  setTimeout(() => {
    ocultarCursor();
  }, 100);
} else if (cursor) {
  // En móviles, ocultar completamente
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

// Efecto hover en imágenes
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

// Efecto hover en botones
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

// Destello al cambiar de foto
function agregarEfectoTransicion(swiperInstance) {
  swiperInstance.on('slideChangeTransitionStart', () => {
    setTimeout(() => {
      const slideActivo = document.querySelector(".swiper-slide-active");
      if (slideActivo) {
        const img = slideActivo.querySelector("img");
        if (img) {
          img.style.animation = "destello 0.3s ease-out";
          setTimeout(() => {
            if (img) img.style.animation = "";
          }, 300);
        }
      }
    }, 50);
  });
}

// DOBLE ONDA EN BOTONES
function agregarDobleOndaBotones() {
  document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(btn => {
    if (btn._dobleOndaHandler) {
      btn.removeEventListener('click', btn._dobleOndaHandler);
    }
    
    const handler = e => {
      e.stopPropagation();
      
      const rect = btn.getBoundingClientRect();
      crearOnda(rect.left + rect.width/2, rect.top + rect.height/2, 35, "rgba(255,0,0,0.8)");
      
      setTimeout(() => {
        const carrusel = btn.closest('.swiper');
        if (carrusel) {
          const slideActivo = carrusel.querySelector('.swiper-slide-active');
          if (slideActivo) {
            const img = slideActivo.querySelector('img');
            if (img) {
              const rectImg = img.getBoundingClientRect();
              crearOnda(rectImg.left + rectImg.width/2, rectImg.top + rectImg.height/2, 45, "rgba(255,50,50,0.9)");
            }
          }
        }
      }, 100);
    };
    
    btn.addEventListener("click", handler);
    btn._dobleOndaHandler = handler;
  });
}

// Click en foto central
document.addEventListener("click", function(e) {
  if (e.target && e.target.tagName === "IMG") {
    const slide = e.target.closest(".swiper-slide");
    if (slide && slide.classList.contains("swiper-slide-active")) {
      const rect = e.target.getBoundingClientRect();
      crearOnda(rect.left + rect.width/2, rect.top + rect.height/2, 40, "rgba(255,50,50,0.9)");
      e.target.style.transform = "scale(1.08)";
      setTimeout(() => {
        if (e.target) e.target.style.transform = "";
      }, 200);
    }
  }
});

// FORZAR DOBLE ONDA EN LOGOS
function forzarLogos() {
  const botones = document.querySelectorAll('#seccion-logos .swiper-button-prev, #seccion-logos .swiper-button-next');
  botones.forEach(btn => {
    btn.removeEventListener('click', btn._logoHandler);
    const handler = (e) => {
      e.stopPropagation();
      const rect = btn.getBoundingClientRect();
      crearOnda(rect.left + rect.width/2, rect.top + rect.height/2, 35, "rgba(255,0,0,0.8)");
      setTimeout(() => {
        const img = document.querySelector('#seccion-logos .swiper-slide-active img');
        if (img) {
          const rectImg = img.getBoundingClientRect();
          crearOnda(rectImg.left + rectImg.width/2, rectImg.top + rectImg.height/2, 45, "rgba(255,50,50,0.9)");
        }
      }, 100);
    };
    btn.addEventListener('click', handler);
    btn._logoHandler = handler;
  });
}

// Observer para botones nuevos
function observarBotones() {
  const observer = new MutationObserver(() => {
    agregarDobleOndaBotones();
    forzarLogos();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Iniciar Swipers
function iniciarSwiper() {
  const config = {
    loop: true,
    effect: 'slide',
    speed: 800,
    slidesPerView: 1.8,
    centeredSlides: true,
    spaceBetween: 15,
    pagination: { clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 768: { slidesPerView: 1.8 }, 1024: { slidesPerView: 1.8, spaceBetween: 20 } }
  };
  
  const swiper1 = new Swiper('.swiper-ilustraciones', config);
  const swiper2 = new Swiper('.swiper-renders', config);
  const swiper3 = new Swiper('.swiper-logos', config);
  const swiper4 = new Swiper('.swiper-impresos', config);
  
  [swiper1, swiper2, swiper3, swiper4].forEach(sw => {
    agregarEfectoTransicion(sw);
  });
  
  setTimeout(() => {
    agregarDobleOndaBotones();
    forzarLogos();
    observarBotones();
    aplicarHoverImagenes();
    aplicarHoverBotones();
  }, 200);
}

// ==================== ANIMACIONES GSAP INTRO ====================
const tl = gsap.timeline();

// Detectar si es móvil y horizontal
const esMovil = window.innerWidth <= 768;
const esHorizontal = (window.innerWidth <= 896 && window.matchMedia("(orientation: landscape)").matches);

// Tiempos más lentos en móvil para que se vea bien
const duracionPiezas = esMovil ? 2.5 : 2;
const staggerPiezas = esMovil ? 0.04 : 0.05;
const tiempoEspera = esMovil ? 2.5 : 1.8;
const duracionDesvanecer = esMovil ? 1.5 : 1;

// Rompecabezas aparece
tl.from(".pieza", {
  opacity: 0,
  scale: 0.5,
  duration: duracionPiezas,
  stagger: staggerPiezas,
  ease: "power2.out"
});

// Letras aparecen - MISMA ANIMACIÓN EN PC, VERTICAL Y HORIZONTAL
if (esHorizontal) {
  // HORIZONTAL: misma animación que PC
  tl.to("#senefaArriba", {
    y: 20,
    opacity: 1,
    duration: 0.8,
    ease: "power4.out"
  }, "-=1.2");

  tl.to("#senefaAbajo", {
    y: -20,
    opacity: 1,
    duration: 0.8,
    ease: "power4.out"
  }, "-=1.2");
} else {
  // PC y VERTICAL
  tl.to("#senefaArriba", {
    y: 100,
    opacity: 1,
    duration: 1,
    ease: "power4.out"
  }, "-=1.5");

  tl.to("#senefaAbajo", {
    y: -100,
    opacity: 1,
    duration: 1,
    ease: "power4.out"
  }, "-=1.5");
}

// Rompecabezas se desvanece
tl.to("#rompecabezas", {
  opacity: 0,
  duration: duracionDesvanecer
}, `+=${tiempoEspera}`);

// Letras se desvanecen al mismo tiempo
tl.to("#senefaArriba", {
  opacity: 0,
  duration: duracionDesvanecer
}, "<");

tl.to("#senefaAbajo", {
  opacity: 0,
  duration: duracionDesvanecer
}, "<");

tl.add(() => {
  const puzzle = document.getElementById("rompecabezas");
  if (puzzle) puzzle.style.display = "none";
  const intro = document.getElementById("intro");
  if (intro) intro.style.display = "none";
});

// Senefas metálicas
tl.set("#senefaArriba2", { opacity: 1, y: -200 }, "+=0.3");
tl.set("#senefaAbajo2", { opacity: 1, y: 200 }, "<");
tl.to("#senefaArriba2", { y: 0, duration: 0.8, ease: "back.out(0.5)" }, "<");
tl.to("#senefaAbajo2", { y: 0, duration: 0.8, ease: "back.out(0.5)" }, "<");
tl.from("#senefaArriba2 .senefaTextoMetal", { x: 500, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
tl.from("#senefaAbajo2 .senefaTextoMetal", { x: -500, opacity: 0, duration: 0.7, ease: "power3.out" }, "<");

tl.call(() => {
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
  const contenedor = document.getElementById("contenedor-carruseles");
  if (contenedor) {
    contenedor.style.display = "block";
    contenedor.style.opacity = "0";
    gsap.to(contenedor, { opacity: 1, duration: 1 });
  }
  iniciarSwiper();
});

// ==================== FORZAR INICIO EN LA PARTE SUPERIOR ====================
function forzarInicioEnTop() {
  window.scrollTo(0, 0);
  
  const contenedor = document.getElementById("contenedor-carruseles");
  if (contenedor && contenedor.style.display !== "none") {
    contenedor.style.display = "none";
  }
  
  const rompecabezas = document.getElementById("rompecabezas");
  if (rompecabezas) {
    rompecabezas.style.opacity = "1";
    rompecabezas.style.display = "grid";
  }
  
  const senefaArriba = document.getElementById("senefaArriba");
  const senefaAbajo = document.getElementById("senefaAbajo");
  if (senefaArriba) senefaArriba.style.opacity = "1";
  if (senefaAbajo) senefaAbajo.style.opacity = "1";
  
  const senefaArriba2 = document.getElementById("senefaArriba2");
  const senefaAbajo2 = document.getElementById("senefaAbajo2");
  if (senefaArriba2) senefaArriba2.style.opacity = "0";
  if (senefaAbajo2) senefaAbajo2.style.opacity = "0";
}

window.addEventListener("load", function() {
  forzarInicioEnTop();
});

window.addEventListener("pageshow", function() {
  forzarInicioEnTop();
});

setTimeout(function() {
  forzarInicioEnTop();
}, 100);

// ==================== DETECCIÓN DE NAVEGADORES PROBLEMÁTICOS ====================
function detectarNavegadorProblemas() {
  const ua = navigator.userAgent.toLowerCase();
  const esOpera = ua.includes('opr') || ua.includes('opera');
  const esOperaMini = ua.includes('opera mini');
  const esIE = ua.includes('trident') || ua.includes('msie');
  
  if (esOpera || esOperaMini || esIE) {
    document.body.classList.add('navegador-antiguo');
  }
  
  if (esOperaMini) {
    if (cursor) cursor.style.display = 'none';
    document.querySelectorAll('.onda-click').forEach(el => el.remove());
  }
}

detectarNavegadorProblemas();

// ==================== EFECTO TÁCTIL SOLO PARA MÓVILES Y TABLETS ====================
(function() {
  // Detectar si es dispositivo táctil
  const esTactil = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (!esTactil) return;
  
  let touchRing = null;
  
  // Crear el aro solo cuando se va a usar
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
  
  // Mostrar aro en el punto de contacto
  function mostrarAro(x, y) {
    const aro = crearAro();
    aro.style.left = x + 'px';
    aro.style.top = y + 'px';
    aro.style.transform = 'translate(-50%, -50%) scale(1)';
    aro.style.opacity = '1';
  }
  
  // Ocultar aro
  function ocultarAro() {
    if (!touchRing) return;
    touchRing.style.transform = 'translate(-50%, -50%) scale(0)';
    touchRing.style.opacity = '0';
  }
  
  // Tocar la pantalla
  document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    if (touch) {
      mostrarAro(touch.clientX, touch.clientY);
    }
  });
  
  // Mover el dedo
  document.addEventListener('touchmove', function(e) {
    if (!touchRing) return;
    const touch = e.touches[0];
    if (touch && touchRing.style.opacity === '1') {
      touchRing.style.left = touch.clientX + 'px';
      touchRing.style.top = touch.clientY + 'px';
    }
  });
  
  // Soltar el dedo
  document.addEventListener('touchend', function() {
    ocultarAro();
  });
  
  // Cancelar toque
  document.addEventListener('touchcancel', function() {
    ocultarAro();
  });
})();
