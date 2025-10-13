import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'presentacion',
  standalone: true,
  imports: [CommonModule],
  template: `
<section>
  <div class="card shadow-lg border-0 text-center p-4 w-100">
    <div class="card-body">
      <img
        src="assets/IMGJD.webp"
        alt="Foto de Juan Diego Letona"
        (error)="onImgError($event)"
        class="img-fluid rounded-circle border border-3 border-primary shadow mb-3 object-fit-cover"
        style="width:150px; height:150px; object-fit:cover;"
      />
      <h2 class="card-title">Juan Diego Letona</h2>
      <p class="card-text">
        Estudiante de Computer Science en la Universidad Francisco Marroquín · Guatemala
      </p>

      <button (click)="showContact = !showContact"
              class="btn btn-outline-secondary btn-sm mb-2 btn-contraste"
              type="button">
        {{ showContact ? 'Ocultar contacto' : 'Mostrar contacto' }}
      </button>

      <div *ngIf="showContact" id="contenido-contacto">
        <a href="mailto:juanletona@ufm.edu" class="btn btn-outline-primary btn-sm me-2">Contactar</a>
        <a href="https://github.com/JuanDi37" target="_blank" class="btn btn-outline-dark btn-sm me-2">GitHub</a>
        <a href="https://www.linkedin.com/in/juandiego-letona/" target="_blank" class="btn btn-outline-info btn-sm">LinkedIn</a>
      </div>
    </div>
  </div>
</section>
  `
})
export class PresentacionComponent {
  showContact = true;
  private triedAssets = false;
  private triedPublic = false;
  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    if (!this.triedAssets) { this.triedAssets = true; img.src = '/IMGJD.webp'; return; }
    if (!this.triedPublic) { this.triedPublic = true; img.src = 'https://via.placeholder.com/150'; }
  }
}
