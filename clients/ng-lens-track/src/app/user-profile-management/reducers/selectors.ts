import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileManagementState, adapter } from './models';
import * as _ from 'lodash';

export const selectUserProfileManagementState = createFeatureSelector<
  UserProfileManagementState
>('userProfileManagement');

const {
  // select the array of users
  selectAll: getUserProfiles,
} = adapter.getSelectors();

export const selectUserProfiles = createSelector(
  selectUserProfileManagementState,
  getUserProfiles
);

export const selectCurrentUserProfileId = createSelector(
  selectUserProfileManagementState,
  state => state.currentUserProfileId
);

export const selectCurrentUserProfile = createSelector(
  selectUserProfileManagementState,
  state => _.find(getUserProfiles(state), { id: state.currentUserProfileId })
);
