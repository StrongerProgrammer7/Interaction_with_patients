const { json } = require('body-parser');
const mysql = require('../routers/connectionMySQL');
const bcrypt = require("bcrypt");

// const contract = require('../routers/deployeContract');
// const ganache_server = require('../routers/connectionGanache')
// const provider = ganache_server.provider;

// const Web3 = require('web3');

// const web3 = new Web3(provider);

const register = async (req,res) =>
{//TODO: Fix database
    // const 
    // {
    //     name, 
    //     surname,
    //     lastname,
    //     addressOfResidence,
    //     addressRegistered,
    //     insurancePolicy,
    //     phone,
    //     mail,
    //     bdate,
    //     meta,
    //     password,
    //     isDoctor
    // } = req.body;

    if(!req.body.meta || !req.body.password || !req.body.name || !req.body.surname || !req.body.mail)
    {
        return res.status(401).json({status:"Error",error:"Check your data!"});
    }
    if(req.body.isDoctor === false)
    {
        registerPatient(req,res);
    }else
    {
        registerDoctor(req,res);
    }
    
    
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

async function registerPatient(req,res)
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
        password
    } = req.body;

    await mysql.promise().query(`Select id FROM Patient WHERE mail = ? OR account_ethereum = ?`,[mail,meta])
    .then(res =>
    {
        //console.log(res[0].length);
        if(res[0].length!==0)
            throw new Error('You already registered!');
    })
    .then(async function() 
        {
            const pass_hash = bcrypt.genSalt(10,(err,salt)=>
            {
                bcrypt.hash(password,10, async (err,hash)=>
                {
                    if(err)
                        throw new Error('Problem with hashing password');

                    await mysql.promise().query(`INSERT INTO Patient(city_id,surname,name,lastname,phone,mail,
                        account_ethereum,isPartInformation_hidden,address_of_residence,insurance_policy,datebirthd,password) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [addressRegistered,surname,name,lastname,phone, mail,meta,1,addressOfResidence,insurancePolicy,bdate,hash ])
                        .then((result) => 
                        {
                            return res.status(201).json({status:"success", success:"Well done!You regestered! "});
                        })
                        .catch((err) => 
                        {
                            console.log(err);
                            return res.status(500).json({status:"bad",message:`${err.sqlMessage}`});
                        });
                })
            })
        })
    .catch(err =>console.log(err));
}

async function registerDoctor(req,res)
{
    const 
    {
        name, 
        surname,
        lastname,
        contacts_id,
        hospital_id,
        category,
        profession,
        mail,
        phone,
        meta,
        password
    } = req.body;
    await mysql.promise().query(`Select id FROM Doctor WHERE mail = ? OR account_ethereum = ?`,[mail,meta])
    .then(res =>
    {
        //console.log(res[0].length);
        if(res[0].length!==0)
            throw new Error('You already registered!');
    })
    .then(async function() 
        {
            const pass_hash = bcrypt.genSalt(10,(err,salt)=>
            {
                bcrypt.hash(password,10, async (err,hash)=>
                {
                    if(err)
                        throw new Error('Problem with hashing password');

                    await mysql.promise().query(`INSERT INTO Doctor(contacts_id,surname,name,lastname,phone,mail,
                        account_ethereum,hospital_id,category,profession,password) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
                        [contacts_id,surname,name,lastname,phone, mail,meta,hospital_id,category,profession,hash ])
                        .then((result) => 
                        {
                            return res.status(201).json({status:"success", success:"Well done!You regestered! "});
                        })
                        .catch((err) => 
                        {
                            console.log(err);
                            return res.status(500).json({status:"bad",message:`${err.sqlMessage}`});
                        });
                })
            })
        })
    .catch(err =>console.log(err));
}

module.exports = register;