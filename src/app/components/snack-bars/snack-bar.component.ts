import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-message',
  template: ``,
  standalone: true,
})
export class SnackBarComponent {
  constructor(private snackBar: MatSnackBar) {}
  show(message: string) {
    this.snackBar.open(message, 'X', { duration: 3000 });
  }
  // showError(message: string) {
  //   this.snackBar.open(message, '╳');
  // }
}
