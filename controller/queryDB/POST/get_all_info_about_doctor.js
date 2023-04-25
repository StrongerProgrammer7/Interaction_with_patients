const mysql = require('../../../routers/connectionMySQL');

const select_all_info_about_doctor = async (req,res) =>
{
    const
    {
        id
    } = req.body;
     await mysql.promise().query(`Select Doctor.id,surname,name,lastname,profession, mail,City.city as city,category,Hospital.hospital,Hospital.number_hospital,Hospital.hospital_phone, Contacts_doc.office_phone, Contacts_doc.office_mail FROM Doctor INNER JOIN (Hospital INNER JOIN City ON City.id = Hospital.city_id) ON Hospital.id= Doctor.hospital_id INNER JOIN Contacts_doc ON Contacts_doc.id = Doctor.contacts_id WHERE Doctor.id = ?`,[id])
    .then(async (result,err) =>
    {
        if(err)
            throw new Error('Get error with get info about doctor');
        
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

module.exports = select_all_info_about_doctor;