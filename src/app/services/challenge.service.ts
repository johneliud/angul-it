import { Injectable } from '@angular/core';
import { Challenge, ChallengeType, ChallengeResult } from '../models';

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
        'https://picsum.photos/150/150?random=1',
        'https://picsum.photos/150/150?random=2', 
        'https://picsum.photos/150/150?random=3',
        'https://picsum.photos/150/150?random=4',
        'https://picsum.photos/150/150?random=5',
        'https://picsum.photos/150/150?random=6',
        'https://picsum.photos/150/150?random=7',
        'https://picsum.photos/150/150?random=8',
        'https://picsum.photos/150/150?random=9'
      ],
      correctAnswers: [1, 4, 7]
    },
    {
      id: 'cars-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images with cars',
      images: [
        'https://picsum.photos/150/150?random=10',
        'https://picsum.photos/150/150?random=11',
        'https://picsum.photos/150/150?random=12',
        'https://picsum.photos/150/150?random=13',
        'https://picsum.photos/150/150?random=14',
        'https://picsum.photos/150/150?random=15',
        'https://picsum.photos/150/150?random=16',
        'https://picsum.photos/150/150?random=17',
        'https://picsum.photos/150/150?random=18'
      ],
      correctAnswers: [0, 3, 8]
    },
    {
      id: 'buildings-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images with buildings',
      images: [
        'https://picsum.photos/150/150?random=19',
        'https://picsum.photos/150/150?random=20',
        'https://picsum.photos/150/150?random=21',
        'https://picsum.photos/150/150?random=22',
        'https://picsum.photos/150/150?random=23',
        'https://picsum.photos/150/150?random=24',
        'https://picsum.photos/150/150?random=25',
        'https://picsum.photos/150/150?random=26',
        'https://picsum.photos/150/150?random=27'
      ],
      correctAnswers: [2, 5, 6]
    }
  ];

  getChallenges(): Challenge[] {
    return [...this.imageSelectionChallenges];
  }

  validateAnswer(challenge: Challenge, userAnswer: number[]): boolean {
    if (challenge.type !== ChallengeType.IMAGE_SELECTION) {
      return false;
    }

    const correctAnswers = challenge.correctAnswers as number[];
    
    // Check if arrays have same length and same elements
    if (userAnswer.length !== correctAnswers.length) {
      return false;
    }

    const sortedUserAnswer = [...userAnswer].sort((a, b) => a - b);
    const sortedCorrectAnswers = [...correctAnswers].sort((a, b) => a - b);

    return sortedUserAnswer.every((answer, index) => answer === sortedCorrectAnswers[index]);
  }

  createResult(challenge: Challenge, userAnswer: number[]): ChallengeResult {
    return {
      challengeId: challenge.id,
      userAnswer,
      correctAnswer: challenge.correctAnswers,
      isCorrect: this.validateAnswer(challenge, userAnswer),
      timestamp: new Date()
    };
  }
}
