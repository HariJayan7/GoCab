var express = require('express');
const path = require('path');
var router = express.Router();

function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/search.html'));
}

router.get('/', my_get);

module.exports = router;
