const ganache_server = require('./connectionGanache')
const provider = ganache_server.provider;

const Web3 = require("web3");
const { json } = require('body-parser');
const fs = require("fs");

const web3 = new Web3(provider);
const path = require('path');
// console.log(provider)

function deployContract_Patient()
{

      return provider.request(
        {
            method: "eth_accounts",
            params: []
        })
        .then(accounts =>
        {
            let source = fs.readFileSync(path.join(__dirname, '..', 'contract','Patients/artifacts/Patient.json'))
            let abi = JSON.parse(source)["abi"];
            let data = JSON.parse(source)["data"]["bytecode"]["object"];
            
            var patientContract = new web3.eth.Contract(abi);
            return patientContract.deploy(
                {
                 data: '0x' + data,
                  arguments: [
                 ]
            }).send(
                {
                 from: accounts[0], 
                 gas: '4700000'
               }, function (error, transactionHash)
               {
                if(error)
                    throw error;
                console.log('transactionHash = ', transactionHash);
             })
             .then((result) => 
             {
                // console.log(result.options.address);
                return result.options.address;
            })
             .catch(error => console.log(error));
        })

     
      
    //    .on('error', function(error) { console.log('Error ', error)})
    //    .on('transactionHash',function(transactionHash) {})
    //    .on('receipt',function(receipt)
    //    {
    //     //   console.log(receipt.contractAddress);
    //    })
    //    .on('confirmation',function(confirmationNumber,receipt) {})
    //    .then(function(newContractInstance)
    //    {
    //     // console.log(newContractInstance.options.address);
    //     return newContractInstance.options.address;
    //    })
       
    
}

function deployContract_Patients(addressPatient)
{
    return provider.request(
    {
        method: "eth_accounts",
        params: []
      })
    .then(accounts =>
    {
        let source = fs.readFileSync(path.join(__dirname, '..', 'contract','Patients/artifacts/Patients.json'))
        let abi = JSON.parse(source)["abi"];
        let data = JSON.parse(source)["data"]["bytecode"]["object"];
        
        var patientContract = new web3.eth.Contract(abi);
        return {abi:abi,address: patientContract.deploy(
            {
             data: '0x' + data,
              arguments: [ addressPatient]
        }).send(
            {
             from: accounts[0], 
             gas: '4700000'
           }, function (error, transactionHash)
           {
            if(error)
                throw error;
            console.log('transactionHash = ', transactionHash);
         })
         .then((result) => 
         {
            // console.log(result.options.address);
            return result.options.address;
        })
         .catch(error => console.log(error))};
    })
}


let address = deployContract_Patient().then(address => 
    {
        return deployContract_Patients(address).then(contract =>
            {
                // contract.address.then(console.log);
                // console.log(contract.abi);
                contract.address.then(address =>
                    {
                        fs.readFile(path.join(__dirname, '..', 'contract','Patients/artifacts/Patients.json'), 'utf8', function (err, data) {
                            if (err) throw err; // we'll not consider error handling for now
                            var obj = JSON.parse(data);
                            //console.log(obj["abi"]);
                            let path_abi_address = path.join(__dirname, '..', 'public','js/');
                            fs.writeFileSync(path_abi_address + "ABIandAddress.js",
                            `const addressContract = "${address}"\n
                            const ABI = ${JSON.stringify(obj["abi"])}`, (error) =>
                            {
                                if(error)
                                    throw error;
                                console.log("Record file abi and address success");
                            });
                        });
               
                       
                    })
                
                return contract;
            })
    });

module.exports = address;