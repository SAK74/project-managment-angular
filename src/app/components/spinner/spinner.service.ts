import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  isLoading: boolean;
  constructor() {
    this.isLoading = false;
  }
  start() {
    this.isLoading = true;
    // console.log('start', this.isLoading);
  }
  stop() {
    // console.log('stop');
    this.isLoading = false;
  }
}
