import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../services/transfer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TransferService],
})
export class HomeComponent implements OnInit {
  accountConnected = false;

  constructor(
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
  }

  onConnect() {
    this.transferService.connectAccount();

    this.transferService.accountStatus$.subscribe(data => {
      if (data) {
        this.accountConnected = true;
      }
    });
  }

  onCreate() {
    console.log('created');
    // this.transferService...
  }

}

