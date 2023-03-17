import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class ErrorLogsInterceptor implements HttpInterceptor {
  constructor(private snacks: SnackBarService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('interceptor: ', req);
    return next.handle(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          console.log('catched', err);
          this.snacks.show(err.error.message);
        },
      })
    );
  }
}
