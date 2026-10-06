import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'];

  const currentRole = authService.getCurrentRole();

  if (currentRole === requiredRole) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};