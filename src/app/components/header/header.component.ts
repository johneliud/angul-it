import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="logo" (click)="goHome()">AngulIt</div>
      <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <span *ngIf="!isDark">🌙</span>
        <span *ngIf="isDark">☀️</span>
      </button>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: var(--card);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--spacing-xl);
      z-index: 1000;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    .logo:hover {
      opacity: 0.8;
    }

    .theme-toggle {
      background: transparent;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.2s ease;
    }

    .theme-toggle:hover {
      background: var(--background);
      border-color: var(--primary);
    }
  `]
})
export class HeaderComponent {
  isDark = false;

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }
}
