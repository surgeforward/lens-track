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
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  private _destroyed$: Subject<void> = new ReplaySubject();

  currentUserProfileId: number;
  settings: UserProfileSettings = {
    changeFrequencyDays: null,
    countSkippedDays: null,
  };

  changeFrequencyDaysControl: FormControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+$/),
    ])
  );

  countSkippedDaysControl: FormControl = new FormControl('');

  form: FormGroup = new FormGroup({
    changeFrequencyDays: this.changeFrequencyDaysControl,
    countSkippedDays: this.countSkippedDaysControl,
  });

  constructor(
    private _store: Store<AppState>,
    private _dialogRef: MatDialogRef<ProfileSettingsComponent>
  ) {}

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

    this.close();
  }

  close() {
    this._dialogRef.close();
  }
}
