import resolveConfig from 'tailwindcss/resolveConfig';
import { cryptography, transactions } from '@liskhq/lisk-client';
import {
  removeFeatureAssetSchema,
  setFeatureAssetSchema,
  unlockDelegateAssetSchema,
  validateFeatureAssetSchema,
  voteDelegateAssetSchema,
} from './Schemas';
import { statusMap } from '../shared/statusMap';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/tailwind.config.js');
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

export const formatAddressBig = (address) =>
  `${address.slice(0, 4)} ${address.slice(4, 8)} ****** ${address.slice(
    address.length - 8,
    address.length - 4
  )} ${address.slice(address.length - 4)}`;

export const encryptAccountData = (data = [], passPhrase = '', pubKey = '') => {
  return data
    .filter((item) => item.status !== statusMap.blockchained)
    .map((item) => {
      let value = cryptography.encryptMessageWithPassphrase(
        item.seed + ':' + item.value,
        passPhrase,
        pubKey
      );
      return {
        label: item.key,
        value: value.encryptedMessage,
        value_nonce: value.nonce,
        seed: item.seed,
      };
    });
};

export const encryptSharedData = (data = [], passPhrase = '', pubKey = '') => {
  return data.map((item) => {
    let value = cryptography.encryptMessageWithPassphrase(
      item.seed + ':' + item.value,
      passPhrase,
      Buffer.from(pubKey, 'hex')
    );
    return {
      label: item.key,
      value: value.encryptedMessage,
      value_nonce: value.nonce,
    };
  });
};

export const hashAccountData = (data = [], oldData = [], hashMap = {}) => {
  const accountMap = data.reduce(
    (acc, item) => ({
      ...acc,
      [item.label]: item.value,
    }),
    {}
  );

  const oldAccountMap = oldData.reduce(
    (acc, item) => ({
      ...acc,
      [item.label]: item.value,
    }),
    {}
  );
  const removed = oldData.reduce((acc, item) => {
    if (
      !accountMap[item.label] &&
      !data.find((elem) => elem.label === item.label)
    )
      return [...acc, { label: item.label }];
    return acc;
  }, []);

  const changed = data.reduce((acc, item) => {
    if (!oldAccountMap[item.label]) return [...acc, item];
    const oldValue = hashMap[item.key];
    const newValue = hashValue(item.value, item.seed).toString('hex');
    if (oldValue !== newValue && item.status === 'new') return [...acc, item];
    return acc;
  }, []);
  return [
    removed,
    changed.map((item) => {
      const value = hashValue(item.value, item.seed);
      return {
        label: item.key,
        value,
      };
    }),
  ];
};

export const jsonReplacer = (key, value) => {
  if (key === 'big') {
    return value.toString();
  }
  return value;
};

export const hashValue = (value = '', seed = '') =>
  cryptography.hash(
    Buffer.concat([Buffer.from(seed, 'utf8'), cryptography.hash(value, 'utf8')])
  );

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const generateTransaction = (
  nonce = BigInt(0),
  senderPublicKey = '',
  networkIdentifier = '',
  passPhrase = '',
  fee = BigInt(500000)
) => {
  return {
    update: (features) =>
      generateSetTransaction(
        features,
        nonce,
        senderPublicKey,
        networkIdentifier,
        passPhrase,
        fee
      ),
    remove: (features) =>
      generateRemoveTransaction(
        features,
        nonce,
        senderPublicKey,
        networkIdentifier,
        passPhrase,
        fee
      ),
    validate: (features, recipientAddress) =>
      generateValidateTransaction(
        features,
        nonce,
        senderPublicKey,
        networkIdentifier,
        passPhrase,
        fee,
        recipientAddress
      ),
    vote: (delegateAddress, amount) =>
      generateVoteTransaction(
        nonce,
        senderPublicKey,
        networkIdentifier,
        passPhrase,
        fee,
        delegateAddress,
        amount
      ),
    unlock: (delegateAddress, amount, unvoteHeight) =>
      generateUnlockTransaction(
        nonce,
        senderPublicKey,
        networkIdentifier,
        passPhrase,
        fee,
        delegateAddress,
        amount,
        unvoteHeight
      ),
  };
};

export const generateSetTransaction = (
  features,
  nonce = BigInt(0),
  senderPublicKey = '',
  networkIdentifier = '',
  passPhrase = '',
  fee = BigInt(500000)
) => {
  const tx = {
    moduleID: 1001,
    assetID: 1,
    nonce,
    senderPublicKey,
    fee,
    asset: {
      features,
    },
  };

  if (features.length === 0) return;

  const signedTx = transactions.signTransaction(
    setFeatureAssetSchema,
    tx,
    Buffer.from(networkIdentifier, 'hex'),
    passPhrase
  );

  signedTx.senderPublicKey = signedTx.senderPublicKey.toString('hex');
  signedTx.signatures[0] = signedTx.signatures[0].toString('hex');
  signedTx.asset.features = signedTx.asset.features.map((feature) => ({
    ...feature,
    value: feature.value.toString('hex'),
  }));

  delete signedTx.id;

  return signedTx;
};

