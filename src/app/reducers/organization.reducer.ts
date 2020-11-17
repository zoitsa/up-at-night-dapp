import { Action, createReducer, on } from '@ngrx/store';
import * as OrganizationActions from '../actions/organization.actions';

export const organizationFeatureKey = 'organization';

export interface State {
  myOrganization: {}
  newOrganization: {};
}

export const initialState: State = {
  myOrganization: {},
  newOrganization: {},
};


export const reducer = createReducer(
  initialState,

  on(OrganizationActions.createOrganization, state => state),

  on(OrganizationActions.createOrganizationSuccess, (state, { organization }) => (
    {
      ...state,
      newOrganization: organization
    }
  )),

  on(OrganizationActions.createOrganizationFailure, (state, action) => state),

  on(
    OrganizationActions.getOrganization, state => state),

  on(OrganizationActions.getOrganizationSuccess, (state, { organization }) => (
    {
      ...state,
      myOrganization: organization
    }
  )),
);

export const myOrganization = (state: State) => state.myOrganization
