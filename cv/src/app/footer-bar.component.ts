import { Component, Input } from '@angular/core';

@Component({
  selector: 'footer-bar',
  standalone: true,
  template: `
<footer>
  <p>© {{ year }} Juan Diego Letona · Guatemala</p>
</footer>
  `
})
export class FooterBarComponent {
  @Input() year = new Date().getFullYear();
}
