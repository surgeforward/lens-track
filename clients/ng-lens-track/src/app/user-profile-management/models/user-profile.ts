import { UserProfileSettings } from './user-profile-settings';

export interface UserProfile {
  id: number;
  name: string;
  settings: UserProfileSettings;
}
