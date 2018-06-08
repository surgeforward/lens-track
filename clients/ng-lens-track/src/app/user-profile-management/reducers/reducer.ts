import { ActionReducer, MetaReducer } from '@ngrx/store';
import { UserProfileManagementState, adapter } from './models';
import * as actions from './actions';
import { UserProfile } from '../models/user-profile';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

export const reducer: ActionReducer<
  UserProfileManagementState,
  actions.UserProfileActions
> = (state, action) => {
  let updatedState: UserProfileManagementState | void;
  switch (action.type) {
    case actions.ADD_USER_PROFILE_ACTION:
      return addUserProfile(
        state,
        (action as actions.AddUserProfileAction).payload
      );
    case actions.UPDATE_USER_PROFILE_ACTION:
      updatedState = updateUserProfile(
        state,
        (<actions.UpdateUserProfileAction>action).payload
      );
      break;
    case actions.DELETE_USER_PROFILE_ACTION:
      updatedState = deleteUserProfile(
        state,
        (<actions.SelectCurrentUserProfileAction>action).payload
      );
      break;
    case actions.SELECT_CURRENT_PROFILE_ACTION:
      updatedState = selectUserProfile(
        state,
        (<actions.SelectCurrentUserProfileAction>action).payload
      );
      break;
  }

  return updatedState || state;
};

function addUserProfile(
  state: UserProfileManagementState,
  payload: actions.AddUserProfileActionPayload
): UserProfileManagementState {
  const id = uuid();
  const newProfile: UserProfile = {
    id,
    ...payload.userProfile,
    name: 'New user',
    settings: {
      changeFrequencyDays: 15,
      countSkippedDays: false,
    },
  };

  const newState = adapter.addOne(newProfile, state);

  return {
    ...newState,
    currentUserProfileId: payload.makeCurrent ? id : state.currentUserProfileId,
  };
}

function updateUserProfile(
  state: UserProfileManagementState,
  editedProfile: Partial<UserProfile>
): UserProfileManagementState | void {
  if (editedProfile.id) {
    return adapter.updateOne(
      { id: editedProfile.id, changes: editedProfile },
      state
    );
  }
}

function deleteUserProfile(
  state: UserProfileManagementState,
  id: string
): UserProfileManagementState | void {
  if (state.ids.length > 1) {
    if (id === state.currentUserProfileId) {
      const newCurrentUserProfileId = findSelectedUserProfileAfterDelete(
        state.ids as string[],
        state.currentUserProfileId
      );
      state = {
        ...state,
        currentUserProfileId: newCurrentUserProfileId,
      };
    }

    return adapter.removeOne(id, state);
  }
}

function selectUserProfile(
  state: UserProfileManagementState,
  id: string
): UserProfileManagementState | void {
  if (_.includes(state.ids as string[], id)) {
    return {
      ...state,
      currentUserProfileId: id,
    };
  }
}

function findSelectedUserProfileAfterDelete(
  ids: string[],
  currentUserProfileId: string
): string {
  const index = _.indexOf(ids, currentUserProfileId);
  const newIndex = index === ids.length - 1 ? index - 1 : index + 1;
  return ids[newIndex];
}

export const metaReducers: MetaReducer<
  UserProfileManagementState
>[] = !environment.production ? [] : [];
