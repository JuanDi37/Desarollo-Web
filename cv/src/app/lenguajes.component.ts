import { Component } from '@angular/core';

@Component({
  selector: 'lenguajes',
  standalone: true,
  template: `
<section id="lenguajes">
  <h2>Lenguajes de programación</h2>

  <p>Compilados: C, C++, C#, Java</p>
  <div class="progress mb-3">
    <div class="progress-bar bg-success" role="progressbar" style="width: 75%">75%</div>
  </div>

  <p>Frontend: JavaScript, TypeScript, HTML, CSS</p>
  <div class="progress mb-3">
    <div class="progress-bar bg-info" role="progressbar" style="width: 80%">80%</div>
  </div>

  <p>Scripting y análisis: Python, R, MATLAB, Octave, Bash, PowerShell</p>
  <div class="progress mb-3">
    <div class="progress-bar bg-warning text-dark" role="progressbar" style="width: 70%">70%</div>
  </div>
</section>
  `
})
export class LenguajesComponent {}
