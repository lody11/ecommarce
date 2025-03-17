import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  let _Auth: AuthService = inject(AuthService);
  let router: Router = inject(Router);
  if (_Auth.userData() === null) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
