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
    // console.log('add user interceptor: ', req.method, path);
    if (
      /tasks(?!Set)/.test(path) &&
      (req.method === 'POST' || req.method === 'PUT')
    ) {
      return this.store.select('user').pipe(
        first(),
        mergeMap(({ _id }) => {
          const copyReq = req.clone({ body: { ...req.body, userId: _id } });
          return next.handle(copyReq);
        }),
        finalize(() => console.log('finish of connect user'))
      );
    }
    if (req.method === 'POST' && path === '/boards') {
      return this.store.select('user').pipe(
        first(),
        mergeMap(({ login }) => {
          console.log('login: ', login);
          const copyReq = req.clone({ body: { ...req.body, owner: login } });
          return next.handle(copyReq);
        })
      );
    }
    return next.handle(req);
  }
}
