import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  @Output() connect = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  connectAccount() {
    this.connect.emit();
  }

}
