import { Injectable } from '@angular/core';
import { Challenge, ChallengeType, ChallengeResult } from '../models';
import { FormValidationService } from './form-validation.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  
  private imageSelectionChallenges: Challenge[] = [
    {
      id: 'traffic-lights-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images containing traffic lights',
      images: [
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // building
        'https://images.pexels.com/photos/34597052/pexels-photo-34597052.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // traffic light
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // car
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // tree
        'https://images.pexels.com/photos/35380639/pexels-photo-35380639.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // traffic light
        'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // road
        'https://images.pexels.com/photos/147430/pexels-photo-147430.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // traffic light
        'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // mountain
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'    // park
      ],
      correctAnswers: [1, 4, 6]
    },
    {
      id: 'cars-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images with cars',
      images: [
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // car
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // building
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // tree
        'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // car
        'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // mountain
        'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // road
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // park
        'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // car
        'https://images.pexels.com/photos/34597052/pexels-photo-34597052.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'  // traffic light
      ],
      correctAnswers: [0, 3, 7]
    },
    {
      id: 'buildings-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images with buildings',
      images: [
        'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // tree
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // car
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // building
        'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // mountain
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // park
        'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // building
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // building
        'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // road
        'https://images.pexels.com/photos/34597052/pexels-photo-34597052.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'  // traffic light
      ],
      correctAnswers: [2, 5, 6]
    }
  ];

  private mathChallenges: Challenge[] = [];

  constructor(private formValidationService: FormValidationService) {
    this.mathChallenges = this.generateMathChallenges(3);
  }

  private generateMathChallenges(count: number): Challenge[] {
    const challenges: Challenge[] = [];
    const operators = ['+', '-', '×'];
    
    for (let i = 0; i < count; i++) {
      const num1 = Math.floor(Math.random() * 100) + 1;
      const num2 = Math.floor(Math.random() * 100) + 1;
      const operator = operators[Math.floor(Math.random() * operators.length)];
      
      let answer: number;
      let question: string;
      
      switch (operator) {
        case '+':
          answer = num1 + num2;
          question = `What is ${num1} + ${num2}?`;
          break;
        case '-':
          answer = num1 - num2;
          question = `What is ${num1} - ${num2}?`;
          break;
        case '×':
          answer = num1 * num2;
          question = `What is ${num1} × ${num2}?`;
          break;
        default:
          answer = num1 + num2;
          question = `What is ${num1} + ${num2}?`;
      }
      
      challenges.push({
        id: `math-${i + 1}`,
        type: ChallengeType.MATH,
        instruction: 'Solve the math problem',
        question,
        correctAnswers: answer
      });
    }
    
    return challenges;
  }

  private textChallenges: Challenge[] = [
    {
      id: 'text-1',
      type: ChallengeType.TEXT_INPUT,
      instruction: 'Type the word shown below',
      images: ['https://via.placeholder.com/200x80/333333/ffffff?text=VERIFY'],
      correctAnswers: 'VERIFY'
    },
    {
      id: 'text-2',
      type: ChallengeType.TEXT_INPUT,
      instruction: 'Type the word shown below',
      images: ['https://via.placeholder.com/200x80/333333/ffffff?text=SECURE'],
      correctAnswers: 'SECURE'
    }
  ];

  getChallenges(): Challenge[] {
    const allChallenges = [
      ...this.imageSelectionChallenges,
      ...this.mathChallenges,
      ...this.textChallenges
    ];
    
    // Shuffle and return 4 random challenges
    return this.shuffleArray(allChallenges).slice(0, 4);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  validateAnswer(challenge: Challenge, userAnswer: number[] | string | number): boolean {
    if (challenge.type === ChallengeType.IMAGE_SELECTION) {
      return this.formValidationService.validateImageSelection(
        userAnswer as number[],
        challenge.correctAnswers as number[]
      );
    }
    
    if (challenge.type === ChallengeType.MATH) {
      return this.formValidationService.validateMathAnswer(
        userAnswer as number,
        challenge.correctAnswers as number
      );
    }
    
    if (challenge.type === ChallengeType.TEXT_INPUT) {
      return this.formValidationService.validateTextInput(
        userAnswer as string,
        challenge.correctAnswers as string
      );
    }
    
    return false;
  }

  createResult(challenge: Challenge, userAnswer: number[] | string | number): ChallengeResult {
    return {
      challengeId: challenge.id,
      userAnswer,
      correctAnswer: challenge.correctAnswers,
      isCorrect: this.validateAnswer(challenge, userAnswer),
      timestamp: new Date()
    };
  }
}
