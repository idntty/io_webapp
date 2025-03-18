import { apiClient } from '@klayr/client/browser';

import type { DataEntry } from './utils';

const NODE_API_URL = 'wss://api.idntty.io:444/rpc-ws';

let clientCache: apiClient.APIClient | undefined;
export const getClient = async () => {
  if (!clientCache) {
    clientCache = await apiClient.createWSClient(NODE_API_URL);
  }
  return clientCache;
};

export const getSetFeatureCost = async (
  data: DataEntry[],
  privateKey: string,
  publicKey: string,
  userType: 'personal' | 'authority' = 'personal',
) => {
  const client = await getClient();

  const features = data.map(({ uuid: label, value }) => ({
    label,
    value,
  }));
  const tx = await client.transaction.create(
    {
      module: 'identity',
      command: 'setFeature',
      fee: '0',
      senderPublicKey: publicKey,
      params: {
        features,
      },
    },
    privateKey,
  );
  const calculatedFee = client.transaction.computeMinFee(tx);

  // Apply minimum fees based on user type
  const minimumFee = userType === 'authority' ? '1999000000' : '99000000';
  return BigInt(calculatedFee) > BigInt(minimumFee)
    ? calculatedFee
    : minimumFee;
};

export const setFeature = async (
  data: DataEntry[],
  privateKey: string,
  publicKey: string,
  userType: 'personal' | 'authority' = 'personal',
) => {
  const client = await getClient();

  const features = data.map(({ uuid: label, value }) => ({
    label,
    value,
  }));
  const txWithFee = await client.transaction.create(
    {
      module: 'identity',
      command: 'setFeature',
      fee: await getSetFeatureCost(data, privateKey, publicKey, userType),
      senderPublicKey: publicKey,
      params: {
        features,
      },
    },
    privateKey,
  );
  return client.transaction.send(txWithFee);
};

export const getRemoveFeatureCost = async (
  data: Omit<DataEntry, 'value' | 'nonce'>[],
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const features = data.map(({ uuid: label }) => ({
    label,
  }));
  const tx = await client.transaction.create(
    {
      module: 'identity',
      command: 'removeFeature',
      fee: '0',
      senderPublicKey: publicKey,
      params: {
        features,
      },
    },
    privateKey,
  );
  return client.transaction.computeMinFee(tx);
};

export const removeFeature = async (
  data: Omit<DataEntry, 'value' | 'nonce'>[],
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const features = data.map(({ uuid: label }) => ({
    label: label,
  }));
  const txWithFee = await client.transaction.create(
    {
      module: 'identity',
      command: 'removeFeature',
      fee: await getRemoveFeatureCost(data, privateKey, publicKey),
      senderPublicKey: publicKey,
      params: {
        features,
      },
    },
    privateKey,
  );
  return client.transaction.send(txWithFee);
};

export const getCreateBadgeCost = async (
  data: string,
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const tx = await client.transaction.create(
    {
      module: 'badge',
      command: 'createBadge',
      fee: '0',
      senderPublicKey: publicKey,
      params: {
        id: data,
      },
    },
    privateKey,
  );

  return client.transaction.computeMinFee(tx);
};

export const createBadge = async (
  data: string,
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const txWithFee = await client.transaction.create(
    {
      module: 'badge',
      command: 'createBadge',
      fee: await getCreateBadgeCost(data, privateKey, publicKey),
      senderPublicKey: publicKey,
      params: {
        id: data,
      },
    },
    privateKey,
  );

  return client.transaction.send(txWithFee);
};

export const getArchiveBadgeCost = async (
  data: string[],
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const tx = await client.transaction.create(
    {
      module: 'badge',
      command: 'archiveBadge',
      fee: '0',
      senderPublicKey: publicKey,
      params: {
        ids: data,
      },
    },
    privateKey,
  );

  return client.transaction.computeMinFee(tx);
};

export const archiveBadge = async (
  data: string[],
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const txWithFee = await client.transaction.create(
    {
      module: 'badge',
      command: 'archiveBadge',
      fee: await getArchiveBadgeCost(data, privateKey, publicKey),
      senderPublicKey: publicKey,
      params: {
        ids: data,
      },
    },
    privateKey,
  );

  return client.transaction.send(txWithFee);
};

export const getIssueBadgeCost = async (
  data: { recipientAddress: string; ids: string[] },
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const tx = await client.transaction.create(
    {
      module: 'badge',
      command: 'issueBadge',
      fee: '0',
      senderPublicKey: publicKey,
      params: {
        recipientAddress: data.recipientAddress,
        ids: data.ids,
      },
    },
    privateKey,
  );

  return client.transaction.computeMinFee(tx);
};

export const issueBadge = async (
  data: { recipientAddress: string; ids: string[] },
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const txWithFee = await client.transaction.create(
    {
      module: 'badge',
      command: 'issueBadge',
      fee: await getIssueBadgeCost(data, privateKey, publicKey),
      senderPublicKey: publicKey,
      params: {
        recipientAddress: data.recipientAddress,
        ids: data.ids,
      },
    },
    privateKey,
  );

  return client.transaction.send(txWithFee);
};

export const setAccountType = async (
  data: 'personal' | 'authority',
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const tx = await client.transaction.create(
    {
      module: 'identity',
      command: 'setAccountType',
      fee: '0',
      senderPublicKey: publicKey,
      params: {
        isAuthority: data === 'authority',
      },
    },
    privateKey,
  );

  const txWithFee = await client.transaction.create(
    {
      module: 'identity',
      command: 'setAccountType',
      fee: client.transaction.computeMinFee(tx),
      senderPublicKey: publicKey,
      params: {
        isAuthority: data === 'authority',
      },
    },
    privateKey,
  );

  return client.transaction.send(txWithFee);
};

export const getValidateFeatureCost = async (
  data: {
    recipientAddress: string;
    features: { label: string; value: string }[];
  },
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const tx = await client.transaction.create(
    {
      module: 'identity',
      command: 'validateFeature',
      fee: '0',
      senderPublicKey: publicKey,
      params: {
        recipientAddress: data.recipientAddress,
        features: data.features,
      },
    },
    privateKey,
  );

  const calculatedFee = client.transaction.computeMinFee(tx);

  // Apply minimum fee for validateFeature
  const minimumFee = '499000000';
  return BigInt(calculatedFee) > BigInt(minimumFee)
    ? calculatedFee
    : minimumFee;
};

export const validateFeature = async (
  data: {
    recipientAddress: string;
    features: { label: string; value: string }[];
  },
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const txWithFee = await client.transaction.create(
    {
      module: 'identity',
      command: 'validateFeature',
      fee: await getValidateFeatureCost(data, privateKey, publicKey),
      senderPublicKey: publicKey,
      params: {
        recipientAddress: data.recipientAddress,
        features: data.features,
      },
    },
    privateKey,
  );

  return client.transaction.send(txWithFee);
};
