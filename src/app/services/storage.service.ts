import { Injectable } from '@angular/core';
import { ChallengeResult, UserProgress, UserSession } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEYS = {
    RESULTS: 'angul-it-results',
    SESSION: 'angul-it-session',
    PROGRESS: 'angul-it-progress'
  };

  saveResults(results: ChallengeResult[]): void {
    this.setItem(this.STORAGE_KEYS.RESULTS, results);
  }

  getResults(): ChallengeResult[] | null {
    return this.getItem<ChallengeResult[]>(this.STORAGE_KEYS.RESULTS);
  }

  saveSession(session: UserSession): void {
    this.setItem(this.STORAGE_KEYS.SESSION, session);
  }

  getSession(): UserSession | null {
    const session = this.getItem<UserSession>(this.STORAGE_KEYS.SESSION);
    if (session) {
      // Convert date strings back to Date objects
      session.startTime = new Date(session.startTime);
      if (session.endTime) {
        session.endTime = new Date(session.endTime);
      }
    }
    return session;
  }

  saveProgress(progress: UserProgress): void {
    this.setItem(this.STORAGE_KEYS.PROGRESS, progress);
  }

  getProgress(): UserProgress | null {
    return this.getItem<UserProgress>(this.STORAGE_KEYS.PROGRESS);
  }

  clearAll(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      sessionStorage.removeItem(key);
    });
  }

  clearResults(): void {
    sessionStorage.removeItem(this.STORAGE_KEYS.RESULTS);
  }

  clearSession(): void {
    sessionStorage.removeItem(this.STORAGE_KEYS.SESSION);
  }

  private setItem<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  private getItem<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }
}
