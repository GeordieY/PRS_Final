var express = require('express');
var router = express.Router();

var Users = require('../models/User');
var Villains = require('../models/Villain');
var Game = require('../models/gamelogic');
var userName;
var userPassword;
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

userName = username;
userPassword = password;

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
  Users.deleteUser(username, function(){
    console.log("User has been deleted");
  });
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

userName = user.username;
userPassword = user.password;

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
  //console.log("Name" + user_data.name);
  userName = user_data.name;
  var user_d;
  Users.getUser(user_data.name, function(user_d){
    userPassword = user_d.password;
  });
  //console.log("Queries" + req.query.villains + "Weapon" + req.query.weapons);
  var newinfo = [];
  var villaininfo = [];
  //console.log("user_data"+user_data);
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
  //  console.log("Winner" + result.winner);

    Users.getUser(user_data.name,function(user_d){
    Villains.getvillain(user_data.villain, function(villain_d){
        //console.log(user_data.villain + "Got villain");
    //  console.log("User stuff" + JSON.stringify(user_d) + "Vil stuff" + JSON.stringify(villain_d));
      if(result.winner==user_d.name){
          if(userchoice== "Paper"){
            newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) + 1, user_d.lost, user_d.tied, parseInt(user_d.paperplayed)+ 1, user_d.rockplayed,user_d.scissorsplayed, user_d.password];
            villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, villain_d.won, parseInt(villain_d.lost)+1, villain_d.tied, villain_d.paperplayed, parseInt(villain_d.rockplayed) + 1, villain_d.scissorsplayed];
          }
          else if(userchoice == "Rock"){
            newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) + 1, user_d.lost, user_d.tied, parseInt(user_d.paperplayed), parseInt(user_d.rockplayed) +1,user_d.scissorsplayed, user_d.password];
            villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, villain_d.won, parseInt(villain_d.lost)+1, villain_d.tied, villain_d.paperplayed, parseInt(villain_d.rockplayed), parseInt(villain_d.scissorsplayed) + 1];
          }
          else{
            newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) + 1, user_d.lost, user_d.tied, parseInt(user_d.paperplayed), user_d.rockplayed,parseInt(user_d.scissorsplayed) + 1, user_d.password];
            villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, villain_d.won, parseInt(villain_d.lost)+1, villain_d.tied, parseInt(villain_d.paperplayed) + 1, parseInt(villain_d.rockplayed), parseInt(villain_d.scissorsplayed)];
          }
          //console.log("ALMOST THERE");
        }
       else if(result.winner==user_data.villain){
         if(userchoice== "Paper"){
           newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) , parseInt(user_d.lost) +1 , user_d.tied, parseInt(user_d.paperplayed)+ 1, user_d.rockplayed,user_d.scissorsplayed, user_d.password];
           villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, parseInt(villain_d.won) + 1, parseInt(villain_d.lost), villain_d.tied, villain_d.paperplayed, parseInt(villain_d.rockplayed), parseInt(villain_d.scissorsplayed) + 1];
         }
         else if(userchoice == "Rock"){
           newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) , parseInt(user_d.lost) +1 , user_d.tied, parseInt(user_d.paperplayed), parseInt(user_d.rockplayed) +1,user_d.scissorsplayed, user_d.password];
              villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, parseInt(villain_d.won) + 1, parseInt(villain_d.lost), villain_d.tied, parseInt(villain_d.paperplayed) + 1, parseInt(villain_d.rockplayed), parseInt(villain_d.scissorsplayed)];
         }
         else{
           newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) , parseInt(user_d.lost) +1 , user_d.tied, parseInt(user_d.paperplayed), user_d.rockplayed,parseInt(user_d.scissorsplayed) + 1, user_d.password];
           villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, parseInt(villain_d.won) + 1, parseInt(villain_d.lost), villain_d.tied, parseInt(villain_d.paperplayed), parseInt(villain_d.rockplayed) + 1, parseInt(villain_d.scissorsplayed)];
         }
         //console.log("ALMOST THERE");
       }

       else{
         if(userchoice== "Paper"){
           newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) , parseInt(user_d.lost) , parseInt(user_d.tied) + 1 , parseInt(user_d.paperplayed)+ 1, user_d.rockplayed,user_d.scissorsplayed, user_d.password];
           villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, parseInt(villain_d.won), parseInt(villain_d.lost), parseInt(villain_d.tied) + 1, parseInt(villain_d.paperplayed) + 1, parseInt(villain_d.rockplayed), parseInt(villain_d.scissorsplayed)];
         }
         else if(userchoice == "Rock"){
           newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) , parseInt(user_d.lost) , parseInt(user_d.tied) + 1, parseInt(user_d.paperplayed), parseInt(user_d.rockplayed) +1,user_d.scissorsplayed, user_d.password];
           villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, parseInt(villain_d.won), parseInt(villain_d.lost), parseInt(villain_d.tied) + 1, parseInt(villain_d.paperplayed) , parseInt(villain_d.rockplayed) + 1, parseInt(villain_d.scissorsplayed)];
         }
         else{
           newinfo = [user_d.name, parseInt(user_d.gamesplayed) + 1, parseInt(user_d.won) , parseInt(user_d.lost) , parseInt(user_d.tied) + 1, parseInt(user_d.paperplayed), user_d.rockplayed,parseInt(user_d.scissorsplayed) + 1, user_d.password];
           villaininfo = [villain_d.name, parseInt(villain_d.gamesplayed) + 1, parseInt(villain_d.won), parseInt(villain_d.lost), parseInt(villain_d.tied) + 1, parseInt(villain_d.paperplayed) + 1, parseInt(villain_d.rockplayed), parseInt(villain_d.scissorsplayed) + 1];
         }
         //console.log("ALMOST THERE");
       }
       console.log("I MADE IT");
       Users.updateUser(user_data.name, newinfo, function(){
        Villains.updateVillain(user_data.villain, villaininfo, function(){
          console.log("New Info TAG" + newinfo);
          console.log("VIL Info TAG" + villaininfo);
          res.status(200);
          res.setHeader('Content-Type', 'text/html');
         // console.log("user data" +user_data);
          res.render('results', {user:user_data, winner:result});
           //console.log("Villain updated");
      });
      });
    });
    });
  }

    //user_data.weapon = villain_d;
//if time permits: write another modular function to do this

});

router.get('/playagain',function(req,res){
  var user_data = {
    name: userName,
    password: userPassword,
  }

  console.log("Pa NAME" + user_data.name);
  console.log("Pa Password" + user_data.password);

  res.status(200);
  res.setHeader('Content-Type','text/html');
  res.render('game', {user:user_data});
});



module.exports = router;
