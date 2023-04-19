const Router = require("express");
const router = Router();
const {
  clientLogin,
  clientRegister,
  clientLoginWithGoogle,
  clientVerifyOTP,
  clientResendOTP,
  clientDetails,
  courses,
  courseDetails,
  trainers
} = require("../controllers/clientController");
/* GET home page. */
router.post("/register", clientRegister);
router.post("/login", clientLogin);
router.post("/loginwithgoogle", clientLoginWithGoogle);
router.post("/verifyotp", clientVerifyOTP);
router.post("/resendotp", clientResendOTP);
router.get("/details", clientDetails);
router.get("/courses", courses);
router.post("/course/details", courseDetails);
router.get("/trainers", trainers);

module.exports = router;
