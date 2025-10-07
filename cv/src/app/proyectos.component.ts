import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { GithubService, GithubRepo } from './services/github.service';

@Component({
  selector: 'proyectos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './proyectos.component.html'
})
export class ProyectosComponent implements OnInit {
  private github = inject(GithubService);

  @Input() username = 'JuanDi37';
  @Input() repoNames: string[] = ['Desarollo-Web', 'Chess', 'Data-Science'];

  private branchByRepo: Record<string, string> = {
    'Desarollo-Web': 'TareaCV'
  };

  loading = signal(true);
  error = signal<string | null>(null);
  repos = signal<GithubRepo[]>([]);

  ngOnInit(): void {
    const calls = this.repoNames.map((name) => this.github.getRepo(this.username, name));
    forkJoin(calls).subscribe({
      next: (results) => {
        this.repos.set(results);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se pudieron cargar los proyectos de GitHub.');
        this.loading.set(false);
      }
    });
  }

  getHref(r: GithubRepo): string {
    const forcedBranch = this.branchByRepo[r.name];
    return forcedBranch ? `${r.html_url}/tree/${encodeURIComponent(forcedBranch)}` : r.html_url;
  }
}
