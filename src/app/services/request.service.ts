import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BoardType, ColumnType, TaskType, UserFormType } from '../components';

export interface UserType {
  _id: string;
  name: string;
  login: string;
}

const SERVER = 'http://192.168.0.55:3000';
// const SERVER = 'https://rs-react-final-task-server.vercel.app/';

const AUTHURL = new URL('auth', SERVER).toString();
const USERURL = new URL('users', SERVER).toString();
const boardsURL = new URL('boards', SERVER).toString();
const tasksURL = new URL('tasksSet', SERVER).toString();

const headers = new HttpHeaders({ 'Content-type': 'application/json' });

interface SignResponseType {
  name: string;
  login: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class DataRequest {
  constructor(private http: HttpClient) {}

  signup(user: UserFormType) {
    return this.http
      .post<SignResponseType>(AUTHURL + '/signup', user, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }
  login(login: string, password: string) {
    return this.http
      .post<{ token: string }>(
        AUTHURL + '/signin',
        { login, password },
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  getUsers() {
    return this.http
      .get<UserType[]>(USERURL)
      .pipe(catchError(this.handleError));
  }

  removeUser(id: string) {
    return this.http.delete<UserType>(USERURL + `/${id}`);
  }

  getBoards() {
    return this.http
      .get<BoardType[]>(boardsURL)
      .pipe(catchError(this.handleError));
  }

  deleteBoard(id: string) {
    return this.http
      .delete(boardsURL + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateBoard(boardId: string, board: Omit<BoardType, '_id'>) {
    return this.http
      .put<BoardType>(boardsURL + `/${boardId}`, board, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  addBoard(title: string) {
    return this.http.post<BoardType>(boardsURL, { title, users: [] });
  }

  getColumns(id: string) {
    return this.http
      .get<ColumnType[]>(boardsURL + `/${id}/columns`)
      .pipe(catchError(this.handleError));
  }
  addColumn(boardId: string, title: string) {
    return this.http
      .post<ColumnType>(
        boardsURL + `/${boardId}/columns`,
        {
          title,
          order: 0,
        },
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http
      .delete(boardsURL + `/${boardId}/columns/${columnId}`)
      .pipe(catchError(this.handleError));
  }

  updateColumn(
    boardId: string,
    columnId: string,
    column: Pick<ColumnType, 'order' | 'title'>
  ) {
    return this.http
      .put<ColumnType>(boardsURL + `/${boardId}/columns/${columnId}`, column, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  setColumn(_id: string, order: number) {
    return this.http
      .patch<ColumnType[]>(
        new URL('columnsSet', SERVER).toString(),
        [{ _id, order }],
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  getTasks(boardId: string, columnId: string) {
    return this.http
      .get<TaskType[]>(boardsURL + `/${boardId}/columns/${columnId}/tasks`)
      .pipe(catchError(this.handleError));
  }

  addTask(
    boardId: string,
    columnId: string,
    task: Omit<TaskType, 'boardId' | 'columnId' | 'userId' | '_id'>
  ) {
    return this.http
      .post<TaskType>(
        boardsURL + `/${boardId}/columns/${columnId}/tasks`,
        {
          ...task,
          userId: '',
        },
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  setTask(_id: string, order: number, columnId: string) {
    return this.http
      .patch<TaskType[]>(tasksURL, [{ _id, order, columnId }], {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http
      .delete<TaskType>(
        boardsURL + `/${boardId}/columns/${columnId}/tasks/${taskId}`
      )
      .pipe(catchError(this.handleError));
  }
  getUserId() {}

  handleError(err: HttpErrorResponse) {
    // console.log(this);
    // this.snackBar.show('something error');
    return throwError(() => Error('Something is wrong...'));
  }
}
