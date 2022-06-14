import { reaction, makeAutoObservable } from "mobx";

class RegistrationStore {
  _accountData = {};

  constructor() {
    makeAutoObservable(this);
    reaction(() => this.accountData, () => this.saveDataRegistration())
  };

  saveDataRegistration(data) {
    this._accountData = data;
  };

  accountData() {
    return this._accountData
  };

};


export const registrationStore = new RegistrationStore();
