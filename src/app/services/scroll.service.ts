import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly _scroll$ = fromEvent(window, 'scroll').pipe(
    throttleTime(50),
    map(() => window.scrollY),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly scrollY$ = this._scroll$;

  readonly isScrolled$ = this._scroll$.pipe(
    map(y => y > 60),
    distinctUntilChanged()
  );

  smoothScrollTo(id: string, offset = 80) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
