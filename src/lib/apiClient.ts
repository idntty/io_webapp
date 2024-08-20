import { apiClient } from '@liskhq/lisk-client/browser';

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
) => {
  const client = await getClient();

  const features = data.map(({ uuid: label, value }) => ({
    label: label.slice(0, 16),
    value: value.slice(0, 32),
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
  return client.transaction.computeMinFee(tx);
};

export const setFeature = async (
  data: DataEntry[],
  privateKey: string,
  publicKey: string,
) => {
  const client = await getClient();

  const features = data.map(({ uuid: label, value }) => ({
    label: label.slice(0, 16),
    value: value.slice(0, 32),
  }));
  const txWithFee = await client.transaction.create(
    {
      module: 'identity',
      command: 'setFeature',
      fee: await getSetFeatureCost(data, privateKey, publicKey),
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
    label: label.slice(0, 16),
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
    label: label.slice(0, 16),
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

export const createBadge = async (
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

  const txWithFee = await client.transaction.create(
    {
      module: 'badge',
      command: 'createBadge',
      fee: client.transaction.computeMinFee(tx),
      senderPublicKey: publicKey,
      params: {
        id: data,
      },
    },
    privateKey,
  );
  return client.transaction.send(txWithFee);
};
