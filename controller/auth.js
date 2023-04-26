const Router = require('express');
const router = new Router();
const { check } = require('express-validator');
const register = require("./register");
// const upload = require("./upload");
const login = require("./login");
/*Query DB---------------------------*/
const checkWereRegistered = require("./queryDB/POST/wereRegistered");
const selectCities = require("./queryDB/GET/selectCities");
const get_all_doctors = require('./queryDB/GET/get_all_doctors');
const get_all_patients = require('./queryDB/GET/get_all_patient');
const get_all_info_about_doctor = require('./queryDB/POST/get_all_info_about_doctor');
const get_all_ill_s_Patient = require('./queryDB/POST/get_all_ill_s_Patient');
const get_list_doctors_haveAccess = require('./queryDB/POST/get_list_doctors_haveAccess');
const update_list_doctors = require('./queryDB/POST/update_list_doctors');
const getCity = require('./queryDB/POST/getCity');
const get_all_personalInfo_patient = require('./queryDB/POST/get_all_personalInfo_patient')
const update_pesonalInfo_patient = require('./queryDB/POST/updatePersonalInfoPatient');
/*-----------------------------------*/

router.post("/register",[
    check('meta',"Accout shouldn`t empty!").notEmpty(),
    check('password',"Password should be length 6 or more and less 255").isLength({min:6,max:255})
],register);
// router.post("/upload",upload);
router.post("/login",login);
//-------DB
router.post("/get_all_info_about_doctor",get_all_info_about_doctor);
router.post("/checkWereRegistered",checkWereRegistered);
router.post("/get_all_ill_s_patient",get_all_ill_s_Patient);
router.post('/get_list_doctors_haveAccess',get_list_doctors_haveAccess);
router.post('/update_list_doctors',update_list_doctors);
router.post('/getCity',getCity);
router.post('/get_all_personalInfo_patient',get_all_personalInfo_patient);
router.post('/update_pesonalInfo_patient',update_pesonalInfo_patient);
/*----------------GET------------------------*/

//-------DB
router.get("/get_cities",selectCities);
router.get("/get_all_patients",get_all_patients);
router.get("/get_all_doctors",get_all_doctors);

//router.post("/profile",profile);
module.exports = router;