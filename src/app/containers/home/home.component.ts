import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from '../../reducers/index';
import * as fromUser from '../../selectors/user.selectors';
import * as fromOrganization from '../../selectors/organization.selectors';
import { takeUntil, tap } from 'rxjs/operators';
import { connectUser } from '../../actions/user.actions';
import { createOrganization, getOrganization, donate} from '../../actions/organization.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ContractService],
})
export class HomeComponent implements OnInit, OnDestroy {
  account$: Observable<any>;
  display$: Observable<any>;
  selectedOrganization$: Observable<any>;
  wallet$: Observable<any>;
  unsubscribe$: Subject<any> = new Subject<any>();

  connected;
  organizationDetails;

  constructor(
    private store$: Store<fromRoot.State>,
    private contractService: ContractService,
  ) {
    this.display$ = this.store$.pipe(select(fromUser.selectConnectionStatus))
    this.selectedOrganization$ = this.store$.pipe(select(fromOrganization.selectOrganizationDetails))
  }

  ngOnInit(): void {
    this.display$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((res) => {
      this.connected = res;
    })
    this.selectedOrganization$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((data) => {
      this.organizationDetails = data;
    })
  }

  onConnect() {
    this.store$.dispatch(connectUser());
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
    this.store$.dispatch(donate({id: form.id, amount: form.amount, tip: form.tip, }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

