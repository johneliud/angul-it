import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'captcha', loadComponent: () => import('./components/captcha/captcha.component').then(m => m.CaptchaComponent) },
  { path: 'results', loadComponent: () => import('./components/result/result.component').then(m => m.ResultComponent) },
  { path: '**', redirectTo: '/home' }
];
