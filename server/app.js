
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose');

// MongoDB connection
// local
// mongoose.connect('mongodb://localhost/visualide');
// heroku
mongoose.connect('mongodb://heroku_app30448522:9r5he55jkpq1nl9rdtatd1ar2d@ds043170.mongolab.com:43170/heroku_app30448522');



app = express();


app.set('title', 'Visual IDE');
app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, '/../client')));



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});