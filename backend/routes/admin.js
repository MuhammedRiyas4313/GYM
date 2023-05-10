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
  createMessage,
  courseList,
  transactions,
  transaction,
  transactionClients,
  getwallet,
  getUserCount
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
router.get("/courses", courseList);
router.get("/clientdetails", clientDetails);
router.post('/chat',  createConversation);
router.get('/chat',  getConversation);
router.get('/chat/user',  getUser);
router.get('/chat/messages',  getMessages);
router.post('/chat/message',  createMessage);
router.get('/transactions',  transactions);
router.get('/transaction',  transaction);
router.get('/transaction/clients',  transactionClients);
router.get('/wallet',  getwallet);
router.get('/usercount',  getUserCount);

module.exports = router;
