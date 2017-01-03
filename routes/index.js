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
    totalPhotos = files.length-2;
});
/* GET home page. */
router.get('/', function(req, res, next) {
  visitor.pageview("/").send()
    var posts = {};
    db.serialize(function(){
        db.all("SELECT post,date,time FROM posts ORDER BY rowid DESC LIMIT 5",function(err, row){
        posts = row;
        res.render('index', { title: 's4njee',posts:posts});
        });
    });
});
router.get('/otherprojects',function(req,res){
   res.render('otherprojects',{t:totalPhotos}); 
});
router.get('/wiimodchip',function(req,res){
    var wiiphotos
    fs.readdir('./public/albums/wiimodchip',function(err,files){
    res.render('wiimodchip',{photos:files});
    });
});
module.exports = router;
