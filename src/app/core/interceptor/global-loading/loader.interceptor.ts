import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let Spinner =inject(NgxSpinnerService)

  Spinner.show();
  // show spinner
  return next(req).pipe(finalize(()=>{
    Spinner.hide();
  }));
  // hide spinner
};
