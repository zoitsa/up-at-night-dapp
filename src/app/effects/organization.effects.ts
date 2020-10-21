import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as OrganizationActions from '../actions/organization.actions';



@Injectable()
export class OrganizationEffects {

  // loadOrganizations$ = createEffect(() => {
  //   return this.actions$.pipe( 

  //     ofType(OrganizationActions.loadOrganizations),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => OrganizationActions.loadOrganizationsSuccess({ data })),
  //         catchError(error => of(OrganizationActions.loadOrganizationsFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
