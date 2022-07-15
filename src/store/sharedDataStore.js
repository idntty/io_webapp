import { makeAutoObservable, reaction } from "mobx";
import { fetchWrapper } from "../shared/fetchWrapper";
import { registrationStore } from './store';

const labelMap = {
  firstname: 'First name',
  secondname: 'Second name',
  gender: "Gender",
  birthdate: "Birthdate",
  placeofbirth: "Place of birth",
  nationality: "Nationality",
  nationalid: "National ID",
  nationaldoctype: "National doctype",
  nationaldocid: "National doc ID",
  nationaldocissuedate: "National doc issue date",
  nationaldocexpirydate: "National doc expiry date",
  telephone: "Telephone",
  twitter: "Twitter",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "Youtube",
  wechat: "Wechat",
  tiktok: "Tiktok",
  linkedin: "Linkedin",
  vk: "Vk",
  github: "Github",
  telegram: "Telegram",
  qq: "Qq",
  snapchat: "Snapchat",
  reddit: "Reddit"
};

class SharedDataStore{
  _keysArray = [];
  _sharedData = [];

  constructor() {
    makeAutoObservable(this);

    reaction(() => ({data: registrationStore.keysArray}), ({data}) => {
      this._keysArray = data;
      this.fetchSharedData();
    })
  }

  fetchSharedData() {
    this._keysArray.forEach((elem) => fetchWrapper.get(`http://3.125.47.101/api/data/shared/${elem}`).then((res) => this.changeSharedData(res)))
  };

  changeSharedData(incomingData) {
    this._sharedData.push({
      data: incomingData.data,
    })
  }

  get sharedData() {
    return this._sharedData.map(elem => ({
      data: elem.data.map(item => ({
        label: labelMap[item.label],
        value: item.value,
      }))
  }));
  };
}

export const sharedDataStore = new SharedDataStore();