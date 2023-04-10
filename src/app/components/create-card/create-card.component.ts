import { Component, Input } from '@angular/core';
import { TranslatService } from 'src/app/services/translate.service';

@Component({
  selector: 'create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCard {
  @Input() onClick!: () => void;
  @Input() type!: 'board' | 'column';
  constructor(public translator: TranslatService) {}
}
