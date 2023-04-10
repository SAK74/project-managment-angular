import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading: boolean = false;
  routePath: string = '';
  constructor(private router: Router) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.loading = true;
      } else if (ev instanceof NavigationEnd) {
        this.loading = false;
        this.routePath = ev.url;
      }
    });
  }
}
