const Router = require('express');
var router = Router();
const {  clientLogin, registerPage, clientRegister } = require('../controllers/clientController');
/* GET home page. */
router.post('/register',clientRegister);
router.post('/login',clientLogin);

module.exports =  router;
