const Router = require("express");
var router = Router();

const {
  adminLogin,
  trainersList,
  trainerBlockstatus,
  notifications,
} = require("../controllers/adminController");

/* GET users listing. */
router.post("/login", adminLogin);
router.get("/trainerslist", trainersList);
router.patch("/trainerblockstatus", trainerBlockstatus);
router.get("/notifications", notifications);

module.exports = router;
