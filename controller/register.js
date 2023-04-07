//Как осуществить работу с web3 провайдером на сервере
//const Web3 = require('web3');
// const Eth = require('web3-eth');
// const ABI = require('./contract/JSON/ABI.json');
// const addressContract = process.env['AddressContract'];

// var eth = new Eth(Eth.givenProvider || 'http://127.0.0.1:7545');
//console.log(eth.providers);
//console.log(eth.currentProvider);
// const contract = new eth.Contract(ABI,addressContract);
const { json } = require('body-parser');
const mysql = require('../routers/connectionMySQL');
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
        meta
    } = req.body;

    let isExitsts = false;
    await mysql.promise().query(`Select id FROM Patient WHERE mail = 'sw@as.ru' OR account_ethereum = ?`,[mail,meta])
    .then(res =>
    {
        if(res[0].length!==0)
            isExitsts -= true;
    })
    .catch(err =>console.log(err));
    
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
                    res.status(200).json({status:"success", success:"Well done!Reg! "});
                })
            .catch((err) => 
            {
                console.log(err);
                res.status(400).json({status:"bad",message:`${err.sqlMessage}`});
            });
    }else
    {
        res.status(300).json({status:"bad",message:`You are registered!`});
    }
    
   

    //Взаимодействие с контрактом
    // let dataRegistered = new Array();
    // for (let key in req.body)
    // {
    //     if(!req.body.hasOwnProperty(key)) continue;
    //     if(key != "meta")
    //         dataRegistered.push(req.body[key]);
    // }
    // console.log(dataRegistered);

    // const account = req.body["meta"];
    // console.log(account);

    // const privateKey = "30a0db45f3de32c354364a486165c91a342b574172c85ee35bd77323b7a3dfb9";
    
    // const tx = 
    // {
    //     from: account,
    //     to: addressContract,
    //     gas:500000,
    //     data: await contract.methods.createPatient(dataRegistered).encodeABI()

    // }
    // const signTX = await eth.accounts.signTransaction(tx,privateKey);

    // await eth.sendSignedTransaction(signTX.rawTransaction)
    // .on("receipt",function(receipt)
    // {
    //     console.log(receipt);
    //     res.status(200).json({status:"success", success:"Well done!Reg! "});
    // }).on('error', (error) =>
    // {
    //     console.log(error);
    //     res.status(300).json({status:"bad"});
    // });
    
}

module.exports = register;