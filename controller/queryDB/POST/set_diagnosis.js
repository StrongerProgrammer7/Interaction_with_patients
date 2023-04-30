const mysql = require('../../../routers/connectionMySQL');

const insert_diagnosis = async (req,res) =>
{
    const 
    {
        name_ill,
        treatment,
        classification,
        date_ill,
        date_cured,
        meta,
        id_patient,
        
    } = req.body;
     await mysql.promise().query(`SELECT id FROM Doctor Where account_ethereum = ?;Select name_ill FROM Name_ills WHERE name_ill = ?`,[meta,name_ill])
    .then(async (result,err) =>
    {
        if(err)
            throw new Error('Get error with get id doctor');
        let id_doctor = result[0][0].id;
        let isExitsIll = result[0][1].name_ill;
        if(isExitsIll!==undefined || isExitsIll !== null || isExitsIll !== '')
        {
            await mysql.promise().query(`INSERT INTO Diseased (classification,name_ill,treatment) VALUES(?,?,?);Select id FROM Diseased WHERE classification = ? AND name_ill = ? AND treatment = ?`,[classification,name_ill,treatment,classification,name_ill,treatment])
            .then(async (result,error)=>
            {
                if(err)
                    throw new Error(`Get error with insert and select \n${error}`);
                let id_ill = result[0][2].id;
                await mysql.promise().query(`INSERT INTO Records (id_patient,id_doctor,id_ill,date_ill,date_cured) VALUES(?,?,?,?,?)`,[id_patient,id_doctor,id_ill,date_ill,date_cured])
                .then((result,error) =>
                {
                    if(err)
                        throw new Error(`Get error with insert records \n${error}`);
                    res.status(200).json({status:"success",message:"insert records"});
                })
                .catch(error=>console.log);
            })
            .catch(error =>
            {
                if(error)
                    throw new Error('Get error with insert diseased');
                console.log(error);
            })
        }else
        {
            await mysql.promise().query(`INSERT INTO Name_ills (name_ill) VALUES(?);INSERT INTO Diseased (classification,name_ill,treatment) VALUES(?,?,?);Select id FROM Diseased WHERE classification = ? AND name_ill = ? AND treatment = ?`,[name_ill,classification,name_ill,treatment,classification,name_ill,treatment])
            .then(async (result,error)=>
            {
                if(error)
                    throw new Error(`Get error with insert Name_ills,diseased,select id from diseased\n${error}`);

                let id_ill = result[0][2].id;
                await mysql.promise().query(`INSERT INTO Records (id_patient,id_doctor,id_ill,date_ill,date_cured) VALUES(?,?,?,?,?)`,[id_patient,id_doctor,id_ill,date_ill,date_cured])
                .then((result,error) =>
                {
                    if(err)
                        throw new Error(`Get error with insert records \n${error}`);
                    res.status(200).json({status:"success",message:"insert records"});
                })
                .catch(error=>console.log);
            })
            .catch(error =>
            {
                if(error)
                    throw new Error(`Get error with insert Name_ills,diseased,select id from diseased\n${error}`);
                console.log(error);
            })
        }
       
        
        
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = insert_diagnosis;