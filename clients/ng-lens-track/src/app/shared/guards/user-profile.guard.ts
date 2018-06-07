import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { AppState } from '../../reducers';
import {
  AddUserProfileAction,
  selectUserProfiles,
} from '../../user-profile-management/reducers';

@Injectable()
export class UserProfileGuard implements CanActivate {
  constructor(private _store: Store<AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // When starting without any user profiles, add one.
    this._store
      .pipe(
        select(selectUserProfiles),
        first(),
        filter(result => result.length === 0)
      )
      .subscribe(result => {
        this._store.dispatch(new AddUserProfileAction({ makeCurrent: true }));
      });

    // Don't continue until we have at least one user profile.
    const canActivateSubject: Subject<boolean> = new ReplaySubject();
    this._store
      .pipe(select(selectUserProfiles), first(result => result.length !== 0))
      .subscribe(result => {
        canActivateSubject.next(true);
        canActivateSubject.complete();
      });

    return canActivateSubject.asObservable();
  }
}
