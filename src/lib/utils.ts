import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { text, image, barcodes } from '@pdfme/schemas';
import { generate } from '@pdfme/generator';
import type { Font } from '@pdfme/common';
import { template } from '../lib/pdfTemplate';
import axios from 'axios';
import { Buffer } from 'buffer';

const HOST = 'api.idntty.io';
// const HOST = 'localhost';
const PORT = 443;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

interface SendMessageToServerResponse {
  success: boolean;
}

export const sendMessageToServer = async (
  encryptedMessage: Uint8Array,
  nonce: Uint8Array,
) => {
  return axios.post<SendMessageToServerResponse>(
    `https://${HOST}:${PORT}/message/send`,
    {
      message: Buffer.from(encryptedMessage).toString('hex'),
      nonce: Buffer.from(nonce).toString('hex'),
    },
  );
};

interface GetMessageFromServerResponse {
  message: string;
  nonce: string;
}

export const getMessageFromServer = async () => {
  const response = await axios.get<GetMessageFromServerResponse>(
    `https://${HOST}:${PORT}/message/get`,
  );
  const { message, nonce } = response.data;
  return {
    encryptedMessage: Buffer.from(message, 'hex'),
    nonce: Buffer.from(nonce, 'hex'),
  };
};
