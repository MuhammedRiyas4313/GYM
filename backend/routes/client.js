const Router = require("express");
const router = Router();
const {
  clientLogin,
  clientRegister,
  clientLoginWithGoogle,
  clientVerifyOTP,
  clientResendOTP,
  clientDetails
} = require("../controllers/clientController");
/* GET home page. */
router.post("/register", clientRegister);
router.post("/login", clientLogin);
router.post("/loginwithgoogle", clientLoginWithGoogle);
router.post("/verifyotp", clientVerifyOTP);
router.post("/resendotp", clientResendOTP);
router.get("/details", clientDetails);

module.exports = router;
