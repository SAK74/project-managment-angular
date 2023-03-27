import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { DataRequest } from 'src/app/services/request.service';
import { setToken, setUser } from 'src/app/store/actions';
import { StoreType } from 'src/app/store/model';
import { UserFormType } from '../form-component/form-component.component';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  providers: [DataRequest],
})
export class LoginComponent {
  constructor(
    private request: DataRequest,
    private store: Store<StoreType>,
    private route: Router
  ) {}
  onSubmit(user: Partial<UserFormType>) {
    if (user.login && user.password) {
      this.request.login(user.login, user.password).subscribe(({ token }) => {
        this.store.dispatch(setToken({ token }));

        // get user id & username
        this.getUserParams(user.login!).subscribe((user) => {
          if (user) {
            this.store.dispatch(setUser({ user }));
          }
        });

        this.route.navigateByUrl('boards');
      });
    } else {
      throw Error('Unknown error...');
    }
  }

  getUserParams(login: string) {
    return this.request
      .getUsers()
      .pipe(map((users) => users.find((user) => user.login === login)));
  }
}
