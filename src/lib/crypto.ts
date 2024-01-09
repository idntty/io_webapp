import {
  passphrase,
  cryptography,
  transactions,
} from '@liskhq/lisk-client/browser';

export const generatePassphrase = () => passphrase.Mnemonic.generateMnemonic();
