import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  breakpointsMap,
  MatchBreakpoints,
  SizeType,
} from 'src/app/services/match-breakpoints.service';
import { takeUntil, Subject } from 'rxjs';
import { TranslatService } from 'src/app/services/translate.service';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/store/model';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [MatchBreakpoints],
})
export class HomePageComponent implements OnDestroy, OnInit {
  screenSize: SizeType = 'Large';
  isLogged = false;
  constructor(
    private breakpointsObserver: MatchBreakpoints,
    private store: Store<StoreType>,
    private transl: TranslatService,
    private router: Router
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
    store
      .select('token')
      .subscribe(({ isLogged }) => (this.isLogged = isLogged));
  }
  destroyed = new Subject<void>();
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
  ngOnInit(): void {
    if (this.isLogged) {
      this.router.navigateByUrl('boards');
    }
  }

  translate(text: string) {
    return this.transl.translate(text);
  }
}
