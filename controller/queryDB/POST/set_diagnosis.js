const mysql = require('../../../routers/connectionMySQL');

const insert_diagnosis = async (req,res) =>
{
    let 
    {
        name_ill,
        treatment,
        classification,
        date_ill,
        date_cured,
        meta,
        id_patient,
        
    } = req.body;
    if(date_cured === "")
        date_cured = null;

     await mysql.promise().query(`SELECT id FROM Doctor Where account_ethereum = ?;Select name_ill FROM Name_ills WHERE name_ill = ?`,[meta,name_ill])
    .then(async (result,err) =>
    {
       
        if(err)
            throw new Error('Get error with get id doctor');
        let id_doctor = result[0][0][0].id;
        let isExitsIll = result[0][1][0].name_ill;
        let id_ill;
        if(isExitsIll!==undefined || isExitsIll !== null || isExitsIll !== '')
        {
            id_ill = await mysql.promise().query(`INSERT INTO Diseased (classification,name_ill,treatment) VALUES(?,?,?);SELECT LAST_INSERT_ID() as id;`,[classification,name_ill,treatment])
            .catch(error =>
            {
                if(error)
                    throw new Error('Get error with insert diseased');
                console.log(error);
            });
            id_ill = id_ill[0][1][0].id;
        }else
        {
            id_ill = await mysql.promise().query(`INSERT INTO Name_ills (name_ill) VALUES(?);INSERT INTO Diseased (classification,name_ill,treatment) VALUES(?,?,?);SELECT LAST_INSERT_ID() as id`,[name_ill,classification,name_ill,treatment,classification,name_ill,treatment])
            .catch(error =>
            {
                if(error)
                    throw new Error(`Get error with insert Name_ills,diseased,select id from diseased\n${error}`);
                console.log(error);
            });
            id_ill = id_ill[0][2][0].id;
        }

        const records = await mysql.promise().query(`INSERT INTO Records (id_patient,id_doctor,id_ill,date_ill,date_cured) VALUES(?,?,?,?,?);SELECT LAST_INSERT_ID() as id;`,[id_patient,id_doctor,id_ill,date_ill,date_cured])
        .catch(error =>
        {
            if(error)
                throw new Error(`Get error with insert records \n${error}`);
        });

        await mysql.promise().query(`SELECT Records.id,Patient.surname as surname,Patient.id as id_patient,Patient.account_ethereum as meta,Patient.list_doctors_have_access as list_doc ,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records 
        INNER JOIN 
        Doctor ON Doctor.id = Records.id_doctor
        INNER JOIN 
        Diseased ON Diseased.id = Records.id_ill
        INNER JOIN
        Patient ON Patient.id = Records.id_patient
        Where Records.id = ?`,[records[0][1][0].id])
        .then((result,error) =>
        {
            console.log(result[0]);
            if(error)
                throw new Error(`Get error with insert records \n${error}`);
            res.status(200).json({status:true,message:"Insert records success",data:result[0]})
        }).catch(error=>console.log);
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = insert_diagnosis;
