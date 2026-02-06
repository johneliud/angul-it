import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CaptchaState } from './captcha.state';

export const selectCaptchaState = createFeatureSelector<CaptchaState>('captcha');

export const selectChallenges = createSelector(
  selectCaptchaState,
  (state) => state.challenges
);

export const selectCurrentStage = createSelector(
  selectCaptchaState,
  (state) => state.currentStage
);

export const selectCurrentChallenge = createSelector(
  selectCaptchaState,
  (state) => state.challenges[state.currentStage - 1]
);

export const selectResults = createSelector(
  selectCaptchaState,
  (state) => state.results
);

export const selectIsCompleted = createSelector(
  selectCaptchaState,
  (state) => state.isCompleted
);

export const selectSessionId = createSelector(
  selectCaptchaState,
  (state) => state.sessionId
);

export const selectTotalStages = createSelector(
  selectCaptchaState,
  (state) => state.challenges.length
);

export const selectProgressPercentage = createSelector(
  selectCurrentStage,
  selectTotalStages,
  (current, total) => total > 0 ? (current / total) * 100 : 0
);

export const selectIsLastStage = createSelector(
  selectCurrentStage,
  selectTotalStages,
  (current, total) => current === total
);
