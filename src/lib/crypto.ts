import { passphrase, cryptography } from '@liskhq/lisk-client/browser';
import _sodium from 'libsodium-wrappers-sumo';
import { Buffer } from 'buffer';
import {
  SignJWT,
  type JWTPayload,
  // importPKCS8,
  // importSPKI,
  type KeyLike,
} from 'jose';

const PATH = "m/44'/134'/0'";

export const generateKeysAndAdress = async (phrase: string) => {
  const privateKey: Buffer =
    await cryptography.ed.getPrivateKeyFromPhraseAndPath(phrase, PATH);
  const publicKey: Buffer =
    cryptography.ed.getPublicKeyFromPrivateKey(privateKey);
  const address = cryptography.address.getAddressFromPublicKey(publicKey);
  return { privateKey, publicKey, walletAddress: address };
};

export const generatePassphraseAndKeys = async () => {
  const phrase = passphrase.Mnemonic.generateMnemonic();
  return { passphrase: phrase, ...(await generateKeysAndAdress(phrase)) };
};

export const saveMnemonic = async (
  phrase: string[],
  webAuthnPublicKey: string,
) => {
  await _sodium.ready;
  const sodium = _sodium;

  const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);

  const key = sodium.crypto_pwhash(
    sodium.crypto_box_SEEDBYTES,
    webAuthnPublicKey,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT,
  );

  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

  const encryptedMnemonic = sodium.crypto_secretbox_easy(
    Buffer.from(phrase.join(' '), 'utf-8'),
    nonce,
    key,
  );

  window.localStorage.setItem('salt', Buffer.from(salt).toString('hex'));
  window.localStorage.setItem(
    'encryptedMnemonic',
    Buffer.from(encryptedMnemonic).toString('hex'),
  );
  window.localStorage.setItem('nonce', Buffer.from(nonce).toString('hex'));
};

export const loadMnemonic = async (webAuthnPublicKey: string) => {
  const salt = window.localStorage.getItem('salt');
  const encryptedMnemonic = window.localStorage.getItem('encryptedMnemonic');
  const nonce = window.localStorage.getItem('nonce');
  if (!salt || !encryptedMnemonic || !nonce) {
    throw new Error('Mnemonic was not saved');
  }

  await _sodium.ready;
  const sodium = _sodium;

  const key = sodium.crypto_pwhash(
    sodium.crypto_box_SEEDBYTES,
    webAuthnPublicKey,
    Buffer.from(salt, 'hex'),
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT,
  );

  const mnemonic = sodium.crypto_secretbox_open_easy(
    Buffer.from(encryptedMnemonic, 'hex'),
    Buffer.from(nonce, 'hex'),
    key,
  );

  const phrase = Buffer.from(mnemonic).toString('utf-8');
  const { privateKey, publicKey, walletAddress } = await generateKeysAndAdress(
    Buffer.from(mnemonic).toString('utf-8'),
  );
  return { phrase, privateKey, publicKey, walletAddress };
};

export const convertKeys = async (publicKey: Buffer, privateKey: Buffer) => {
  await _sodium.ready;
  const sodium = _sodium;

  const convertedPublicKey = Buffer.from(
    sodium.crypto_sign_ed25519_pk_to_curve25519(publicKey),
  );
  const convertedPrivateKey = Buffer.from(
    sodium.crypto_sign_ed25519_sk_to_curve25519(privateKey),
  );

  return { convertedPublicKey, convertedPrivateKey };
};

export const convertPublicKey = async (publicKey: Buffer) => {
  await _sodium.ready;
  const sodium = _sodium;

  const convertedPublicKey = Buffer.from(
    sodium.crypto_sign_ed25519_pk_to_curve25519(publicKey),
  );

  return { convertedPublicKey };
};

export const convertPrivateKey = async (privateKey: Buffer) => {
  await _sodium.ready;
  const sodium = _sodium;

  const convertedPrivateKey = Buffer.from(
    sodium.crypto_sign_ed25519_sk_to_curve25519(privateKey),
  );

  return { convertedPrivateKey };
};

export const encryptMessage = async (
  convertedPrivateKey: Uint8Array,
  messageToEncrypt: string,
) => {
  await _sodium.ready;
  const sodium = _sodium;

  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const encryptedMessage = sodium.crypto_secretbox_easy(
    Buffer.from(messageToEncrypt),
    nonce,
    convertedPrivateKey,
  );
  return { encryptedMessage, nonce };
};

export const decryptMessage = async (
  encryptedMessage: Buffer,
  nonce: Buffer,
  convertedPrivateKey: Buffer,
) => {
  await _sodium.ready;
  const sodium = _sodium;

  const message = sodium.crypto_secretbox_open_easy(
    encryptedMessage,
    nonce,
    convertedPrivateKey,
  );

  return Buffer.from(message).toString('utf-8');
};

const encryptSharedMessage = async (
  convertedPrivateKey: Uint8Array,
  convertedRecepientPublicKey: Uint8Array,
  messageToEncrypt: string,
) => {
  await _sodium.ready;
  const sodium = _sodium;

  const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
  const encryptedMessage = sodium.crypto_box_easy(
    Buffer.from(messageToEncrypt),
    nonce,
    convertedRecepientPublicKey,
    convertedPrivateKey,
  );

  return { encryptedMessage, nonce };
};

