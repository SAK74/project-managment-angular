import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private snack: MatSnackBar) {}

  show(message: string) {
    this.snack.open(message, '╳', { duration: 4000 });
  }
}
