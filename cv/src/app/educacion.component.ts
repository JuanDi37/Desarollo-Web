import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service'; 

@Component({
  selector: 'educacion',
  standalone: true,
  imports: [CommonModule],
  template: `
<section id="educacion">
  <h2>Educación</h2>

  <table *ngIf="education.length > 0; else loading">
    <thead>
      <tr><th>Año</th><th>Institución</th><th>Título</th></tr>
    </thead>
    <tbody>
      <tr *ngFor="let e of education">
        <td>{{ e.startYear }} - {{ e.endYear }}</td>
        <td>{{ e.school }}</td>
        <td>{{ e.degree }}</td>
      </tr>
    </tbody>
  </table>

  <ng-template #loading>
    <p>Cargando educación...</p>
  </ng-template>
</section>
  `
})
export class EducacionComponent implements OnInit {
  education: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEducation().subscribe({
      next: (data) => (this.education = data),
      error: (err) => console.error('Error al cargar educación:', err)
    });
  }
}