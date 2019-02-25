const Blockchain=require('./blockchain');
const bitcoin= new Blockchain();
// bitcoin.createNewBlock(1252,'04545','60404660');
// bitcoin.createNewBlock(324,'01111','04545');
// bitcoin.createNewBlock(432,'0222','01111');   //test1
// bitcoin.createNewBlock(234,'0333','0222');

// bitcoin.createNewBlock(234454,'FJSDIOFJIDSF','0nidMFDSOJF');
// bitcoin.createNewTransaction(100,'ALEXHIOHFDS','JENNASJFIODSF');
// // console.log(bitcoin);

// bitcoin.createNewBlock(32555,'FNASFI FNSDIFO','LMSOJFOJFD');
// // console.log(bitcoin.chain[1]);       //test2


// bitcoin.createNewTransaction(50,'ALEXHIOHFDS','JENNASJFIODSF');
// bitcoin.createNewTransaction(300,'ALEXHIOHFDS','JENNASJFIODSF');
// bitcoin.createNewTransaction(2000,'ALEXHIOHFDS','JENNASJFIODSF');
// // console.log(bitcoin);

// bitcoin.createNewBlock(343,'FNASFI FNSDIFO','LMSOJFOJFD');
// // console.log(bitcoin);
// console.log(bitcoin.chain[2]);


// const previousBlockHash='HDUSFUSDFUIDJSOFSD'
// const currentBlockData=[
    
//     {
//         amount:10,
//         sender:'SFJODJFSF',
//         recipient:'JIDOJIOFDSF'
//     },
//     {
//         amount:30,
//         sender:'FJDSFIJDSF',                     //test3 // test 4
//         recipient:'EWFMDSKF'
//     },
//     {
//         amount:200,
//         sender:'SFJOWELKPFKDJFSF',
//         recipient:'KREWPREWWER'
//     }
// ];
// const nonce=300;
//console.log( bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce));//test 3
// //if we change a letter the hash will be different

//console.log( bitcoin.proofOfWork(previousBlockHash,currentBlockData));//test 4
//console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,14256));// el nonce elly tele3le men el 5atoa elly 2ablha



// testing chain is valid function
const bc1=
{
"chain": [
{
"index": 1,
"timestamp": 1549810750838,
"transaction": [],
"nonce": 100,
"hash": "0",
"previousBlockHash": "0"
},
{
"index": 2,
"timestamp": 1549810761196,
"transaction": [],
"nonce": 16441,
"hash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
"previousBlockHash": "0"
},
{
"index": 3,
"timestamp": 1549810797691,
"transaction": [
{
"amount": 12.5,
"sender": "00",
"recipient": "6c3c2da02d4411e99ca505190f8bf4e1",
"transactionId": "726f65c02d4411e99ca505190f8bf4e1"
},
{
"amount": 700,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "7a29da202d4411e99ca505190f8bf4e1"
},
{
"amount": 600,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "7d6815302d4411e99ca505190f8bf4e1"
},
{
"amount": 500,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "803258c02d4411e99ca505190f8bf4e1"
},
{
"amount": 400,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "829660702d4411e99ca505190f8bf4e1"
},
{
"amount": 300,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "84e866c02d4411e99ca505190f8bf4e1"
}
],
"nonce": 48536,
"hash": "0000d3d5c8bc49fee6cc2a3dbe7bc12ffeae0d1ede0bbafd3caaa55661da61eb",
"previousBlockHash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285"
},
{
"index": 4,
"timestamp": 1549810834476,
"transaction": [
{
"amount": 12.5,
"sender": "00",
"recipient": "6c3c2da02d4411e99ca505190f8bf4e1",
"transactionId": "882939e02d4411e99ca505190f8bf4e1"
},
{
"amount": 10,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "8c7ae0c02d4411e99ca505190f8bf4e1"
},
{
"amount": 20,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "91c873d02d4411e99ca505190f8bf4e1"
},
{
"amount": 30,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "943778002d4411e99ca505190f8bf4e1"
},
{
"amount": 40,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "97f913e02d4411e99ca505190f8bf4e1"
},
{
"amount": 50,
"sender": "JSAJDIFNKS0W2DS",
"recipient": "JDOJDFEFWE",
"transactionId": "9ae5faa02d4411e99ca505190f8bf4e1"
}
],
"nonce": 201859,
"hash": "0000677082c482aa9e07714d8e6a6402055746db33b4f084dafe74722e9fc826",
"previousBlockHash": "0000d3d5c8bc49fee6cc2a3dbe7bc12ffeae0d1ede0bbafd3caaa55661da61eb"
},
{
"index": 5,
"timestamp": 1549810845479,
"transaction": [
{
"amount": 12.5,
"sender": "00",
"recipient": "6c3c2da02d4411e99ca505190f8bf4e1",
"transactionId": "9e162bf02d4411e99ca505190f8bf4e1"
}
],
"nonce": 2383,
"hash": "0000efd0663217b4968df6beb568e853148f5a7351e0b1dbd26701de641e62e6",
"previousBlockHash": "0000677082c482aa9e07714d8e6a6402055746db33b4f084dafe74722e9fc826"
},
{
"index": 6,
"timestamp": 1549810846941,
"transaction": [
{
"amount": 12.5,
"sender": "00",
"recipient": "6c3c2da02d4411e99ca505190f8bf4e1",
"transactionId": "a4a518a02d4411e99ca505190f8bf4e1"
}
],
"nonce": 13463,
"hash": "00007120379f4934c4200e08b95da0f0154c06f65761c8f069024728c7dd315f",
"previousBlockHash": "0000efd0663217b4968df6beb568e853148f5a7351e0b1dbd26701de641e62e6"
}
],
"PendingTransaction": [
{
"amount": 12.5,
"sender": "00",
"recipient": "6c3c2da02d4411e99ca505190f8bf4e1",
"transactionId": "a58406f02d4411e99ca505190f8bf4e1"
}
],
"currentNodeUrl": "http://localhost:3001",
"networkNodes": []
}

    console.log(bitcoin .chainIsValid(bc1.chain));


  //  console.log(bitcoin);