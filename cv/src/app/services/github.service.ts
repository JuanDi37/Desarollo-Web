import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  archived: boolean;
  fork: boolean;
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private http = inject(HttpClient);
  private readonly API = 'https://api.github.com';

  /** Obtiene un repo específico: /repos/:user/:repo */
  getRepo(username: string, repoName: string) {
    return this.http.get<GithubRepo>(`${this.API}/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}`);
  }
}
