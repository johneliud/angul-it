import { Injectable } from '@angular/core';
import { UserSession, UserProgress } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  createSession(totalStages: number): UserSession {
    return {
      sessionId: this.generateSessionId(),
      startTime: new Date(),
      progress: {
        currentStage: 1,
        totalStages,
        completedChallenges: [],
        results: []
      },
      isCompleted: false
    };
  }

  updateProgress(session: UserSession, progress: Partial<UserProgress>): UserSession {
    return {
      ...session,
      progress: {
        ...session.progress,
        ...progress
      }
    };
  }

  completeSession(session: UserSession): UserSession {
    return {
      ...session,
      endTime: new Date(),
      isCompleted: true
    };
  }

  getSessionDuration(session: UserSession): number {
    if (!session.endTime) return 0;
    return session.endTime.getTime() - session.startTime.getTime();
  }

  getSessionDurationInSeconds(session: UserSession): number {
    return Math.floor(this.getSessionDuration(session) / 1000);
  }

  isSessionActive(session: UserSession): boolean {
    return !session.isCompleted && session.progress.currentStage <= session.progress.totalStages;
  }
}
