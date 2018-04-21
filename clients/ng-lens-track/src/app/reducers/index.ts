import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUserProfileManagement from '../user-profile-management/reducers';
import { ActionWithPayload } from '../shared/action-with-payload.model';
import { UserProfileManagementState } from '../user-profile-management/reducers';

export interface AppState {
  userProfileManagementState: UserProfileManagementState;
}

export const initialState: AppState = {
  userProfileManagementState: fromUserProfileManagement.initialState,
};

export const reducers: ActionReducerMap<AppState, ActionWithPayload> = {
  userProfileManagementState: fromUserProfileManagement.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
