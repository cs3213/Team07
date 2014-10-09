/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var User = require(path.join(__dirname, 'models/user'));
var Project = require(path.join(__dirname, 'models/project'));

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
app.use(session({secret: 'Super Secret', saveUninitialized: true, resave: true}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:8000/auth/google/callback',
    realm: 'http://localhost:8000/',
    stateless: true
  },
  function(identifier, profile, done) {
	process.nextTick(function () {
		User.createUser(profile.identifier, profile.emails[0].value, profile.displayName);
		return done(null, profile);
	});
  }
));

app.get('/app.js', function(req, res) {
    return res.sendFile(__dirname + '../public/app.js');
});

app.get('/app.css', function(req, res) {
    return res.sendFile(__dirname + '../public/app.css');
});

// @TODO: Declare other API methods here
app.post('/login', function(req, res){
	res.send('you are in login');
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', 
	passport.authenticate('google', 
		{ successRedirect: '/',
		failureRedirect: '/login' }));

app.get('/logout', function(req, res){
	req.logout();
  	res.redirect('/');
});

app.get('/save', function(req, res){
	res.send('you are in save');
});

app.get('/load', function(req, res){
	res.send('you are in load');
});


// This delegates all of the routes we haven't set to Ember.JS
app.get('*', function(request, response) {
    console.log(request.query);
    return response.sendFile(__dirname + '../public/index.html');
});

// Start server!
app.listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port'));
});