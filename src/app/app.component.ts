// import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreType } from './store/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading = false;
  routePath = '';
  constructor(private router: Router, private store: Store<StoreType>) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.loading = true;
      } else if (ev instanceof NavigationEnd) {
        this.loading = false;
        this.routePath = ev.url;
      }
    });
    this.store
      .select((state) => state.token)
      .subscribe(({ token, isLogged }) => {
        this.token = token;
        this.isLogged = isLogged;
      });
  }
  token?: string;
  isLogged?: boolean;
}
