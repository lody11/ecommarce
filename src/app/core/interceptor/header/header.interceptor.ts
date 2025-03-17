import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {
    if(localStorage.getItem('userToken')){
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('userToken')!,
          lang: localStorage.getItem('lang')!,
        },
      });
    }
  }

  return next(req);
};
