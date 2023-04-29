const { json } = require('body-parser');
const mysql = require('../../../routers/connectionMySQL');


const select_hospitals = async (req,res) =>
{
    await mysql.promise().query(`SELECT Hospital.id,city,number_hospital FROM Hospital INNER JOIN City ON City.id = Hospital.city_id`)
    .then((result,error) =>
    {
        if(error)
        {
            return res.status(300).json({status: false,data: '',error:error});
        }
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
}

module.exports = select_hospitals;