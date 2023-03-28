import { Component, OnDestroy } from '@angular/core';
import {
  breakpointsMap,
  MatchBreakpoints,
  SizeType,
} from 'src/app/services/match-breakpoints.service';
import { takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/store/model';
import translator, { LangType } from 'src/languages';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [MatchBreakpoints],
})
export class HomePageComponent implements OnDestroy {
  language: LangType = 'en';
  screenSize: SizeType = 'Large';
  constructor(
    private breakpointsObserver: MatchBreakpoints,
    private store: Store<StoreType>
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
    store.select('lang').subscribe((lang) => (this.language = lang));
  }
  destroyed = new Subject<void>();
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  translate(text: string) {
    return translator(text, this.language);
  }
}
