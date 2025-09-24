import { Component, inject, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private renderer = inject(Renderer2);

  year = new Date().getFullYear();
  showContact = true;
  showExperience = true;
  theme: 'light' | 'dark' = 'light';

  saludo = '';

  // Fallbacks para la imagen: assets -> public -> placeholder
  private triedAssets = false;
  private triedPublic = false;
  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    if (!this.triedAssets) {
      this.triedAssets = true;
      img.src = '/IMGJD.webp'; // por si la tenés en public/
      return;
    }
    if (!this.triedPublic) {
      this.triedPublic = true;
      img.src = 'https://via.placeholder.com/150';
      return;
    }
  }

  query = '';
  tecnologias = [
    'Bases de datos · En memoria: Redis, Memcached',
    'Bases de datos · Relacionales: PostgreSQL, MySQL, SQLite, SQL Server',
    'Bases de datos · NoSQL: MongoDB, Cassandra',
    'Contenedores y DevOps: Docker, Docker Compose',
    'Servicios en la nube: AWS, S3, Azure',
    'Diseño y producto: Figma'
  ];

  get filteredTecnologias() {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.tecnologias;
    const tokens = q.split(/\s+/).filter(Boolean);
    return this.tecnologias.filter(t => tokens.every(tok => t.toLowerCase().includes(tok)));
  }

  get resultadosMsg() {
    return this.query.trim()
      ? `${this.filteredTecnologias.length} resultado${this.filteredTecnologias.length === 1 ? '' : 's'}`
      : '';
  }

  constructor() {
    const saved = localStorage.getItem('theme');
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.applyTheme((saved as 'light' | 'dark') || (prefersDark ? 'dark' : 'light'));

    this.cargarSaludoSeguro();
  }

  private async cargarSaludoSeguro() {
    try {
      const nombre = encodeURIComponent('Juan Diego Letona');
      const res = await fetch(`/api/saludo?nombre=${nombre}`, {
        cache: 'no-store',
        headers: { 'Accept': 'text/plain' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ct = (res.headers.get('content-type') || '').toLowerCase();
      const txt = await res.text();
      const pareceHtml = /^\s*<!doctype html/i.test(txt) || /<html[\s>]/i.test(txt);
      if (!ct.startsWith('text/plain') || pareceHtml || !txt.trim()) throw new Error('Respuesta no válida');
      this.saludo = txt.trim();
    } catch {
      const h = new Date().getHours();
      const base = (h >= 5 && h < 12) ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches');
      this.saludo = `${base}. Bienvenido a mi perfil!`;
    }
  }

  toggleTheme() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    localStorage.setItem('theme', next);
  }

  private applyTheme(t: 'light' | 'dark') {
    this.theme = t;
    const html = document.documentElement;
    if (t === 'dark') this.renderer.setAttribute(html, 'data-theme', 'dark');
    else this.renderer.removeAttribute(html, 'data-theme');
  }

  print() { window.print(); }
}
