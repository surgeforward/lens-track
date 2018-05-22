import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileManagementState } from './models';
import * as _ from 'lodash';

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

export const selectCurrentUserProfile = createSelector(
  selectUserProfileManagementState,
  state => _.find(state.userProfiles, { id: state.currentUserProfileId })
);
