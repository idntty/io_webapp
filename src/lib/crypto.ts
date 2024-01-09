import { passphrase, cryptography } from '@liskhq/lisk-client/browser';

const PATH = "m/44'/134'/0'";

const generateKeysAndAdress = async (phrase: string) => {
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
