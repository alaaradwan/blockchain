const express = require('express')
const app = express();
const bodyParser= require('body-parser');
const Blockchain=require('./blockchain');
const port=process.argv[2];
const rp=require('request-promise')


const uuid=require('uuid/v1');

const bitcoin= new Blockchain();
	app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

const nodeAddress=uuid().split('-').join('');
    
    
 
// app.get('/', function (req, res) {
//   res.send('Hello')
// });//test
app.get('/blockchain', function (req, res) {
      res.send(bitcoin);
    });

 app.post('/transaction', function (req, res) {
        //console.log(req.body);
       // res.send('it Works !!');//test postman
      // res.send('the amount of the transaction is $'+req.body.amount+' bitcoin'); test postman 2
     
    //  const blockindex= bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    //   res.json({note:'transaction will be added in block '+blockindex+''});

    const newTransaction=req.body;
    const blockindex= bitcoin.addTransactionToPendingTransaction(newTransaction);
       res.json({note:'transaction will be added in block '+blockindex+''});


    });
    
app.post('/transaction/broadcast',function(req,res)
{
    const newTransaction=bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    bitcoin.addTransactionToPendingTransaction(newTransaction);
    const requestPromises=[];
    bitcoin.networkNodes.forEach(networkNode=>{
        const requestOpion={
            uri:networkNode+'/transaction',
            method:'POST',
            body:newTransaction,
            json:true
        };
        requestPromises.push(rp(requestOpion)); 

    });  
 
    Promise.all(requestPromises).then(data=>{
        res.json({ note:'transaction is created and broadcast successfully'});
    });
}); 

app.post('/receive-new-block',function(req,res)
{
   
    const newBlock=req.body;
    const lastBlock=bitcoin.getLastBlock();
   const correctHash = lastBlock.hash===newBlock.previousBlockHash;
   const correctIndex=lastBlock['index']+1===newBlock['index'];
    if(correctHash&&correctIndex)
    { 

        bitcoin.chain.push(newBlock);
        bitcoin.PendingTransaction=[];
        res.json({note:'New Block received and accepted',
        newBlock: newBlock});
    }
    else
    { 
        res.json({note:'New Block rejected',
        newBlock: newBlock});  
    }  
    
     
});
 app.get('/mine', function (req, res) {
        const lastBlock=bitcoin.getLastBlock();
        const previousBlockHash=lastBlock['hash'];
        const currentBlockData={
            transaction:bitcoin.PendingTransaction,
            index: lastBlock['index']+1
        };
        const nonce=bitcoin.proofOfWork(previousBlockHash,currentBlockData);
        const blockHash=bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
      //  bitcoin.createNewTransaction(12.5,"00",nodeAddress);

        const newBlock=bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);
        const requestPromises=[];
        
        bitcoin.networkNodes.forEach(networkNodeURl=>
           {
               const urlOptions={
                   uri:networkNodeURl+'/receive-new-block',
                   method:'POST',
                   body:newBlock,
                   json:true};
                   requestPromises.push(rp(urlOptions));
           } );
        Promise.all(requestPromises).then(data =>{
            const urlOptions={
                uri:bitcoin.currentNodeUrl+'/transaction/broadcast',
                method:'POST', 
                body:{amount:12.5,
                    sender:"00",
                    recipient:nodeAddress  },
                    json:true  };
                    return rp(urlOptions);
           } ).then(data=>{
            res.json({
                        note:'new block mined & broadcast successfully',
                        block:newBlock
                });
           });

        // res.json({
        //         note:"new block mined successfully",
        //         block:newBlock
        // });

       
    });  
