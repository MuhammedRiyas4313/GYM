const Router = require('express');
var router = Router();
const {  clientLogin, registerPage, clientRegister } = require('../controllers/clientController');
/* GET home page. */
router.post('/clientregister',clientRegister);
router.post('/clientlogin',clientLogin);

module.exports =  router;
