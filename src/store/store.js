import {reaction, makeAutoObservable, onBecomeObserved, onBecomeUnobserved} from "mobx";
import {cryptography} from "@liskhq/lisk-client";
import { passphrase, transactions } from "@liskhq/lisk-client";
import {getNodeInfo} from '../api/node';
import {fetchWrapper} from '../shared/fetchWrapper';
import {labelMap} from "../shared/labelMap";
import {generateSvgAvatar} from "../images/GenerateOnboardingSvg/GenerateSvg";
import {
  encryptAccountData,
  generateSetTransaction, generateTransaction,
  hashAccountData,
} from '../utils/Utils';
import {
  removeFeatureAssetSchema,
  setFeatureAssetSchema,
} from '../utils/Schemas';

class Store {
  _accountData = []

  _passPhrase = ''

  _nodeInfo = {}

  _keysArray = []

  _sharedData = []

  _transactionsInfo = []

  _accountInfo = {};

  _loading = false;

  constructor() {
    makeAutoObservable(this, {});

    reaction(() => this.keysArray, () => this.fetchSharedData())
    reaction(() => this.address, () => this.fetchAccountInfo())
    onBecomeObserved(this, "decryptedAccountData", () => this.fetchNewAccountData())
    onBecomeObserved(this, "sharedData", () => this.fetchKeysArray())
    onBecomeUnobserved(this, "sharedData", () => this.unobservedSharedData())
    onBecomeObserved(this, "transactionsInfo", () => this.fetchTransactionsInfo())
    onBecomeUnobserved(this, "transactionsInfo", () => this.unobservedTransactionsInfo())

    this.fetchNodeInfo()
  };

  fetchNewAccountData() {
    getNodeInfo()
      .then((info)=>{
        this.fetchNodeInfoSuccess(info)
        fetchWrapper.getAuth('data/private', {
          networkIdentifier: this.nodeInfo.networkIdentifier,
          lastBlockID: this.nodeInfo.lastBlockID
        }).then((res) => this.accountDataFetchChange(res))
      })
      .catch((err) => this.fetchNodeInfoFailed(err))
  }

  fetchAccountInfo() {
    fetchWrapper.get(`accounts/${this.address}`).then((res) => this.fetchAccountInfoSuccess(res))
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
    fetchWrapper.get(`account/transactions/${this.address}`, {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }).then((res) => this.saveInfoTransactions(res))
  };

  fetchPassPhrase() {
    this._passPhrase = sessionStorage.getItem('passPhrase') || ''
  }

  fetchSharedData() {
    this._keysArray.forEach((elem) => fetchWrapper.get(`data/shared/${elem}`).then((res) => this.changeSharedData(res)))
  };

  fetchNodeInfo() {
    getNodeInfo()
    .then((info)=>this.fetchNodeInfoSuccess(info))
    .catch((err) => this.fetchNodeInfoFailed(err))
  }

  pushAccountData(data = this.accountData) {
    fetchWrapper.postAuth('data/private', {
      networkIdentifier: this.nodeInfo.networkIdentifier,
      lastBlockID: this.nodeInfo.lastBlockID
    }, [...encryptAccountData(data, this.passPhrase, this.pubKey)])
      .then(() => this.fetchNewAccountData())
  }

  pushAccountDataToBlockchain(data = this.decryptedAccountData) {
    const [removed, changed] = hashAccountData(data, this.decryptedAccountData, this.accountFeaturesMap)

    const builder = generateTransaction(BigInt(this.accountInfo?.sequence?.nonce || 0), this.addressAndPubKey.publicKey, this.nodeInfo.networkIdentifier, this.passPhrase);

    let signedTx = null;

    if(removed.length !== 0)
      signedTx = builder.remove(removed);

    if(changed.length !== 0)
      signedTx = builder.update(changed)

    if(signedTx) {
      fetchWrapper.post('transactions', {}, signedTx);
      this.accountInfo.sequence.nonce++;
    }
  }



  generatePassPhrase() {
    this._passPhrase = passphrase.Mnemonic.generateMnemonic();
    sessionStorage.setItem('passPhrase', this._passPhrase);
  };

