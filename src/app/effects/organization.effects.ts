import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { ContractService} from '../services/contract.service'

import * as OrganizationActions from '../actions/organization.actions';



@Injectable()
export class OrganizationEffects {

   getOrganization$ = createEffect((): Observable<any> => 
    this.actions$.pipe( 
      ofType(OrganizationActions.getOrganization),
      switchMap( (value: any) => this.contractService.getOrganization(value.id),
      ),
      map((response: any) => OrganizationActions.getOrganizationSuccess({organization: response}))
    )
   )


  constructor(
    private actions$: Actions,
    private contractService: ContractService,
    ) {}

}
