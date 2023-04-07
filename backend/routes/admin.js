const Router = require('express');
var router = Router();

const { adminLogin } = require('../controllers/adminController')

/* GET users listing. */
router.post('/login', adminLogin );

module.exports = router;
