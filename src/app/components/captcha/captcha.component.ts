import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Challenge, ChallengeType, ChallengeResult } from '../../models';
import { ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="captcha-card">
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="progressPercentage"></div>
        </div>
        
        <div class="challenge-header">
          <h2>Challenge {{currentStage}} of {{totalStages}}</h2>
          <p>{{currentChallenge.instruction}}</p>
        </div>

        <div class="challenge-content">
          <div class="image-grid" *ngIf="currentChallenge.type === ChallengeType.IMAGE_SELECTION">
            <div 
              *ngFor="let image of currentChallenge.images; let i = index"
              class="image-item"
              [class.selected]="selectedImages.includes(i)"
              (click)="toggleImageSelection(i)"
            >
              <img [src]="image" [alt]="'Image ' + (i + 1)">
              <div class="selection-overlay" *ngIf="selectedImages.includes(i)"></div>
            </div>
          </div>
        </div>

        <div class="navigation">
          <div class="validation-error" *ngIf="showValidationError">
            Please select at least one image to continue
          </div>
          
          <div class="nav-buttons">
            <button
              class="btn-secondary"
              [disabled]="currentStage === 1"
              (click)="previousChallenge()"
            >
              Previous
            </button>

            <button
              class="btn-primary"
              (click)="nextChallenge()"
            >
              {{ isLastStage ? 'Submit' : 'Next' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .captcha-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 32px;
      max-width: 600px;
      width: 100%;
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: var(--border);
      border-radius: 2px;
      margin-bottom: 24px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary);
      transition: width 0.3s ease;
    }

    .challenge-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .challenge-header h2 {
      color: var(--text);
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .challenge-header p {
      color: var(--text-light);
      font-size: 1rem;
      margin: 0;
    }

    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 32px;
    }

    .image-item {
      position: relative;
      aspect-ratio: 1;
      border: 2px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .image-item:hover {
      border-color: var(--primary);
    }

    .image-item.selected {
      border-color: var(--primary);
    }

    .image-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .selection-overlay {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 24px;
      height: 24px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
    }

    .navigation {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .validation-error {
      color: #ef4444;
      font-size: 0.9rem;
      text-align: center;
      padding: 8px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 4px;
    }

    .nav-buttons {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }

    .btn-secondary {
      background: transparent;
      color: var(--text-light);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--background);
      color: var(--text);
    }

    .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .captcha-card {
        padding: 24px;
      }
      
      .image-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .navigation {
        flex-direction: column;
      }

      .nav-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class CaptchaComponent implements OnInit {
  ChallengeType = ChallengeType;
  currentStage = 1;
  totalStages = 3;
  selectedImages: number[] = [];
  challenges: Challenge[] = [];
  results: ChallengeResult[] = [];
  showValidationError = false;

  constructor(
    private router: Router,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this.challenges = this.challengeService.getChallenges();
    this.totalStages = this.challenges.length;
  }

  get currentChallenge() {
    return this.challenges[this.currentStage - 1];
  }

  get progressPercentage() {
    return (this.currentStage / this.totalStages) * 100;
  }

  get isLastStage() {
    return this.currentStage === this.totalStages;
  }

  toggleImageSelection(index: number) {
    const selectedIndex = this.selectedImages.indexOf(index);
    if (selectedIndex > -1) {
      this.selectedImages.splice(selectedIndex, 1);
    } else {
      this.selectedImages.push(index);
    }
    this.showValidationError = false;
  }

  isCurrentChallengeValid() {
    return this.selectedImages.length > 0;
  }

  previousChallenge() {
    if (this.currentStage > 1) {
      this.currentStage--;
      this.selectedImages = [];
      this.showValidationError = false;
    }
  }

  nextChallenge() {
    if (!this.isCurrentChallengeValid()) {
      this.showValidationError = true;
      return;
    }

    const result = this.challengeService.createResult(
      this.currentChallenge,
      [...this.selectedImages]
    );
    this.results.push(result);

    if (this.isLastStage) {
      sessionStorage.setItem('challengeResults', JSON.stringify(this.results));
      this.router.navigate(['/results']);
    } else {
      this.currentStage++;
      this.selectedImages = [];
      this.showValidationError = false;
    }
  }
}
