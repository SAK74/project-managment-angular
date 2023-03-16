import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';

@Component({
  selector: 'spinner-component',
  template: ` <mat-spinner *ngIf="spinner.isLoading"></mat-spinner> `,
  host: { '[class.loading]': 'spinner.isLoading' },
  styles: [
    `
      :host {
        position: fixed;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        top: 0;
        align-items: center;
      }
    `,
  ],
})
export class SpinnerComponent {
  constructor(public spinner: SpinnerService) {}
}
