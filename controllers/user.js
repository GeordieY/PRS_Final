var express = require('express');
var router = express.Router();

var Users = require('../models/User');
var Villains = require('../models/Villain')

router.post('/user/:id', function(req, res){
  console.log('POST Request- /user/'+req.params.id);

  var u={
    name = req.body.username.trim(),
    password=req.body.password.trim()
  }
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u});
});

router.get('/user/new', function(req,res){
  var userinfo = "";
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:userinfo});
});




module.exports = router;
