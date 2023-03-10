import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataRequest } from 'src/app/services/request.service';

@Component({
  selector: 'users-component',
  template: ` <p>{{ users$ | async | json }}</p> `,
  providers: [DataRequest],
})
export class UsersComponent implements OnInit {
  users$?: Observable<any>;
  constructor(private getData: DataRequest) {}
  ngOnInit(): void {
    this.users$ = this.getData.getUsers();
  }
}
