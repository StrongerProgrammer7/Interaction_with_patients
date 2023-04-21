const Router = require('express'); //подключение маршрутов
const router = new Router();
const { check } = require('express-validator');
const register = require("./register");
const upload = require("./upload");
const login = require("./login");
const selectCity = require("./selectCity");


router.post("/register",[
    check('meta',"Accout shouldn`t empty!").notEmpty(),
    check('password',"Password should be length 6 or more and less 16").isLength({min:6,max:16})
],register);
router.post("/upload",upload);
router.post("/login",login);
router.get("/",selectCity);
//router.post("/profile",profile);
module.exports = router;