const mysql = require('../../../routers/connectionMySQL');

const select_all_doctors = async (req,res) =>
{
     await mysql.promise().query(`Select Doctor.id,surname,name,lastname,profession, mail,City.city as city,Doctor.account_ethereum FROM Doctor INNER JOIN (Hospital INNER JOIN City ON City.id = Hospital.city_id) ON Hospital.id= Doctor.hospital_id`)
    .then((result,err) =>
    {
        if(err)
            throw new Error('Get error with get list doctors');
        
        if(result[0].length===0)
        {
            return res.status(201).json({status:false, message:"List empty!"})
        }else
        {
            
            let all_doctors = [];
            let doctors_data = result[0];
            
            for(let i=0;i<doctors_data.length;i++)
            {
                let doctor_object = {};
                doctor_object.num = i+1;
                doctor_object.id = doctors_data[i].id;
                let lastname = doctors_data[i].lastname!==null && doctors_data[i].lastname!=='' ?`${doctors_data[i].lastname[0].toUpperCase()}.`: "";
                doctor_object.initials = `${doctors_data[i].surname} ${doctors_data[i].name[0].toUpperCase()}. ${lastname}`;
                doctor_object.mail = doctors_data[i].mail !== null? doctors_data[i].mail : "";
                doctor_object.profession = doctors_data[i].profession.toLowerCase();
                doctor_object.city = doctors_data[i].city;
                doctor_object.meta = doctors_data[i].account_ethereum;
                all_doctors.push(doctor_object);
            }
            return res.status(200).json({data:all_doctors,message:"Success"});
            
        }
        
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = select_all_doctors;