import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _Auth: AuthService = inject(AuthService);
  let router:Router = inject(Router);
  if (_Auth.userData() !== null) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
