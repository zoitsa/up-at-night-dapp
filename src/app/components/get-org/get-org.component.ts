import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-org',
  templateUrl: './get-org.component.html',
  styleUrls: ['./get-org.component.scss']
})
export class GetOrgComponent implements OnInit {
  @Output() get = new EventEmitter();
 
  form = this.fb.group({
    id: [null, Validators.required], // uint256
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  Submit() {
    this.get.emit(this.form.value);
  }

}
