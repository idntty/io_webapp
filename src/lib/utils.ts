import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { text, image, barcodes } from '@pdfme/schemas';
import { generate } from '@pdfme/generator';
import type { Font } from '@pdfme/common';
import { template } from '../lib/pdfTemplate';
import axios, { AxiosResponse } from 'axios';
import { v4 } from 'uuid';
import type { v4String } from '../types/uuid';
import type { GridItem, GridItemLayout } from '../types/grid';
import { decryptGridItemContent } from './crypto';

const HOST = 'api.idntty.io';
// const HOST = 'localhost:8000';
const PROTOCOL = 'https';
// const PROTOCOL = 'http';

export const uuidv4 = v4 as v4String;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function typedObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof typeof obj)[];
}

export const calculateAge = (date: Date) => {
  return Math.floor(
    (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );
};

export const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const createPDF = async (
  passphrase: string[],
  publicKey: Buffer,
  walletAddress: Buffer,
) => {
  const plugins = { text, image, qrcode: barcodes.qrcode };
  const inputs = [
    {
      wallet_address: walletAddress.toString('hex'),
      public_key: publicKey.toString('hex'),
      ph_word1: passphrase[0],
      ph_word7: passphrase[6],
      ph_word2: passphrase[1],
      ph_word8: passphrase[7],
      ph_word3: passphrase[2],
      ph_word9: passphrase[8],
      ph_word4: passphrase[3],
      ph_word10: passphrase[9],
      ph_word5: passphrase[4],
      ph_word11: passphrase[10],
      ph_word6: passphrase[5],
      ph_word12: passphrase[11],
      qrcode: passphrase.join(' '),
    },
  ];

  const font: Font = {
    FallingSky: {
      data: await fetch('fonts/FallingSky.otf').then((r) => r.arrayBuffer()),
      fallback: true,
    },
  };

  const pdf = await generate({
    template,
    plugins,
    inputs,
    options: { font },
  });

  const blob = new Blob([pdf], { type: 'application/pdf' });
  window.open(URL.createObjectURL(blob));
};

export const extractLayout = (grid: Record<string, GridItem>) => {
  const result: Record<string, Omit<GridItem, 'content'>> = {};

  for (const key in grid) {
    const { content: _, ...rest } = grid[key]; // Destructure to exclude content
    result[key] = rest;
  }

  return result;
};

export const sendLayoutToServer = async (
  publicKey: string,
  layout: Record<string, Omit<GridItem, 'content'>>,
) => {
  const jwt = sessionStorage.getItem('jwt');
  if (!jwt) {
    throw new Error('JWT not found');
  }
  return axios.post(
    `${PROTOCOL}://${HOST}/layout/update`,
    { publicKey, layout },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
    },
  );
};

export const getLayoutFromServer = async (publicKey: string) => {
  const layout: AxiosResponse<Record<string, Omit<GridItem, 'content'>>> =
    await axios.get(`${PROTOCOL}://${HOST}/layout?publicKey=${publicKey}`, {
      withCredentials: true,
    });
  return layout.data;
};

export interface DataEntry {
  uuid: string;
  value: string;
  nonce: string;
}

export const saveDataToServer = async (
  publicKey: string,
  domain: 'private' | 'public' | 'shared',
  data: DataEntry[],
  sharedWith?: string,
) => {
  if (domain === 'shared' && !sharedWith) {
    throw new Error('sharedWith is required for shared data');
  }

  const jwt = sessionStorage.getItem('jwt');
  if (!jwt) {
    throw new Error('JWT not found');
  }

  console.log(
    'Calling saveDataToServer with publicKey: ',
    publicKey,
    ' domain: ',
    domain,
    ' data: ',
    data,
    ' sharedWith: ',
    sharedWith,
  );

  const dbDomain =
    domain === 'private' ? publicKey : domain === 'shared' ? sharedWith : '';

  const response = await axios.post(
    `${PROTOCOL}://${HOST}/data/save`,
    {
      publicKey,
      domains: [dbDomain],
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
    },
  );

  console.log(response.data);
};

