const { json } = require('body-parser');
const jwt = require("jsonwebtoken");
const mysql = require('../routers/connectionMySQL');
const bcrypt = require("bcrypt");

const login = async (req,res) =>
{
    const 
    {
        meta,
        pass,
        isDoctor
    } = req.body;
    if(meta === undefined || meta === '' || pass ===undefined || pass === '')
    {
        return res.status(401).json({status:"Fail",error:"Input meta or password"});
    }else
    {
        if(isDoctor===false)
        {
            signUp(`Select * FROM Patient WHERE account_ethereum = ?`,res,meta,pass);
        }else
        {
            signUp(`Select * FROM Doctor WHERE account_ethereum = ?`,res,meta,pass);
        }
    }
}

async function signUp(query_check,res,meta,pass)
{
    await mysql.promise().query(query_check,[meta])
    .then((result,error) =>
    {
        if(error)
            throw new Error('Problem with signIn');
        return result[0];
    })
    .then(async (human)=>
    {
        let validPassword = await bcrypt.compare(pass,human[0].password);
        if(human.length===0 || !validPassword)
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

module.exports = login;