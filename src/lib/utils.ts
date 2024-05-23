import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { text, image, barcodes } from '@pdfme/schemas';
import { generate } from '@pdfme/generator';
import type { Font } from '@pdfme/common';
import { template } from '../lib/pdfTemplate';
import axios from 'axios';
import { v4 } from 'uuid';
import type { v4String } from '../types/uuid';
import type { GridItem } from '../types/grid';

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

export function extractLayout(grid: Record<string, GridItem>) {
  const result: Record<string, Omit<GridItem, 'content'>> = {};

  for (const key in grid) {
    const { content: _, ...rest } = grid[key]; // Destructure to exclude content
    result[key] = rest;
  }

  return result;
}

export const sendLayoutToServer = async (
  publicKey: string,
  layout: Record<string, Omit<GridItem, 'content'>>,
) => {
  const jwt = localStorage.getItem('jwt');
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

  const jwt = localStorage.getItem('jwt');
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
