import { reaction, makeAutoObservable } from "mobx";
import {cryptography} from "@liskhq/lisk-client";
import {getNodeInfo} from '../api/node';
import {fetchWrapper} from '../shared/fetchWrapper';

class Store {
  _accountData = []

  _passPhrase='rocket north inform swift improve fringe sweet crew client canyon bean autumn'

  _nodeInfo = {}

  _userData = {}

  _keysArray = []
  
  _transactionsInfo = {}

  constructor() {
    makeAutoObservable(this);

    this.fetchNodeInfo()

    reaction(() => this.tokenKey, () => this.getData())
    reaction(() => this.tokenKey, () => this.fetchTransactionsInfo())
  };

  getData() {
    this.fetchNewAccountData();
    this.fetchKeysArray();
  }

  fetchNewAccountData() {
    fetchWrapper.getAuth('data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }).then((res) => this.userDataFetchChange(res))
  }

  pushAccountData(data=this.accountData) {
    fetchWrapper.postAuth('data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }, [...this.encryptAccountData(data)])
        .then(()=>this.fetchNewAccountData())
  }

  fetchKeysArray() {
    fetchWrapper.getAuth('data/shared/', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }).then((res) => this.keysArrayFetchChange(res))
  }

  fetchTransactionsInfo() {
    fetchWrapper.getAuth(`http://3.125.47.101/api/account/transactions/${this.accountMadeTransaction}?moduleID=1001&assetID=11`, {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }).then((res)=>this.saveInfoTransactions(res))
  }

  get accountMadeTransaction() {
    return "b444b7ff3118cf2a30cbd54cfcdb8fd5d805017a"
  }

  userDataFetchChange(res) {
    this._userData = res;
  }

  keysArrayFetchChange(res) {
    this._keysArray = res.data;
  }

  get keysArray() {
    return this._keysArray;
  }

  get userData() {
    return this._userData;
  }

  get transactionsInfo() {
    return this._transactionsInfo
  }

  savePassPhrase(phrase) {
    this._passPhrase = phrase
  }

  saveDataRegistration(data) {
    this._accountData = data;
  };

  saveInfoTransactions(transaction) {
    this._transactionsInfo = transaction
  }

  fetchNodeInfo() {
    getNodeInfo()
      .then((info) => this.fetchNodeInfoSuccess(info))
      .catch((err) => this.fetchNodeInfoFailed(err))
  }

  fetchNodeInfoSuccess(info) {
    this._nodeInfo = info.data;
  }

  fetchNodeInfoFailed(err) {
    console.log(err)
  }

  get passPhrase() {
    return 'rocket north inform swift improve fringe sweet crew client canyon bean autumn'
  }

  get accountData() {
    return this._accountData
  };

  encryptAccountData(data) {
    return data.map((item) => {
      let value = cryptography.encryptMessageWithPassphrase(cryptography.getRandomBytes(32).toString('hex') + ":" + item.value, this.passPhrase, this.pubKey);
      return {
        "label": item.key,
        "value": value.encryptedMessage,
        "value_nonce": value.nonce,
      }
    })
  }

  get nodeInfo() {
    return this._nodeInfo;
  }

  get addressAndPubKey() {
    return cryptography.getAddressAndPublicKeyFromPassphrase(this.passPhrase);
  }

  get pubKey() {
    return this.addressAndPubKey.publicKey.toString('hex');
  }

  get address() {
    return cryptography.bufferToHex(this.addressAndPubKey.address)
  }

  get tokenKey() {
    const stringToSign = this.nodeInfo.networkIdentifier + this.nodeInfo.lastBlockID;
    if(!stringToSign)
      return '';
    const sign = cryptography.signDataWithPassphrase(Buffer.from(stringToSign, 'hex'), this.passPhrase).toString('hex')
    return this.pubKey + ':' +sign
  }
};

export const registrationStore = new Store();
