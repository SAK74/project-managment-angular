import { Component, OnDestroy } from '@angular/core';
import {
  breakpointsMap,
  MatchBreakpoints,
  SizeType,
} from 'src/app/services/match-breakpoints.service';
import { takeUntil, Subject } from 'rxjs';
import { TranslatService } from 'src/app/services/translate.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [MatchBreakpoints],
})
export class HomePageComponent implements OnDestroy {
  screenSize: SizeType = 'Large';
  constructor(
    private breakpointsObserver: MatchBreakpoints,
    private transl: TranslatService
  ) {
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

  translate(text: string) {
    return this.transl.translate(text);
  }
}
