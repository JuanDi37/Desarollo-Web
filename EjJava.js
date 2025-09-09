// EjJava.js
// añadimos: saludo dinámico (backup), mostrar/ocultar experiencia y modo oscuro/claro persistente

document.addEventListener('DOMContentLoaded', () => {
  // =======================
  // Saludo dinámico (backup)
  // =======================
  (function () {
    const destino = document.getElementById('saludo-dinamico');
    if (!destino) return;

    // si ya tienes un saludo (por el backend), no tocamos
    if ((destino.textContent || '').trim().length > 0) return;

    const h = new Date().getHours();
    const base = (h >= 5 && h < 12) ? 'Buenos días'
               : (h < 19) ? 'Buenas tardes'
               : 'Buenas noches';
    destino.textContent = base + ' y bienvenido a mi CV';
  })();

  // ==========================================
  // Botón Mostrar/Ocultar sección de experiencia
  // ==========================================
  (function () {
    const expSection = document.querySelector('main > section#experiencia');
    if (!expSection) return;

    // contenedor a ocultar/mostrar (si no existe, envolvemos la primera tabla)
    let cont = expSection.querySelector('#contenido-experiencia, .contenido-experiencia');
    if (!cont) {
      const tabla = expSection.querySelector('table');
      if (tabla) {
        cont = document.createElement('div');
        cont.id = 'contenido-experiencia';
        tabla.parentNode.insertBefore(cont, tabla);
        cont.appendChild(tabla);
      }
    }

    // botón (si no existe, lo creamos debajo del h2)
    let btn = expSection.querySelector('#toggle-experiencia, .btn-toggle-experiencia');
    if (!btn && cont) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'toggle-experiencia';
      btn.className = 'btn btn-outline-secondary btn-sm mb-3 btn-toggle-experiencia';
      btn.textContent = 'Ocultar experiencia';

      const h2 = expSection.querySelector('h2');
      if (h2 && h2.nextSibling) {
        expSection.insertBefore(btn, h2.nextSibling);
      } else {
        expSection.insertBefore(btn, cont);
      }
    }

    if (btn && cont && !btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => {
        const visible = window.getComputedStyle(cont).display !== 'none';
        cont.style.display = visible ? 'none' : '';
        btn.textContent = visible ? 'Mostrar experiencia' : 'Ocultar experiencia';
      });
    }
  })();

  // ======================
  // Modo oscuro / modo claro
  // ======================
  (function () {
    const root = document.documentElement;
    const btn = document.getElementById('toggle-theme');

    function applyTheme(theme) {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      updateBtn();
    }

    function updateBtn() {
      if (!btn) return;
      const dark = root.getAttribute('data-theme') === 'dark';
      btn.innerHTML = dark
        ? '<i class="bi bi-sun" aria-hidden="true"></i> Modo claro'
        : '<i class="bi bi-moon" aria-hidden="true"></i> Modo oscuro';
      btn.classList.toggle('btn-outline-light', dark);
      btn.classList.toggle('btn-outline-dark', !dark);
      btn.setAttribute('aria-pressed', String(dark));
    }

    // preferencia guardada o sistema
    const saved = localStorage.getItem('theme');
    const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved ? saved : (sysDark ? 'dark' : 'light'));

    if (btn && !btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => {
        const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
      });
    }

    // si NO hay preferencia guardada, seguimos cambios del sistema
    if (!saved && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (!mq._boundEj) {
        mq._boundEj = true;
        mq.addEventListener('change', e => applyTheme(e.matches ? 'dark' : 'light'));
      }
    }
  })();
});
