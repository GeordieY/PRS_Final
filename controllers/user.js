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
    password = req.params.password,
    firstname = req.params.firstname,
    lastname = req.params.lastname
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
  var firstname = req.body.firstname.trim();
  var lastname = req.body.lastname.trim();
  u.push(name);
  u.push(password);
  u.push(firstname);
  u.push(lastname);
  Users.createUser(u);
  res.redirect('/');
});

//get the user you have and load the information and then load the edit screen
router.get('/users/:id/edit', function(req,res){
  var name = req.params.id;
  var user = Users.getUser(name);
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', {user:user});
});

//how to update users but also include time for last updated
router.put('/users/:id', function(req,res){
  var username = req.params.id;
  var user= Users.getUser(username);
  var u = [];
  var name = req.body.username.trim();
  var password=req.body.password.trim();
  var firstname = req.body.firstname.trim();
  var lastname = req.body.lastname.trim();
  u.push(name);
  u.push(password);
  u.push(firstname);
  u.push(lastname);
  User.updateUser(user);
  var k = User.updateUser(user)
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', {user:k});
});

router.delete('/users/:id', function(req,res){
  var username = req.params.id;
  User.deleteUser(username);
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.redirect('/');
});

router.get('/users/game', function(req,res){
var user = {
  username: req.query.id,
  password:req.query.password,
  firstname: req.query.firstname,
  lastname: req.query.lastname
}

  var error;
  var k = Users.getUser(user.username);
  //if this name and password doesn't exist: create a new user
  if(k.name == null && k.password == null){
    User.createnewUser(user.username,user.password,user.firstname,user.lastname);
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('game', {user:user});
    }
  //if the name exists but the password isn't present then
  else if(k.name!= null && k.password != password){
    var message = "The entered username exists but the entered password doesn't match it.";
    res.status(200);
    console.log(message);
    res.setHeader('Content-Type', 'text/html');
    res.render('index', {message:message});
    console.log("wrong password");
  }

  //the name and the password matches and they exist
  else if(k.name!=null && k.password == password){
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('game', {user:user});
  }
});


router.get('/:user/results', function(req,res){
  var user_data = {
      name: req.params.user,
      weapon: req.query.weapon,
      villain: req.query.villain
  }

  var vil = user_data.villain;

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
