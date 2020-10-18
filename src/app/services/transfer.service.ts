import { Injectable } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject } from 'rxjs';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private readonly web3: any;
  private enable: any;
  web3Modal
  connected = false;
  name;
  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });

    // if (window.ethereum === undefined) {
    //   alert('Non-Ethereum browser detected. Install MetaMask');
    // } else {
    //   if (typeof window.web3 !== 'undefined') {
    //     this.web3 = window.web3.currentProvider;
    //   } else {
    //     this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
    //   }
    //   console.log('transfer.service :: constructor :: window.ethereum');
    //   window.web3 = new Web3(window.ethereum);
    //   console.log('transfer.service :: constructor :: this.web3');
    //   console.log(this.web3);
    //   this.enable = this.enableMetaMaskAccount();
    // }
   }


  //  private async enableMetaMaskAccount(): Promise<any> {
  //   let enable = false;
  //   await new Promise((resolve, reject) => {
  //     enable = window.ethereum.enable();
  //   });
  //   return Promise.resolve(enable);
  // }

  async connectAccount() {

    console.log('click');
    this.web3Modal.clearCachedProvider();
    const provider = await this.web3Modal.connect();
    console.log('provider');
    console.log(provider);
    const web3 = new Web3(provider);
    console.log('web3')
    console.log(web3)
    const accounts = await web3.eth.getAccounts();
    console.log('accounts');
    console.log(accounts)

    this.accountStatusSource.next(accounts)
    // set up some logic to tell component whether connected or not
  }



}

