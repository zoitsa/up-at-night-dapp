import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-detail-org',
  templateUrl: './detail-org.component.html',
  styleUrls: ['./detail-org.component.scss']
})
export class DetailOrgComponent implements OnInit, OnChanges {
  @Input() organization: object;
  @Input() adminStatus: boolean;
  @Output() donate = new EventEmitter<string>();
  @Output() pause = new EventEmitter<any>();
  @Output() unpause = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  myOrganization;
  walletBalance;
  orgAdminStatus;


  donateForm = this.fb.group({
    id: [null, Validators.required], // uint256
    amount: [null, Validators.required], // uint256
    tip: [null, Validators.required], // uint256
  })

  addAdminForm = this.fb.group({
    address: [null, Validators.required], // uint256
  })

  removeAdminForm = this.fb.group({
    address: [null, Validators.required], // uint256
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    console.log(this.adminStatus);
    this.myOrganization = this.organization;
    const balance = this.myOrganization.balence / 1e18
    this.walletBalance = balance.toFixed(2);
  }

  sendDonation() {
    this.donateForm.get('id').setValue(this.myOrganization.id);

    if (this.donateForm.valid) {
      this.donate.emit(this.donateForm.value);
    } 
  }

  pauseOrganization() {
    this.donateForm.get('id').setValue(this.myOrganization.id);
    this.pause.emit(
    {
      id: this.donateForm.value.id, 
      causeIds: [],
    })
  }

  unpauseOrganization() {
    this.donateForm.get('id').setValue(this.myOrganization.id);
    this.unpause.emit(
    {
      id: this.donateForm.value.id, 
      causeIds: [],
    })
  }

  addAdmin() {
    console.log(this.addAdminForm.value);
    console.log(this.donateForm.get('id'));
    if (this.addAdminForm.valid) { 
      this.add.emit({
        address: this.addAdminForm.value.address,
        id: this.myOrganization.id
      });
    }
  }

  removeAdmin() {
    console.log(this.removeAdminForm.value);
    console.log(this.removeAdminForm.valid);
    console.log(this.myOrganization.id);
    if (this.removeAdminForm.valid) { 
      this.remove.emit({
        address: this.removeAdminForm.value.address,
        id: this.myOrganization.id
      });
    }
  }


}
