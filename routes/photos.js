var express = require('express');
var router = express.Router();
var ua = require('universal-analytics');
var visitor = ua('UA-89623333-1')
var fs = require('fs');


router.get('/', function(req, res){
        var totalPhotos = 0
        files = fs.readdirSync('./public/images');
        for (let f in files){
            try{
                if (fs.statSync('./public/images/_'+f+'.jpg').isFile()){
                    totalPhotos++
                }
            }
            catch(err){}
        }
        console.log(totalPhotos)
        res.render('photo',{currentphoto:totalPhotos, t:totalPhotos});
});
router.get('/:id', function(req, res){
    let x = isNaN(req.params.id) ? 1 : req.params.id
    visitor.pageview("/photos"+JSON.stringify(req.params)).send()
    res.render('photo',{currentphoto: x});
}   
);
module.exports = router;
