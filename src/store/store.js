import { reaction, makeAutoObservable, onBecomeObserved, onBecomeUnobserved} from "mobx";
import {cryptography} from "@liskhq/lisk-client";
import { passphrase } from "@liskhq/lisk-client";
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

  _passPhrase

  _nodeInfo = {}

  _userData = []

  _keysArray = []

  _sharedData = []

  _transactionsInfo = []

  constructor() {
    makeAutoObservable(this, {});

    this.fetchNodeInfo()

    reaction(() => this.keysArray, () => this.fetchSharedData())
    onBecomeObserved(this, "decryptedUserData", () => this.fetchNewAccountData())
    onBecomeObserved(this, "sharedData", () => this.fetchKeysArray())
    onBecomeUnobserved(this, "sharedData", () => this.unobservedSharedData())
    onBecomeObserved(this, "transactionsInfo", () => this.fetchTransactionsInfo())
    onBecomeUnobserved(this, "transactionsInfo", () => this.unobservedTransactionsInfo())
  };

  fetchNewAccountData() {
    getNodeInfo()
      .then((info)=>{
        this.fetchNodeInfoSuccess(info)
        fetchWrapper.getAuth('data/private', {
          networkIdentifier: this.nodeInfo.networkIdentifier,
          lastBlockID: this.nodeInfo.lastBlockID
        }).then((res) => this.userDataFetchChange(res))
      })
      .catch((err) => this.fetchNodeInfoFailed(err))
  }

  pushAccountData(data = this.accountData) {
    fetchWrapper.postAuth('data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }, [...this.encryptAccountData(data)])
      .then(() => this.fetchNewAccountData())
  }

  fetchKeysArray() {
    getNodeInfo()
      .then((info)=>{
        this.fetchNodeInfoSuccess(info)
        fetchWrapper.getAuth('data/shared/', {
          networkIdentifier: this.nodeInfo.networkIdentifier,
          lastBlockID: this.nodeInfo.lastBlockID
        }).then((res) => this.keysArrayFetchChange(res))
      })
      .catch((err) => this.fetchNodeInfoFailed(err))
  }

  fetchTransactionsInfo() {
    fetchWrapper.get("account/transactions/71ccaeefe22050abc9b36ce0c1744316c11c49e1", {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }).then((res) => this.saveInfoTransactions(res))
  };

  generatePassPhrase() {
    this._passPhrase = passphrase.Mnemonic.generateMnemonic();
    sessionStorage.setItem('passPhrase', this._passPhrase);
  };

  fetchSharedData() {
    this._keysArray.forEach((elem) => fetchWrapper.get(`data/shared/${elem}`).then((res) => this.changeSharedData(res)))
  };

  unobservedTransactionsInfo() {
    this._transactionsInfo = []
  };

  unobservedSharedData() {
    this._sharedData = []
  };

  changeSharedData(incomingData) {
    this._sharedData.push({
      data: incomingData.data,
    })
  }

  savePastPassPhrase(phrase) {
    this._passPhrase = phrase;
    sessionStorage.setItem('passPhrase', this._passPhrase);
  };

  saveDataRegistration(data) {
    this._accountData = data;
  };

  fetchNodeInfo() {
    getNodeInfo()
      .then((info)=>this.fetchNodeInfoSuccess(info))
      .catch((err) => this.fetchNodeInfoFailed(err))
  }

  saveInfoTransactions(transaction) {
    this._transactionsInfo = transaction.data
  }

  userDataFetchChange(res) {
    this._userData = res.data;
  }

  keysArrayFetchChange(res) {
    this._keysArray = res.data;
  }

  fetchNodeInfoSuccess(info) {
    this._nodeInfo = info.data;
  }

  fetchNodeInfoFailed(err) {
    console.log(err);
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
    return this._transactionsInfo.map(item => {
      return {
        id: item.id,
        users_images: usersImages.map(image => {
          return {
            image: image,
            size: 24
          }
        }),
        transaction: item.asset.features.map(asset => {
          return {
            transaction_id: item.id,
              address: item.asset.recipientAddress && cryptography.bufferToHex(cryptography.getAddressFromPublicKey(cryptography.hexToBuffer(item.senderPublicKey))),
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
        label: item.key,
        value: value.encryptedMessage,
        value_nonce: value.nonce,
      }
    })
  }

  get keysArray() {
    return this._keysArray;
  }

  get passPhrase() {
    if(sessionStorage.getItem('passPhrase')) {
      this._passPhrase = sessionStorage.getItem('passPhrase')
    }
    return this._passPhrase
  }

  get accountData() {
    return this._accountData
  };

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
