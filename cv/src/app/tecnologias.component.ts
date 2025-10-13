import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'tecnologias',
  standalone: true,
  imports: [FormsModule, NgFor],
  template: `
<section id="tecnologias">
  <h2>Tecnologías</h2>

  <div class="input-group mb-3">
    <span class="input-group-text"><i class="bi bi-search" aria-hidden="true"></i></span>
    <input [(ngModel)]="query" type="search" class="form-control" placeholder="Buscar habilidades (ej. Docker, AWS, SQL)" />
  </div>
  <small class="text-muted">{{ resultadosMsg }}</small>

  <ul class="mt-2">
    <li *ngFor="let item of filteredTecnologias">{{ item }}</li>
  </ul>
</section>
  `
})
export class TecnologiasComponent {
  query = '';
  tecnologias = [
    'Bases de datos · En memoria: Redis, Memcached',
    'Bases de datos · Relacionales: PostgreSQL, MySQL, SQLite, SQL Server',
    'Bases de datos · NoSQL: MongoDB, Cassandra',
    'Contenedores y DevOps: Docker, Docker Compose',
    'Servicios en la nube: AWS, S3, Azure',
    'Diseño y producto: Figma'
  ];
  get filteredTecnologias() {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.tecnologias;
    const tokens = q.split(/\s+/).filter(Boolean);
    return this.tecnologias.filter(t => tokens.every(tok => t.toLowerCase().includes(tok)));
  }
  get resultadosMsg() {
    return this.query.trim()
      ? `${this.filteredTecnologias.length} resultado${this.filteredTecnologias.length === 1 ? '' : 's'}`
      : '';
  }
}
