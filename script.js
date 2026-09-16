/* =========================================================
   ACTIVA FITNESS — script.js
   1. Menú móvil
   2. Carrusel del banner
   3. Modal de detalle
   Cada bloque comprueba que sus elementos existan, así el
   mismo archivo sirve para index.html y entrenamiento.html.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------
       1. MENÚ MÓVIL
    --------------------------------------------- */

    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".interfaces");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const abierto = nav.classList.toggle("abierto");
            toggle.setAttribute("aria-expanded", String(abierto));
            toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
            toggle.querySelector("i").className = abierto
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";
        });

        // Al tocar un enlace, cerrar el menú
        nav.querySelectorAll("a").forEach(enlace => {
            enlace.addEventListener("click", () => {
                nav.classList.remove("abierto");
                toggle.setAttribute("aria-expanded", "false");
                toggle.querySelector("i").className = "fa-solid fa-bars";
            });
        });
    }


    /* ---------------------------------------------
       2. CARRUSEL
    --------------------------------------------- */

    const track = document.querySelector(".carrusel-track");

    if (track) {
        const slides = track.querySelectorAll("li");
        const contenedorPuntos = document.querySelector(".carrusel-puntos");
        const btnPrev = document.querySelector(".carrusel-btn.prev");
        const btnNext = document.querySelector(".carrusel-btn.next");
        const wrapper = document.querySelector(".carrusel-wrapper");

        let indice = 0;
        let auto = null;

        // Generar un punto por slide
        slides.forEach((_, i) => {
            const punto = document.createElement("button");
            punto.type = "button";
            punto.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
            punto.addEventListener("click", () => {
                irA(i);
                reiniciarAuto();
            });
            contenedorPuntos.appendChild(punto);
        });

        const puntos = contenedorPuntos.querySelectorAll("button");

        function irA(nuevoIndice) {
            indice = (nuevoIndice + slides.length) % slides.length;
            track.style.transform = `translateX(-${indice * 100}%)`;
            puntos.forEach((p, i) => p.classList.toggle("activo", i === indice));
        }

        function iniciarAuto() {
            if (slides.length > 1) {
                auto = setInterval(() => irA(indice + 1), 5000);
            }
        }

        function reiniciarAuto() {
            clearInterval(auto);
            iniciarAuto();
        }

        btnPrev.addEventListener("click", () => {
            irA(indice - 1);
            reiniciarAuto();
        });

        btnNext.addEventListener("click", () => {
            irA(indice + 1);
            reiniciarAuto();
        });

        wrapper.addEventListener("mouseenter", () => clearInterval(auto));
        wrapper.addEventListener("mouseleave", iniciarAuto);

        // Navegación con flechas del teclado
        wrapper.addEventListener("keydown", e => {
            if (e.key === "ArrowLeft") irA(indice - 1);
            if (e.key === "ArrowRight") irA(indice + 1);
        });

        // Si hay una sola imagen, ocultar controles
        if (slides.length < 2) {
            btnPrev.hidden = true;
            btnNext.hidden = true;
            contenedorPuntos.hidden = true;
        }

        irA(0);
        iniciarAuto();
    }


    /* ---------------------------------------------
       3. MODAL
    --------------------------------------------- */

    const contenidos = {
        basico: {
            icono: "fa-solid fa-person-walking",
            titulo: "Plan Básico",
            resumen: "Para empezar sin abrumarte, con una base sólida de movimiento.",
            detalles: [
                "3 sesiones por semana de 60 minutos",
                "Rutina adaptada a tu nivel actual",
                "Seguimiento por WhatsApp entre sesiones"
            ]
        },
        sesiones8: {
            icono: "fa-solid fa-dumbbell",
            titulo: "8 sesiones al mes",
            resumen: "Dos clases por semana, para agendas apretadas.",
            detalles: [
                "2 clases semanales de 60 minutos",
                "Plan de entrenamiento personalizado",
                "Ajustes mensuales según tu progreso",
                "Rutina complementaria para los días libres",
                "Valoración fisica",
                "Plan alimenticio"
            ]
        },
        sesiones12: {
            icono: "fa-solid fa-fire",
            titulo: "12 sesiones al mes",
            resumen: "Tres clases por semana: el punto donde los cambios se notan.",
            detalles: [
                "3 clases semanales de 60 minutos",
                "Plan de entrenamiento",
                "Medición de composición corporal cada mes",
                "Valoración fisica",
                "Plan alimenticio",
                "Seguimiento constante por WhatsApp"
            ]
        },
        sesiones20: {
            icono: "fa-solid fa-handshake-angle",
            titulo: "20 sesiones al mes",
            resumen: "Cuatro clases por semana para objetivos concretos y con fecha.",
            detalles: [
                "4 clases semanales de 60 minutos",
                "Periodización del entrenamiento por bloques",
                "Valoración fisica",
                "Plan alimenticio",
                "Revisión de técnica y progresión de cargas"
            ]
        },
        sesiones25: {
            icono: "fa-solid fa-weight-hanging",
            titulo: "25 sesiones al mes",
            resumen: "Cinco clases por semana. El acompañamiento más cercano.",
            detalles: [
                "5 clases semanales de 60 minutos",
                "Programación individual mes a mes",
                "Valoración fisica",
                "Plan de alimentación y suplementación",
                "Control semanal de medidas y progreso"
            ]
        },
        valoracion: {
            icono: "fa-solid fa-heart-pulse",
            titulo: "Valoración física",
            resumen: "El punto de partida: saber de dónde sales antes de entrenar.",
            detalles: [
                "Medición de composición corporal",
                "Evaluación de postura y movilidad",
                "Revisión de historial de lesiones",
                "Valoración fisica",
                "Plan alimenticio",
                "Definición de objetivos realistas"
            ]
        },
        alimentacion: {
            icono: "fa-solid fa-bowl-rice",
            titulo: "Plan de alimentación",
            resumen: "Comida real, ajustada a tu rutina y a lo que te gusta comer.",
            detalles: [
                "Plan construido sobre tus hábitos actuales",
                "Opciones de reemplazo para cada comida",
                "Lista de mercado semanal",
                "Valoración fisica",
                "Plan alimenticio",
                "Ajustes según cómo responda tu cuerpo"
            ]
        },
        seguimiento: {
            icono: "fa-solid fa-person-chalkboard",
            titulo: "Seguimiento",
            resumen: "Nadie sostiene un cambio sola. Aquí entra el acompañamiento.",
            detalles: [
                "Contacto directo por WhatsApp",
                "Revisión de progreso cada semana",
                "Corrección de técnica con video",
                "Ajuste del plan cuando algo no funciona"
            ]
        },
        yoga: {
            icono: "fa-solid fa-spa",
            titulo: "Yoga",
            resumen: "Respiración, equilibrio y una experiencia liberadora.",
            detalles: [
                "Sesiones de 60 minutos",
                "Secuencias adaptadas a tu nivel",
                "Trabajo de respiración y control de estrés",
                "Sin experiencia previa necesaria"
            ]
        },
        pilates: {
            icono: "fa-solid fa-person-rays",
            titulo: "Pilates",
            resumen: "Control, postura y fuerza profunda del core.",
            detalles: [
                "Sesiones de 55 minutos en mat",
                "Fortalecimiento del centro y la espalda",
                "Ideal si pasas muchas horas sentada",
                "Progresión por niveles"
            ]
        },
        flexibilidad: {
            icono: "fa-solid fa-child-reaching",
            titulo: "Flexibilidad",
            resumen: "Movilidad articular y menos tensión acumulada.",
            detalles: [
                "Sesiones de 45 minutos",
                "Rutinas de movilidad por zonas",
                "Complemento perfecto del entrenamiento de fuerza",
                "Ejercicios para hacer en casa"
            ]
        }
    };

    const modal = document.getElementById("modal");

    if (modal) {
        const modalIcono = document.getElementById("modal-icono");
        const modalTitulo = document.getElementById("modal-titulo");
        const modalResumen = document.getElementById("modal-resumen");
        const modalLista = document.getElementById("modal-lista");
        let ultimoFoco = null;

        function abrirModal(clave) {
            const data = contenidos[clave];
            if (!data) return;

            ultimoFoco = document.activeElement;

            modalIcono.className = "modal-icono " + data.icono;
            modalTitulo.textContent = data.titulo;
            modalResumen.textContent = data.resumen;

            modalLista.innerHTML = "";
            data.detalles.forEach(texto => {
                const li = document.createElement("li");
                li.textContent = texto;
                modalLista.appendChild(li);
            });

            modal.hidden = false;
            document.body.classList.add("sin-scroll");
            modal.querySelector(".modal-cerrar").focus();
        }

        function cerrarModal() {
            modal.hidden = true;
            document.body.classList.remove("sin-scroll");
            if (ultimoFoco) ultimoFoco.focus();
        }

        // Abrir desde cualquier elemento con data-modal
        document.querySelectorAll("[data-modal]").forEach(el => {
            el.addEventListener("click", () => abrirModal(el.dataset.modal));
            el.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    abrirModal(el.dataset.modal);
                }
            });
        });

        modal.querySelectorAll("[data-cerrar]").forEach(el => {
            el.addEventListener("click", cerrarModal);
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !modal.hidden) cerrarModal();
        });

        // Mantener el foco dentro del modal mientras está abierto
        modal.addEventListener("keydown", e => {
            if (e.key !== "Tab") return;

            const focusables = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusables.length === 0) return;

            const primero = focusables[0];
            const ultimo = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === primero) {
                e.preventDefault();
                ultimo.focus();
            } else if (!e.shiftKey && document.activeElement === ultimo) {
                e.preventDefault();
                primero.focus();
            }
        });

        // Si se llega con un ancla (#yoga), abrir ese modal
        const hash = window.location.hash.replace("#", "");
        if (hash && contenidos[hash]) {
            abrirModal(hash);
        }
    }

});