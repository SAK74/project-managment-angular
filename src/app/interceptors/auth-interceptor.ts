import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, mergeMap, first, tap } from 'rxjs';
import { StoreType } from '../store/model';

@Injectable()
export class Authorization implements HttpInterceptor {
  constructor(private store: Store<StoreType>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const path = new URL(req.url).pathname;
    if (!path.startsWith('/auth')) {
      return this.store.select('token').pipe(
        first(),
        // tap(console.log),
        mergeMap(({ token, isLogged }) => {
          const copyReq: HttpRequest<any> = isLogged
            ? req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
              })
            : req;
          return next.handle(copyReq);
        })
      );
    }
    return next.handle(req);
  }
}
