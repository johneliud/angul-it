import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const challengeCompletionGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const results = storageService.getResults();
  
  if (results && results.length > 0) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
