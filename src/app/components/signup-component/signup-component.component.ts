import { Component } from '@angular/core';
import { DataRequest } from 'src/app/services/request.service';
import { UserForm } from '../form-component/form-component.component';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css'],
  providers: [DataRequest],
})
export class SignupComponent {
  constructor(private request: DataRequest) {}
  onSubmit(user: UserForm) {
    this.request
      .signup(user)
      .subscribe((user) => console.log('registered as: ', user));
  }
}
