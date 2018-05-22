import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileManagementState } from './models';

export const selectUserProfileManagementState = createFeatureSelector<
  UserProfileManagementState
>('userProfileManagement');

export const selectUserProfiles = createSelector(
  selectUserProfileManagementState,
  state => state.userProfiles
);

export const selectCurrentUserProfileId = createSelector(
  selectUserProfileManagementState,
  state => state.currentUserProfileId
);
