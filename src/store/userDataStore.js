import { cryptography } from "@liskhq/lisk-client";
import { makeAutoObservable, reaction } from "mobx";
import { registrationStore } from './store';

class UserDataStore{
  _data = []

  constructor() {
    makeAutoObservable(this);

    reaction(() => ({data: registrationStore.userData}), ({data}) => {
      this._data = data.data;
    })
  }

  get data() {
    return this._data;
  }
  get decryptData(){
    const labelMap = new Map;
    this._data.forEach(elem => 
      labelMap.set(elem.label.charAt(0).toUpperCase()+elem.label.slice(1).split('_').join(' '), 
      cryptography.decryptMessageWithPassphrase(elem.value, elem.value_nonce, registrationStore.passPhrase, registrationStore.pubKey).split(':')[1]
      )
    )
    return labelMap;
  }
}

export const userDataStore = new UserDataStore();