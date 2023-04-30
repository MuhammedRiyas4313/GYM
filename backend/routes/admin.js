const Router = require("express");
var router = Router();

const {
  adminLogin,
  trainersList,
  trainerBlockstatus,
  notifications,
  trainerDetails,
  verifyTrainer,
  clientList,
  clientDetails,
  createConversation,
  getConversation,
  getUser,
  getMessages,
  createMessage
} = require("../controllers/adminController");
const { verify } = require("jsonwebtoken");

/* GET users listing. */
router.post("/login", adminLogin);
router.get("/trainerslist", trainersList);
router.patch("/trainerblockstatus", trainerBlockstatus);
router.get("/notifications", notifications);
router.get("/trainerdetails", trainerDetails);
router.patch("/verifytrainer", verifyTrainer);
router.get("/clients", clientList);
router.get("/clientdetails", clientDetails);
router.post('/chat',  createConversation);
router.get('/chat',  getConversation);
router.get('/chat/user',  getUser);
router.get('/chat/messages',  getMessages);
router.post('/chat/message',  createMessage);

module.exports = router;
