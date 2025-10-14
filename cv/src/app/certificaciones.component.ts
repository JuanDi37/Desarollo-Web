import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service'; // ✅ ruta corregida

@Component({
  selector: 'certificaciones',
  standalone: true,
  imports: [CommonModule],
  template: `
<section id="certificaciones">
  <h2>Certificaciones</h2>

  <div class="row g-3" *ngIf="certs.length > 0; else loading">
    <div class="col-12 col-md-6" *ngFor="let c of certs">
      <div class="p-3 border rounded-3 h-100">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <h3 class="h6 fw-bold mb-0">{{ c.name }}</h3>
          <span class="badge text-bg-secondary">{{ c.date }}</span>
        </div>
        <p class="text-muted mb-2">{{ c.issuer }}</p>

        <div class="d-flex flex-wrap gap-2 mb-2">
          <span class="badge rounded-pill text-bg-info" *ngFor="let s of c.skills">{{ s }}</span>
        </div>

        <a *ngIf="c.credentialUrl" class="btn btn-outline-primary btn-sm" [href]="c.credentialUrl" target="_blank">
          <i class="bi bi-box-arrow-up-right me-1"></i> Ver credencial
        </a>
      </div>
    </div>
  </div>

  <ng-template #loading>
    <p>Cargando certificaciones...</p>
  </ng-template>
</section>
  `
})
export class CertificacionesComponent implements OnInit {
  certs: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCertificates().subscribe({
      next: (data) => (this.certs = data),
      error: (err) => console.error('Error al cargar certificaciones:', err)
    });
  }
}
