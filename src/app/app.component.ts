import { Component } from '@angular/core';
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading = false;
  constructor(private router: Router) {
    router.events.subscribe((ev) => {
      if (ev instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (ev instanceof RouteConfigLoadEnd) {
        this.loading = false;
      }
    });
  }
}
