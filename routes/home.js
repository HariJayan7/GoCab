var express = require('express');
var router = express.Router();

function my_get(req,res,next)
{
    res.send("This is home");
}
/* GET home page */
router.get('/', my_get);

module.exports = router;
