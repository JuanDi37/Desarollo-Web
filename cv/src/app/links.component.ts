import { Component } from '@angular/core';

@Component({
  selector: 'links-block',
  standalone: true,
  template: `
<section id="github">
  <h2>GitHub</h2>
  <a href="https://github.com/JuanDi37" target="_blank">Visitar perfil en GitHub</a>
</section>

<section id="linkedin">
  <h2>LinkedIn</h2>
  <a href="https://www.linkedin.com/in/juandiego-letona/" target="_blank">Visitar perfil en LinkedIn</a>
</section>

<section id="email">
  <h2>Correo electrónico</h2>
  <a href="mailto:juanletona@ufm.edu">Enviar correo</a>
</section>
  `
})
export class LinksComponent {}
