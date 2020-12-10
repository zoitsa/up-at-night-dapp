import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrganization from '../reducers/organization.reducer';

export const selectOrganizationState = createFeatureSelector<fromOrganization.State>(
  fromOrganization.organizationFeatureKey
);

export const selectOrganizationDetails = createSelector(
  selectOrganizationState,
  fromOrganization.myOrganization
);
