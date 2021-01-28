import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-detail-org',
  templateUrl: './detail-org.component.html',
  styleUrls: ['./detail-org.component.scss']
})
export class DetailOrgComponent implements OnInit, OnChanges {
  @Input() organization: object;
  @Output() donate = new EventEmitter<string>();
  @Output() pause = new EventEmitter<any>();
  @Output() unpause = new EventEmitter<any>();
  myOrganization;
  walletBalance;

  form = this.fb.group({
    id: [null, Validators.required], // uint256
    amount: [null, Validators.required], // uint256
    tip: [null, Validators.required], // uint256
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.myOrganization = this.organization;
    const balance = this.myOrganization.balence / 1e18
    this.walletBalance = balance.toFixed(2);
  }

  sendDonation() {
    this.form.get('id').setValue(this.myOrganization.id);

    if (this.form.valid) {
      this.donate.emit(this.form.value);
    } 
  }

  pauseOrganization() {
    this.form.get('id').setValue(this.myOrganization.id);
    this.pause.emit(
    {
      id: this.form.value.id, 
      causeIds: [],
    })
  }

  unpauseOrganization() {
    this.form.get('id').setValue(this.myOrganization.id);
    this.unpause.emit(
    {
      id: this.form.value.id, 
      causeIds: [],
    })
  }


}
