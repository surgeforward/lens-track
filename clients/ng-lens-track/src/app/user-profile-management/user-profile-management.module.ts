import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { StoreModule } from '@ngrx/store';
import { AppSharedModule } from '../shared/shared.module';
import * as fromUserProfileManagement from './reducers';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const components = [ProfileSelectorComponent, UserSettingsComponent];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      'userProfileManagement',
      fromUserProfileManagement.reducer,
      {
        initialState: fromUserProfileManagement.initialState,
        metaReducers: fromUserProfileManagement.metaReducers,
      }
    ),
    AppSharedModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class UserProfileManagementModule {}
