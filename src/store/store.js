import { reaction, makeAutoObservable } from "mobx";
import {cryptography} from "@liskhq/lisk-client";
import {getNodeInfo} from '../api/node';
import {fetchWrapper} from '../shared/fetchWrapper';

class Store {
  _accountData = {}

  _passPhrase='rocket north inform swift improve fringe sweet crew client canyon bean autumn'

  _nodeInfo = {}

  _userData = {}

  constructor() {
    makeAutoObservable(this);

    this.fetchNodeInfo()

    reaction(() => this.tokenKey, () => fetchWrapper.getAuth('http://3.125.47.101/api/data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }).then((res) => this.userDataFetchChange(res)))
  };

  fetchCreateNewAccount() {
    fetchWrapper.postAuth('http://3.125.47.101/api/data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }, [...this.encryptAccountData]).catch(()=>{})
  };

  fetchNewAccountData() {
    fetchWrapper.getAuth('http://3.125.47.101/api/data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }).then((res) => this.userDataFetchChange(res))
  }

  fetchChangeAccountData(data) {
    fetchWrapper.postAuth('http://3.125.47.101/api/data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }, [...data])
        .then(()=>this.fetchNewAccountData())
  }

  userDataFetchChange(res) {
    this._userData = res;
  }

  get userData() {
    return this._userData
  }

  savePassPhrase(phrase) {
    this._passPhrase = phrase
  }

  saveDataRegistration(data) {
    this._accountData = data;
  };

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

  get encryptAccountData() {
    return Object.keys(this.accountData).map((label) => {
      let value = cryptography.encryptMessageWithPassphrase(cryptography.getRandomBytes(32).toString('hex') + ":" + this.accountData[label], this.passPhrase, this.pubKey);
      return {
        "label": label,
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
