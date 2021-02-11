import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { ContractService} from '../services/contract.service'

import * as OrganizationActions from '../actions/organization.actions';


@Injectable()
export class OrganizationEffects {

  createOrganization$ = createEffect((): Observable<any> => 
    this.actions$.pipe(
      ofType(OrganizationActions.createOrganization),
      switchMap( async (value: any) => await this.contractService.createOrganization(
        value.organization.orgID, 
        value.organization.payableWallet, 
        value.organization.orgName, 
        value.organization.tokenAddress),
      ),
      map((response: any) => OrganizationActions.createOrganizationSuccess({organization: response}))
    )
  )

   getOrganization$ = createEffect((): Observable<any> => 
    this.actions$.pipe( 
      ofType(OrganizationActions.getOrganization),
      switchMap( async (value: any) => await this.contractService.getOrganization(value.id),
      ),
      map((response: any) => OrganizationActions.getOrganizationSuccess({organization: response}))
    )
   )

   checkOrgAdmin$ = createEffect((): Observable<any> => 
   this.actions$.pipe( 
     ofType(OrganizationActions.checkAdmin),
     switchMap( async (value: any) => await this.contractService.isOrganizationAdmin(value.id),
     ),
     map((response: any) => OrganizationActions.checkAdminSuccess({boolean: response}))
   )
  )

   donate$ = createEffect((): Observable<any> => 
   this.actions$.pipe( 
     ofType(OrganizationActions.donate),
     switchMap( async (value: any) => await this.contractService.donate(value.id, value.amount, value.tip),
     ),
     map((response: any) => OrganizationActions.donateSuccess({res: response}))
     /*todo: update reducer*/
   )
  ) 


  constructor(
    private actions$: Actions,
    private contractService: ContractService,
    ) {}

}
