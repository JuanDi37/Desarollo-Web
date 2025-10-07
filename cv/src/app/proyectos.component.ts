import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GithubService, GithubRepo } from './services/github.service';

@Component({
  selector: 'proyectos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './proyectos.component.html'
})
export class ProyectosComponent implements OnInit {
  private github = inject(GithubService);

  /** Usuario de GitHub */
  @Input() username = 'JuanDi37';

  /** Nombre del repo exacto (sin rama) */
  @Input() repoName = 'Desarollo-Web';

  loading = signal(true);
  error = signal<string | null>(null);
  repo = signal<GithubRepo | null>(null);

  ngOnInit(): void {
    this.github.getRepo(this.username, this.repoName).subscribe({
      next: (data) => {
        this.repo.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo cargar el proyecto.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}
