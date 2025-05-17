import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data?.['requiredRoles'] as string[] || [];

  if (authService.jePrijavljen() && authService.imaUlogu(requiredRoles)) {
    return true;
  }
  
  router.navigate(['/prijava']);
  return false;
};
