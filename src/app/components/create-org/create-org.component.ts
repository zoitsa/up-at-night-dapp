import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss']
})
export class CreateOrgComponent implements OnInit {
  @Output() create = new EventEmitter();

  createOrganization = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    address: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  Submit() {
    this.create.emit();
    console.log(this.createOrganization.value);
  }

}
