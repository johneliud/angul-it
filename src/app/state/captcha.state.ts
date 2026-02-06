import { Challenge, ChallengeResult } from '../models';

export interface CaptchaState {
  challenges: Challenge[];
  currentStage: number;
  results: ChallengeResult[];
  isCompleted: boolean;
  sessionId: string;
}
