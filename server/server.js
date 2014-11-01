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
var bodyParser = require('body-parser');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require(path.join(__dirname, 'models/user'));
var Project = require(path.join(__dirname, 'models/project'));

var app = express();
var url = 'http://cs3213-visualide.herokuapp.com/';
var googleClient = '1001375146817-cn7euubcmt5scrnjth34ovql7r289rnv.apps.googleusercontent.com';
var googleClientSecret = 'a-Qi9uLWIuLsanUmKFQt8IRy';

if ('development' === app.get('env')) {
  mongoose.set('debug', true);
  mongoose.connect('mongodb://localhost/visualide');
  url = 'http://localhost:8000/';
  googleClient = '1001375146817-tiugm569hqrfp26m9jlf69mnl849ueju.apps.googleusercontent.com';
  googleClientSecret = 'gRLj1aM-eoL2jAvBC3Po3ME0';
} else {
  // Connect to Heroku instance's
  mongoose.connect('mongodb://heroku_app30448522:9r5he55jkpq1nl9rdtatd1ar2d@ds043170.mongolab.com:43170/heroku_app30448522');
}

app.set('title', 'Visual IDE');
app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({secret: 'Super Secret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: googleClient,
    clientSecret: googleClientSecret,
    callbackURL: url + 'auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.createUser(accessToken, profile.emails[0].value, profile.displayName);
      return done(null, {
        id: profile.emails[0].value,
        email: profile.emails[0].value,
        name: profile.displayName
      });
  });
  }
));

app.get('/app.js', function(req, res) {
    return res.sendFile(__dirname + '../public/app.js');
});

app.get('/app.css', function(req, res) {
    return res.sendFile(__dirname + '../public/app.css');
});

app.get('/session', function(req, res) {
  if (req.isAuthenticated()) {
    res.json({
      'user': req.user
    });
  } else {
    res.json({});
  }
});

app.get('/auth/google', passport.authenticate('google', 
  { scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

app.get('/login', function(req, res) {
  res.redirect('/auth/google');
});


app.get('/logout', function(req, res) {
  user = req.user;
  req.logout();
  res.json(1);
});

// For now we have one-to-one between user and project.
app.get('/projects', function(req, res) {
  if (typeof req.user !== 'undefined') {
    email = req.user.email;
    Project.loadAllByUser(email, function(projects) {
      if (projects.length === 0)
        res.json();
      else {
        var json = projects[0].project;
        res.json(json);
      }
    });
  } else {
    res.json();
  }
  
});

app.post('/projects', function(req, res) {
  if (typeof req.user !== 'undefined') {
    email = req.user.email;
    project = req.body;
    response = Project.save(email, null, project, function(saved) {
      res.json(saved);
    });
  } else {
    res.json(0);
  }
});

/*app.get('/save', function(req, res){
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
});*/

// This delegates all of the routes we haven't set to Ember.JS
app.get('*', function(request, response) {
    console.log(request.query);
    return response.sendFile(__dirname + '../public/index.html');
});

// Start server!
app.listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port'));
});