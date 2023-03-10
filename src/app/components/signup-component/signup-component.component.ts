import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataRequest } from 'src/app/services/request.service';
import { setUser } from 'src/app/store/actions';
import { StoreType } from 'src/app/store/model';
import { UserForm } from '../form-component/form-component.component';

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
  onSubmit(user: UserForm) {
    this.request.signup(user).subscribe((user) => {
      console.log('registered as: ', user);
      this.store.dispatch(setUser({ user: user.login }));
      this.route.navigateByUrl('login');
    });
  }
}
