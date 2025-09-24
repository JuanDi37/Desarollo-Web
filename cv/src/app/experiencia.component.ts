import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'experiencia',
  standalone: true,
  imports: [CommonModule],
  template: `
<section id="experiencia">
  <h2>Experiencia Laboral</h2>
  <button
    (click)="show = !show"
    class="btn btn-outline-secondary btn-sm mb-3 btn-contraste"
    type="button">
    {{ show ? 'Ocultar experiencia' : 'Mostrar experiencia' }}
  </button>

  <div *ngIf="show" id="contenido-experiencia">
    <table>
      <thead><tr><th>Periodo</th><th>Empresa</th><th>Puesto</th></tr></thead>
      <tbody>
        <tr><td>2024 – Actualidad</td><td>LV Corp</td><td>Software Engineer · Desarrollo web a la medida</td></tr>
        <tr><td>2022 – 2023</td><td>Tech Solutions</td><td>Desarrollador Backend · APIs y microservicios</td></tr>
      </tbody>
    </table>
  </div>
</section>
  `
})
export class ExperienciaComponent {
  show = true;
}
