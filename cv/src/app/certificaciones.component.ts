import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Cert = {
  titulo: string;
  entidad: string;
  ano: string;
  url?: string;
  skills: string[];
};

@Component({
  selector: 'certificaciones',
  standalone: true,
  imports: [CommonModule],
  template: `
<section id="certificaciones">
  <h2>Certificaciones</h2>

  <div class="row g-3">
    <div class="col-12 col-md-6" *ngFor="let c of certs">
      <div class="p-3 border rounded-3 h-100">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <h3 class="h6 fw-bold mb-0">{{ c.titulo }}</h3>
          <span class="badge text-bg-secondary">{{ c.ano }}</span>
        </div>
        <p class="text-muted mb-2">{{ c.entidad }}</p>

        <div class="d-flex flex-wrap gap-2 mb-2">
          <span class="badge rounded-pill text-bg-info" *ngFor="let s of c.skills">{{ s }}</span>
        </div>

        <a *ngIf="c.url" class="btn btn-outline-primary btn-sm" [href]="c.url" target="_blank">
          <i class="bi bi-box-arrow-up-right me-1"></i> Ver credencial
        </a>
      </div>
    </div>
  </div>
</section>
  `
})
export class CertificacionesComponent {
  certs: Cert[] = [
    {
      titulo: 'Scrum and Agile Methodologies',
      entidad: 'Universidad Francisco Marroquín',
      ano: '2024',
      url: '',
      skills: ['Scrum', 'Kanban', 'Agile']
    },
    {
      titulo: 'AWS Cloud Foundations (self-paced)',
      entidad: 'AWS Training',
      ano: '2024',
      url: '',
      skills: ['AWS', 'S3', 'EC2']
    },
    {
      titulo: 'Docker Essentials',
      entidad: 'Docker',
      ano: '2023',
      url: '',
      skills: ['Containers', 'Compose']
    }
  ];
}
