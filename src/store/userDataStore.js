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

  get userData(){
    return this._data.map((elem) => ({
      ...elem,
      value: cryptography.decryptMessageWithPassphrase(elem.value, elem.value_nonce, registrationStore.passPhrase, registrationStore.pubKey)
    }))
  }
}

export const userDataStore = new UserDataStore();