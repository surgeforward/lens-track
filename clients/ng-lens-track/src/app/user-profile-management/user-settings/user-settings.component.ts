import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { EditUserProfileAction, selectCurrentUserProfile } from '../reducers';
import { takeUntil, take, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { UserProfileSettings } from '../models/user-profile-settings';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  private _destroyed$: Subject<void> = new ReplaySubject();

  currentUserProfileId: number;
  settings: UserProfileSettings = {
    changeFrequency: null,
    allowSkipping: null,
  };

  changeFrequencyControl: FormControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+$/),
    ])
  );

  allowSkippingControl: FormControl = new FormControl('');

  form: FormGroup = new FormGroup({
    changeFrequency: this.changeFrequencyControl,
    allowSkipping: this.allowSkippingControl,
  });

  constructor(private _store: Store<AppState>) {}

  ngOnInit() {
    this._store
      .pipe(select(selectCurrentUserProfile), takeUntil(this._destroyed$))
      .subscribe(currentUserProfile => {
        this.currentUserProfileId = currentUserProfile.id;
        this.settings = { ...currentUserProfile.settings };
      });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

  save() {
    this._store.dispatch(
      new EditUserProfileAction({
        id: this.currentUserProfileId,
        settings: this.settings,
      })
    );
  }
}
