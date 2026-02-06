export enum ChallengeType {
  IMAGE_SELECTION = 'image_selection',
  MATH = 'math',
  COLOR_SELECTION = 'color_selection'
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  instruction: string;
  images?: string[];
  question?: string;
  options?: string[];
  colors?: string[];
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
