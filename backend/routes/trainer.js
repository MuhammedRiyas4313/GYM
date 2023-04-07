const Router = require('express');
var router = Router();
const { trainerRegister } = require('../controllers/trainerController')

/* GET users listing. */
router.post('/register', trainerRegister );

module.exports =  router;
