import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Proyecto = {
  titulo: string;
  desc: string;
  tech: string[];
  github?: string;
  demo?: string;
};

@Component({
  selector: 'proyectos',
  standalone: true,
  imports: [CommonModule],
  template: `
<section id="proyectos">
  <h2>Proyectos</h2>

  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4" *ngFor="let p of proyectos">
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body d-flex flex-column">
          <h3 class="h5 fw-bold mb-2">{{ p.titulo }}</h3>
          <p class="text-muted flex-grow-1">{{ p.desc }}</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span class="badge rounded-pill text-bg-secondary" *ngFor="let t of p.tech">{{ t }}</span>
          </div>
          <div class="d-flex gap-2">
            <a *ngIf="p.github" class="btn btn-outline-dark btn-sm" [href]="p.github" target="_blank">
              <i class="bi bi-github me-1"></i> Código
            </a>
            <a *ngIf="p.demo" class="btn btn-primary btn-sm" [href]="p.demo" target="_blank">
              <i class="bi bi-box-arrow-up-right me-1"></i> Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  `
})
export class ProyectosComponent {
  proyectos: Proyecto[] = [
    {
      titulo: 'Portfolio / CV',
      desc: 'SPA en Angular con modo oscuro, buscador de habilidades y exportación a PDF.',
      tech: ['Angular', 'Bootstrap', 'TypeScript'],
      github: 'https://github.com/JuanDi37',
    },
    {
      titulo: 'API REST Demo',
      desc: 'Microservicio con endpoints CRUD y autenticación básica.',
      tech: ['Node.js', 'Express', 'JWT'],
    },
    {
      titulo: 'Data Dashboard',
      desc: 'Panel con métricas y visualizaciones básicas.',
      tech: ['TypeScript', 'Charts', 'Responsive'],
    },
  ];
}
