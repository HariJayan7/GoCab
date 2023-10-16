var express = require('express');
const path = require('path');
var router = express.Router();

function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/login.html'));
}

function my_post(req,res,next)
{
    var body=req.body;
    var username=body.username;
    var password=body.password
    if(password=="password")
    res.redirect("/dashboard");
    else
    res.redirect("/login");
}

router.get('/', my_get);
router.post('/',my_post);

module.exports = router;
