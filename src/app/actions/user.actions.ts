import { createAction, props } from '@ngrx/store';

export const connectUser = createAction(
  '[User] Connect User'
);

export const connectUserSuccess = createAction(
  '[User] Connect User Success',
  props<{ user: any }>()
);

export const connectUserFailure = createAction(
  '[User] Connect User Failure',
  props<{ error: any }>()
);
