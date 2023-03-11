import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/store/actions';
import { StoreType } from 'src/app/store/model';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css'],
})
export class TopPanelComponent {
  @Input() path = '';
  title = 'Project managment app';
  isLogged?: boolean;
  user$: Observable<string>;
  constructor(private store: Store<StoreType>) {
    store.select('token').subscribe(({ isLogged }) => {
      this.isLogged = isLogged;
    });
    this.user$ = store.select('user');
  }
  logout() {
    this.store.dispatch(logout());
  }
}
