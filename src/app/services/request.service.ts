import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BoardType, ColumnType, UserForm, TaskType } from '../components';

const SERVER = 'http://192.168.0.55:3000';

const AUTHURL = new URL('auth', SERVER).toString();
const boardsURL = new URL('boards', SERVER).toString();
const tasksURL = new URL('tasksSet', SERVER).toString();

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

  getBoards() {
    return this.http
      .get<BoardType[]>(boardsURL)
      .pipe(catchError(this.handleError));
  }

  deleteBoard(id: string) {
    return this.http.delete(boardsURL + `/${id}`);
  }

  updateBoard(boardId: string, board: Omit<BoardType, '_id'>) {
    return this.http.put<BoardType>(boardsURL + `/${boardId}`, board, {
      headers,
    });
  }

  getColumns(id: string) {
    return this.http.get<ColumnType[]>(boardsURL + `/${id}/columns`);
  }
  addColumn(boardId: string, title: string) {
    return this.http.post<ColumnType>(
      boardsURL + `/${boardId}/columns`,
      {
        title,
        order: 0,
      },
      { headers }
    );
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(boardsURL + `/${boardId}/columns/${columnId}`);
  }

  updateColumn(
    boardId: string,
    columnId: string,
    column: Pick<ColumnType, 'order' | 'title'>
  ) {
    return this.http.put<ColumnType>(
      boardsURL + `/${boardId}/columns/${columnId}`,
      column,
      { headers }
    );
  }

  setColumn(_id: string, order: number) {
    return this.http.patch<ColumnType[]>(
      new URL('columnsSet', SERVER).toString(),
      [{ _id, order }],
      { headers }
    );
  }

  getTasks(boardId: string, columnId: string) {
    return this.http.get<TaskType[]>(
      boardsURL + `/${boardId}/columns/${columnId}/tasks`
    );
  }

  addTask(
    boardId: string,
    columnId: string,
    task: Omit<TaskType, 'boardId' | 'columnId' | 'userId' | '_id'>
  ) {
    return this.http.post<TaskType>(
      boardsURL + `/${boardId}/columns/${columnId}/tasks`,
      {
        ...task,
        userId: '',
      },
      { headers }
    );
  }

  setTask(_id: string, order: number, columnId: string) {
    return this.http.patch<TaskType[]>(tasksURL, [{ _id, order, columnId }], {
      headers,
    });
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<TaskType>(
      boardsURL + `/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }
  getUserId() {}

  handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(() => Error('Something is wrong...'));
  }
}
