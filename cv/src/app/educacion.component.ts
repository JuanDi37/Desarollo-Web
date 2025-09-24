import { Component } from '@angular/core';

@Component({
  selector: 'educacion',
  standalone: true,
  template: `
<section id="educacion">
  <h2>Educación</h2>
  <table>
    <thead>
      <tr><th>Año</th><th>Institución</th><th>Título</th></tr>
    </thead>
    <tbody>
      <tr><td>2022</td><td>Colegio Valle Verde (High School)</td><td>Bachillerato</td></tr>
      <tr><td>2023 - 2026</td><td>Universidad Francisco Marroquín</td><td>Licenciatura en Computer Science (en curso)</td></tr>
      <tr><td>2024</td><td>Universidad Francisco Marroquín</td><td>Scrum and Agile Methodologies</td></tr>
    </tbody>
  </table>
</section>
  `
})
export class EducacionComponent {}
