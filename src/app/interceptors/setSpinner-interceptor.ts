import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../components/spinner/spinner.service';

@Injectable({ providedIn: 'root' })
export class SetSpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinner.start();
    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.stop();
      })
    );
  }
}
