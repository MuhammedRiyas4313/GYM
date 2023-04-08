const Router = require('express');
var router = Router();
const {
    
    trainerRegister,
    trainerLogin,
    trainerLoginWithGoogle
                   
} = require('../controllers/trainerController')

/* GET users listing. */
router.post('/register', trainerRegister );
router.post('/login', trainerLogin );
router.post('/loginwithgoogle', trainerLoginWithGoogle );

module.exports =  router;
