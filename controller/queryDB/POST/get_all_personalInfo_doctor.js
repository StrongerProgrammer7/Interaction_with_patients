const { json } = require('body-parser');
const mysql = require('../../../routers/connectionMySQL');


const select_all_info_aboutDoctor = async (req,res) =>
{
    const
    {
        meta
    }= req.body;
    await mysql.promise().query(`SELECT contacts_id,hospital_id,category,profession,surname,name,lastname,phone,mail FROM Doctor
    WHERE Doctor.account_ethereum = ?`,[meta])
    .then((result,error) =>
    {
        if(error)
        {
            return res.status(300).json({status: false,data: '',error:error});
        }
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = select_all_info_aboutDoctor;