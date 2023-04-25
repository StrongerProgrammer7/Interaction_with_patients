const mysql = require('../../../routers/connectionMySQL');

const update_list_doctors = async (req,res) =>
{
    const 
    {
        meta,
        list_doctors_have_access
    } = req.body;
     await mysql.promise().query(`UPDATE Patient
     Set list_doctors_have_access = ?,
     Where account_ethereum = ?
     `,[list_doctors_have_access,meta])
    .then(async (result,err) =>
    {
        if(err)
            throw new Error('Get error with update list doctors have access');
        
        return res.status(200).json({message:"Success"});
        
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = update_list_doctors;