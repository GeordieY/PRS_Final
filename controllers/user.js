var express = require('express');
var router = express.Router();

var Users = require('../models/User');
var Villains = require('../models/Villain');
var Game = require('../models/gamelogic');
console.log(Game);

//getting a new user which loads a blank form
router.get('/user/new', function(req,res){
var k = {
  type:"new"
};
//var k = Users.createnewUser(u.name,u.password,u.firstname,u.lastname);
res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('user_details', {user:k});
});

/*
//how to get the userID and render the user details
router.get('/user/:id', function(req,res){
  var u={
    name = req.params.id,
    actualname = req.body.player_name,
    password = req.params.password,
    firstname = req.params.firstname,
    lastname = req.params.lastname
  }
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u});
});
*/

//method to add a new user and return to the game page
router.post('/users', function(req,res){
  var u = [];
  var name = req.body.username.trim();
  var password=req.body.password.trim();
  var firstname = req.body.firstname.trim();
  var lastname = req.body.lastname.trim();
/*
  u.push(name);
  u.push(password);
  u.push(firstname);
  u.push(lastname);
  */
  if(Users.createnewUser(name,password,firstname,lastname)==true){
  res.redirect('/');
  }

  else{
   user_data={};
   user_data["failure"] = 4;
   res.status(200);
   res.setHeader('Content-Type', 'text/html')
   res.render('user_details', {user:user_data});
   }
});

//get the user you have and load the information and then load the edit screen
router.get('/users/:id/edit', function(req,res){
  var name = req.params.id;
  var user = Users.getUser(name, function(u){
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', {user:user});
  });
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
  Users.updateUser(u);
  var k = Users.updateUser(u)
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
  firstname: req.query.first_name,
  lastname: req.query.last_name
}

  var error;
  var k = Users.getUser(user.username);
  //if this name and password doesn't exist: create a new user
  if(k.name == null && k.password == null){
    User.createnewUser(user.username,user.password,user.firstname,user.lastname);
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('/game', {user:user});
    }
  //if the name exists but the password isn't present then
  else if(k.name!= null && k.password != user.password){
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
    res.render('/game', {user:user});
  }
});


