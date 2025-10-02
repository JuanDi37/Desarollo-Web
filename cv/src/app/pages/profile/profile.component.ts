import { Component, Renderer2, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { HeaderBarComponent } from '../../header-bar.component';
import { PresentacionComponent } from '../../presentacion.component';
import { EducacionComponent } from '../../educacion.component';
import { TecnologiasComponent } from '../../tecnologias.component';
import { LenguajesComponent } from '../../lenguajes.component';
import { SoftSkillsComponent } from '../../softskills.component';
import { LinksComponent } from '../../links.component';
import { ExtrasComponent } from '../../extras.component';
import { FooterBarComponent } from '../../footer-bar.component';
import { ProyectosComponent } from '../../proyectos.component';
import { CertificacionesComponent } from '../../certificaciones.component';
import { GenericBlocksComponent } from '../../generic-blocks.component';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgFor,
    HeaderBarComponent,
    PresentacionComponent,
    EducacionComponent,
    TecnologiasComponent,
    LenguajesComponent,
    SoftSkillsComponent,
    ProyectosComponent,
    CertificacionesComponent,
    GenericBlocksComponent,
    LinksComponent,
    ExtrasComponent,
    FooterBarComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private renderer = inject(Renderer2);
  private dataService = inject(DataService);

  year = new Date().getFullYear();
  theme: 'light' | 'dark' = 'light';
  saludo = '';

  // skills compartidas desde el servicio
  skills: string[] = this.dataService.getSkills();

  constructor() {
    const saved = localStorage.getItem('theme');
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.applyTheme(
      (saved as 'light' | 'dark') || (prefersDark ? 'dark' : 'light')
    );
    this.cargarSaludoSeguro();
  }

  private async cargarSaludoSeguro() {
    try {
      const nombre = encodeURIComponent('Juan Diego Letona');
      const res = await fetch(`/api/saludo?nombre=${nombre}`, {
        cache: 'no-store',
        headers: { Accept: 'text/plain' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ct = (res.headers.get('content-type') || '').toLowerCase();
      const txt = await res.text();
      const pareceHtml =
        /^\s*<!doctype html/i.test(txt) || /<html[\s>]/i.test(txt);
      if (!ct.startsWith('text/plain') || pareceHtml || !txt.trim())
        throw new Error('Respuesta no válida');
      this.saludo = txt.trim();
    } catch {
      const h = new Date().getHours();
      const base =
        h >= 5 && h < 12
          ? 'Buenos días'
          : h < 19
          ? 'Buenas tardes'
          : 'Buenas noches';
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

  print() {
    window.print();
  }
}
