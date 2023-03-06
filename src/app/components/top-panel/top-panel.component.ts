import { Component, Input } from '@angular/core';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css'],
})
export class TopPanelComponent {
  @Input() path = '';
  title = 'Project managment app';
}
