import { Injectable } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Observable, Subject } from 'rxjs';
import { uDonate_address, uDonate_abi } from '../../abis.js'
import { from } from 'rxjs';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private web3js: any;
  private provider: any;
  private enable: any;
  private accounts: any;
  private uDonate: any;
  web3Modal
  connected = false;
  name;

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();
  private newOrganization = new Subject<any>();
  newOrganization$ = this.newOrganization.asObservable();
  private organization = new Subject<any>();
  organization$ = this.organization.asObservable();

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

    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts)
  }

  async createOrganization(orgID, payableWallet, orgName, tokenAddress) {
    console.log(this.web3js);
    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);

    const create = await this.uDonate.methods.createOrganization(orgID, payableWallet, orgName, tokenAddress).send({ from: this.accounts[0] });
    this.newOrganization.next(create)
  }

  async getOrganization(orgID) {
    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    const get = await this.uDonate.methods.getOrganization(orgID).send({ from: this.accounts[0] });
    this.organization.next(get)
  }



}

