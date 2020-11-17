import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-detail-org',
  templateUrl: './detail-org.component.html',
  styleUrls: ['./detail-org.component.scss']
})
export class DetailOrgComponent implements OnInit, OnChanges {
  @Input() organization: object;
  amount = 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
  }


}
