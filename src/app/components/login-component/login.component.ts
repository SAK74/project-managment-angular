import { Component } from '@angular/core';
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
  constructor(private request: DataRequest, private store: Store<StoreType>) {}
  onSubmit(user: UserForm) {
    this.request.login(user).subscribe(({ token }) => {
      console.log('token: ', token);
      this.store.dispatch(setToken({ token }));
    });
  }
}
