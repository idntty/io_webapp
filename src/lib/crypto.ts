import { passphrase, cryptography } from '@liskhq/lisk-client/browser';
import _sodium from 'libsodium-wrappers-sumo';
import { Buffer } from 'buffer';

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
