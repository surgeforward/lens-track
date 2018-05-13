import { UserProfile } from '../models/user-profile';
import { ActionWithPayload } from '../../shared/action-with-payload.model';

export const ADD_USER_PROFILE_ACTION = '[User Profile] add profile';
export const EDIT_USER_PROFILE_ACTION = '[User Profile] edit profile';
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

export class EditUserProfileAction extends ActionWithPayload<UserProfile> {
  type = EDIT_USER_PROFILE_ACTION;
}

export class SelectCurrentUserProfileAction extends ActionWithPayload<number> {
  type = SELECT_CURRENT_PROFILE_ACTION;
}

export type UserProfileActions =
  | AddUserProfileAction
  | EditUserProfileAction
  | SelectCurrentUserProfileAction;
