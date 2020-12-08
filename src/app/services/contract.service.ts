import { Injectable } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject, } from 'rxjs';
import { uDonate_address, uDonate_abi } from '../../abis.js'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  web3js: any;
  provider: any;
  accounts: any;
  uDonate: any;
  web3Modal

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();
  private newOrganization = new Subject<any>();
  newOrganization$ = this.newOrganization.asObservable();

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
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.accountStatusSource.next(this.accounts)
  }

  async createOrganization(orgID, payableWallet, orgName, tokenAddress) {
    // --- temporarily re-initializating these for the effect file 
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 

    console.log(orgID);
    console.log(payableWallet);
    console.log(orgName);
    console.log(tokenAddress);
    
    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);

    const create = await this.uDonate
      .methods.createOrganization(orgID, payableWallet, orgName, tokenAddress)
      .send({ from: this.accounts[0] });
    // this.newOrganization.next(create)
    return create;
  }

  async getOrganization(orgID) {
    // --- temporarily re-initializating these for the effect file 
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    
    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    
    const org = await this.uDonate.methods.getOrganization(orgID).call({ from: this.accounts[0] });
    
    const organization = org;
    const walletAddress = organization[1];
    const balence = await this.web3js.eth.getBalance(walletAddress);

    const orgWithBalence = {
      id: organization[0],
      payableWallet: organization[1],
      paused: organization[2],
      ended: organization[3],
      causesIDs: organization[4],
      balence: balence,
    }
     console.log(orgWithBalence);
    return orgWithBalence;
  }

  async donate(id, amount, tip) {
    console.log('hi');
    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    console.log(this.uDonate);

    const updatedAmt = amount * 1e18;

    const donate = await this.uDonate.methods.donate(555, amount, tip).send({ value: 100000000000000000, from: this.accounts[0] })
    // const donate = await this.uDonate.methods.donate(id, tip).send({ value: updatedAmt })
    console.log(donate);

  }



}

