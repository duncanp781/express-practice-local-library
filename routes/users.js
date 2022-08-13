var express = require('express');
var router = express.Router();
const coolRouter = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/cool', coolRouter);

coolRouter.get('/', (req,res,next) => {
  res.send('You are so cool!');
})

module.exports = router;
