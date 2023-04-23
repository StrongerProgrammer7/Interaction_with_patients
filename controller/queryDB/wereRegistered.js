const mysql = require('../../routers/connectionMySQL');


const checkWereRegistered = async (req,res) =>
{
    const 
    {
        meta
    } = req.body;
    await mysql.promise().query(`Select * FROM Patient WHERE account_ethereum = ?`,[meta])
    .then(async (result,err) =>
    {
        if(err)
        {
            throw new Error('You already registered!');
        }
        if(result[0].length===0)
        {
            return res.status(201).json({status:true, error:"Patient don't reg"})
        }else
        {
            return res.status(201).json({status:false, success:"Patient reg! "});
        }
        
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = checkWereRegistered;