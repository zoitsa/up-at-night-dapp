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
  myOrganization;

  form = this.fb.group({
    id: [null, Validators.required], // uint256
    amount: [null, Validators.required], // uint256
    tip: [null, Validators.required], // uint256
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.myOrganization);
    
  }

  ngOnChanges() {
    this.myOrganization = this.organization;
  }

  sendDonation() {
    this.form.get('id').setValue(this.myOrganization.id);

    if (this.form.valid) {
      this.donate.emit(this.form.value);
    }
    
    
  }


}
