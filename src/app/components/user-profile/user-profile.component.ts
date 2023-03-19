import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataRequest, UserType } from 'src/app/services/request.service';
import { StoreType } from 'src/app/store/model';
import { ConfirmComponent } from '../modal-dialogs/confirm-component';
import { SnackBarService } from '../../services/snack-bar.service';
import { logout } from 'src/app/store/actions';

@Component({
  selector: 'user-profile',
  template: `<h2>User profile</h2>
    <form-component type="edit"></form-component>
    <button mat-button color="warn" (click)="removeUser()">
      Remove user
    </button>`,
})
export class UserProfileComponent {
  user!: UserType;
  constructor(
    private store: Store<StoreType>,
    private dialog: MatDialog,
    private request: DataRequest,
    private router: Router,
    private snakBar: SnackBarService
  ) {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });
  }
  removeUser() {
    const dialog = this.dialog.open(ConfirmComponent, {
      data: 'remove this user permanently',
    });
    dialog.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.request.removeUser(this.user._id).subscribe((user) => {
          this.snakBar.show(`User ${user.name} has been removed`);
        });
        this.store.dispatch(logout());
        this.router.navigateByUrl('signup');
      }
    });
  }
}
