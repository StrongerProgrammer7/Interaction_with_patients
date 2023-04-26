const mysql = require('../../../routers/connectionMySQL');

const update_pesonalInfo_patient = async (req,res) =>
{
    const 
    {
        name,
        surname,
        lastname,
        phone,
        mail,
        isPartInformation_hidden,
        address_of_residence,
        city_id,
        insurance_policy,
        datebirthd,
        meta
    } = req.body;
     await mysql.promise().query(`UPDATE Patient
     Set city_id = ?,
     surname = ?,
     name = ?,
     lastname = ?,
     phone = ?,
     mail = ?,
     isPartInformation_hidden = ?,
     address_of_residence = ?,
     insurance_policy = ?,
     datebirthd = ?
     Where account_ethereum = ?
     `,[city_id,surname,name,lastname,phone,mail,isPartInformation_hidden,address_of_residence,insurance_policy,datebirthd,meta])
    .then(async (result,err) =>
    {
        if(err)
            throw new Error('Get error with update personal info for doctor');
        
        return res.status(200).json({message:"Success"});
        
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = update_pesonalInfo_patient;