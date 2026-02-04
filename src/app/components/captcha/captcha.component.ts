import { Component } from '@angular/core';

@Component({
  selector: 'app-captcha',
  standalone: true,
  template: `
    <div class="container">
      <div class="card">
        <h2>Challenge Coming Soon</h2>
        <p>CAPTCHA component will be implemented in the next issue.</p>
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

    h2 {
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 16px 0;
    }

    p {
      color: #64748b;
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }
  `]
})
export class CaptchaComponent {}
