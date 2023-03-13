import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  isLoading = false;
  // constructor() {
  //   this.isLoading = false;
  // }
  start() {
    this.isLoading = true;
    // console.log('start', this.isLoading);
  }
  stop() {
    // console.log('stop');
    this.isLoading = false;
  }
}
