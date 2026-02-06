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
  colors?: { id: string; value: string }[];
  correctAnswers: number[] | string | number | string[];
}

export interface ChallengeResult {
  challengeId: string;
  userAnswer: number[] | string | number | string[];
  correctAnswer: number[] | string | number | string[];
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
