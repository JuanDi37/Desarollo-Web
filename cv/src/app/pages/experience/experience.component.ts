import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

type ExperienceView = 'jobs' | 'studies';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  view: ExperienceView = 'jobs';
  show = true; // toggle solo para la vista de trabajos

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.syncViewWithRoute();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.syncViewWithRoute();
    });
  }

  private syncViewWithRoute() {
    // Cuando esta ruta es '.../experience/jobs' o '.../experience/studies',
    // route.routeConfig?.path será 'jobs' o 'studies'
    const path = this.route.routeConfig?.path;
    this.view = path === 'studies' ? 'studies' : 'jobs';
  }

  toggleShow() {
    this.show = !this.show;
  }
}
