import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { selectOrganizationDetails } from '../selectors/organization.selectors'
import { selectUserAccountId} from '../selectors/user.selectors'


export interface State {
}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
