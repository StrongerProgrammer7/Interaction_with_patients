const mysql = require('../../../routers/connectionMySQL');

const select_all_profession_doctors = async (req,res) =>
{
     await mysql.promise().query(`SELECT * FROM Profession`)
    .then(async (result,error) =>
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

module.exports = select_all_profession_doctors;