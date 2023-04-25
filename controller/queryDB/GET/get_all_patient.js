const mysql = require('../../../routers/connectionMySQL');

const select_all_patients = async (req,res) =>
{
     await mysql.promise().query(`Select Patient.id,surname,name,lastname, City.city as city, mail, account_ethereum,list_doctors_have_access as list_doc FROM Patient INNER JOIN City ON City.id = Patient.city_id`)
    .then(async (result,err) =>
    {
        if(err)
            throw new Error('Get error with get list patients');
        
        if(result[0].length===0)
        {
            return res.status(201).json({status:false, message:"List empty!"})
        }else
        {
            let all_patients = [];
            for(const patient in result[0])
            {
                let patient_object = {};
                patient_object.id = patient.id;
                patient_object.initials = `${patient.surname} ${patient.name[0].toUpperCase()} ${patient.lastname[0].toUpperCase()}`;
                patient_object.city = patient.city;
                patient_object.mail = patient.mail;
                patient_object.meta = patient.account_ethereum;
                patient_object.list_doc_have_access_to_patient = patient.list_doc;
                all_patients.push(patient_object);
            }
            return res.status(200).json({data:all_patients,message:"Success"});
            
        }
        
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = select_all_patients;