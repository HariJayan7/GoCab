var express = require('express');
const path = require('path');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./my_database.db')


function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/newtrip.html'));
}

function alreadyexists(err)
{   
    if(err)
    console.log("already exists"+err);
}


function my_post(req,res,next)
{
    var body=req.body;
    var bid;
    var etd=body.etd;
    var start_dest=body.start_dest;
    var final_dest=body.final_dest;
    var cab_type=body.cab_type;
    var curnum=1;
    var maxnum=body.maxnum;
    const stmt = db.prepare('INSERT INTO booking VALUES (?,?,?,?,?,?,?)');
    stmt.run(bid,etd,start_dest,final_dest,cab_type,curnum,maxnum,alreadyexists);
    stmt.finalize();

    function display(err,result)
    {
        if(err)
        {
            console.log("some error"+err);
        }
        console.log(result);
    }
    db.all('SELECT * FROM booking', display);
    res.redirect("/login");
}


router.get('/', my_get);
router.post("/",my_post);

module.exports = router;
