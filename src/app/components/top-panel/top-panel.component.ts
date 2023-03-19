import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar.service';
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
  constructor(
    private store: Store<StoreType>,
    private snackBar: SnackBarService,
    private router: Router
  ) {
    store.select('token').subscribe(({ isLogged }) => {
      this.isLogged = isLogged;
    });
    this.user$ = store.select((state) => state.user.login);
  }
  logout() {
    this.store.dispatch(logout());
    this.snackBar.show('You have been logged out');
    this.router.navigateByUrl('login');
  }

  editProfile() {
    this.router.navigateByUrl('profile');
  }
}
