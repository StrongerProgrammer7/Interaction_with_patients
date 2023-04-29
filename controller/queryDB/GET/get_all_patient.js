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

            let patiens_data = result[0];
            
            for(let i=0;i<patiens_data.length;i++)
            {
                //console.log(patiens_data[i]);
                let patient_object = {};
                patient_object.num = i+1;
                patient_object.id = patiens_data[i].id;
                let lastname = patiens_data[i].lastname!==null && patiens_data[i].lastname!==''?`${patiens_data[i].lastname[0].toUpperCase()}.`: "";
                patient_object.initials = `${patiens_data[i].surname} ${patiens_data[i].name[0].toUpperCase()}. ${lastname}`;
                patient_object.mail = patiens_data[i].mail !== null? patiens_data[i].mail : "";
                patient_object.city = patiens_data[i].city;
                patient_object.meta = patiens_data[i].account_ethereum;
                patient_object.list_doc_have_access_to_patient = patiens_data[i].list_doc;
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