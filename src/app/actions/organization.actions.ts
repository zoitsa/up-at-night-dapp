import { createAction, props } from '@ngrx/store';

export const createOrganization = createAction(
  '[Organization] Create Organization',
  props<{ organization: any }>()
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
  '[Organization] Get Organization',
  props<{ id: any }>()
);

export const getOrganizationSuccess = createAction(
  '[Organization] Get Organization Success',
  props<{ organization: any }>()
);

export const getOrganizationFailure = createAction(
  '[Organization] Get Organization Failure',
  props<{ error: any }>()
);

export const getBalence = createAction(
  '[Organization] Get Balence'
);

export const getBalenceSuccess = createAction(
  '[Organization] Get Balence Success',
  props<{ balence: number | string }>()
);

export const getBalenceFailure = createAction(
  '[Organization] Get Balence Failure',
  props<{ error: any }>()
);