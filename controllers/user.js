var express = require('express');
var router = express.Router();

var Users = require('../models/User');
var Villains = require('../models/Villain');
var Game = requre('../models/Game');

//getting a new user which loads a blank form
router.get('/user/new', function(req,res){
var u = {}
res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('user_details', {user:u});
});


//how to get the userID and render the user details
router.get('/user/:id', function(req,res){
  var u={
    name = req.params.id,
    password = req.params.password
  }
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u});
});

//method to add a new user and return to the game page
router.post('/users', function(req,res){
  var u = [];
  var name = req.body.username.trim();
  var password=req.body.password.trim();
  u.push(name);
  u.push(password);
  Users.createUser(u);
  res.redirect('/');
});

//get the user you have and load the information and then load the edit screen
router.get('/users/:id/edit', function(req,res){
  var name = req.params.id;
  var user = Users.getUser(name);
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:user});
});

router.put('/users/:id', function(req,res){
  var name = req.params.id;
});



/*
router.put('/user/:id', function(req, res){
  console.log('POST Request- /user/'+req.params.id);

  var u={
    name = req.body.username.trim(),
    password=req.body.password.trim()
  }
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u});
});

router.post('/users',function(req,res){
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('index', {user:u});
});
router.get('/user/new', function(req,res){
  var userinfo = "";
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', {user:userinfo});
});

router.delete('/users:id', function(req,res) {
  var id = req.params.user;
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details'. {user:id});
});
*/


module.exports = router;
