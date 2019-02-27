var express = require('express');
var getIP = require('ipware')().get_ip;

const {Blockchain ,trasaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class mainServer
{
        constructor(port){
            this.app = new  express();
            this.port = port;
            this.config();    
        }
      
       config(){
           
        this.app.get('/', function (req, res) {
            var ipInfo = getIP(req);

            console.log(ipInfo);
            const myKey = ec.keyFromPrivate('b9cfb7752176fedae5e04b60470d20a010fde25469659ebad6de13dc103ce4d0');
            const mywalletAddress = myKey.getPublic('hex');
            let computer = new Blockchain();
            const transaction1 = new trasaction(mywalletAddress,"to address public key",30);
            transaction1.signTransaction(myKey);
            computer.addTransaction(transaction1);
            computer.minePendingTrasactions(mywalletAddress);
          res.send(`hello ${ipInfo.clientIp} \n balance of the my wallet address ${computer.getBalaneAddress(mywalletAddress)}`);
          
        });
        this.app.listen(this.port, () => console.log(`listening on port ${this.port}!`));
   }
}
module.exports.mainServer = mainServer;
