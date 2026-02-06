import { createAction, props } from '@ngrx/store';
import { Challenge, ChallengeResult } from '../models';

export const startChallenge = createAction(
  '[Captcha] Start Challenge',
  props<{ challenges: Challenge[]; sessionId: string }>()
);

export const submitAnswer = createAction(
  '[Captcha] Submit Answer',
  props<{ result: ChallengeResult }>()
);

export const nextChallenge = createAction(
  '[Captcha] Next Challenge'
);

export const previousChallenge = createAction(
  '[Captcha] Previous Challenge'
);

export const completeAllChallenges = createAction(
  '[Captcha] Complete All Challenges'
);

export const resetProgress = createAction(
  '[Captcha] Reset Progress'
);
