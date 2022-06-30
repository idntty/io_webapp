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

  get data(){
    return this._data.map((elem) => ({
      ...elem,
      label: elem.label.charAt(0).toUpperCase()+elem.label.slice(1).split('_').join(' '),
      value: cryptography.decryptMessageWithPassphrase(elem.value, elem.value_nonce, registrationStore.passPhrase, registrationStore.pubKey).split(':')[1]
    }))
  }
}

export const userDataStore = new UserDataStore();