import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="container">
      <div class="card">
        <h1>CAPTCHA Challenge</h1>
        <p>Complete a series of verification challenges to proceed.</p>
        <button class="start-btn" (click)="startChallenge()">
          Start Challenge
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      padding: 20px;
    }

    .card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 48px;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    h1 {
      color: #1e293b;
      font-size: 2rem;
      font-weight: 600;
      margin: 0 0 16px 0;
    }

    p {
      color: #64748b;
      font-size: 1rem;
      line-height: 1.5;
      margin: 0 0 32px 0;
    }

    .start-btn {
      background: #1e293b;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px 32px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .start-btn:hover {
      background: #334155;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  startChallenge() {
    this.router.navigate(['/captcha']);
  }
}
