const { json } = require('body-parser');
const mysql = require('../routers/connectionMySQL');

const login = async (req,res) =>
{
    const 
    {
        meta
    } = req.body;
    await mysql.promise().query(`Select * FROM Patient WHERE account_ethereum = ?`,[meta])
    .then(result =>
    {
        if(result[0].length===0)
            return res.status(200).json({status:true, success:"Patient don't Reg! "});
        return res.status(200).json({status:false, success:"Patient reg! "});
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = login;