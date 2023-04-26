const { json } = require('body-parser');
const mysql = require('../../../routers/connectionMySQL');


const selectCity_patient = async (req,res) =>
{
    const
    {
        meta
    }= req.body;
    await mysql.promise().query(`SELECT city FROM Patient
    INNER JOIN City ON City.id = Patient.city_id
    WHERE Patient.account_ethereum = ?`,[meta])
    .then((result,error) =>
    {
        if(error)
        {
            return res.status(300).json({status: false,data: '',error:error});
        }
        return res.status(200).json({status:true, data:result[0][0].city});
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = selectCity_patient;