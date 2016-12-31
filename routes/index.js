var express = require('express');
var router = express.Router();
var fs = require('fs');
var totalPhotos = 0;
var ua = require('universal-analytics');
var visitor = ua('UA-89623333-1')
fs.readdir('./public/images',function(err,files){
    totalPhotos = files.length-1;
});
/* GET home page. */
router.get('/', function(req, res, next) {
  visitor.pageview("/").send()
  res.render('index', { title: 's4njee',t:totalPhotos });
});

router.get('/photos/:id', function(req, res){
    visitor.pageview("/photos"+JSON.stringify(req.params)).send()
    res.render('photo',{currentphoto: req.params, t:totalPhotos});
});
module.exports = router;
