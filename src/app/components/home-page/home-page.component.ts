import { Component, OnDestroy } from '@angular/core';
import {
  breakpointsMap,
  MatchBreakpoints,
  SizeType,
} from 'src/app/services/match-breakpoints.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [MatchBreakpoints],
})
export class HomePageComponent implements OnDestroy {
  screenSize: SizeType = 'Large';
  constructor(private breakpointsObserver: MatchBreakpoints) {
    breakpointsObserver.observer
      .pipe(takeUntil(this.destroyed))
      .subscribe(({ breakpoints }) => {
        if (breakpoints['(max-width: 480px)']) {
          this.screenSize = 'XXSmall';
        } else
          for (const query of Object.keys(breakpoints)) {
            if (breakpoints[query]) {
              this.screenSize = breakpointsMap[query];
            }
          }
      });
  }
  destroyed = new Subject<void>();
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
