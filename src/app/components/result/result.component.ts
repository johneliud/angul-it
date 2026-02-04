import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChallengeResult } from '../../models';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="result-card">
        <div class="success-icon">✓</div>
        
        <h1>Challenge Complete!</h1>
        <p class="completion-message">You have successfully completed all verification challenges.</p>
        
        <div class="score-section">
          <div class="score-display">
            <span class="score-number">{{score}}</span>
            <span class="score-total"> / {{totalChallenges}}</span>
          </div>
          <p class="score-percentage">{{scorePercentage}}% Success Rate</p>
        </div>

        <div class="results-list">
          <h3>Challenge Results</h3>
          <div class="result-item" *ngFor="let result of challengeResults; let i = index">
            <div class="result-info">
              <span class="challenge-number">Challenge {{i + 1}}</span>
              <span class="challenge-description">{{getChallengeDescription(result.challengeId)}}</span>
            </div>
            <div class="result-status" [class.success]="result.isCorrect" [class.failure]="!result.isCorrect">
              {{result.isCorrect ? '' : ''}}
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="btn-secondary" (click)="goHome()">
            Back to Home
          </button>
          <button class="btn-primary" (click)="startNewChallenge()">
            Start New Challenge
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .result-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 48px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .success-icon {
      width: 64px;
      height: 64px;
      background: #10b981;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
      margin: 0 auto 24px auto;
    }

    h1 {
      color: var(--text);
      font-size: 2rem;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .completion-message {
      color: var(--text-light);
      font-size: 1rem;
      margin: 0 0 32px 0;
    }

    .score-section {
      margin-bottom: 32px;
      padding: 24px;
      background: var(--background);
      border-radius: 8px;
    }

    .score-display {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 8px;
    }

    .score-total {
      color: var(--text-light);
      font-size: 2rem;
    }

    .score-percentage {
      color: var(--text-light);
      font-size: 1.1rem;
      margin: 0;
    }

    .results-list {
      text-align: left;
      margin-bottom: 32px;
    }

    .results-list h3 {
      color: var(--text);
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 16px 0;
      text-align: center;
    }

    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .challenge-number {
      font-weight: 600;
      color: var(--text);
      font-size: 0.9rem;
    }

    .challenge-description {
      color: var(--text-light);
      font-size: 0.85rem;
    }

    .result-status {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
    }

    .result-status.success {
      background: #10b981;
      color: white;
    }

    .result-status.failure {
      background: #ef4444;
      color: white;
    }

    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .result-card {
        padding: 32px 24px;
      }
      
      .actions {
        flex-direction: column;
      }
      
      .score-display {
        font-size: 2.5rem;
      }
    }
  `]
})
export class ResultComponent implements OnInit {
  challengeResults: ChallengeResult[] = [];
  totalChallenges = 0;
  score = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedResults = sessionStorage.getItem('challengeResults');
    if (storedResults) {
      this.challengeResults = JSON.parse(storedResults);
      this.totalChallenges = this.challengeResults.length;
      this.score = this.challengeResults.filter(result => result.isCorrect).length;
    } else {
      console.error('No challenge results found');
    }
  }

  get scorePercentage() {
    return Math.round((this.score / this.totalChallenges) * 100);
  }

  getChallengeDescription(challengeId: string): string {
    const descriptions: { [key: string]: string } = {
      'traffic-lights-1': 'Select all images containing traffic lights',
      'cars-1': 'Select all images with cars',
      'buildings-1': 'Select all images with buildings',
      'challenge-1': 'Select all images containing traffic lights',
      'challenge-2': 'Select all images with cars', 
      'challenge-3': 'Select all images with buildings'
    };
    return descriptions[challengeId] || 'Image selection challenge';
  }

  goHome() {
    sessionStorage.removeItem('challengeResults');
    this.router.navigate(['/home']);
  }

  startNewChallenge() {
    sessionStorage.removeItem('challengeResults');
    this.router.navigate(['/captcha']);
  }
}
