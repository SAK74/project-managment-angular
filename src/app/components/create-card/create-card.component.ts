import { Component, Input } from '@angular/core';

@Component({
  selector: 'create-card',
  template: `
    <mat-card [matTooltip]="'ADD ' + type.toUpperCase()" (click)="onClick()">
      <mat-icon>add_circle</mat-icon>
    </mat-card>
  `,
  styles: [
    `
      :host {
        cursor: pointer;
        width: 100px;
        height: 100px;
        flex-shrink: 0;
      }
      mat-card {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #efe7e7;
        border: 3px solid darkgray;
      }
      ,
      mat-card-content {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #efe7e7;
        padding: 6px;
        box-sizing: border-box;
      }
      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
      }
    `,
  ],
})
export class CreateCard {
  @Input() onClick!: () => void;
  @Input() type!: 'board' | 'column';
}
