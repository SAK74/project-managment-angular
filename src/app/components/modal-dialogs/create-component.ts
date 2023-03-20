import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatedType } from './form.component';

@Component({
  selector: 'create-element',
  template: `
    <form-create-component
      [type]="type"
      (onSubmit)="onSubmit($event)"
    ></form-create-component>
    <button mat-button [mat-dialog-close]="null">Cancel</button>
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
