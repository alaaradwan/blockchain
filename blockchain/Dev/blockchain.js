const sha256= require('sha256');
const currentNodeUrl=process.argv[3];
const uuid=require('uuid/v1');

function Blockchain()
{
    this.chain=[];
    this.PendingTransaction=[];
    this.currentNodeUrl=currentNodeUrl;
    this.networkNodes=[];
    this.createNewBlock(100,'0','0');
}
Blockchain.prototype.createNewBlock=function(nonce,previousBlockHash,hash)
{
    const newBlock={
    index: this.chain.length+1,
    timestamp: Date.now(),
    transaction: this.PendingTransaction,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash 
    };
    this.PendingTransaction=[];
    this.chain.push(newBlock);
    return newBlock;
}
Blockchain.prototype.getLastBlock=function()
{return this.chain[this.chain.length-1];}

Blockchain.prototype.createNewTransaction=function(amount,sender,recipient)
{
    const newTransaction={  
        amount:amount, 
        sender:sender,
        recipient:recipient,
        transactionId: uuid().split('-').join('')
    }; 
//     this.PendingTransaction.push(newTransaction);
//    return this.getLastBlock()['index'] +1;
return newTransaction;

}
Blockchain.prototype.hashBlock=function(previousBlockHash,currentBlockData,nonce){

    const dataAsString=previousBlockHash+nonce.toString()+JSON.stringify(currentBlockData);
    const hash=sha256(dataAsString);
    return hash;

};
Blockchain.prototype.addTransactionToPendingTransaction=function(transactionObject)
{
    this.PendingTransaction.push(transactionObject);
    return this.getLastBlock()['index'] +1;
};

Blockchain.prototype.proofOfWork =function(previousBlockHash,currentBlockData)
{
    let nonce=0;
    let hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
    while(hash.substring(0,4)!=='0000')
    {
        nonce++;
        hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
       // console.log(hash); test
    }
    return nonce;
}
Blockchain.prototype.chainIsValid=function(blockchain){
    let validChain=true;
    for(var i=1;i<blockchain.length;i++)
    {
        
        const currentBlock=blockchain[i];
        const previousBlock=blockchain[i-1];
        const blockhash=this.hashBlock(previousBlock['hash'],{transaction:currentBlock['transaction'],index:currentBlock['index']},currentBlock['nonce']);
        if(blockhash.substr(0,4)!='0000')
        validChain=false;

        if(currentBlock['previousBlockHash'] !== previousBlock['hash'])
            validChain=false;
        console.log('previousBlockHash=>',previousBlock['hash']);
        console.log('currentblockHash =>',currentBlock['hash']);
       
    };
    const gensisBlock=blockchain[0];
    const correctNonce=gensisBlock['nonce']===100;
    const correctPreviousBlockHash=gensisBlock['previousBlockHash']==='0';
    const correctHash=gensisBlock['hash']==='0';
    const correctTransaction=gensisBlock['transaction'].length===0;
    if(!correctNonce||!correctPreviousBlockHash||!correctHash||!correctTransaction)
    validChain=false;
    return validChain;
}

Blockchain.prototype.getBlock=function(blockHash)
{
    let correctBlock=null;
    this.chain.forEach(block => {
            if(block.hash===blockHash)
                 correctBlock=block;
        });
return correctBlock; 
};

Blockchain.prototype.getTransaction=function(transactionId)
{
    let correctTransaction=null;
    let correctBlock=null;
    this.chain.forEach(block=>{
        block.transaction.forEach(transaction1=>{
            if(transaction1.transactionId===transactionId){
                correctTransaction=transaction1;
                correctBlock=block;
            };
        });
    });
    return {
        transaction:correctTransaction,
        block:correctBlock
    };
}

Blockchain.prototype.getAddressData=function(address){
    const addressTransactions=[];
    this.chain.forEach(block=>{
        block.transaction.forEach(trans=>{
            if(trans.sender===address||trans.recipient===address)
            {addressTransactions.push(trans);
            };
        });

    });
    let balance=0;
    addressTransactions.forEach(transaction=>{
        if(transaction.recipient===address)
        balance+=transaction.amount;
        else  if(transaction.sender===address)
        balance-=transaction.amount;
    });

    return {
        addressTransactions:addressTransactions,
        addressBalance:balance
    };

};
 
module.exports=Blockchain;