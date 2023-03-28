import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  breakpointsMap,
  MatchBreakpoints,
  SizeType,
} from 'src/app/services/match-breakpoints.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { logout, setLang } from 'src/app/store/actions';
import { StoreType } from 'src/app/store/model';
import translator, { LangType } from 'src/languages';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css'],
  providers: [MatchBreakpoints],
})
export class TopPanelComponent {
  @Input() path = '';
  title = 'Project managment app';
  isLogged?: boolean;
  user$: Observable<string>;
  screenSize: SizeType = 'Large';
  language: LangType = 'en';
  constructor(
    private store: Store<StoreType>,
    private snackBar: SnackBarService,
    private router: Router,
    private breakpointObserver: MatchBreakpoints
  ) {
    store.select('token').subscribe(({ isLogged }) => {
      this.isLogged = isLogged;
    });
    this.user$ = store.select((state) => state.user.login);

    breakpointObserver.observer.subscribe(({ breakpoints }) => {
      if (breakpoints['(max-width: 480px)']) {
        this.screenSize = 'XXSmall';
      } else {
        for (const query of Object.keys(breakpoints)) {
          if (breakpoints[query]) {
            this.screenSize = breakpointsMap[query];
          }
        }
      }
    });
    store.select('lang').subscribe((lang) => (this.language = lang));
  }
  logout() {
    this.store.dispatch(logout());
    this.snackBar.show('You have been logged out');
    this.router.navigateByUrl('login');
  }

  editProfile() {
    this.router.navigateByUrl('profile');
  }

  changeLang(lang: LangType) {
    this.store.dispatch(setLang({ lang }));
  }

  translate(text: string) {
    return translator(text, this.language);
  }
}
