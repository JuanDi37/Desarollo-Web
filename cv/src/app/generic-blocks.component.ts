import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Block = {
  titulo: string;
  texto: string;
  linkText?: string;
  linkHref?: string;
};

@Component({
  selector: 'generic-blocks',
  standalone: true,
  imports: [CommonModule],
  template: `
<section id="generico">
  <h2>Sección genérica</h2>

  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4" *ngFor="let b of blocks">
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body d-flex flex-column">
          <h3 class="h6 fw-bold mb-2">{{ b.titulo }}</h3>
          <p class="text-muted flex-grow-1">{{ b.texto }}</p>
          <a *ngIf="b.linkHref && b.linkText"
             class="btn btn-outline-primary btn-sm align-self-start"
             [href]="b.linkHref" target="_blank">
            <i class="bi bi-box-arrow-up-right me-1"></i>{{ b.linkText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
  `
})
export class GenericBlocksComponent {
  blocks: Block[] = [
    {
      titulo: 'Disponibilidad',
      texto: 'Abierto a oportunidades de medio tiempo/remoto y proyectos freelance.',
      linkText: 'Contáctame',
      linkHref: 'mailto:juanletona@ufm.edu'
    },
    {
      titulo: 'Último logro',
      texto: 'Implementé un buscador con filtros y persistencia de tema (oscuro/claro) en Angular.'
    },
    {
      titulo: 'Lectura recomendada',
      texto: 'Artículo corto sobre patrones de diseño para frontends reactivas.',
      linkText: 'Ver artículo',
      linkHref: 'https://refactoring.guru/es/design-patterns'
    }
  ];
}
