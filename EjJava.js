// EjJava.js
// añadimos: saludo dinámico (sin nombre) y botón mostrar/ocultar experiencia, sin quitar nada del HTML

document.addEventListener('DOMContentLoaded', () => {
  // --- Saludo dinámico: "Buenos días/tardes/noches y bienvenido a mi CV"
  (function () {
    const destino = document.getElementById('saludo-dinamico');
    if (!destino) return;
    const h = new Date().getHours();
    const base = (h >= 5 && h < 12) ? 'Buenos días'
               : (h < 19) ? 'Buenas tardes'
               : 'Buenas noches';
    // sobrescribimos el saludo para asegurar el formato correcto
    destino.textContent = base + ' y bienvenido a mi CV';
  })();

  // --- Botón Mostrar/Ocultar experiencia (solo en la sección #experiencia dentro de <main>)
  (function () {
    const expSection = document.querySelector('main > section#experiencia');
    if (!expSection) return;

    // contenedor a ocultar/mostrar: reutiliza si existe; si no, envuelve la primera tabla
    let cont = expSection.querySelector('#contenido-experiencia, .contenido-experiencia');
    if (!cont) {
      const tabla = expSection.querySelector('table');
      if (tabla) {
        cont = document.createElement('div');
        cont.className = 'contenido-experiencia';
        tabla.parentNode.insertBefore(cont, tabla);
        cont.appendChild(tabla);
      }
    }

    // crear el botón si no existe ya dentro de la misma sección
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

    // enlazar evento (evitar dobles bindings)
    if (btn && cont && !btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => {
        const visible = window.getComputedStyle(cont).display !== 'none';
        cont.style.display = visible ? 'none' : '';
        btn.textContent = visible ? 'Mostrar experiencia' : 'Ocultar experiencia';
      });
    }
  })();
});
