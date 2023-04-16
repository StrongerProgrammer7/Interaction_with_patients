//Как осуществить работу с web3 провайдером на сервере
// const Eth = require('web3-eth');

// var eth = new Eth(Eth.givenProvider || 'http://127.0.0.1:7545');
//console.log(eth.providers);
//console.log(eth.currentProvider);
// const contract = new eth.Contract(ABI,addressContract);
const { json } = require('body-parser');
const mysql = require('../routers/connectionMySQL');

// const contract = require('../build/contracts/Patients.json');
const contract = require('../routers/deplyeContract');
// const ganache = require('ganache');
const Web3 = require('web3');

// const options = {}  
// const provider = ganache.provider(options);

const web3 = new Web3('http://127.0.0.1:8545');

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
        hashTx
    } = req.body;

    await mysql.promise().query(`Select id FROM Patient WHERE mail = 'sw@as.ru' OR account_ethereum = ?`,[mail,meta])
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
                            //res.status(200).json({status:"success", success:"Well done!Reg! "});
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
        })
    .catch(err =>console.log(err));
    
    

   

    
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