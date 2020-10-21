import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromUser from '../../reducers/user.reducer';
import { takeUntil, tap } from 'rxjs/operators';
import { connectUser, connectUserSuccess } from '../../actions/user.actions';
import { createOrganization, createOrganizationSuccess, getOrganization, getOrganizationSuccess } from '../../actions/organization.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ContractService],
})
export class HomeComponent implements OnInit, OnDestroy {
  account$: Observable<any>;
  accountID;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private store$: Store<fromUser.State>,
    private contractService: ContractService
  ) {
    this.account$ = this.store$.pipe(select(fromUser.userAccountId))
  }

  ngOnInit(): void {
     this.account$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((data) => {
      this.accountID = data.user[0]; // wallet taking donations, needs to be unique
    })
  }

  onConnect() {
    // TODO: dispatch connectUser action and call service in effect
    this.store$.dispatch(connectUser());
    this.contractService.connectAccount();

    this.contractService.accountStatus$.subscribe(account => {
      if ( account ) {
        //TODO: Move this to dispatch in effect
        this.store$.dispatch(connectUserSuccess({ user: account }))
      }
    });
  }

  onCreate(form) {
    console.log(form);

    const orgID = form.id;
    const payableWallet = form.walletAddress;
    const orgName = form.name;
    const tokenAddress = form.tokenAddress;
    
    this.store$.dispatch(createOrganization());
    //TODO: Move this to call service in effect
    this.contractService.createOrganization(orgID, payableWallet, orgName, tokenAddress)
    
    this.contractService.newOrganization$.subscribe(res => {
      if (res) {
        //TODO: Move this to dispatch in effect
        this.store$.dispatch(createOrganizationSuccess({ organization: res }));
      }
    });
  }

  onGet(form) {
    const orgID = form.id;
    this.store$.dispatch(getOrganization());
    this.contractService.getOrganization(orgID)

    //TODO: Move this to call service in effect
    this.contractService.organization$.subscribe(res => {
      if (res) {
        //TODO: Move this to dispatch in effect
        this.store$.dispatch(getOrganizationSuccess({ organization: res}))
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

