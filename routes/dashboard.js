var express = require('express');
const path = require('path');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./my_database.db')

function my_get(req,res,next)
{
    var pid="B200825CS";
    function get_trips(err,result)
    {
        console.log(result);
        res.sendFile(path.join(__dirname,'../views/main.html'));
    }
    db.all("SELECT * FROM  booking INNER JOIN listings ON booking.bid=listings.bid WHERE listings.pid=?",pid,get_trips);
}
function addlisting(bid,pid)
{
    const stmt=db.prepare("INSERT INTO listings VALUES (?,?)");
    stmt.run(bid,pid);
    stmt.finalize();
}
function alreadyexists(err)
{
    console.log("already exists"+err);
}
function display_all_booking()
{
    function display(err,result)
    {
        if(err)
        {
            console.log("some error"+err);
        }
        console.log("Booking Table:\n");
        console.log(result);
    }
    db.all('SELECT * FROM booking', display);
}
function display_all_listings()
{
    function display(err,result)
    {
        if(err)
        {
            console.log("some error"+err);
        }
        console.log("Listing Table:\n");
        console.log(result);
    }
    db.all('SELECT * FROM listings', display);
}
function newtrip(req,res,next)
{
    var body=req.body;
    var etd=body.appointment;
    var start_dest=body.start;
    var final_dest=body.destination;
    var cab_type=body.type;
    var curnum=1;
    var maxnum=body.max;
    var bid=-1;
    function my_process(err,result)
    {
        if(err)
        {
            console.log("error here: "+err);
        }
        else
        {
            var p=result[0]['MAX(bid)'];
            console.log(p);
            if(p==null)
            bid=1;
            else
            bid=p+1;
            console.log("this is the bid now",bid);
            const stmt = db.prepare('INSERT INTO booking VALUES (?,?,?,?,?,?,?)');
            stmt.run(bid,etd,start_dest,final_dest,cab_type,curnum,maxnum,alreadyexists);
            stmt.finalize();
            var pid="B200825CS";
            addlisting(bid,pid);
            display_all_booking();
            display_all_listings();
        }
    }
    db.all('SELECT MAX(bid) FROM booking',my_process);
    
    
}


function searchtrip(req,res,next)
{
    var body=req.body;
    var etd=body.appointment;
    var start_dest=body.start;
    var final_dest=body.destination;
    function search_process(err,result)
    {
        console.log(result);
    }
    db.all('SELECT * FROM booking WHERE etd>=? AND etd<=? AND start_dest=? AND final_dest=? AND cur_num<max_num ',mind,maxd,start_dest,end_dest,search_process)
}
function my_post(req,res,next)
{
    newtrip(req,res,next);
    // searchtrip(req,res,next);
    res.redirect("/dashboard");
}
router.get('/', my_get);
router.post('/',my_post);

module.exports = router;
