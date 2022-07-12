import {makeAutoObservable, reaction} from "mobx";
import {registrationStore} from "./store";

const labelMap = {
  firstname: 'First name',
  secondname: 'Second name',
  gender: "Gender",
  birthdate: "Birthdate"
};

class ValidationLogStore {
  _transactionData = [];

  constructor() {
    makeAutoObservable(this)

    reaction(() => ({data: registrationStore.transactionInfo}), ({data}) => {
      this._transactionData = data.data;
    })
  }

  get transactionData() {
    return this._transactionData.map(item=>{
      return {
        id: item.id,
        assets: item.asset.features.map(asset=>{
          return {
            transaction_id: item.id,
            address: item.asset.recipientAddress,
            value: asset.value,
            label: labelMap[asset.label],
          }
        })
      }
    })
  }
}

export const validationLogStore = new ValidationLogStore()
