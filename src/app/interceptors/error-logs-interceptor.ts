import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class ErrorLogsInterceptor implements HttpInterceptor {
  constructor(private snacks: SnackBarService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('interceptor: ', req);
    return next.handle(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          // console.log('catched', err);
          if (err.status === 403) {
            this.router.navigateByUrl('/');
          }
          this.snacks.show(err.error.message);
        },
      })
    );
  }
}
