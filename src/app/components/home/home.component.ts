import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="page-container">
      <div class="card">
        <h1>CAPTCHA Challenge</h1>
        <p>Complete a series of verification challenges to proceed.</p>
        <button class="btn-primary" (click)="startChallenge()">
          Start Challenge
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private router: Router) {}

  startChallenge() {
    this.router.navigate(['/captcha']);
  }
}