  savePastPassPhrase(phrase) {
    this._passPhrase=phrase
    sessionStorage.setItem('passPhrase', this._passPhrase);
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

  saveDataRegistration(data) {
    this._accountData = data;
  };

  clearDataRegistration() {
    this._accountData = [];
  };

  saveInfoTransactions(transaction) {
    this._transactionsInfo = transaction.data
  }

  accountDataFetchChange(res) {
    if (res.data) {
      this._accountData = res.data;
    }
  };

  keysArrayFetchChange(res) {
    this._keysArray = res.data;
  }

  fetchNodeInfoSuccess(info) {
    this._nodeInfo = info.data;
    this.fetchPassPhrase()
  }

  fetchNodeInfoFailed(err) {
    console.log(err);
  }

  fetchAccountInfoSuccess(res) {
    this._accountInfo = res.data;
    if(this.accountInfo?.sequence?.nonce)
      this.accountInfo.sequence.nonce = parseInt(this.accountInfo.sequence.nonce) || 0
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
        sender_avatar: item.asset.recipientAddress && generateSvgAvatar(item.senderPublicKey),
        avatar_size: 24,
        transaction: item.asset.features.map(asset => {
          return {
            transaction_id: item.id,
            address: item.asset.recipientAddress && cryptography.bufferToHex(cryptography.getAddressFromPublicKey(cryptography.hexToBuffer(item.senderPublicKey))),
            value: asset.value,
            label: labelMap[asset.label] || asset.label
          }
        })
      }
    })
  }

  get decryptedAccountData() {
    const allAccountData=this._accountData.concat(this.accountFeatures.filter(item=>!this._accountData.find(elem=>elem.label===item.label)))
    return allAccountData.map((elem) => {
      const initialData={
        ...elem,
        key: elem.label,
        label: labelMap[elem.label] || elem.label,
        status: '',
        value: '',
        seed: ''
      }
      if(!this._accountData.find(item=>item.label===elem.label)) {
        return {
          ...initialData,
          status: 'Blockchained',
          value: `${elem.value.slice(0,4)}****${elem.value.slice(elem.value.length-4)}`
        }
      }
      const [seed, value] = cryptography.decryptMessageWithPassphrase(elem.value, elem.value_nonce, this.passPhrase, this.pubKey).split(':');
      const hashValue=cryptography.hash(Buffer.concat([Buffer.from(seed, 'utf8'), cryptography.hash(value, 'utf8')])).toString('hex')
      if(!this.accountFeatures.find(item=>item.label===elem.label)) {
        return {
          ...initialData,
          status: 'Stored',
          value,
          seed
        }
      }
      if(this.accountFeatures.find(item=>item.label===elem.label).value!==hashValue) {
        return {
          ...initialData,
          status: 'Incorrect',
          value,
          seed
        }
      }
      return {
        ...initialData,
        status: 'Completed',
        value,
        seed
      }
    })
  }

  get firstName() {
    return this.decryptedAccountData.find(item => item.key === 'firstname')?.value
  }

  get lastName() {
    return this.decryptedAccountData.find(item => item.key === 'secondname')?.value
  }

  get accountName() {
    return this.firstName || this.lastName || this.pubKey
  }

  get keysArray() {
    return this._keysArray;
  }

  get passPhrase() {
    return this._passPhrase
  }

  get accountData() {
    return this._accountData
  };

  get accountInfo() {
    return this._accountInfo;
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
    return this.addressAndPubKey.address.toString('hex')
  }

  get tokenKey() {
    const stringToSign = this.nodeInfo.networkIdentifier + this.nodeInfo.lastBlockID;
    if(!stringToSign)
      return '';
    const sign = cryptography.signDataWithPassphrase(Buffer.from(stringToSign, 'hex'), this.passPhrase).toString('hex')
    return this.pubKey + ':' +sign
  }

  get accountIdentity() {
    return this.accountInfo?.identity || {};
  }

  get accountFeatures() {
    return this.accountIdentity?.features || [];
  }

  get accountFeaturesMap() {
    return this.accountFeatures.reduce((acc, item) => ({
      ...acc,
      [item.label]: item.value
    }), {})
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
  }
}

export const store = new Store();
