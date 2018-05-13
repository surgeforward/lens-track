import { UserProfile } from '../models/user-profile';

export interface UserProfileManagementState {
  userProfiles: UserProfile[];
  currentUserProfileId: number;
}

export const initialState: UserProfileManagementState = {
  userProfiles: [],
  currentUserProfileId: null,
};
