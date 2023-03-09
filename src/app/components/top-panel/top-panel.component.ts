import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
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
  constructor(private store: Store<StoreType>) {
    // store.subscribe(console.log);
    store.select('token').subscribe(({ isLogged }) => {
      this.isLogged = isLogged;
    });
  }
  logout() {
    this.store.dispatch(logout());
  }
}
