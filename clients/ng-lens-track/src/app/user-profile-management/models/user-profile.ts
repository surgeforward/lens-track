import { UserProfileSettings } from './user-profile-settings';

export interface UserProfile {
  id: string;
  name: string;
  settings: UserProfileSettings;
}
