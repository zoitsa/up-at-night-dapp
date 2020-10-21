import { createAction, props } from '@ngrx/store';

export const createOrganization = createAction(
  '[Organization] Create Organization'
);

export const createOrganizationSuccess = createAction(
  '[Organization] Create Organization Success',
  props<{ organization: any }>()
);

export const createOrganizationFailure = createAction(
  '[Organization] Create Organization Failure',
  props<{ error: any }>()
);

export const getOrganization = createAction(
  '[Organization] Get Organization'
);

export const getOrganizationSuccess = createAction(
  '[Organization] Get Organization Success',
  props<{ organization: any }>()
);

export const getOrganizationFailure = createAction(
  '[Organization] Get Organization Failure',
  props<{ error: any }>()
);