var express = require('express');
const path = require('path');
var router = express.Router();

function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/main.html'));
}


function my_post(req,res,next)
{
    var body=req.body;
    console.log(req);

    res.redirect("/dashboard");
}
router.get('/', my_get);
router.post('/',my_post);

module.exports = router;
