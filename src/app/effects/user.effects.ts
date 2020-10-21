import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap} from 'rxjs/operators';
import { EMPTY, of, pipe } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { ContractService } from '../services/contract.service';



@Injectable()
export class UserEffects {

  // loadUsers$ = createEffect(() => 
  //   this.actions$.pipe( 
  //     ofType(UserActions.connectUser),
  //     map(action => action.type),
  //     switchMap(() => this.contractService.connectAccount()),
  //     tap(() => {
  //       this.contractService.accountStatus$.subscribe(data => {
  //         console.log(data);
  //         return data
  //       });
  //     }),
  //     map((data) => UserActions.connectUserSuccess({ user: data })),
  //   )
  // )



  constructor(
    private actions$: Actions,
    private contractService: ContractService,
    ) {}

}
