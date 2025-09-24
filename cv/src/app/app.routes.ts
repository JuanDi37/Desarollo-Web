import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: ProfileComponent, pathMatch: 'full', title: 'Perfil | Juan Diego Letona' },
  { path: '**', redirectTo: '' }
];
