const Router = require('express');
var router = Router();
const {  clientLogin, clientRegister ,clientLoginWithGoogle } = require('../controllers/clientController');
/* GET home page. */
router.post('/register',clientRegister);
router.post('/login',clientLogin);
router.post('/loginwithgoogle',clientLoginWithGoogle);

module.exports =  router;
