var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var browserSync = require('browser-sync');
var index = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');
var post = require('./routes/post');
var postroute = require('./routes/postroute');
var albums = require('./routes/albums')
var app = express();
var port = process.env.PORT || 3000;

app.listen(port, listening);

function listening () {
    browserSync({
            proxy: 'localhost:' + port,
            files: ['public/**/*.{js,css}'],
            browser: ["google chrome"],
            open:false
          
    });
   }
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/photos',photos);
app.use('/post',post);
app.use('/postroute',postroute)
app.use('/albums',albums)
app.use('/', index);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
