import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { async } from 'q';
declare let require: any;
declare let window: any;

let tokenabi = require('./filesharing.json');

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private _account: string = null;
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress = '0x70995a6453E3ce54B2F824c91a05C8314D987871';

  constructor() {

    this._web3 = new Web3(window.web3.currentProvider);
    //console.log(this._web3.version);
    this._tokenContract = new this._web3.eth.Contract(tokenabi,this._tokenContractAddress);
  }

  public async getAccount(): Promise<string> {
   
    //await ethereum.enable();
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            console.log(err);
            alert('There was an error fetching your accounts.');
            return;
          }
  
          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          resolve(accs[0]);
        })
      }) as string;
  
      this._web3.eth.defaultAccount = this._account;
    }
  
    return Promise.resolve(this._account);
  }

  public async checkWhitelist (webAddress, userAddress): Promise<boolean> {
    let account = this.getAccount();
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.addUser.call(webAddress,'123','21', userAddress, async function (err, result) {
        if(err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    }) as Promise<boolean>;
  }

  public async checkUser (): Promise<boolean> {

    let account = await this.getAccount();
    console.log(account);	
   
     let resu;
      let _web3 = this._web3;
     console.log('going to call fn');
      this._tokenContract.methods.checkUserRegistration(account).call({from:account}).then(result=> { resu=result; console.log(result);return result;}) ;
      return resu;
  }

public async addUser () {

    let account = await this.getAccount();
    console.log(account);	
   
     
      let _web3 = this._web3;
     console.log('going to call fn2');
     this._tokenContract.methods.addUser(account,'123','123').send({from:account, gas:100000}).then(result=>console.log(result));
    
  }

  public async checkWebsite (webAddress): Promise<boolean> {
    let account = this.getAccount();
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.checkWebsiteRegistration.call(webAddress, async function (err, result) {
        if(err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    }) as Promise<boolean>;
  }
}


