const {Blockchain ,trasaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); 
const myKey = ec.keyFromPrivate('b9cfb7752176fedae5e04b60470d20a010fde25469659ebad6de13dc103ce4d0');
const mywalletAddress = myKey.getPublic('hex');

 let computer = new Blockchain();

 const transaction1 = new trasaction(mywalletAddress,"to address public key",30);
 transaction1.signTransaction(myKey);
 computer.addTransaction(transaction1);
//  computer.createTransaction(new trasaction("address1","address2", 100));
//  computer.createTransaction(new trasaction("address2","address1", 50));

 console.log("start the miner ... ");
 computer.minePendingTrasactions(mywalletAddress);
 console.log("\n balance of the my wallet address "+ computer.getBalaneAddress(mywalletAddress));

//  console.log("start the miner ... ");
//  computer.minePendingTrasactions(mywalletAddress);
//  console.log("\n balance of the my wallet address "+ computer.getBalaneAddress(mywalletAddress));
//  computer.minePendingTrasactions("fakeAddress");
//  console.log("\n balance of the fake address "+ computer.getBalaneAddress("fakeAddress"));

// console.log("mining block1 ... ");
// computer.addBlock(new Block(1,"2/16/2019",{amount: 4}));
// console.log("mining block2 ... ");

// computer.addBlock(new Block(2,"2/17/2019",{amount: 5}));
//console.log(JSON.stringify(computer,null,4));

//console.log(computer.isValid());
//computer.chain[1].trasactions = {amount: 100};
//computer.chain[1].hash = computer.chain[1].calculateHash();
//console.log(computer.isValid());






