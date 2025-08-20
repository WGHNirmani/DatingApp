import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ToastService } from '../services/toast-service';



export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const moduleStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  moduleStateErrors.push(error.error.errors[key]);
                }
              }
              throw moduleStateErrors.flat();
            } else {
              toast.error(error.error);
            }
            break;
          case 401:
            toast.error('Unauthorized');
            break;
          case 404:
            router.navigateByUrl('/not-found')
            break;
          case 500:
            const navigationExtra: NavigationExtras = {state: {error:error.error}}
            router.navigateByUrl('/server-error', navigationExtra)
            break;
          default:
            toast.error('Something went wrong');
            break;
        }
      }

      return throwError(() => error);
    })
  );
};
