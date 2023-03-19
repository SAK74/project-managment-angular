import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, mergeMap, first, finalize } from 'rxjs';
import { StoreType } from '../store/model';

@Injectable()
export class UserConnectInterceptor implements HttpInterceptor {
  constructor(private store: Store<StoreType>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const path = new URL(req.url).pathname;
    if (/tasks(?!Set)/.test(path)) {
      // console.log('add user interceptor');
      return this.store.select('user').pipe(
        first(),
        mergeMap(({ _id }) => {
          const copyReq = req.clone({ body: { ...req.body, userId: _id } });
          return next.handle(copyReq);
        }),
        finalize(() => console.log('finish of connect user'))
      );
    }
    return next.handle(req);
  }
}
