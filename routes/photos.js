var express = require('express');
var router = express.Router();
var ua = require('universal-analytics');
var visitor = ua('UA-89623333-1')
var totalPhotos = 0;
var fs = require('fs');
fs.readdir('./public/images',function(err,files){
    totalPhotos = files.length-1;
});

router.get('/:id', function(req, res){
    visitor.pageview("/photos"+JSON.stringify(req.params)).send()
    res.render('photo',{currentphoto: req.params, t:totalPhotos});
});
module.exports = router;
