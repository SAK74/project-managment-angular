import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserForm } from '../components';

const SERVER = 'http://192.168.0.55:3000';
interface SignResponseType {
  name: string;
  login: string;
  id: string;
}

@Injectable()
export class DataRequest {
  constructor(private http: HttpClient) {}
  signup(user: UserForm) {
    return this.http
      .post<SignResponseType>(new URL('auth/signup', SERVER).toString(), user, {
        headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    console.log(err.error);
    return throwError(() => Error('Something is wrong...'));
  }
}
