import { cryptography } from "@liskhq/lisk-client";
import { makeAutoObservable, reaction } from "mobx";
import { registrationStore } from './store';

const labelMap = {
  first_name: 'First name',
  second_name: 'Second name',
  gender: "Gender",
  birthdate: "Birthdate",
  place_of_birth: "Place of birth",
  nationality: "Nationality",
  national_id: "National id",
  national_doctype: "National doctype",
  national_doc_id: "National doc id",
  national_doc_issue_date: "National doc issue date",
  national_doc_expiry_date: "National doc expiry date",
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

class UserDataStore{
  _data = [];

  constructor() {
    makeAutoObservable(this);

    reaction(() => ({data: registrationStore.userData}), ({data}) => {
      this._data = data.data;
    })
  }
  get decryptedData(){
    return this._data.map((elem) => ({
      ...elem,
      key: elem.label,
      label: labelMap[elem.label],
      value: cryptography.decryptMessageWithPassphrase(elem.value, elem.value_nonce, registrationStore.passPhrase, registrationStore.pubKey).split(':')[1]
    }))
  }
}

export const userDataStore = new UserDataStore();
