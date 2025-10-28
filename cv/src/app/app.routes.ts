import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

// Padre sin componente (componentless) y rutas hijas:
import { JobsComponent } from './pages/experience/jobs.component';
import { ExperienceComponent } from './pages/experience/experience.component'; // ← si mantienes /experience/studies

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    pathMatch: 'full',
    title: 'Perfil | Juan Diego Letona',
  },

  {
    path: 'experience',
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },

      // i) /experience/jobs → lista de trabajos (NUEVO componente)
      {
        path: 'jobs',
        component: JobsComponent,
        title: 'Experiencia · Trabajos | Juan Diego Letona',
      },

      // ii) /experience/studies → (opcional) si quieres conservar esta ruta
      //    usa tu componente actual de experience (no modificado)
      {
        path: 'studies',
        component: ExperienceComponent,
        title: 'Experiencia · Estudios | Juan Diego Letona',
      }
    ],
  },

  { path: '**', redirectTo: '' },
];
