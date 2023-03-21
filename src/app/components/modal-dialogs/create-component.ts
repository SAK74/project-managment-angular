import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatedType } from './form.component';

@Component({
  selector: 'create-element',
  template: `
    <h3 matDialogTitle>Create a {{ type }}</h3>
    <mat-dialog-content>
      <form-create-component
        [type]="type"
        (onSubmit)="onSubmit($event)"
      ></form-create-component>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="null">Cancel</button>
    </mat-dialog-actions>
  `,
})
export class CreateBoardComponent {
  constructor(
    public ref: MatDialogRef<CreateBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public type: CreatedType
  ) {}
  onSubmit(form: Partial<{ title: string; description: string }>) {
    console.log('modal: ', form);
    this.ref.close(form);
  }
  onCancel() {
    this.ref.close(null);
  }
}
