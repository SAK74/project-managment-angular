import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataRequest } from 'src/app/services/request.service';
import { StoreType } from 'src/app/store/model';
import {
  UserForm,
  UserFormType,
} from '../form-component/form-component.component';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css'],
  providers: [DataRequest],
})
export class SignupComponent {
  constructor(
    private request: DataRequest,
    private store: Store<StoreType>,
    private route: Router
  ) {}
  onSubmit(user: Partial<UserFormType>) {
    const { login, name, password } = user;
    if (login && name && password) {
      this.request.signup({ login, name, password }).subscribe((user) => {
        console.log('registered as: ', user);
        this.route.navigateByUrl('login');
      });
    }
  }
}
