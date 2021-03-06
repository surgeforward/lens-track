import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { StoreModule } from '@ngrx/store';
import { AppSharedModule } from '../shared/shared.module';
import * as fromUserProfileManagement from './reducers';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const components = [ProfileSelectorComponent, ProfileSettingsComponent];

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
  entryComponents: [ProfileSettingsComponent],
})
export class UserProfileManagementModule {}
