import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-component',
  template: `
    <h2 matDialogTitle>Are You sure</h2>
    <p>to {{ message }}</p>
    <mat-dialog-actions>
      <button mat-button>No, thank's</button>
      <button mat-button [mat-dialog-close]="true">Yes, please</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmComponent {
  constructor(
    public ref: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}
}
