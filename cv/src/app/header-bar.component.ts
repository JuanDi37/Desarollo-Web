import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'header-bar',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
<header>
  <h1>Perfil | Juan Diego Letona</h1>
  <p class="mb-2" aria-live="polite">{{ saludo }}</p>

  <!-- Acciones (sin enlaces de navegación) -->
  <div class="d-flex gap-2 justify-content-center flex-wrap">
    <button
      (click)="print.emit()
"
      class="btn btn-danger btn-pdf d-inline-flex align-items-center gap-2"
      type="button"
      title="Imprimir o guardar como PDF">
      <i class="bi bi-filetype-pdf" aria-hidden="true"></i>
      Descargar PDF
    </button>

    <button
      (click)="toggleTheme.emit()"
      class="btn btn-sm d-inline-flex align-items-center gap-2"
      [ngClass]="theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'"
      type="button">
      <i class="bi" [ngClass]="theme === 'dark' ? 'bi-sun' : 'bi-moon'" aria-hidden="true"></i>
      {{ theme === 'dark' ? 'Modo claro' : 'Modo oscuro' }}
    </button>
  </div>
</header>
  `
})
export class HeaderBarComponent {
  @Input() saludo: string = '';
  @Input() theme: 'light' | 'dark' = 'light';

  @Output() toggleTheme = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();
}
