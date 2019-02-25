const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); //the bitcoin wallet encryption

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex'); // get the public key in hexa decimal
const privateKey = key.getPrivate('hex');

console.log();
console.log(' private key: ',privateKey);
console.log();
console.log(' public key: ',publicKey);
