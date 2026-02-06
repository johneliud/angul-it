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
        { id: 'building-1', url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'traffic-1', url: 'https://images.pexels.com/photos/34597052/pexels-photo-34597052.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'car-1', url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'tree-1', url: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'traffic-2', url: 'https://images.pexels.com/photos/35380639/pexels-photo-35380639.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'road-1', url: 'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'traffic-3', url: 'https://images.pexels.com/photos/147430/pexels-photo-147430.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'mountain-1', url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'park-1', url: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
      ],
      correctAnswers: ['traffic-1', 'traffic-2', 'traffic-3']
    },
    {
      id: 'cars-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images with cars',
      images: [
        { id: 'car-1', url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'building-1', url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'tree-1', url: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'car-2', url: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'mountain-1', url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'road-1', url: 'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'park-1', url: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'car-3', url: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'traffic-1', url: 'https://images.pexels.com/photos/34597052/pexels-photo-34597052.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
      ],
      correctAnswers: ['car-1', 'car-2', 'car-3']
    },
    {
      id: 'buildings-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images with buildings',
      images: [
        { id: 'tree-1', url: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'car-1', url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'building-1', url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'mountain-1', url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'park-1', url: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'building-2', url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'building-3', url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'road-1', url: 'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: 'traffic-1', url: 'https://images.pexels.com/photos/34597052/pexels-photo-34597052.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
      ],
      correctAnswers: ['building-1', 'building-2', 'building-3']
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
      id: 'color-1',
      type: ChallengeType.COLOR_SELECTION,
      instruction: 'Select all RED boxes',
      colors: [
        { id: 'red-1', value: '#ef4444' },
        { id: 'blue-1', value: '#3b82f6' },
        { id: 'red-2', value: '#ef4444' },
        { id: 'green-1', value: '#10b981' },
        { id: 'red-3', value: '#ef4444' },
        { id: 'orange-1', value: '#f59e0b' },
        { id: 'purple-1', value: '#8b5cf6' },
        { id: 'pink-1', value: '#ec4899' },
        { id: 'indigo-1', value: '#6366f1' }
      ],
      correctAnswers: ['red-1', 'red-2', 'red-3']
    },
    {
      id: 'color-2',
      type: ChallengeType.COLOR_SELECTION,
      instruction: 'Select all BLUE boxes',
      colors: [
        { id: 'green-1', value: '#10b981' },
        { id: 'blue-1', value: '#3b82f6' },
        { id: 'red-1', value: '#ef4444' },
        { id: 'blue-2', value: '#3b82f6' },
        { id: 'orange-1', value: '#f59e0b' },
        { id: 'purple-1', value: '#8b5cf6' },
        { id: 'blue-3', value: '#3b82f6' },
        { id: 'pink-1', value: '#ec4899' },
        { id: 'indigo-1', value: '#6366f1' }
      ],
      correctAnswers: ['blue-1', 'blue-2', 'blue-3']
    },
    {
      id: 'color-3',
      type: ChallengeType.COLOR_SELECTION,
      instruction: 'Select all GREEN boxes',
      colors: [
        { id: 'green-1', value: '#10b981' },
        { id: 'blue-1', value: '#3b82f6' },
        { id: 'red-1', value: '#ef4444' },
        { id: 'green-2', value: '#10b981' },
        { id: 'orange-1', value: '#f59e0b' },
        { id: 'purple-1', value: '#8b5cf6' },
        { id: 'pink-1', value: '#ec4899' },
        { id: 'green-3', value: '#10b981' },
        { id: 'indigo-1', value: '#6366f1' }
      ],
      correctAnswers: ['green-1', 'green-2', 'green-3']
    }
  ];

  getChallenges(): Challenge[] {
    const shuffledImageChallenges = this.imageSelectionChallenges.map(challenge => ({
      ...challenge,
      images: this.shuffleArray([...challenge.images!])
    }));
    
    const shuffledColorChallenges = this.textChallenges.map(challenge => ({
      ...challenge,
      colors: this.shuffleArray([...challenge.colors!])
    }));
    
    const allChallenges = [
      ...shuffledImageChallenges,
      ...this.mathChallenges,
      ...shuffledColorChallenges
    ];
    
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

  validateAnswer(challenge: Challenge, userAnswer: number[] | string | number | string[]): boolean {
    if (challenge.type === ChallengeType.IMAGE_SELECTION) {
      const correctIds = challenge.correctAnswers as string[];
      const userIds = userAnswer as string[];
      
      if (userIds.length !== correctIds.length) return false;
      
      const sortedUserIds = [...userIds].sort();
      const sortedCorrectIds = [...correctIds].sort();
      
      return sortedUserIds.every((id, index) => id === sortedCorrectIds[index]);
    }
    
    if (challenge.type === ChallengeType.MATH) {
      return this.formValidationService.validateMathAnswer(
        userAnswer as number,
        challenge.correctAnswers as number
      );
    }
    
    if (challenge.type === ChallengeType.COLOR_SELECTION) {
      const correctIds = challenge.correctAnswers as string[];
      const userIds = userAnswer as string[];
      
      if (userIds.length !== correctIds.length) return false;
      
      const sortedUserIds = [...userIds].sort();
      const sortedCorrectIds = [...correctIds].sort();
      
      return sortedUserIds.every((id, index) => id === sortedCorrectIds[index]);
    }
    
    return false;
  }

  createResult(challenge: Challenge, userAnswer: number[] | string | number | string[]): ChallengeResult {
    return {
      challengeId: challenge.id,
      userAnswer,
      correctAnswer: challenge.correctAnswers,
      isCorrect: this.validateAnswer(challenge, userAnswer),
      timestamp: new Date()
    };
  }
}
