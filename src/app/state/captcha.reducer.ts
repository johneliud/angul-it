import { createReducer, on } from '@ngrx/store';
import { CaptchaState } from './captcha.state';
import * as CaptchaActions from './captcha.actions';

export const initialState: CaptchaState = {
  challenges: [],
  currentStage: 1,
  results: [],
  isCompleted: false,
  sessionId: ''
};

export const captchaReducer = createReducer(
  initialState,
  
  on(CaptchaActions.startChallenge, (state, { challenges, sessionId }) => ({
    ...state,
    challenges,
    sessionId,
    currentStage: 1,
    results: [],
    isCompleted: false
  })),
  
  on(CaptchaActions.submitAnswer, (state, { result }) => ({
    ...state,
    results: [...state.results, result]
  })),
  
  on(CaptchaActions.nextChallenge, (state) => ({
    ...state,
    currentStage: state.currentStage < state.challenges.length 
      ? state.currentStage + 1 
      : state.currentStage
  })),
  
  on(CaptchaActions.previousChallenge, (state) => ({
    ...state,
    currentStage: state.currentStage > 1 
      ? state.currentStage - 1 
      : state.currentStage
  })),
  
  on(CaptchaActions.completeAllChallenges, (state) => ({
    ...state,
    isCompleted: true
  })),
  
  on(CaptchaActions.resetProgress, () => initialState)
);
