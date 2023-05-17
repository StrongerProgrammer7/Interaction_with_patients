const Router = require('express');
const router = new Router();
const fs = require('fs');


/*----------------------------POST-------------------------------------*/
// Попав сюда через /auth ищется method затем название
//router.post('/login',controller.login);
/*----------------------------/POST-------------------------------------*/

/*----------------------------GET-------------------------------------*/
router.get('/',(req,res) => 
{
    res.render("pages/index", {title: 'Patients'});
});

router.get('/register',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let registerHTML = fs.createReadStream('./public/registerPatient.html','utf8');
    /*res.sendFile("registerPatient.html",
        {
            root:"./public"
        });*/
    registerHTML.pipe(res);
 
});

router.get('/profile',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let profileHTML = fs.createReadStream('./public/profile.html','utf8');
    profileHTML.pipe(res);
 
});

router.get('/profile_doctor',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let profile_doctorHTML = fs.createReadStream('./public/profile_doctor.html','utf8');
    profile_doctorHTML.pipe(res);
 
});


router.get('/setNewDiagnos',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const setNewDiagnosisHTML = fs.createReadStream('./public/setNewDiagnosis.html','utf8');
    setNewDiagnosisHTML.pipe(res);
 
});
router.get('/changeDiagnos',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const changeDiagnosHTML = fs.createReadStream('./public/changeDiagnos.html','utf8');
    changeDiagnosHTML.pipe(res);
 
});
router.get('/getDiagnosisForCurDoc',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const getDiagnosisForCurDocHTML = fs.createReadStream('./public/getDiagnosisForCurDoc.html','utf8');
    getDiagnosisForCurDocHTML.pipe(res);

});

router.get('/getDiagnosisPatient',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const getDiagnosisPatientHTML = fs.createReadStream('./public/getDiagnosisPatient.html','utf8');
    getDiagnosisPatientHTML.pipe(res);
});

router.get('/getHistoryPatient',(req,res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const getHistoryPatientHTML = fs.createReadStream('./public/getHistoryPatient.html','utf8');
    getHistoryPatientHTML.pipe(res);

});
/*----------------------------/GET-------------------------------------*/

//Экспортируем маршруты, чтобы были доступны
module.exports = router;