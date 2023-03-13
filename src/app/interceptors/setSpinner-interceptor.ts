import {
  // HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
// import { SpinnerComponent } from '../components';
import { SpinnerService } from '../services/spinner.service';

@Injectable({ providedIn: 'root' })
export class SetSpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log('spinner interceptor');
    this.spinner.start();
    console.log('spinner interceptor', req);
    return next.handle(req).pipe(
      tap({
        next: (ev) => {
          console.log('next: ', ev);
          this.spinner.stop();
        },
      }),
      finalize(() => {
        console.log('finalize');
        // this.spinner.stop();
      })
    );
  }
}
