const { json } = require('body-parser');
const jwt = require("jsonwebtoken");
const mysql = require('../routers/connectionMySQL');
const bcrypt = require("bcrypt");

const login = async (req,res) =>
{
    const 
    {
        meta,
        pass
    } = req.body;
    if(meta === undefined || meta === '' || pass ===undefined || pass === '')
    {
        return res.status(401).json({status:"Fail",error:"Input meta or password"});
    }else
    {
        await mysql.promise().query(`Select * FROM Patient WHERE account_ethereum = ?`,[meta])
        .then((result,error) =>
        {
            
            if(error)
                throw new Error('Problem with signIn');
            return result[0];
        })
        .then(async (patient)=>
        {
            let validPassword = await bcrypt.compare(pass,patient[0].password);
            if(patient.length===0 || !validPassword)
            {
                return res.status(401).json({status:"error", error:"login or pass incorrect"})
            }else
            {
                // const token = jwt.sign({id: result[0].id}, process.env.JWT_SECRET,
                //     {
                //         expiresIn: process.env.JWT_EXPIRES
                //     });
                // const cookieOption =
                // {
                //     expiresIn: new Date(Date.now() + this.process.env.COOKIE_EXPIRES),
                //     httpOnly: true
                // }
                // res.cookie("userLoggedIn",token,cookieOption);
                return res.status(201).json({status:true,success:"User has been logged in"});
            }
        })
        .catch((err) => 
         {
             console.log(err);
             return res.status(500).json({status:"Fail", error:"Problem with server to signin!"});
         });
    }
    
    
}

module.exports = login;