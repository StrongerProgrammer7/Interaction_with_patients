const Router = require('express');
const router = new Router();
const loggedIn = require('../controller/loggedin');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
router.use(cookieParser());

router.use(session(
    {
        secret: 'secretKEY',
        saveUninitialized: false,
        resave: false
    }
));
/*----------------------------POST-------------------------------------*/
// Попав сюда через /auth ищется method затем название
//router.post('/login',controller.login);
/*----------------------------/POST-------------------------------------*/
const isAuth = (req,res,next) => 
{
    if(req.session.isAuth)
    {
        next();
    }else
    {   
        res.redirect('/');
    }
};

/*----------------------------GET-------------------------------------*/
router.get('/',(req,res) => 
{
    res.render("pages/index", {title: 'Patients'});
});

router.get('/register',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let registerHTML = fs.createReadStream('./public/registerPatient.html','utf8');
    registerHTML.pipe(res);
 
});

router.get('/profile',loggedIn,(req,res) => 
{
    if (req.user) 
    {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        let profileHTML = fs.createReadStream('./public/profile.html','utf8');
        profileHTML.pipe(res);
    } else 
    {
        res.redirect('/');
    }
});

router.get('/profile_doctor',(req,res) => 
{
    
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let profile_doctorHTML = fs.createReadStream('./public/profile_doctor.html','utf8');
    profile_doctorHTML.pipe(res);
 
});


// router.get('/getDiagnosisPatient',(req,res) => 
// {
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//     const getDiagnosisPatientHTML = fs.createReadStream('./public/getDiagnosisPatient.html','utf8');
//     getDiagnosisPatientHTML.pipe(res);
// });

/*----------------------------/GET-------------------------------------*/

//Экспортируем маршруты, чтобы были доступны
module.exports = router;