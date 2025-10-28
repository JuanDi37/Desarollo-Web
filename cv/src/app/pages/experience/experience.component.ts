import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  // No hace falta CommonModule porque no usamos *ngIf/*ngFor en esta plantilla
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {}
