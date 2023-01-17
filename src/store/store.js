import { reaction, makeAutoObservable, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import { cryptography, transactions } from '@liskhq/lisk-client';
import { passphrase } from '@liskhq/lisk-client';
import { getNodeInfo } from '../api/node';
import { fetchWrapper } from '../shared/fetchWrapper';
import { labelMap } from '../shared/labelMap';
import { statusMap } from '../shared/statusMap';
import { generateSvgAvatar } from '../images/GenerateOnboardingSvg/GenerateSvg';
import { decryptedData } from '../utils/decryptedData';
import {
  encryptAccountData,
  encryptSharedData,
  formatBytes,
  generateTransaction,
  hashAccountData,
} from '../utils/Utils';
import sodium from 'sodium-universal';
import { countryCodes } from '../utils/countryCodes';

class Store {
  _accountData = [];

  _passPhrase = '';

  _nodeInfo = {};

  _keysArray = [];

  _sharedData = [];

  _transactionsInfo = [];

  _accountInfo = {};

  _loading = false;

  _tempTransactions = [];

  _vpnServers = [];

  _canVPN = false;

  _delegates = {
    data: [],
    meta: {
      count: 0,
      limit: 0,
      offset: 0,
    },
  };

  _notifications = [];

  _tmpPassPhrase = '';

  constructor() {
    makeAutoObservable(this, {});

    reaction(
      () => this.keysArray,
      () => this.fetchSharedData()
    );
    reaction(
      () => this.address,
      () => this.fetchAccountInfo()
    );
    onBecomeObserved(this, 'decryptedAccountData', () => this.fetchNewAccountData());
    onBecomeUnobserved(this, 'decryptedAccountData', () => this.unobservedAccountData());
    onBecomeObserved(this, 'sharedData', () => this.fetchKeysArray());
    onBecomeUnobserved(this, 'sharedData', () => this.unobservedSharedData());
    onBecomeObserved(this, 'transactionsInfo', () => this.fetchTransactionsInfo());
    onBecomeUnobserved(this, 'transactionsInfo', () => this.unobservedTransactionsInfo());
  }

  fetchVPNServers() {
    fetchWrapper
      .getAuth('vpn/servers', {
        networkIdentifier: this.nodeInfo.networkIdentifier,
        lastBlockID: this.nodeInfo.lastBlockID,
      })
      .then((r) => this.fetchVPNServersSuccess(r));
  }

  fetchDelegates(offset = 0, limit = 100) {
    fetchWrapper
      .getAuth(`delegates?limit=${limit}&offset=${offset}`)
      .then((r) => this.fetchDelegatesSuccess(r));
  }

  fetchNewAccountData() {
    if (!this.nodeInfo.networkIdentifier || !this.nodeInfo.lastBlockID) return;
    fetchWrapper
      .getAuth('data/private', {
        networkIdentifier: this.nodeInfo.networkIdentifier,
        lastBlockID: this.nodeInfo.lastBlockID,
      })
      .then((res) => this.accountDataFetchChange(res))
      .catch((err) => this.throwError(err, true));
  }

  fetchAccountInfo() {
    if (!this.passPhrase || !this.address) return;
    fetchWrapper
      .get(`accounts/${this.address}`)
      .then((res) => this.fetchAccountInfoSuccess(res))
      .catch((err) => this.throwError(err, true));
  }

  fetchKeysArray() {
    getNodeInfo()
      .then((info) => {
        this.fetchNodeInfoSuccess(info);
        fetchWrapper
          .getAuth('data/shared/', {
            networkIdentifier: this.nodeInfo.networkIdentifier,
            lastBlockID: this.nodeInfo.lastBlockID,
          })
          .then((res) => this.keysArrayFetchChange(res));
      })
      .catch((err) => this.throwError(err));
  }

  fetchTransactionsInfo() {
    fetchWrapper
      .get(`account/transactions/${this.address}`, {
        networkIdentifier: this.nodeInfo.networkIdentifier,
        lastBlockID: this.nodeInfo.lastBlockID,
      })
      .then((res) => this.saveInfoTransactions(res))
      .catch((err) => this.throwError(err));
  }

  fetchTempTransactions() {
    fetchWrapper
      .get('node/transactions')
      .then((res) => this.fetchTempTransactionsSuccess(res))
      .catch((err) => this.throwError(err));
  }

  fetchPassPhrase() {
    this._passPhrase = sessionStorage.getItem('passPhrase') || '';
  }

  fetchSharedData() {
    this._keysArray.forEach((elem) => {
      fetchWrapper
        .get(`data/shared/${elem}`)
        .then((res) => this.changeSharedData(res, elem))
        .catch((err) => this.throwError(err));
    });
  }

  fetchNodeInfo() {
    getNodeInfo()
      .then((info) => this.fetchNodeInfoSuccess(info))
      .catch((err) => this.throwError(err));
  }

  pushSharedData(data, pubKey = this.pubKey) {
    data = data.filter((item) => item.status !== statusMap.blockchained);
    if (data.length > 0) {
      fetchWrapper
        .postAuth(
          'data/shared',
          {
            networkIdentifier: this.nodeInfo.networkIdentifier,
            lastBlockID: this.nodeInfo.lastBlockID,
          },
          {
            publickey: this.pubKey,
            shared: encryptSharedData(data, this.passPhrase, pubKey),
          }
        )
        .catch((err) => this.throwError(err));
    }
  }

  pushAccountData(data = this.accountData, onFinish = () => {}) {
    fetchWrapper
      .postAuth(
        'data/private',
        {
          networkIdentifier: this.nodeInfo.networkIdentifier,
          lastBlockID: this.nodeInfo.lastBlockID,
        },
        [...encryptAccountData(data, this.passPhrase, this.pubKey)]
      )
      .then(onFinish)
      .catch((err) => this.throwError(err));
  }

  pushFirstBalanceRequest(onFinish = () => {}) {
    fetchWrapper
      .postAuth(
        'faucet/fundbyaccount',
        {
          networkIdentifier: this.nodeInfo.networkIdentifier,
          lastBlockID: this.nodeInfo.lastBlockID,
        },
        {}
      )
      .then(onFinish)
      .catch((err) => this.throwError(err));
  }

  pushAccountDataToBlockchain(data = this.decryptedAccountData) {
    const [removed, changed] = hashAccountData(
      data,
      this.decryptedAccountData,
      this.accountFeaturesMap
    );
    console.log(this.decryptedAccountData);
    const builder = generateTransaction(
      BigInt(this.accountInfo?.sequence?.nonce || 0),
      this.addressAndPubKey.publicKey,
      this.nodeInfo.networkIdentifier,
      this.passPhrase,
      this.nodeInfo?.genesisConfig?.minFeePerByte,
      this.nodeInfo?.genesisConfig?.baseFees
    );

    let signedTx = null;

    if (removed.length !== 0) signedTx = builder.remove(removed);

    if (changed.length !== 0) signedTx = builder.update(changed);
    if (signedTx) {
      fetchWrapper
        .post('transactions', {}, signedTx)
        .then(() => this.fetchTempTransactions())
        .catch((err) => this.throwError(err));
      this.accountInfo.sequence.nonce++;
    }
  }

  pushVoteTransaction(delegateAddress, amount) {
    const builder = generateTransaction(
      BigInt(this.accountInfo?.sequence?.nonce || 0),
      this.addressAndPubKey.publicKey,
      this.nodeInfo.networkIdentifier,
      this.passPhrase,
      this.nodeInfo?.genesisConfig?.minFeePerByte,
      this.nodeInfo?.genesisConfig?.baseFees
    );

    const signedTx = builder.vote(delegateAddress, amount);

    if (signedTx) {
      fetchWrapper
        .post('transactions', {}, signedTx)
        .then(() => this.fetchTempTransactions())
        .catch((err) => this.throwError(err));
      this.accountInfo.sequence.nonce++;
    }
  }

  pushUnlockTransaction(delegateAddress) {
    const builder = generateTransaction(
      BigInt(this.accountInfo?.sequence?.nonce || 0),
      this.addressAndPubKey.publicKey,
      this.nodeInfo.networkIdentifier,
      this.passPhrase,
      this.nodeInfo?.genesisConfig?.minFeePerByte,
      this.nodeInfo?.genesisConfig?.baseFees
    );

    const unlockObjects = this.accountLockedVotesCanReturn[delegateAddress];

    const signedTx = builder.unlock(delegateAddress, unlockObjects);

    if (signedTx) {
      fetchWrapper
        .post('transactions', {}, signedTx)
        .then(() => this.fetchTempTransactions())
        .catch((err) => this.throwError(err));
      this.accountInfo.sequence.nonce++;
    }
  }

  savePastPassPhrase(phrase) {
    this._passPhrase = phrase;
    sessionStorage.setItem('passPhrase', this._passPhrase);
  }

  unobservedTransactionsInfo() {
    this._transactionsInfo = [];
  }

  unobservedSharedData() {
    this._sharedData = [];
  }

  unobservedAccountData() {
    this._accountData = [];
  }

  changeSharedData(incomingData, id) {
    this._sharedData.push({
      data: incomingData.data,
      id,
    });
  }

  saveDataRegistration(data) {
    this._accountData = data;
  }

  clearDataRegistration() {
    this._accountData = [];
  }

  saveInfoTransactions(transaction) {
    this._transactionsInfo = transaction.data;
  }

  accountDataFetchChange(res) {
    if (res.data) {
      this._accountData = res.data;
    }
    this.fetchTempTransactions();
  }

  keysArrayFetchChange(res) {
    this._keysArray = res.data;
  }

  fetchVPNServersSuccess(res) {
    this._canVPN = res.meta;
    this._vpnServers = res.servers;
  }

  fetchDelegatesSuccess(res) {
    this._delegates = res;
  }

  fetchNodeInfoSuccess(info) {
    this._nodeInfo = info.data;
    this.fetchPassPhrase();
  }

  fetchAccountInfoSuccess(res) {
    this._accountInfo = res.data;
    if (this.accountInfo?.sequence?.nonce)
      this.accountInfo.sequence.nonce = parseInt(this.accountInfo.sequence.nonce) || 0;
  }

  fetchTempTransactionsSuccess(res) {
    this._tempTransactions = res.data;
  }

  throwError(err, skip) {
    if (!skip) this.addNotification(new Date().getTime(), 'error', err.statusText);
    console.log(err);
  }

  get sharedData() {
    return this._sharedData.map((elem) => ({
      data: elem.data.map((item) => ({
        label: labelMap[item.label] || item.label,
        value: item.value,
      })),
      id: elem.id,
    }));
  }

  get transactionsInfo() {
    return this._transactionsInfo
      .filter((e) => e.moduleID === 1001)
      .map((item) => {
        return {
          id: item.id,
          sender_avatar: item?.asset?.recipientAddress && generateSvgAvatar(item.senderPublicKey),
          avatar_size: 24,
          transaction:
            item.asset?.features?.map((asset) => {
              return {
                transaction_id: item.id,
                address:
                  item.asset.recipientAddress &&
                  cryptography.bufferToHex(
                    cryptography.getAddressFromPublicKey(
                      cryptography.hexToBuffer(item.senderPublicKey)
                    )
                  ),
                value: asset.value,
                label: labelMap[asset.label] || asset.label,
              };
            }) || [],
        };
      });
  }

  get verifiedFields() {
    return this.accountIdentity?.verifications || [];
  }

  get verifiedFieldsMap() {
    return this.verifiedFields.reduce(
      (acc, item) => ({
        ...acc,
        [item.label]: {
          ...item,
        },
      }),
      {}
    );
  }
  get decryptedAccountData() {
    return (
      decryptedData(
        this._accountData,
        this.accountFeatures,
        this.passPhrase,
        this.pubKey,
        this.processedFeatures,
        this.verifiedFieldsMap
      ) || []
    );
  }

  get firstName() {
    return this.decryptedAccountData.find((item) => item.key === 'firstname')?.value;
  }

  get lastName() {
    return this.decryptedAccountData.find((item) => item.key === 'secondname')?.value;
  }

  get accountName() {
    return this.address;
  }

  get keysArray() {
    return this._keysArray;
  }

  get passPhrase() {
    return this._passPhrase;
  }

  get accountData() {
    return this._accountData;
  }

  get accountInfo() {
    return this._accountInfo;
  }

  get nodeInfo() {
    return this._nodeInfo;
  }

  get addressAndPubKey() {
    return cryptography.getAddressAndPublicKeyFromPassphrase(this.passPhrase);
  }

  get privateKey() {
    return cryptography.getPrivateAndPublicKeyFromPassphrase(this.passPhrase)?.privateKey;
  }

  get vpnPrivateKey() {
    let x25519_sk = Buffer.alloc(sodium.crypto_box_SECRETKEYBYTES);
    sodium.crypto_sign_ed25519_sk_to_curve25519(x25519_sk, Buffer.from(this.privateKey, 'hex'));
    return x25519_sk.toString('Base64');
  }

  get pubKey() {
    return this.addressAndPubKey.publicKey.toString('hex');
  }

  get address() {
    return this.addressAndPubKey.address.toString('hex');
  }

  get tokenKey() {
    const stringToSign = this.nodeInfo.networkIdentifier + this.nodeInfo.lastBlockID;
    if (!stringToSign) return '';
    const sign = cryptography
      .signDataWithPassphrase(Buffer.from(stringToSign, 'hex'), this.passPhrase)
      .toString('hex');
    return this.pubKey + ':' + sign;
  }

  get accountIdentity() {
    return this.accountInfo?.identity || {};
  }

  get accountFeatures() {
    return this.accountIdentity?.features || [];
  }

  get accountBalance() {
    return (BigInt(this.accountInfo?.token?.balance || 0) / 100000000n).toString();
  }

  get accountSentVotes() {
    return (this.accountInfo?.dpos?.sentVotes || []).reduce(
      (acc, e) => ({
        ...acc,
        [e.delegateAddress]: BigInt(e.amount || 0) / 100000000n + (acc[e.delegateAddress] || 0n),
      }),
      {}
    );
  }

  get accountLockedVotes() {
    return (this.accountInfo?.dpos?.unlocking || []).reduce(
      (acc, e) => ({
        ...acc,
        [e.delegateAddress]: BigInt(e.amount || 0) / 100000000n + (acc[e.delegateAddress] || 0n),
      }),
      {}
    );
  }

  get accountLockedVotesCanReturn() {
    return (this.accountInfo?.dpos?.unlocking || [])
      .filter((e) => this.nodeInfo.height - e.unvoteHeight > 2000)
      .reduce(
        (acc, e) => ({
          ...acc,
          [e.delegateAddress]: [
            {
              ...acc[e.delegateAddress],
              amount: BigInt(e.amount || 0) / 100000000n,
              unvoteHeight: e.unvoteHeight,
            },
          ],
        }),
        {}
      );
  }

  get accountLockedVotesCanReturnSum() {
    return Object.fromEntries(
      Object.entries(this.accountLockedVotesCanReturn).map(([key, val]) => [
        key,
        val.reduce((sum, e) => sum + e.amount, 0n),
      ])
    );
  }

  get accountFeaturesMap() {
    return this.accountFeatures.reduce(
      (acc, item) => ({
        ...acc,
        [item.label]: item.value,
      }),
      {}
    );
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
  }

  get tempTransactions() {
    return this._tempTransactions;
  }

  get processedFeatures() {
    return this.tempTransactions
      .filter((item) => item.senderPublicKey === this.pubKey)
      .reduce((acc, item) => {
        const { features } = item.asset;
        return {
          ...acc,
          ...(features?.reduce((obj, feature) => ({ ...obj, [feature.label]: true }), {}) || {}),
        };
      }, {});
  }

  get processedVotes() {
    return this.tempTransactions
      .filter((item) => item.senderPublicKey === this.pubKey)
      .reduce((acc, item) => {
        const { votes } = item.asset;
        return {
          ...acc,
          ...(votes?.reduce(
            (obj, vote) => ({
              ...obj,
              [vote.delegateAddress]:
                BigInt(Number(vote.amount) > 0 ? vote.amount : vote.amount.slice(1)) / 100000000n +
                (obj[vote.delegateAddress] || 0n),
            }),
            {}
          ) || {}),
        };
      }, {});
  }

  get processedUnlocking() {
    return this.tempTransactions
      .filter((item) => item.senderPublicKey === this.pubKey)
      .reduce((acc, item) => {
        const { unlockObjects } = item.asset;
        return {
          ...acc,
          ...(unlockObjects?.reduce(
            (obj, vote) => ({
              ...obj,
              [vote.delegateAddress]:
                BigInt(vote.amount) / 100000000n + (obj[vote.delegateAddress] || 0n),
            }),
            {}
          ) || {}),
        };
      }, {});
  }

  get vpnServers() {
    return this._vpnServers?.map((server) => ({
      ...server,
      transferSum: formatBytes(Number(server.transferTx || 0) + Number(server.transferRx || 0)),
      trafficUsed: Math.floor(
        ((Number(server.transferTx || 0) + Number(server.transferRx || 0)) /
          (50 * 1024 * 1024 * 1024)) *
          100
      ),
      state: server.state === '1',
      shortCountry: countryCodes[server.country] || 'US',
    }));
  }

  get canVPN() {
    return this._canVPN;
  }

  get delegates() {
    const getStatus = (delegate) => {
      const { address } = delegate;

      let amount = this.processedVotes[address] || this.processedUnlocking[address];

      if (amount) return 'Pending';

      amount = this.accountSentVotes[address];

      if (amount) return 'Unvote';

      return 'Vote';
    };

    return this._delegates.data.map((delegate) => ({
      ...delegate,
      status: getStatus(delegate),
      token: {
        ...delegate.token,
        balance: Number(BigInt(delegate.token.balance) / 100000000n).toString(),
      },
      dpos: {
        ...delegate.dpos,
        delegate: {
          ...delegate.dpos.delegate,
          totalVotesReceived: Number(
            BigInt(delegate.dpos.delegate.totalVotesReceived) / 100000000n
          ),
        },
      },
    }));
  }

  get delegatesMeta() {
    return this._delegates.meta;
  }

  get notifications() {
    return this._notifications;
  }

  addNotification(id, type, message) {
    this._notifications.push({
      id,
      type,
      message,
    });
  }

  removeNotification(id) {
    this._notifications = this._notifications.filter((e) => e.id !== id);
  }

  get tmpPassPhrase() {
    return this._tmpPassPhrase;
  }

  set tmpPassPhrase(value) {
    this._tmpPassPhrase = value;
  }

  clearAll() {
    this._accountData = [];
    this._passPhrase = '';
    this._keysArray = [];
    this._sharedData = [];
    this._transactionsInfo = [];
    this._accountInfo = {};
    this._tempTransactions = [];
    this._vpnServers = [];
    this._canVPN = false;
    this._delegates = {
      data: [],
      meta: {
        count: 0,
        limit: 0,
        offset: 0,
      },
    };
    this._notifications = [];
    this._tmpPassPhrase = '';
  }
}

export const store = new Store();
