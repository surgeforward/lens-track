import {
  ActionReducer,
  ActionReducerMap,
  Action,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  combineReducers,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../models/user-profile';
import { ActionWithPayload } from '../../shared/action-with-payload.model';
import * as _ from 'lodash';

export interface UserProfileManagementState {
  userProfiles: UserProfile[];
  currentUserProfile: UserProfile;
}

export const initialState: UserProfileManagementState = {
  userProfiles: [],
  currentUserProfile: null,
};

const ADD_USER_PROFILE_ACTION = '[User Profile] add profile';
const SELECT_CURRENT_PROFILE_ACTION = '[User Profile] select profile';

export interface AddUserProfileActionPayload {
  userProfile?: Partial<UserProfile>;
  makeCurrent?: boolean;
}

export class AddUserProfileAction extends ActionWithPayload<AddUserProfileActionPayload> {
  type = ADD_USER_PROFILE_ACTION;
}

export class SelectCurrentUserProfileAction extends ActionWithPayload<number> {
  type = SELECT_CURRENT_PROFILE_ACTION;
}

export type UserProfileActions = AddUserProfileAction | SelectCurrentUserProfileAction;

export const reducer: ActionReducer<UserProfileManagementState, UserProfileActions> = (state, action) => {
  switch (action.type) {
    case ADD_USER_PROFILE_ACTION:
      const id = state.userProfiles.length + 1;
      const payload = (action as AddUserProfileAction).payload;
      const newUserProfile: UserProfile = {
        id: id,
        name: (payload && payload.userProfile && payload.userProfile.name) || `Profile ${id}`,
      };
      return {
        ...state,
        userProfiles: [
          ...state.userProfiles,
          newUserProfile,
        ],
        currentUserProfile: payload.makeCurrent ? newUserProfile : state.currentUserProfile,
      };
    case SELECT_CURRENT_PROFILE_ACTION:
      const userProfile = _.find(state.userProfiles, { id: action.payload });
      if (userProfile) {
        return {
          ...state,
          currentUserProfile: userProfile,
        };
      }
      break;
  }

  return state;
};

export const metaReducers: MetaReducer<UserProfileManagementState>[] = !environment.production ? [] : [];

export const selectUserProfileManagementState = createFeatureSelector<UserProfileManagementState>('userProfileManagement');

export const selectUserProfiles = createSelector(
  selectUserProfileManagementState,
  state => state.userProfiles
);

export const selectCurrentUserProfile = createSelector(
  selectUserProfileManagementState,
  state => state.currentUserProfile
);
