export enum ChallengeType {
  IMAGE_SELECTION = 'image_selection',
  MATH = 'math',
  TEXT_INPUT = 'text_input'
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  instruction: string;
  images?: string[];
  question?: string;
  options?: string[];
  correctAnswers: number[] | string | number;
}

export interface ChallengeResult {
  challengeId: string;
  userAnswer: number[] | string | number;
  correctAnswer: number[] | string | number;
  isCorrect: boolean;
  timestamp: Date;
}

export interface UserProgress {
  currentStage: number;
  totalStages: number;
  completedChallenges: string[];
  results: ChallengeResult[];
}

export interface UserSession {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  progress: UserProgress;
  isCompleted: boolean;
}
