import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css'],
})
export class TopPanelComponent {
  title = 'Project managment app';
  path = '';
  constructor(private router: Router) {
    router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((ev) => (this.path = (ev as NavigationEnd).url));
  }
}