const decryptSharedMessage = async (
  encryptedMessage: Buffer,
  nonce: Buffer,
  convertedPrivateKey: Buffer,
  convertedSenderPublicKey: Buffer,
) => {
  await _sodium.ready;
  const sodium = _sodium;

  const message = sodium.crypto_box_open_easy(
    encryptedMessage,
    nonce,
    convertedSenderPublicKey,
    convertedPrivateKey,
  );

  return Buffer.from(message).toString('utf-8');
};

export const encryptGridItemContent = async (
  content: string,
  sharedWith?: string,
) => {
  const publicKey = localStorage.getItem('publicKey');
  const privateKey = sessionStorage.getItem('privateKey');
  if (!publicKey) {
    throw new Error('Public key was not found');
  }
  if (!privateKey) {
    throw new Error('Private key was not found');
  }
  const { convertedPrivateKey } = await convertKeys(
    Buffer.from(publicKey, 'hex'),
    Buffer.from(privateKey, 'hex'),
  );

  if (sharedWith) {
    const recepientPublicKey = Buffer.from(sharedWith, 'hex');
    const { convertedPublicKey: convertedRecepientPublicKey } =
      await convertPublicKey(recepientPublicKey);
    const { encryptedMessage, nonce } = await encryptSharedMessage(
      convertedPrivateKey,
      convertedRecepientPublicKey,
      content,
    );
    return { encryptedMessage, nonce };
  }

  const { encryptedMessage, nonce } = await encryptMessage(
    convertedPrivateKey,
    content,
  );

  return { encryptedMessage, nonce };
};

export const decryptGridItemContent = async (
  encryptedMessage: Buffer,
  nonce: Buffer,
  sharedBy?: string,
) => {
  const publicKey = localStorage.getItem('publicKey');
  const privateKey = sessionStorage.getItem('privateKey');
  if (!publicKey) {
    throw new Error('Public key was not found');
  }
  if (!privateKey) {
    throw new Error('Private key was not found');
  }
  const { convertedPrivateKey } = await convertKeys(
    Buffer.from(publicKey, 'hex'),
    Buffer.from(privateKey, 'hex'),
  );

  if (sharedBy) {
    const senderPublicKey = Buffer.from(sharedBy, 'hex');
    const { convertedPublicKey: convertedSenderPublicKey } =
      await convertPublicKey(senderPublicKey);
    return decryptSharedMessage(
      encryptedMessage,
      nonce,
      convertedPrivateKey,
      convertedSenderPublicKey,
    );
  }

  return decryptMessage(encryptedMessage, nonce, convertedPrivateKey);
};

// export async function toPrivateKeyObject(rawPrivateKey: Buffer) {
//   await _sodium.ready;
//   const sodium = _sodium;

//   return importPKCS8(
//     `-----BEGIN PRIVATE KEY-----\n${sodium.to_base64(
//       Buffer.concat([
//         Buffer.from('302e020100300506032b657004220420', 'hex'),
//         rawPrivateKey.subarray(0, 32),
//       ]),
//       sodium.base64_variants.ORIGINAL,
//     )}\n-----END PRIVATE KEY-----`,
//     'EdDSA',
//   );
// }

// export async function toPublicKeyObject(rawPublicKey: Buffer) {
//   await _sodium.ready;
//   const sodium = _sodium;

//   return importSPKI(
//     `-----BEGIN PUBLIC KEY-----\n${sodium.to_base64(
//       Buffer.concat([
//         Buffer.from('302a300506032b6570032100', 'hex'),
//         rawPublicKey,
//       ]),
//       sodium.base64_variants.ORIGINAL,
//     )}\n-----END PUBLIC KEY-----`,
//     'EdDSA',
//   );
// }

export async function _createJWT(
  privateKey: KeyLike,
  publicKey: string,
  payload: JWTPayload,
) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'EdDSA' })
    .setIssuedAt()
    .setIssuer(publicKey)
    .setExpirationTime('1d')
    .sign(privateKey);

  return jwt;
}

export async function createJWT(
  privateKey: Buffer,
  publicKey: string,
  customPayload: JWTPayload,
) {
  await _sodium.ready;
  const sodium = _sodium;

  const header = {
    alg: 'EdDSA',
  };

  const payload: JWTPayload = {
    iat: Math.floor(Date.now() / 1000),
    iss: publicKey,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    ...customPayload,
  };

  const encodedHeader = sodium.to_base64(
    Buffer.from(JSON.stringify(header)),
    sodium.base64_variants.URLSAFE_NO_PADDING,
  );
  const encodedPayload = sodium.to_base64(
    Buffer.from(JSON.stringify(payload)),
    sodium.base64_variants.URLSAFE_NO_PADDING,
  );

  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = sodium.crypto_sign_detached(data, privateKey);

  const encodedSignature = sodium.to_base64(
    signature,
    sodium.base64_variants.URLSAFE_NO_PADDING,
  );

  return `${data}.${encodedSignature}`;
}
