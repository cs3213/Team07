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

app.get('/user', function(req, res){
  console.log(req.user);
  if(req.isAuthenticated()){
    res.json({
      authenticated:true, 
      user: req.user
    });
  }
  else {
    res.json({
      authenticated:false, 
      user: null
    })
  }
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      return res.json({error: 'Error while logging in. Please try again later.'}); 
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      
      return res.json(user);
    });
  })(req, res, next);
});



app.get('/logout', function(req, res){
  user = req.user;
	req.logout();
  res.json(user)
});

app.get('/save', function(req, res){
	userEmail = req.user.emails[0].value;
  projectId = req.param('projectId');
  projectJson = req.param('projectJson');
  response = Project.save(userEmail, projectId, projectJson);
	res.json(response);
});

app.get('/load', function(req, res){
  projectId = req.param('projectId');
	Project.loadById(projectId, function(project){
    res.json(project);
  });
});

app.get('/loadAll', function(req, res){
  userEmail = req.user.emails[0].value;
  Project.loadAllByUser(userEmail, function(projects){
    res.json(projects);
  });
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