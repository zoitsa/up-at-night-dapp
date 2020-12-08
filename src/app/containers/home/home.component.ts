import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from '../../reducers/index';
import * as fromUser from '../../selectors/user.selectors';
import * as fromOrganization from '../../selectors/organization.selectors';
import { takeUntil, tap } from 'rxjs/operators';
import { connectUser, connectUserSuccess } from '../../actions/user.actions';
import { createOrganization, createOrganizationSuccess, getOrganization,} from '../../actions/organization.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ContractService],
})
export class HomeComponent implements OnInit, OnDestroy {
  account$: Observable<any>;
  selectedOrganization$: Observable<any>;
  wallet$: Observable<any>;
  unsubscribe$: Subject<any> = new Subject<any>();

  accountID;
  organizationDetails;

  constructor(
    private store$: Store<fromRoot.State>,
    private contractService: ContractService,
  ) {
    // this.account$ = this.store$.pipe(select(fromUser.selectUserAccountId))
    this.selectedOrganization$ = this.store$.pipe(select(fromOrganization.selectOrganizationDetails))
  }

  ngOnInit(): void {
    // this.account$.pipe(
    //   takeUntil(this.unsubscribe$),
    // ).subscribe((data) => {
    //   this.accountID = data.user[0]; // wallet taking donations, needs to be unique
    //   console.log(this.accountID);
    // })
    this.selectedOrganization$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((data) => {
      this.organizationDetails = data;
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
        this.accountID = account;
      }
    });
  }

  onCreate(form) {
    const org = {
      orgID: form.id,
      payableWallet: form.walletAddress,
      orgName: form.name,
      tokenAddress: form.tokenAddress,
    }
    
    this.store$.dispatch(createOrganization({organization: org}));
  }

  onGet(form) {
    const orgID = form.id;
    this.store$.dispatch(getOrganization({id: orgID}));
  }

  onDonate(form) {
    // hardcoding in the 
    // const amount = 0;
    // const tip = 0;
    this.contractService.donate(form.id, form.amount, form.tip);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

