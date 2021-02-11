import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from '../../reducers/index';
import * as fromUser from '../../selectors/user.selectors';
import * as fromOrganization from '../../selectors/organization.selectors';
import { takeUntil, tap } from 'rxjs/operators';
import { connectUser } from '../../actions/user.actions';
import { createOrganization, getOrganization, donate, checkAdmin} from '../../actions/organization.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ContractService],
})
export class HomeComponent implements OnInit, OnDestroy {
  account$: Observable<any>;
  display$: Observable<any>;
  isAdmin$: Observable<any>;
  selectedOrganization$: Observable<any>;
  wallet$: Observable<any>;
  unsubscribe$: Subject<any> = new Subject<any>();

  connected;
  organizationDetails;
  isAdmin;

  constructor(
    private store$: Store<fromRoot.State>,
    private contractService: ContractService,
  ) {
    this.display$ = this.store$.pipe(select(fromUser.selectConnectionStatus));
    this.selectedOrganization$ = this.store$.pipe(select(fromOrganization.selectOrganizationDetails));
    this.isAdmin$ = this.store$.pipe(select(fromOrganization.selectAdminStatus));
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
    this.isAdmin$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((boolean) => {
      this.isAdmin = boolean;
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
    this.store$.dispatch(checkAdmin({id: orgID}))
  }

  onDonate(form) {
    this.store$.dispatch(donate({id: form.id, amount: form.amount, tip: form.tip, }));
  }

  onPause(data) {
    console.log(data);
    // TODO move to ngrx effect?
    this.contractService.pauseOrganization(data.id, data.causeIds);
  }

  onUnpause(data) {
    console.log(data);
    // TODO move to ngrx effect?
    this.contractService.unpauseOrganization(data.id, data.causeIds);
  }

  onAdd(data) {
    console.log(data);
    // incorporate uDonate isAdmin function?
    // TODO move to ngrx effect?
    this.contractService.addNewOrganizationAdmin(data.address, data.id);
  }

  onRemove(data) {
    console.log(data);
    // incorporate uDonate isAdmin function?
    // TODO move to ngrx effect?
    this.contractService.removeOrganizationAdmin(data.address, data.id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

