const Router = require('express');
var router = Router();
const {
    
    trainerRegister,
    trainerLogin,
    trainerLoginWithGoogle,
    trainerDetails,
    addCourse,
    trainerCourseList,
    trainerClientList,
    trainerClientDetails,
    createConversation,
    getConversation,
                   
} = require('../controllers/trainerController')

/* GET users listing. */
router.post('/register', trainerRegister );
router.post('/login', trainerLogin );
router.post('/loginwithgoogle', trainerLoginWithGoogle );
router.get('/trainerdetails', trainerDetails );
router.post('/addcourse', addCourse );
router.get('/courses', trainerCourseList );
router.get('/clients', trainerClientList );
router.get('/client/details', trainerClientDetails );
router.post('/chat',  createConversation);
router.get('/chat',  getConversation);

module.exports =  router;
