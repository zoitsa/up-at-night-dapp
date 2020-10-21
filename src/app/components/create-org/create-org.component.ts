import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss']
})
export class CreateOrgComponent implements OnInit {
  @Output() create = new EventEmitter();

  form = this.fb.group({
    id: [555, Validators.required], // uint256
    walletAddress: ['', Validators.required],
    name: ['', Validators.required],
    tokenAddress: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  Submit() {
    this.create.emit(this.form.value);
  }

}