router.get('/:user/results', function(req,res){
//need to add the same for winners then load the page
  var user_data = {
      name: req.params.user,
      weapon: String(req.query.weapons),
      villain: String(req.query.villains),
      villainchoice: ""
  }
  console.log(user_data.name);
  //console.log(req.params.player_name);

  //console.log(user_data.name + "Name");

  console.log("Queries" + req.query.villains + "Weapon" + req.query.weapons);

  var newinfo;
  var villaininfo;
  console.log("user_data"+user_data);
  var villainchoice = Game.Villainthrows(user_data.villain, user_data.weapon);
  var userchoice = user_data.weapon;
  user_data.villainchoice = String(villainchoice);
  if(villainchoice == "" || userchoice== ""){
    console.log("User and Villain Empty");
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.redirect('/game');
  }
  else{
    //console.log("user_data"+user_data);
    var result = {
      winner: String(Game.winner(villainchoice,userchoice,user_data.villain,user_data.name))
    }

    var useredit = Users.getUser(user_data.name,function(){
      console.log(user_data.name + "Got user");
    });
    var villainedit = Villains.getvillain(user_data.villain, function(){
      console.log(user_data.villain + "Got villain");
    });

    //user_data.weapon = villainedit;
//if time permits: write another modular function to do this
      if(result.winner==useredit.name){
        if(userchoice== "Paper"){
          newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) + 1, useredit.lost, useredit.tied, parseInt(useredit.paper_played)+ 1, useredit.rock_played,useredit.scissors_played, useredit.password];
          villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, villainedit.won, parseInt(villainedit.lost)+1, villainedit.tied, villainedit.paper_played, parseInt(villainedit.rock_played) + 1, villainedit.scissors_played];
        }
        else if(userchoice == "Rock"){
          newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) + 1, useredit.lost, useredit.tied, parseInt(useredit.paper_played), parseInt(useredit.rock_played) +1,useredit.scissors_played, useredit.password];
          villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, villainedit.won, parseInt(villainedit.lost)+1, villainedit.tied, villainedit.paper_played, parseInt(villainedit.rock_played), parseInt(villainedit.scissors_played) + 1];
        }
        else{
          newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) + 1, useredit.lost, useredit.tied, parseInt(useredit.paper_played), useredit.rock_played,parseInt(useredit.scissors_played) + 1, useredit.password];
          villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, villainedit.won, parseInt(villainedit.lost)+1, villainedit.tied, parseInt(villainedit.paper_played) + 1, parseInt(villainedit.rock_played), parseInt(villainedit.scissors_played)];
        }
      }
     else if(result.winner==user_data.villain){
       if(userchoice== "Paper"){
         newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) , parseInt(useredit.lost) +1 , useredit.tied, parseInt(useredit.paper_played)+ 1, useredit.rock_played,useredit.scissors_played, useredit.password];
         villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, parseInt(villainedit.won) + 1, parseInt(villainedit.lost), villainedit.tied, villainedit.paper_played, parseInt(villainedit.rock_played), parseInt(villainedit.scissors_played) + 1];
       }
       else if(userchoice == "Rock"){
         newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) , parseInt(useredit.lost) +1 , useredit.tied, parseInt(useredit.paper_played), parseInt(useredit.rock_played) +1,useredit.scissors_played, useredit.password];
            villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, parseInt(villainedit.won) + 1, parseInt(villainedit.lost), villainedit.tied, parseInt(villainedit.paper_played) + 1, parseInt(villainedit.rock_played), parseInt(villainedit.scissors_played)];
       }
       else{
         newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) , parseInt(useredit.lost) +1 , useredit.tied, parseInt(useredit.paper_played), useredit.rock_played,parseInt(useredit.scissors_played) + 1, useredit.password];
         villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, parseInt(villainedit.won) + 1, parseInt(villainedit.lost), villainedit.tied, parseInt(villainedit.paper_played), parseInt(villainedit.rock_played) + 1, parseInt(villainedit.scissors_played)];
       }
     }
     else{
       if(userchoice== "Paper"){
         newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) , parseInt(useredit.lost) , parseInt(useredit.tied) + 1 , parseInt(useredit.paper_played)+ 1, useredit.rock_played,useredit.scissors_played, useredit.password];
         villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, parseInt(villainedit.won), parseInt(villainedit.lost), parseInt(villainedit.tied) + 1, parseInt(villainedit.paper_played) + 1, parseInt(villainedit.rock_played), parseInt(villainedit.scissors_played)];
       }
       else if(userchoice == "Rock"){
         newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) , parseInt(useredit.lost) , parseInt(useredit.tied) + 1, parseInt(useredit.paper_played), parseInt(useredit.rock_played) +1,useredit.scissors_played, useredit.password];
         villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, parseInt(villainedit.won), parseInt(villainedit.lost), parseInt(villainedit.tied) + 1, parseInt(villainedit.paper_played) , parseInt(villainedit.rock_played) + 1, parseInt(villainedit.scissors_played)];
       }
       else{
         newinfo = [useredit.name, parseInt(useredit.games_played) + 1, parseInt(useredit.won) , parseInt(useredit.lost) , parseInt(useredit.tied) + 1, parseInt(useredit.paper_played), useredit.rock_played,parseInt(useredit.scissors_played) + 1, useredit.password];
         villaininfo = [villainedit.name, parseInt(villainedit.games_played) + 1, parseInt(villainedit.won), parseInt(villainedit.lost), parseInt(villainedit.tied) + 1, parseInt(villainedit.paper_played) + 1, parseInt(villainedit.rock_played), parseInt(villainedit.scissors_played) + 1];
       }
     }
   }

   Users.updateUser(user_data.name, newinfo);
   Villains.updateVillain(user_data.villain, villaininfo);


   res.status(200);
  // res.setHeader('Content-Type', 'text/html');
  // console.log("user data" +user_data);
   res.render('results', {user:user_data, winner:result});
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
