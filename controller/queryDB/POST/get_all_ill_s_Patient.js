const mysql = require('../../../routers/connectionMySQL');

const select_all_ills_patient = async (req,res) =>
{
    const 
    {
        meta
    } = req.body;
    await mysql.promise().query(`SELECT id FROM Patient
     Where account_ethereum = ?
     `,[meta])
     .then(async (result,error) =>
     {
        if(error)
            throw new Error('Error with get id patient!');
        if(result[0].length ===0)
            return res.status(201).json({message:"Patient don't exists",status:"Fail"});
        await mysql.promise().query(`SELECT Records.id,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records 
        INNER JOIN 
        Doctor ON Doctor.id = Records.id_doctor
        INNER JOIN 
        Diseased ON Diseased.id = Records.id_ill
        Where Records.id_patient = ?
        `,[result[0][0].id])
       .then(async (result,err) =>
       {
           if(err)
               throw new Error('Get error with get list ills');
           
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
     }).catch((err)=>
     {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
     });
     
     
    
}

module.exports = select_all_ills_patient;