/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

var app = express();

if ('development' === app.get('env')) {
    mongoose.set('debug', true);
    mongoose.connect('mongodb://localhost/visualide');
} else {
    // Connect to Heroku instance's
    mongoose.connect('mongodb://heroku_app30448522:9r5he55jkpq1nl9rdtatd1ar2d@ds043170.mongolab.com:43170/heroku_app30448522');
}

app.set('title', 'Visual IDE');
app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/app.js', function(req, res) {
    return res.sendFile(__dirname + '../public/app.js');
});

app.get('/app.css', function(req, res) {
    return res.sendFile(__dirname + '../public/app.css');
});

// @TODO: Declare other API methods here

// This delegates all of the routes we haven't set to Ember.JS
app.get('*', function(request, response) {
    console.log(request.query);
    return response.sendFile(__dirname + '../public/index.html');
});

// Start server!
app.listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port'));
});