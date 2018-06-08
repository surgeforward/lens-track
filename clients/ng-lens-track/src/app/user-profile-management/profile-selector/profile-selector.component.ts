import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { UserProfile } from '../models/user-profile';
import {
  AddUserProfileAction,
  SelectCurrentUserProfileAction,
  UpdateUserProfileAction,
  selectUserProfiles,
  selectCurrentUserProfileId,
  DeleteUserProfileAction,
} from '../reducers';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.scss'],
})
export class ProfileSelectorComponent implements OnInit, OnDestroy {
  userProfiles$: Observable<UserProfile[]>;

  editMode = false;

  newName: string;

  private _currentUserProfileId: string = null;

  get currentUserProfileId(): string {
    return this._currentUserProfileId;
  }
  set currentUserProfileId(userProfileId: string) {
    this._store.dispatch(new SelectCurrentUserProfileAction(userProfileId));
  }

  private _subscriptions: Subscription[] = [];

  constructor(private _store: Store<AppState>) {}

  add() {
    this._store.dispatch(
      new AddUserProfileAction({
        makeCurrent: true,
      })
    );
  }

  edit() {
    this.userProfiles$
      .pipe(
        take(1),
        map(userProfiles =>
          _.find(userProfiles, { id: this.currentUserProfileId })
        )
      )
      .subscribe(userProfile => {
        this.newName = userProfile.name;
        this.editMode = true;
      });
  }

  saveEdit() {
    this._store.dispatch(
      new UpdateUserProfileAction({
        id: this.currentUserProfileId,
        name: this.newName,
      })
    );
    this.endEdit();
  }

  cancelEdit() {
    this.endEdit();
  }

  private endEdit() {
    this.newName = null;
    this.editMode = false;
  }

  delete() {
    this._store.dispatch(
      new DeleteUserProfileAction(this.currentUserProfileId)
    );
  }

  ngOnInit() {
    this.userProfiles$ = this._store.pipe(select(selectUserProfiles));
    const currentUserProfileSubscription = this._store
      .pipe(select(selectCurrentUserProfileId))
      .subscribe(currentUserProfileId => {
        this._currentUserProfileId = currentUserProfileId;
      });

    this._subscriptions.push(currentUserProfileSubscription);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }
}
