import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Challenge, ChallengeType, ChallengeResult } from '../../models';
import { ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

          <div class="math-challenge" *ngIf="currentChallenge.type === ChallengeType.MATH">
            <h3>{{currentChallenge.question}}</h3>
            <input 
              type="number" 
              [(ngModel)]="mathAnswer" 
              placeholder="Enter your answer"
              class="math-input"
            >
          </div>

          <div class="text-challenge" *ngIf="currentChallenge.type === ChallengeType.TEXT_INPUT">
            <img [src]="currentChallenge.images![0]" alt="Text to type" class="text-image">
            <input 
              type="text" 
              [(ngModel)]="textAnswer" 
              placeholder="Type the word shown above"
              class="text-input"
            >
          </div>
        </div>

        <div class="navigation">
          <div class="validation-error" *ngIf="showValidationError">
            <span *ngIf="currentChallenge.type === ChallengeType.IMAGE_SELECTION">Please select at least one image to continue</span>
            <span *ngIf="currentChallenge.type === ChallengeType.MATH">Please enter an answer to continue</span>
            <span *ngIf="currentChallenge.type === ChallengeType.TEXT_INPUT">Please type the word to continue</span>
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

    .math-challenge {
      text-align: center;
      margin-bottom: 32px;
    }

    .math-challenge h3 {
      color: var(--text);
      font-size: 1.5rem;
      margin-bottom: 16px;
    }

    .math-input {
      width: 200px;
      padding: 12px;
      border: 2px solid var(--border);
      border-radius: 6px;
      font-size: 1.1rem;
      text-align: center;
    }

    .math-input:focus {
      outline: none;
      border-color: var(--primary);
    }

    .text-challenge {
      text-align: center;
      margin-bottom: 32px;
    }

    .text-image {
      display: block;
      margin: 0 auto 16px auto;
      border-radius: 6px;
    }

    .text-input {
      width: 250px;
      padding: 12px;
      border: 2px solid var(--border);
      border-radius: 6px;
      font-size: 1.1rem;
      text-align: center;
    }

    .text-input:focus {
      outline: none;
      border-color: var(--primary);
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
  totalStages = 4;
  selectedImages: number[] = [];
  mathAnswer: number | null = null;
  textAnswer: string = '';
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
    if (this.currentChallenge.type === ChallengeType.IMAGE_SELECTION) {
      return this.selectedImages.length > 0;
    }
    if (this.currentChallenge.type === ChallengeType.MATH) {
      return this.mathAnswer !== null && this.mathAnswer !== undefined;
    }
    if (this.currentChallenge.type === ChallengeType.TEXT_INPUT) {
      return this.textAnswer.trim().length > 0;
    }
    return false;
  }

  getCurrentAnswer(): number[] | string | number {
    if (this.currentChallenge.type === ChallengeType.IMAGE_SELECTION) {
      return [...this.selectedImages];
    }
    if (this.currentChallenge.type === ChallengeType.MATH) {
      return this.mathAnswer!;
    }
    if (this.currentChallenge.type === ChallengeType.TEXT_INPUT) {
      return this.textAnswer.trim();
    }
    return [];
  }

  resetCurrentAnswer() {
    this.selectedImages = [];
    this.mathAnswer = null;
    this.textAnswer = '';
  }

  previousChallenge() {
    if (this.currentStage > 1) {
      this.currentStage--;
      this.resetCurrentAnswer();
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
      this.getCurrentAnswer()
    );
    this.results.push(result);

    if (this.isLastStage) {
      sessionStorage.setItem('challengeResults', JSON.stringify(this.results));
      this.router.navigate(['/results']);
    } else {
      this.currentStage++;
      this.resetCurrentAnswer();
      this.showValidationError = false;
    }
  }
}
