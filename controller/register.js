const { json } = require('body-parser');
const mysql = require('../routers/connectionMySQL');

// const contract = require('../routers/deployeContract');
// const ganache_server = require('../routers/connectionGanache')
// const provider = ganache_server.provider;

// const Web3 = require('web3');

// const web3 = new Web3(provider);

const register = async (req,res) =>
{
    const 
    {
        name, 
        surname,
        lastname,
        addressOfResidence,
        addressRegistered,
        insurancePolicy,
        phone,
        mail,
        bdate,
        meta,
        password_hash
    } = req.body;

    await mysql.promise().query(`Select id FROM Patient WHERE mail = ? OR account_ethereum = ?`,[mail,meta])
    .then(res =>
    {
        if(res[0].length!==0)
           return true;
        return false;
    })
    .then(async function(isExitsts) 
        {
            if(isExitsts === false)
            {
                let idCities = 0;
            
                idCities =  await mysql.promise().query(`Select id FROM City WHERE  city = ?`, addressRegistered)
                    .then((res) => 
                    {
                       return res[0][0].id;
                    }).catch((err) => { console.log(err);});
                
                await mysql.promise().query(`INSERT INTO Patient(city_id,surname,name,lastname,phone,mail,
                    account_ethereum,isPartInformation_hidden,address_of_residence,insurance_policy,datebirthd) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
                    [idCities,surname,name,lastname,phone, mail,meta,0,addressOfResidence,insurancePolicy,bdate ])
                    .then((result) => 
                        {
                            return res.status(200).json({status:"success", success:"Well done!Reg! "});
                        })
                    .catch((err) => 
                    {
                        console.log(err);
                        return res.status(400).json({status:"bad",message:`${err.sqlMessage}`});
                    });
            }else
            {
                return res.status(300).json({status:"bad",message:`You are registered!`});
            }
        })
    .catch(err =>console.log(err));
    
    // console.log(hashTx);
    // contract.then(data=>
    //     {
    //         data.address.then(async (address)=>
    //             {
    //                 console.log(address);
    //                 const hash = await new Promise(async (resolve) =>
    //                 {
    //                     await web3.eth.sendSignedTransaction(hashTx)
    //                     .once('transactionHash',(hash)=>
    //                     {
    //                         resolve(hash);
    //                     })
    //                     console.log('Finished');
    //                 });
    //                 console.log(hash);
    //                 res.status(200).json({status:"success", success:"Well done!Reg! "});
    //             })
    //             .catch(error => console.log)
    //     })
    //     .catch(error => console.log);
 
    
    // const CONTRACT_ADDRESS = contract.networks[1680893351699].address;  
    // const USER_ADDRESS = web3.utils.toChecksumAddress(meta);
    // const contractInstance = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);
   
    // await contractInstance.methods.createPatient().send(
    //     {
    //         from: USER_ADDRESS
    //     }
    // ).then(()=> res.status(200).json({status:"success", success:"Well done!Reg! "}))
    // .catch((err) => console.log(err));

}

module.exports = register;