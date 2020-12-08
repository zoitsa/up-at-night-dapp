import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { ContractService } from '../services/contract.service';



@Injectable()
export class UserEffects {

  connect$ = createEffect((): Observable<any> => 
  this.actions$.pipe( 
    ofType(UserActions.connectUser),
    tap(data => console.log(data)),
    switchMap( async () => await this.contractService.connectAccount(),
    ),
    map((response: any) => UserActions.connectUserSuccess({user: response}))
  )
 )



  constructor(
    private actions$: Actions,
    private contractService: ContractService,
    ) {}

}
