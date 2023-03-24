import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const breakpointsMap = {
  [Breakpoints.XSmall]: 'XSmall',
  [Breakpoints.Small]: 'Small',
  [Breakpoints.Medium]: 'Medium',
  [Breakpoints.Large]: 'Large',
  [Breakpoints.XLarge]: 'XLarge',
} as const;

export type SizeType = typeof breakpointsMap[keyof typeof breakpointsMap];

@Injectable({ providedIn: 'root' })
export class MatchBreakpoints {
  observer: Observable<BreakpointState>;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.observer = breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);
  }
}
