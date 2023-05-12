const Router = require('express');
const router = Router();
const socketConnection = require('../socketIO')

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
    getUser,
    getMessages,
    createMessage,
    updateProfileImage,
    updateProfile,
    wallet,
    transactions,
    attendance,
    clientProgress,
    clientAttendance
                   
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
router.get('/chat/user',  getUser);
router.get('/chat/messages',  getMessages);
router.post('/chat/message',  createMessage);
router.patch("/updateprofileImage", updateProfileImage);
router.patch("/updateprofile", updateProfile);
router.get("/wallet", wallet);
router.get("/transactions", transactions);
router.post("/attendance", attendance);
router.get("/clientprogress", clientProgress);
router.get("/client/attendance", clientAttendance);

module.exports =  router;
