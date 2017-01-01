var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = "blog.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
var totalPhotos = 0;
var ua = require('universal-analytics');
var visitor = ua('UA-89623333-1')
fs.readdir('./public/images',function(err,files){
    totalPhotos = files.length-1;
});
/* GET home page. */
router.get('/', function(req, res, next) {
  visitor.pageview("/").send()
    var posts = {};
    db.serialize(function(){
        db.all("SELECT post,date,time FROM posts ORDER BY rowid DESC LIMIT 5",function(err, row){
        posts = row;
        res.render('index', { title: 's4njee',t:totalPhotos ,posts:posts});
        });
    });
});

router.post('/postaction',function(req,res){
    var text = req.body.posttext;
    var d = new Date();
    var date = (d.getMonth()+1)+'\/' +(d.getDate())+"\/"+(d.getFullYear());
    var time = d.toTimeString(); 
    db.serialize(function(){
        if(!exists){
            db.run("CREATE TABLE posts (post text, date text, time text)");
        }
        var stmt = db.prepare('INSERT INTO posts VALUES(?,?,?)');
        stmt.run(text,date,time);
        stmt.finalize();
    });
    res.render('success', {post:text, d:date, t:time});
});
router.get('/otherprojects',function(req,res){
   res.render('otherprojects',{t:totalPhotos}); 
});
module.exports = router;
