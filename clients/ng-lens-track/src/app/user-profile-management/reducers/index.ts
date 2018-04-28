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
  currentUserProfileId: number;
}

export const initialState: UserProfileManagementState = {
  userProfiles: [],
  currentUserProfileId: null,
};

const ADD_USER_PROFILE_ACTION = '[User Profile] add profile';
const EDIT_USER_PROFILE_ACTION = '[User Profile] edit profile';
const SELECT_CURRENT_PROFILE_ACTION = '[User Profile] select profile';

export interface AddUserProfileActionPayload {
  userProfile?: Partial<UserProfile>;
  makeCurrent?: boolean;
}

export class AddUserProfileAction extends ActionWithPayload<AddUserProfileActionPayload> {
  type = ADD_USER_PROFILE_ACTION;
}

export class EditUserProfileAction extends ActionWithPayload<UserProfile> {
  type = EDIT_USER_PROFILE_ACTION;
}

export class SelectCurrentUserProfileAction extends ActionWithPayload<number> {
  type = SELECT_CURRENT_PROFILE_ACTION;
}

export type UserProfileActions =
  AddUserProfileAction |
  EditUserProfileAction |
  SelectCurrentUserProfileAction;

export const reducer: ActionReducer<UserProfileManagementState, UserProfileActions> = (state, action) => {
  switch (action.type) {
    case ADD_USER_PROFILE_ACTION:
      const id = findNextId(state.userProfiles);
      const payload = (action as AddUserProfileAction).payload;
      const name = generateName(state.userProfiles, payload, id);
      const newProfile: UserProfile = {
        id: id,
        name: name,
      };
      return {
        ...state,
        userProfiles: [
          ...state.userProfiles,
          newProfile,
        ],
        currentUserProfileId: payload.makeCurrent ? id : state.currentUserProfileId,
      };
    case EDIT_USER_PROFILE_ACTION:
      const editedProfile = (<EditUserProfileAction>action).payload;
      const profileIndex = findProfileIndexById(state.userProfiles, editedProfile.id);
      if (profileIndex !== -1) {
        const userProfiles = [...state.userProfiles];
        userProfiles.splice(profileIndex, 1, editedProfile);
        return {
          ...state,
          userProfiles,
        };
      }
      break;
    case SELECT_CURRENT_PROFILE_ACTION:
      const userProfile = findProfileById(state.userProfiles, (<SelectCurrentUserProfileAction>action).payload);
      if (userProfile) {
        return {
          ...state,
          currentUserProfileId: userProfile.id,
        };
      }
      break;
  }

  return state;
};

function findProfileById(userProfiles: UserProfile[], id: number): UserProfile {
  return _.find(userProfiles, { id });
}

function findProfileByName(userProfiles: UserProfile[], name: string): UserProfile {
  return _.find(userProfiles, { name });
}

function findProfileIndexById(userProfiles: UserProfile[], id: number): number {
  return _.findIndex(userProfiles, { id });
}

function findNextId(userProfiles: UserProfile[]): number {
  let nextId = userProfiles.length + 1;
  while (findProfileById(userProfiles, nextId)) {
    nextId++;
  }

  return nextId;
}

function generateName(userProfiles: UserProfile[], payload: AddUserProfileActionPayload, id: number): string {
  const requestedName = payload && payload.userProfile && payload.userProfile.name;
  if (requestedName) {
    return requestedName;
  }

  let count = id;
  const getNextName = () => `Profile ${count}`;
  let nextName;
  while (findProfileByName(userProfiles, nextName = getNextName())) {
    count++;
  }

  return nextName;
}

export const metaReducers: MetaReducer<UserProfileManagementState>[] = !environment.production ? [] : [];

export const selectUserProfileManagementState = createFeatureSelector<UserProfileManagementState>('userProfileManagement');

export const selectUserProfiles = createSelector(
  selectUserProfileManagementState,
  state => state.userProfiles
);

export const selectCurrentUserProfile = createSelector(
  selectUserProfileManagementState,
  state => state.currentUserProfileId
);
