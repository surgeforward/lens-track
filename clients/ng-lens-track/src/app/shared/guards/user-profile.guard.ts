import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import {
  selectUserProfiles,
  AddUserProfileAction,
} from '../../user-profile-management/reducers';
import { first, filter } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

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
    const subject: Subject<boolean> = new Subject();
    this._store
      .pipe(select(selectUserProfiles), first(result => result.length !== 0))
      .subscribe(result => {
        subject.next(true);
        subject.complete();
      });

    return subject.asObservable();
  }
}
