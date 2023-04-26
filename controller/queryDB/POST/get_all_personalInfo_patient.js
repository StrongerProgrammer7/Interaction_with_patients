const { json } = require('body-parser');
const mysql = require('../../../routers/connectionMySQL');


const select_all_info_aboutPatient = async (req,res) =>
{
    const
    {
        meta
    }= req.body;
    await mysql.promise().query(`SELECT name,surname,lastname,mail,phone,insurance_policy,datebirthd, c1.city as city, residence.city as addressResidence FROM Patient 
    INNER JOIN City c1 ON c1.id = Patient.city_id
    INNER JOIN City residence ON residence.id = Patient.address_of_residence
    WHERE Patient.account_ethereum = ?`,[meta])
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

module.exports = select_all_info_aboutPatient;