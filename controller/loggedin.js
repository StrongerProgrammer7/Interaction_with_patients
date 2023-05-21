const jwt = require("jsonwebtoken");
const mysql = require('../routers/connectionMySQL');

const loggedIn = (req,res,next) =>
{
   
    if(!req.cookies.userLoggedIn)
    {
        return next();
    }
    try 
    {
        console.log(req.cookies.userLoggedIn)
        const decoded = jwt.verify(req.cookies.userLoggedIn, process.env.JWT_SECRET);
        console.log(decoded.id)
        mysql.query('SELECT * FROM Patient WHERE id = ?',[decoded.id],(err,result) =>
        {
            if(err)
                return next(); // next() без аргументов позволяет подобрать любой другой , если нет нужного
            req.user = result[0];
            req.session.isAuth = true;
            //console.log(req.user.id);
            //req.user.id = [decoded.id];
            return next();
        })     
    } catch (err) 
    {   
        if(err)
            return next();
    }
}

module.exports = loggedIn;