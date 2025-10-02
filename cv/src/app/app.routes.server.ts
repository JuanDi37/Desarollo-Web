import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExperienceComponent } from './pages/experience/experience.component';

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
      {
        path: 'jobs',
        component: ExperienceComponent,
        title: 'Experiencia · Trabajos | Juan Diego Letona',
      },
      {
        path: 'studies',
        component: ExperienceComponent,
        title: 'Experiencia · Estudios | Juan Diego Letona',
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
