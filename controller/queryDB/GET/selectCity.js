const { json } = require('body-parser');
const mysql = require('../../../routers/connectionMySQL');


const selectCity = async (req,res) =>
{
    await mysql.promise().query(`SELECT id,region, city FROM City`)
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

module.exports = selectCity;