import { reaction, makeAutoObservable } from "mobx";
import {cryptography} from "@liskhq/lisk-client";

class RegistrationStore {
  _accountData = {}

  _passPhraseStore=''

  _pubKey = ''

  constructor() {
    makeAutoObservable(this);
    reaction(()=>this.passPhraseStore, ()=>this.savePubKey())
  };

  savePassPhrase(phrase) {
    this._passPhraseStore = phrase
  }

  saveDataRegistration(data) {
    this._accountData = data;
  };
  savePubKey() {
    this._pubKey = cryptography.bufferToHex(cryptography.getAddressAndPublicKeyFromPassphrase(this.passPhraseStore).publicKey)
  }

  get passPhraseStore() {
    return this._passPhraseStore
  }

  get accountData() {
    return this._accountData
  };

  get pubKey() {
    return this._pubKey
  }

};

export const registrationStore = new RegistrationStore();
