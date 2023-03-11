import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BoardType, UserForm } from '../components';

const SERVER = 'http://192.168.0.55:3000';
const AUTHURL = new URL('auth', SERVER).toString();
const boardsURL = new URL('boards', SERVER).toString();
const headers = new HttpHeaders({ 'Content-type': 'application/json' });

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
      .post<SignResponseType>(AUTHURL + '/signup', user, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }
  login(user: UserForm) {
    return this.http
      .post<{ token: string }>(AUTHURL + '/signin', user, { headers })
      .pipe(catchError(this.handleError));
  }

  getUsers() {
    const USERURL = new URL('users', SERVER).toString();
    return this.http.get(USERURL).pipe(catchError(this.handleError));
  }

  getBoards<T>(id?: string) {
    return this.http
      .get<T>(id ? boardsURL + `/${id}` : boardsURL)
      .pipe(catchError(this.handleError));
  }

  deleteBoard(id: string) {
    return this.http.delete(boardsURL + `/${id}`);
  }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(() => Error('Something is wrong...'));
  }
}
