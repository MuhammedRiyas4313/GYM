const Router = require("express");
const router = Router();
const {
  clientLogin,
  clientRegister,
  clientLoginWithGoogle,
  clientVerifyOTP
} = require("../controllers/clientController");
/* GET home page. */
router.post("/register", clientRegister);
router.post("/login", clientLogin);
router.post("/loginwithgoogle", clientLoginWithGoogle);
router.post("/verifyotp", clientVerifyOTP);

module.exports = router;
