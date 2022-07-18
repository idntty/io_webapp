import { reaction, makeAutoObservable, onBecomeObserved, onBecomeUnobserved} from "mobx";
import {cryptography} from "@liskhq/lisk-client";
import {getNodeInfo} from '../api/node';
import {fetchWrapper} from '../shared/fetchWrapper';
import {labelMap} from "../shared/labelMap";
import User08 from "../images/user-28-08.jpg";
import User06 from "../images/user-28-06.jpg";
import User05 from "../images/user-28-05.jpg";
import User09 from "../images/user-28-09.jpg";

const usersImages = [User08,User06,User05,User09];

class Store {
  _accountData = []

  _passPhrase='rocket north inform swift improve fringe sweet crew client canyon bean autumn'

  _nodeInfo = {}

  _userData = []

  _keysArray = []

  _sharedData = []

  _transactionsInfo = []

  constructor() {
    makeAutoObservable(this);

    this.fetchNodeInfo()

    reaction(()=>this.keysArray, ()=>this.fetchSharedData())
    onBecomeObserved(this, "userData", () => this.fetchNewAccountData())
    onBecomeObserved(this, "transactionsInfo", ()=>this.fetchTransactionsInfo())
    onBecomeUnobserved(this, "transactionsInfo", ()=>this.unobservedTransactionsInfo())
    onBecomeObserved(this, "sharedData", ()=>this.fetchKeysArray())
  };

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
    fetchWrapper.getAuth(
      'data/shared',
      {
        networkIdentifier: this.nodeInfo.networkIdentifier,
        lastBlockID: this.nodeInfo.lastBlockID
      }).then((res) => this.keysArrayFetchChange(res))
  }

  fetchTransactionsInfo() {
    fetchWrapper.getAuth(`account/transactions/${this.accountMadeTransaction}?moduleID=1001&assetID=11`, {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    })
        .then((res)=>this.saveInfoTransactions(res))
  }

  fetchSharedData() {
    this._keysArray.forEach((elem) => fetchWrapper.get(`data/shared/${elem}`).then((res) => this.changeSharedData(res)))
  };

  unobservedTransactionsInfo() {
    this._transactionsInfo=[]
  }

  changeSharedData(incomingData) {
    this._sharedData.push({
      data: incomingData.data,
    })
  }

  get accountMadeTransaction() {
    return "b444b7ff3118cf2a30cbd54cfcdb8fd5d805017a"
  }

  get keysArray() {
    return this._keysArray;
  }

  get userData() {
    return this._userData;
  }

  savePassPhrase(phrase) {
    this._passPhrase = phrase
  }

  saveDataRegistration(data) {
    this._accountData = data;
  };

  saveInfoTransactions(transaction) {
    this._transactionsInfo = transaction.data
  }

  userDataFetchChange(res) {
    this._userData = res.data;
  }

  keysArrayFetchChange(res) {
    this._keysArray = res.data;
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
  }

  get sharedData() {
    return this._sharedData.map(elem => ({
      data: elem.data.map(item => ({
        label: labelMap[item.label],
        value: item.value,
      }))
    }));
  };

  get transactionsInfo() {
    return this._transactionsInfo.map(item=>{
      return {
        id: item.id,
        users_images: usersImages.map(image=>{
          return {
            image: image,
            size: 24
          }
        }),
        transaction: item.asset.features.map(asset=>{
          return {
            transaction_id: item.id,
            address: this.accountMadeTransaction,
            value: asset.value,
            label: labelMap[asset.label],
          }
        })
      }
    })
  }

  get decryptedUserData(){
    return this._userData.map((elem) => ({
      ...elem,
      key: elem.label,
      label: labelMap[elem.label],
      value: cryptography.decryptMessageWithPassphrase(elem.value, elem.value_nonce, registrationStore.passPhrase, registrationStore.pubKey).split(':')[1]
    }))
  }

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
