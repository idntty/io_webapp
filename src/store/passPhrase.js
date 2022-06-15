const passphrase = require('@liskhq/lisk-passphrase')

function passPhrase () {
  return passphrase.Mnemonic.generateMnemonic()
}

console.log(passPhrase())