export const getDataFromServer = async (
  forPublicKey: string, // Public key of the user whose data is being fetched
  ownPublicKey?: string, // Public key of the user who is fetching the data
) => {
  console.log(
    'Calling getDataFromServer with forPublicKey: ',
    forPublicKey,
    ' ownPublicKey: ',
    ownPublicKey,
  );
  const publicData: AxiosResponse<DataEntry[]> = await axios.get(
    `${PROTOCOL}://${HOST}/data/public`,
    {
      params: { publicKey: forPublicKey },
    },
  );

  if (!ownPublicKey) {
    return { public: publicData.data };
  }

  const jwt = sessionStorage.getItem('jwt');
  if (!jwt) {
    throw new Error('JWT not found');
  }

  const sharedData: AxiosResponse<DataEntry[]> = await axios.get(
    `${PROTOCOL}://${HOST}/data/shared`,
    {
      params: { publicKey: forPublicKey, forPublicKey: ownPublicKey },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
    },
  );

  if (forPublicKey !== ownPublicKey) {
    return { public: publicData.data, shared: sharedData.data };
  }

  const privateData: AxiosResponse<DataEntry[]> = await axios.get(
    `${PROTOCOL}://${HOST}/data/private`,
    {
      params: { publicKey: forPublicKey },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
    },
  );

  return {
    public: publicData.data,
    shared: sharedData.data,
    private: privateData.data,
  };
};

export const createGridFromLayoutAndData = async (
  layout: Record<string, Omit<GridItem, 'content'>>,
  data: {
    public: DataEntry[];
    shared?: DataEntry[];
    private?: DataEntry[];
  },
  pageOwnerPublicKey: string,
) => {
  console.log('createGridFromLayoutAndData called with layout: ', layout);
  console.log('createGridFromLayoutAndData called with data: ', data);

  const grid: Record<string, GridItem> = {};
  const upperGridLayout: GridItemLayout[] = [];

  // this function needs to create a grid (both the grid object and the layout array) from the layout and data
  // the layout input argument is already almost a grid object, but it's missing the content field
  // that needs to be filled in from the data argument
  // the upperGridLayout array is easily created from the layout argument

  // regarding the data argument, it contains three arrays: public, shared, and private
  // the public data should be displayed in the grid as is
  // the private and shared data should be decrypted before being displayed in the grid
  // if decryption is not possible, content = '' should be used
  // when creating the actual grid, the content field should be filled with data
  // following the precedence: private, shared, public

  const privateData: Record<string, string> = {};
  if (data.private) {
    for (const entry of data.private) {
      try {
        const decrypted = await decryptGridItemContent(
          Buffer.from(entry.value, 'hex'),
          Buffer.from(entry.nonce, 'hex'),
        );
        privateData[entry.uuid] = decrypted;
      } catch (e) {
        privateData[entry.uuid] = '';
        console.error('Failed to decrypt private data entry: ', entry);
        console.error(e);
      }
    }
  }

  const sharedData: Record<string, string> = {};
  if (data.shared) {
    for (const entry of data.shared) {
      try {
        const decrypted = await decryptGridItemContent(
          Buffer.from(entry.value, 'hex'),
          Buffer.from(entry.nonce, 'hex'),
          pageOwnerPublicKey,
        );
        sharedData[entry.uuid] = decrypted;
      } catch (e) {
        sharedData[entry.uuid] = '';
        console.error('Failed to decrypt shared data entry: ', entry);
        console.error(e);
      }
    }
  }

  const publicData = data.public.reduce(
    (acc: Record<string, string>, entry) => {
      acc[entry.uuid] = entry.value;
      return acc;
    },
    {},
  );

  for (const key in layout) {
    console.log('Processing key: ', key);
    const item = layout[key];
    console.log('Item: ', item);
    const content =
      privateData[key] || sharedData[key] || publicData[key] || '';
    console.log('Content: ', content);

    grid[key] = {
      ...item,
      content,
    };

    upperGridLayout.push({
      i: key,
      x: item.layout.x,
      y: item.layout.y,
      w: item.layout.w,
      h: item.layout.h,
    });
  }

  return { grid, upperGridLayout };
};
