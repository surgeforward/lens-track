import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserProfile } from '../models/user-profile';

export interface UserProfileManagementState extends EntityState<UserProfile> {
  currentUserProfileId: string;
}

export const adapter: EntityAdapter<UserProfile> = createEntityAdapter<
  UserProfile
>();

export const initialState: UserProfileManagementState = adapter.getInitialState(
  {
    currentUserProfileId: null,
  }
);
