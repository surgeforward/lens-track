import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import { AddUserProfileAction, selectUserProfiles, selectCurrentUserProfile, SelectCurrentUserProfileAction } from '../reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.scss']
})
export class ProfileSelectorComponent implements OnInit {
  userProfiles: Observable<UserProfile[]>;

  private _currentUserProfile: UserProfile;

  get currentUserProfile(): UserProfile {
    return this._currentUserProfile;
  }
  set currentUserProfile(userProfile: UserProfile) {
    this._store.dispatch(new SelectCurrentUserProfileAction(userProfile.id));
  }

  constructor(private _store: Store<AppState>) { }

  addUserProfile() {
    this._store.dispatch(new AddUserProfileAction({
      makeCurrent: true,
    }));
  }

  ngOnInit() {
    this.userProfiles = this._store.pipe(select(selectUserProfiles));
    this._store.pipe(select(selectCurrentUserProfile))
      .subscribe(currentUserProfile => {
        this._currentUserProfile = currentUserProfile;
      });
  }
}