export const generateRemoveTransaction = (
  features,
  nonce = BigInt(0),
  senderPublicKey = '',
  networkIdentifier = '',
  passPhrase = '',
  fee = BigInt(500000)
) => {
  const tx = {
    moduleID: 1001,
    assetID: 2,
    nonce,
    senderPublicKey,
    fee,
    asset: {
      features,
    },
  };
  const signedTx = transactions.signTransaction(
    removeFeatureAssetSchema,
    tx,
    Buffer.from(networkIdentifier, 'hex'),
    passPhrase
  );

  signedTx.senderPublicKey = signedTx.senderPublicKey.toString('hex');
  signedTx.signatures[0] = signedTx.signatures[0].toString('hex');

  delete signedTx.id;

  return signedTx;
};

const generateValidateTransaction = (
  features,
  nonce = BigInt(0),
  senderPublicKey = '',
  networkIdentifier = '',
  passPhrase = '',
  fee = BigInt(500000),
  recipientAddress = ''
) => {
  const tx = {
    moduleID: 1001,
    assetID: 11,
    nonce,
    senderPublicKey: Buffer.from(senderPublicKey, 'hex'),
    fee,
    asset: {
      features,
      recipientAddress: Buffer.from(recipientAddress, 'hex'),
    },
  };

  if (features.length === 0) return;

  const signedTx = transactions.signTransaction(
    validateFeatureAssetSchema,
    tx,
    Buffer.from(networkIdentifier, 'hex'),
    passPhrase
  );

  signedTx.senderPublicKey = signedTx.senderPublicKey.toString('hex');
  signedTx.asset.recipientAddress =
    signedTx.asset.recipientAddress.toString('hex');
  signedTx.signatures[0] = signedTx.signatures[0].toString('hex');
  signedTx.asset.features = signedTx.asset.features.map((feature) => ({
    ...feature,
    value: feature.value.toString('hex'),
  }));

  delete signedTx.id;

  return signedTx;
};

const generateVoteTransaction = (
  nonce = BigInt(0),
  senderPublicKey = '',
  networkIdentifier = '',
  passPhrase = '',
  fee = BigInt(500000),
  delegateAddress = '',
  amount = 0n
) => {
  const tx = {
    moduleID: 5,
    assetID: 1,
    nonce,
    senderPublicKey: Buffer.from(senderPublicKey, 'hex'),
    fee,
    asset: {
      votes: [
        {
          delegateAddress: Buffer.from(delegateAddress, 'hex'),
          amount: amount * 100000000n,
        },
      ],
    },
  };

  const signedTx = transactions.signTransaction(
    voteDelegateAssetSchema,
    tx,
    Buffer.from(networkIdentifier, 'hex'),
    passPhrase
  );

  signedTx.senderPublicKey = signedTx.senderPublicKey.toString('hex');
  signedTx.signatures[0] = signedTx.signatures[0].toString('hex');
  signedTx.asset.votes = signedTx.asset.votes.map((vote) => ({
    ...vote,
    delegateAddress: vote.delegateAddress.toString('hex'),
  }));

  delete signedTx.id;

  return signedTx;
};

const generateUnlockTransaction = (
  nonce = BigInt(0),
  senderPublicKey = '',
  networkIdentifier = '',
  passPhrase = '',
  fee = BigInt(500000),
  delegateAddress = '',
  amount = 0n,
  unvoteHeight = 0
) => {
  const tx = {
    moduleID: 5,
    assetID: 2,
    nonce,
    senderPublicKey: Buffer.from(senderPublicKey, 'hex'),
    fee,
    asset: {
      unlockObjects: [
        {
          delegateAddress: Buffer.from(delegateAddress, 'hex'),
          amount: amount * 100000000n,
          unvoteHeight,
        },
      ],
    },
  };

  const signedTx = transactions.signTransaction(
    unlockDelegateAssetSchema,
    tx,
    Buffer.from(networkIdentifier, 'hex'),
    passPhrase
  );

  signedTx.senderPublicKey = signedTx.senderPublicKey.toString('hex');
  signedTx.signatures[0] = signedTx.signatures[0].toString('hex');
  signedTx.asset.unlockObjects = signedTx.asset.unlockObjects.map((vote) => ({
    ...vote,
    delegateAddress: vote.delegateAddress.toString('hex'),
  }));

  delete signedTx.id;

  return signedTx;
};
