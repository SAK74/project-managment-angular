import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/store/actions';
import { StoreType } from 'src/app/store/model';
import { SnackBarComponent } from '../snack-bars/snack-bar.component';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css'],
  providers: [SnackBarComponent],
})
export class TopPanelComponent {
  @Input() path = '';
  title = 'Project managment app';
  isLogged?: boolean;
  user$: Observable<string>;
  constructor(
    private store: Store<StoreType>,
    private snackBar: SnackBarComponent,
    private router: Router
  ) {
    store.select('token').subscribe(({ isLogged }) => {
      this.isLogged = isLogged;
    });
    this.user$ = store.select((state) => state.user.login);
  }
  logout() {
    this.store.dispatch(logout());
    this.snackBar.show('Logout!!!!!!');
    this.router.navigateByUrl('/');
  }
}
