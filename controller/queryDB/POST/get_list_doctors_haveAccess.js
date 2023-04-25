const mysql = require('../../../routers/connectionMySQL');

const select_list_doctors_have_access = async (req,res) =>
{
    const 
    {
        meta
    } = req.body;
     await mysql.promise().query(`SELECT list_doctors_have_access as list_doc FROM Patient 
     Where account_ethereum = ?
     `,[meta])
    .then(async (result,err) =>
    {
        if(err)
            throw new Error('Get error with get list doctors have access');
        
        if(result[0].length===0)
        {
            return res.status(201).json({status:false, message:"List empty!"})
        }else
        {
            return res.status(200).json({data:result[0],message:"Success"});            
        }
        
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = select_list_doctors_have_access;