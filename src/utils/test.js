import { cryptography, passphrase } from '@liskhq/lisk-client';
import sodium from 'sodium-universal';

let passphrase1 = passphrase.Mnemonic.generateMnemonic();
const keys = cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase1);
console.log('IDNTTY Public & Private keys(hex):');
console.log(
  'publicKey:',
  keys.publicKey.length,
  keys.publicKey.toString('hex')
);
console.log(
  'privateKey:',
  keys.privateKey.length,
  keys.privateKey.toString('hex')
);

console.log('');
console.log('SODIUM Public & Private keys(hex):');

let pk = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
let sk = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);

let x25519_sk = Buffer.alloc(sodium.crypto_box_SECRETKEYBYTES);
let x25519_pk = Buffer.alloc(sodium.crypto_box_PUBLICKEYBYTES);

sodium.crypto_sign_seed_keypair(
  pk,
  sk,
  cryptography.hash(Buffer.from(passphrase1, 'UTF-8'))
);

sodium.crypto_sign_ed25519_sk_to_curve25519(x25519_sk, sk);
sodium.crypto_sign_ed25519_pk_to_curve25519(x25519_pk, pk);

console.log('Public & Private keys(hex):');
console.log('publicKey:', pk.length, pk.toString('hex'));
console.log('privateKey:', sk.length, sk.toString('hex'));
console.log('');

console.log(
  'x25519_sk privateKey:',
  x25519_sk.length,
  x25519_sk.toString('Base64')
);
console.log(
  'x25519_pk publicKey:',
  x25519_pk.length,
  x25519_pk.toString('Base64')
);
