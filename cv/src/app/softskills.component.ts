import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SkillPillComponent } from './skill-pill.component';

@Component({
  selector: 'softskills',
  standalone: true,
  imports: [NgFor, SkillPillComponent],
  template: `
<section id="softskills">
  <h2>Soft Skills</h2>

  <div class="row g-3">
    <div class="col-12 col-md-6" *ngFor="let grupo of softSkills">
      <div class="p-3 border rounded-3">
        <h3 class="h6 text-uppercase fw-bold mb-2">{{ grupo.titulo }}</h3>
        <div class="d-flex flex-wrap gap-2">
          <skill-pill *ngFor="let s of grupo.items" [text]="s"></skill-pill>
        </div>
      </div>
    </div>
  </div>
</section>
  `
})
export class SoftSkillsComponent {
  softSkills = [
    { titulo: 'Colaboración', items: ['Trabajo en equipo', 'Comunicación efectiva', 'Escucha activa'] },
    { titulo: 'Liderazgo', items: ['Gestión de proyectos', 'Motivación de equipo', 'Toma de decisiones'] },
    { titulo: 'Sociabilidad', items: ['Networking', 'Resolución de conflictos', 'Empatía'] },
    { titulo: 'Adaptabilidad', items: ['Aprendizaje continuo', 'Flexibilidad', 'Gestión del cambio'] },
    { titulo: 'Pensamiento crítico', items: ['Análisis de problemas', 'Decisiones informadas', 'Evaluación objetiva'] },
    { titulo: 'Gestión del tiempo', items: ['Organización', 'Priorización', 'Cumplimiento de plazos'] }
  ];
}
