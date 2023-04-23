const { json } = require('body-parser');
const jwt = require("jsonwebtoken");
const mysql = require('../routers/connectionMySQL');
const bcrypt = require("bcryptjs");

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
        await mysql.query(`Select * FROM Patient WHERE account_ethereum = ?`,[meta], async(err,result) =>
        {
            if(err)
            {
                throw new Error('You already registered!');
                //return res.status(200).json({status:true, success:"Patient don't Reg! "});
            }
            if(result[0].length===0 || !await bcrypt.compare(pass,result[0].password))
            {
                return res.status(401).json({status:"error", error:"login or pass incorrect"})
                //return res.status(200).json({status:false, success:"Patient reg! "});
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
        // .catch((err) => 
        // {
        //     console.log(err);
        //     return res.status(500).json({status:"Fail", error:"Problem with server!"});
        // });
    }
    
    
}

module.exports = login;