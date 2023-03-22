import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreateTaskType } from '../tasks-list/model';
import { ConfirmComponent } from './confirm-component';
import { DialogDataType } from './model';

@Component({
  selector: 'create-element',
  template: `
    <h3 matDialogTitle>
      {{ data.type === 'edit' ? 'Edit the ' : 'Create a ' }} {{ data.type }}
    </h3>
    <mat-dialog-content>
      <form-create-component
        [type]="data.type"
        [taskData]="data.taskData"
        (onSubmit)="onSubmit($event)"
      ></form-create-component>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="null">Cancel</button>
      <button
        mat-button
        color="warn"
        *ngIf="data.type === 'edit'"
        (click)="onDelete()"
      >
        Delete the task
      </button>
    </mat-dialog-actions>
  `,
})
export class CreateBoardComponent {
  constructor(
    public ref: MatDialogRef<CreateBoardComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogDataType,
    private dialog: MatDialog
  ) {}
  onSubmit(form: Partial<CreateTaskType>) {
    console.log('modal: ', form);
    this.ref.close(form);
  }
  onCancel() {
    this.ref.close(null);
  }
  onDelete() {
    const confirmDialog = this.dialog.open(ConfirmComponent, {
      data: 'delete this task',
    });
    confirmDialog.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.ref.close('delete');
      }
    });
  }
}
