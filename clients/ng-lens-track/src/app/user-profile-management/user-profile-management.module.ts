import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { SharedMaterialModule } from '../shared/material.module';
import { SharedFormsModule } from '../shared/forms.module';
import { StoreModule } from '@ngrx/store';
import * as fromUserProfileManagement from './reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedFormsModule,
    StoreModule.forFeature(
      'userProfileManagement',
      fromUserProfileManagement.reducer,
      {
        initialState: fromUserProfileManagement.initialState,
        metaReducers: fromUserProfileManagement.metaReducers
      }
    ),
  ],
  declarations: [ProfileSelectorComponent],
  exports: [ProfileSelectorComponent]
})
export class UserProfileManagementModule { }
