const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class trasaction
{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    calculateHash(){
        return SHA256(this.fromAddress+this.toAddress+this.amount).toString();
    }
//build the segnature of the transaction
    signTransaction(signkeypare){
        if(signkeypare.getPublic('hex') !== this.fromAddress){
            throw new Error('you cannot sign transaction for ather wallets!!');
        }
        const hashTra = this.calculateHash();
        const sig = signkeypare.sign(hashTra,'base64');
        this.segnature = sig.toDER('hex');
    }
//we call it valid if the segneture is like we built
    isValidTransaction(){
        if(this.fromAddress === null) return true ; // for minig reward
        if(!this.segnature || this.segnature.length ===0){
            throw new Error('no signeture in this transation');
        }
//extract the public key from the address
        const publicKey = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash(),this.segnature);
    }
}



class Block
{
    constructor(timestamp,trasactions,previousHash=""){
    
        this.trasactions = trasactions;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.Hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.previousHash+this.timestamp+JSON.stringify(this.trasactions)+this.nonce).toString();

    }

    minigBlock(defficulity){
        while(this.Hash.substring(0,defficulity) !== new Array(defficulity + 1).join("0")){
            this.nonce++; 
            this.Hash = this.calculateHash();
        }

        console.log("block mining "+ this.Hash);
    }
//chech the validation of the transaction
    hasValidTransaction(){
        for(const tr of this.trasactions){
            if(! tr.isValidTransaction()){
                return false;
            }
        }

        return true;
    }

}

class Blockchain
{
    constructor(){
        this.chain = [this.CreateGenesisBlock()];
        this.difficultiy =2;
        this.pendingTransaction = []; // case bitcion only create a new plock in 10 min so if a transaction is made in this time it will be saved here
        this.miningReward = 100; // to limit the number of coins reward when someone create a new block
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    CreateGenesisBlock(){
        return new Block("2/15/2019","Genesis block","0");
    }

    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().Hash;
    //     newBlock.minigBlock(this.difficultiy);
    //     this.chain.push(newBlock);
    // }
    minePendingTrasactions(mingRewardAddress){
        const rewardtxt = new trasaction(null,mingRewardAddress,this.miningReward);
        this.pendingTransaction.push(rewardtxt);

        let block = new Block(Date.now(),this.pendingTransaction,this.getLatestBlock().Hash);
        block.minigBlock(this.difficultiy);
        console.log("Block successfully mined!");
        this.chain.push(block);
        this.pendingTransaction = [];
    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error(' this transaction must include from and to address');
        }

        if(!transaction.isValidTransaction()){
            throw new Error('Cannot add invalid transaction to chain ');
            
        }
       this.pendingTransaction.push(transaction);
    }

    //to get the balance of a spesific transaction
    getBalaneAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.trasactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isValid(){
        for(let i= 1 ; i<this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(!currentBlock.hasValidTransaction){
                return false;
            }
            if(currentBlock.Hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.Hash){
                return false;
            }

            return true;
        }
    }

}

module.exports.Blockchain = Blockchain;
module.exports.trasaction = trasaction;