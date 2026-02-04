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
        'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // traffic light
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // building
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // car
        'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // traffic light
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // tree
        'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // road
        'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // traffic light
        'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // mountain
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'    // park
      ],
      correctAnswers: [0, 3, 6]
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
        'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'  // traffic light
      ],
      correctAnswers: [0, 3, 7]
    },
    {
      id: 'buildings-1',
      type: ChallengeType.IMAGE_SELECTION,
      instruction: 'Select all images with buildings',
      images: [
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // tree
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // car
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // building
        'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // mountain
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // park
        'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // building
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // building
        'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',   // road
        'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'  // traffic light
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
