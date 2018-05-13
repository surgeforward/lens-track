import { ActionReducer, MetaReducer } from '@ngrx/store';
import { UserProfileManagementState } from './models';
import * as actions from './actions';
import { UserProfile } from '../models/user-profile';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

export const reducer: ActionReducer<
  UserProfileManagementState,
  actions.UserProfileActions
> = (state, action) => {
  switch (action.type) {
    case actions.ADD_USER_PROFILE_ACTION:
      const id = findNextId(state.userProfiles);
      const payload = (action as actions.AddUserProfileAction).payload;
      const name = generateName(state.userProfiles, payload, id);
      const newProfile: UserProfile = {
        id: id,
        name: name,
      };
      return {
        ...state,
        userProfiles: [...state.userProfiles, newProfile],
        currentUserProfileId: payload.makeCurrent
          ? id
          : state.currentUserProfileId,
      };
    case actions.EDIT_USER_PROFILE_ACTION:
      const editedProfile = (<actions.EditUserProfileAction>action).payload;
      const profileIndex = findProfileIndexById(
        state.userProfiles,
        editedProfile.id
      );
      if (profileIndex !== -1) {
        const userProfiles = [...state.userProfiles];
        userProfiles.splice(profileIndex, 1, editedProfile);
        return {
          ...state,
          userProfiles,
        };
      }
      break;
    case actions.SELECT_CURRENT_PROFILE_ACTION:
      const userProfile = findProfileById(
        state.userProfiles,
        (<actions.SelectCurrentUserProfileAction>action).payload
      );
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

function findProfileByName(
  userProfiles: UserProfile[],
  name: string
): UserProfile {
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

function generateName(
  userProfiles: UserProfile[],
  payload: actions.AddUserProfileActionPayload,
  id: number
): string {
  const requestedName =
    payload && payload.userProfile && payload.userProfile.name;
  if (requestedName) {
    return requestedName;
  }

  let count = id;
  const getNextName = () => `Profile ${count}`;
  let nextName;
  while (findProfileByName(userProfiles, (nextName = getNextName()))) {
    count++;
  }

  return nextName;
}

export const metaReducers: MetaReducer<
  UserProfileManagementState
>[] = !environment.production ? [] : [];
