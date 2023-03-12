import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataRequest } from 'src/app/services/request.service';
import { setToken } from 'src/app/store/actions';
import { StoreType } from 'src/app/store/model';
import { UserForm } from '../form-component/form-component.component';

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
  onSubmit(user: UserForm) {
    this.request.login(user).subscribe(({ token }) => {
      this.store.dispatch(setToken({ token }));

      // get user id

      window.sessionStorage.setItem('token', token); //
      // set user params
      window.sessionStorage.setItem(
        'user',
        JSON.stringify({ login: user.login })
      ); // temporary
      window.sessionStorage.setItem('logged', 'true'); //

      this.route.navigateByUrl('boards');
    });
  }
}
