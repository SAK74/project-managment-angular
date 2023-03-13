import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'spinner-component',
  template: `<mat-spinner *ngIf="spinner.isLoading"></mat-spinner>`,
  // providers: [SpinnerService],
})
export class SpinnerComponent {
  // isLoading = false;
  constructor(public spinner: SpinnerService) {}
  // start() {
  //   console.log('start');
  //   this.isLoading = true;
  // }
  // stop() {
  //   console.log('start');
  //   this.isLoading = false;
  // }
}
