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

  getUserRepos(username: string, perPage = 6) {
    return this.http.get<GithubRepo[]>(
      `${this.API}/users/${username}/repos`,
      { params: { sort: 'updated', per_page: perPage.toString() } }
    );
  }

  getRepo(username: string, repoName: string) {
    return this.http.get<GithubRepo>(
      `${this.API}/repos/${username}/${repoName}`
    );
  }
}
