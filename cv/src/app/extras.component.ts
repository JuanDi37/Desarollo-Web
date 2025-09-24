import { Component } from '@angular/core';

@Component({
  selector: 'extras-block',
  standalone: true,
  template: `
<section id="extra">
  <h2>Extras</h2>
  <a href="/IMGJD.webp" target="_blank">Abrir imagen en el navegador</a> |
  <button
    (click)="print()"
    class="btn btn-danger btn-pdf d-inline-flex align-items-center gap-2"
    type="button"
    title="Imprimimos o guardamos como PDF">
    <i class="bi bi-filetype-pdf" aria-hidden="true"></i>
    Descargar como PDF
  </button>
</section>
  `
})
export class ExtrasComponent {
  print(){ window.print(); }
}
