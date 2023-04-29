const mysql = require('../../../routers/connectionMySQL');


const isExistsPatient_Doctor = async (req,res) =>
{
    const 
    {
        meta
    } = req.body;
    await mysql.promise().query(`Select id FROM Patient WHERE account_ethereum = ?; Select id FROM Doctor WHERE account_ethereum = ? `,[meta,meta])
    .then(async (results,err) =>
    {
        if(err)
            throw new Error('Error with get patient or doctor');
        

        let patient = false;
        let doctor = false;

        if(results[0][0].length!==0)
        {
            patient = true;
        }
        if(results[0][1].length!==0)
            doctor = true;
       
        //console.log(results[0][0], results[0][1])
        if(patient === false && doctor === false)
            return res.status(201).json({status:false, message:"Patient/Doctor data", data: { patient:patient,doctor:doctor}});
        return res.status(201).json({status:true, message:"Patient/Doctor data", data: { patient:patient,doctor:doctor}});
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = isExistsPatient_Doctor;