const Router = require('express');
var router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Admin route');
});

module.exports = router;
