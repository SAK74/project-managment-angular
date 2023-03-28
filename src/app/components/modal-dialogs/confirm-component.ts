import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslatService } from 'src/app/services/translate.service';

@Component({
  selector: 'confirm-component',
  template: `
    <h2 matDialogTitle>{{ translate('Are You sure') }}</h2>
    <p matDialogContent>{{ translate('to') }} {{ message }}?..</p>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">
        {{ translate("No, thank's") }}
      </button>
      <button mat-button color="warn" [mat-dialog-close]="true">
        {{ translate('Yes, please') }}
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmComponent {
  constructor(
    public ref: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private transl: TranslatService
  ) {}
  translate(text: string) {
    return this.transl.translate(text);
  }
}
