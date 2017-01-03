var express = require('express');
var router = express.Router();
var ua = require('universal-analytics');
var visitor = ua('UA-89623333-1')
var fs = require('fs');


router.get('/:id', function(req, res){
    if(req.params.id=='undefined'){
        fs.readdir('./public/images',function(err,files)
        {
            var totalPhotos = 0;
            totalPhotos = files.length-1;
            console.log(totalPhotos);
            req.params = {id: totalPhotos};
            console.log(req.params);
        res.render('photo',{currentphoto: req.params, t:totalPhotos});
        }); 
}
else{
    visitor.pageview("/photos"+JSON.stringify(req.params)).send()
    res.render('photo',{currentphoto: req.params, t:totalPhotos});
}   
});
module.exports = router;
