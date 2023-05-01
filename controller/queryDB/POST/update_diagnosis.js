const mysql = require('../../../routers/connectionMySQL');

const update_diagnosis = async (req,res) =>
{
    let 
    {
        name_ill,
        treatment,
        classification,
        date_ill,
        date_cured,
        status,
        id_ill,
        meta
        
    } = req.body;

    if(status.includes('Cured') === true && (date_cured === '' || date_cured ===undefined || date_cured === null))
        return res.status(401).json({status:"Fail",error:"Input date_cured if status Cured"});
    if(status.includes('ill')===true)
        date_cured = null;

    const id_doctor = await mysql.promise().query(`SELECT id FROM Doctor WHERE Doctor.account_ethereum = ?`,[meta]).catch(error => console.log);
    const ill = await mysql.promise().query(`SELECT name_ill FROM Name_ills Where name_ill = ?`,[name_ill])
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
    if(ill[0][0].name_ill === undefined || ill[0][0].name_ill === '')
    {
        await mysql.promise().query(`INSERT INTO Name_ills(name_ill) VALUES (?);`,[name_ill]).catch(error=>console.log);
        console.log(name_ill);
    }
    const id_deseased = await mysql.promise().query(`Select id_ill FROM Records WHERE id = ?`,[id_ill]).catch(error=>console.log(error));
    await mysql.promise().query(`UPDATE Diseased SET classification = ?, name_ill = ?, treatment = ? WHERE id = ?`,[classification,name_ill,treatment,id_deseased[0][0].id_ill]).catch(error => console.log(error));

    await mysql.promise().query(`UPDATE Records SET id_doctor=?,date_ill =?,date_cured =?,status=? WHERE id = ?`,[id_doctor[0][0].id,date_ill,date_cured,status,id_ill]).catch(error=> console.log(error));

    res.status(201).json({status:true,message:"Update records"});
}

module.exports = update_diagnosis;