app.post('/register-and-brodcast-node',function(req,res)
{ 
    const newNodeUrl=req.body.newNodeUrl;
    if(bitcoin.networkNodes.indexOf(newNodeUrl)==-1)
         bitcoin.networkNodes.push(newNodeUrl);
         const regNodesPromises=[];
         bitcoin.networkNodes.forEach(networkNodeURl =>{
             const requestOptions ={
                 uri: networkNodeURl + '/register-node',
                 method:'POST',
                 body:{newNodeUrl:newNodeUrl},
                 json:true
             };
             regNodesPromises.push(rp(requestOptions));
         } );
         Promise.all(regNodesPromises).then(data=>{  
             const bulkRegisterOptions = { 
                 uri: newNodeUrl+'/register-nodes-bulk', 
                 method:'POST', 
                 body:{allNetworkNodes:[...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
                json:true
             };
            return  rp(bulkRegisterOptions);
         }).then(data=> {
             res.json({note:'New node register at the network successfully'});
         })

         

});
app.post('/register-node',function(req,res)
{
    const newNodeUrl=req.body.newNodeUrl;
    const nodeNotAlreadyPresent=bitcoin.networkNodes.indexOf(newNodeUrl)==-1;
    const notCurrentnode=bitcoin.currentNodeUrl !== newNodeUrl;  
    if(nodeNotAlreadyPresent && notCurrentnode)
    bitcoin.networkNodes.push(newNodeUrl);
    res.json({note:'new node register successfully. '});

});
app.post('/register-nodes-bulk',function(req,res)
{ 
    const allNetworkNodes=req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl=>{
    const nodeNotAlreadyPresent=bitcoin.networkNodes.indexOf(networkNodeUrl)==-1;
    const notCurrentnode=bitcoin.currentNodeUrl !== networkNodeUrl;  
    if(nodeNotAlreadyPresent && notCurrentnode)
    bitcoin.networkNodes.push(networkNodeUrl);
    });
    res.json({note:'Bulk registration successfully. '});
});
app.get('/consensus',function(req,res)
{
    const requestPromises=[];
    bitcoin.networkNodes.forEach(networkNodeURl=>
        {
            const requestOption={
                uri:networkNodeURl+'/blockchain',
                method:'GET',
                json:true
            };
            requestPromises.push( rp(requestOption));
        });
        Promise.all(requestPromises).then(Blockchains=> {
            const currentchainlength=bitcoin.chain.length;
            let maxChainLength=currentchainlength;
            let newLongestChain=null;
            let newPendingTransaction=null;
            Blockchains.forEach(Blockchain=>{
                if(Blockchain.chain.length>maxChainLength) {
                    maxChainLength=Blockchain.chain.length;
                    newLongestChain=Blockchain.chain;
                    newPendingTransaction=Blockchain.PendingTransaction;

                };
            });
            if(!newLongestChain||(!newLongestChain&&!bitcoin.chainIsValid(newLongestChain))) {
                     res.json({note:'Current chain has not been replaced.',
                    chain:bitcoin.chain});
                }
                else if(newLongestChain&&bitcoin.chainIsValid(newLongestChain))
                {
                    bitcoin.chain=newLongestChain;
                    bitcoin.PendingTransaction=newPendingTransaction;
                    res.json({note:'this chain has been replaced.',
                    chain:bitcoin.chain});
                }
            
        });
});

app.get('/block/:blockHash',function(req,res)
{
const blockHash=req.params.blockHash;
const correctBlock=bitcoin.getBlock(blockHash);
res.json({
    block:correctBlock
});
});
app.get('/transaction/:transactionId',function(req,res)
{
    const transactionId=req.params.transactionId;
   const transactionData= bitcoin.getTransaction(transactionId);
   res.json({
       transaction:transactionData.transaction,
       block:transactionData.block
   });
});

app.get('/address/:address',function(req,res)
{
    const address=req.params.address;
    const AddressData=bitcoin.getAddressData(address);
    res.json({ addressData:AddressData
        });
});
app.get('/blockExplorer',function(req,res){
    res.sendFile('./block-explorer/index.html',{root:__dirname});//look at this directory and find the file with this path  
});
app.listen(port,function(){console.log('listening on port '+port+'...');})// using port 3000