import { UserProfile } from '../models/user-profile';
import { ActionWithPayload } from '../../shared/action-with-payload.model';

export const ADD_USER_PROFILE_ACTION = '[User Profile] add profile';
export const UPDATE_USER_PROFILE_ACTION = '[User Profile] update profile';
export const DELETE_USER_PROFILE_ACTION = '[User Profile] delete profile';
export const SELECT_CURRENT_PROFILE_ACTION = '[User Profile] select profile';

export interface AddUserProfileActionPayload {
  userProfile?: Partial<UserProfile>;
  makeCurrent?: boolean;
}

export class AddUserProfileAction extends ActionWithPayload<
  AddUserProfileActionPayload
> {
  type = ADD_USER_PROFILE_ACTION;
}

export class UpdateUserProfileAction extends ActionWithPayload<
  Partial<UserProfile>
> {
  type = UPDATE_USER_PROFILE_ACTION;
}

export class DeleteUserProfileAction extends ActionWithPayload<string> {
  type = DELETE_USER_PROFILE_ACTION;
}

export class SelectCurrentUserProfileAction extends ActionWithPayload<string> {
  type = SELECT_CURRENT_PROFILE_ACTION;
}

export type UserProfileActions =
  | AddUserProfileAction
  | UpdateUserProfileAction
  | DeleteUserProfileAction
  | SelectCurrentUserProfileAction;
