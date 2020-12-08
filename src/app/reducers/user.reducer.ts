import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: string;
  connected: boolean;
}

export const initialState: State = {
  user: '',
  connected: false, 
};


export const reducer = createReducer(
  initialState,
  on(UserActions.connectUser, state => state),

  on(UserActions.connectUserSuccess, (state, { user }) => (
    {
      ...state,
      user,
      connected: true,
    }
  )),

  on(UserActions.connectUserFailure, (state, action) => state),

);

export const userAccountId = (state: State) => state.user
export const connectionStatus = (state: State) => state.connected