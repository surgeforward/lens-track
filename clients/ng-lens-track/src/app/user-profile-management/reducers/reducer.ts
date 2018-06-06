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
        settings: {
          changeFrequencyDays: 15,
          countSkippedDays: false,
        },
      };
      return {
        ...state,
        userProfiles: [...state.userProfiles, newProfile],
        currentUserProfileId: payload.makeCurrent
          ? id
          : state.currentUserProfileId,
      };
    case actions.EDIT_USER_PROFILE_ACTION:
      const editedPartialProfile = (<actions.EditUserProfileAction>action)
        .payload;
      const editedProfileIndex = findProfileIndexById(
        state.userProfiles,
        editedPartialProfile.id
      );

      const editedProfile = {
        ...state.userProfiles[editedProfileIndex],
        ...editedPartialProfile,
      };
      if (editedProfileIndex !== -1) {
        const userProfiles = [...state.userProfiles];
        userProfiles.splice(editedProfileIndex, 1, editedProfile);
        return {
          ...state,
          userProfiles,
        };
      }
      break;
    case actions.DELETE_USER_PROFILE_ACTION:
      const idToDelete = (<actions.SelectCurrentUserProfileAction>action)
        .payload;
      if (state.userProfiles.length > 1) {
        const profileIndexToDelete = findProfileIndexById(
          state.userProfiles,
          idToDelete
        );

        if (profileIndexToDelete !== -1) {
          let currentUserProfileId = state.currentUserProfileId;
          if (currentUserProfileId === idToDelete) {
            currentUserProfileId = findSelectedUserProfileAfterDelete(
              state.userProfiles,
              idToDelete
            );
          }

          const userProfiles = [...state.userProfiles];
          userProfiles.splice(profileIndexToDelete, 1);

          return {
            ...state,
            userProfiles,
            currentUserProfileId,
          };
        }
      }
      break;
    case actions.SELECT_CURRENT_PROFILE_ACTION:
      const profileToSelect = findProfileById(
        state.userProfiles,
        (<actions.SelectCurrentUserProfileAction>action).payload
      );
      if (profileToSelect) {
        return {
          ...state,
          currentUserProfileId: profileToSelect.id,
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

function findSelectedUserProfileAfterDelete(
  userProfiles: UserProfile[],
  currentUserProfileId: number
): number {
  const index = findProfileIndexById(userProfiles, currentUserProfileId);
  const newIndex = index === userProfiles.length - 1 ? index - 1 : index + 1;
  return userProfiles[newIndex].id;
}

export const metaReducers: MetaReducer<
  UserProfileManagementState
>[] = !environment.production ? [] : [];
