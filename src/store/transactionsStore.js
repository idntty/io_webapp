import {makeAutoObservable, reaction} from "mobx";
import {registrationStore} from "./store";
import User05 from "../../src/images/user-28-05.jpg";
import User08 from "../../src/images/user-28-08.jpg";
import User09 from "../../src/images/user-28-09.jpg";
import User06 from "../../src/images/user-28-06.jpg";

const labelMap = {
  firstname: 'First name',
  secondname: 'Second name',
  gender: "Gender",
  birthdate: "Birthdate"
};

const usersImages = [User08,User06,User05,User09];

class TransactionsStore {
  _transactionsData = [];

  constructor() {
    makeAutoObservable(this)

    reaction(() => ({data: registrationStore.transactionsInfo}), ({data}) => {
      this._transactionsData = data.data;
    })
  }

  get transactionsData() {
    return this._transactionsData.map(item=>{
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
            address: item.asset.recipientAddress,
            value: asset.value,
            label: labelMap[asset.label],
          }
        })
      }
    })
  }
}

export const transactionsStore = new TransactionsStore()
