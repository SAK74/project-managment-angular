import { Component } from '@angular/core';
import { DataRequest } from 'src/app/services/request.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private request: DataRequest) {}
}
