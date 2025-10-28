import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'experience-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html'
})
export class JobsComponent {
  show = true;
  toggle() { this.show = !this.show; }
}
