import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: string;
}

export const initialState: State = {
  user: ''
};


export const reducer = createReducer(
  initialState,
  on(UserActions.connectUser, state => state),

  on(UserActions.connectUserSuccess, (state, { user }) => (
    {
      ...state,
      user
    }
  )),

  on(UserActions.connectUserFailure, (state, action) => state),

);

export const userAccountId = (state: State) => state.user