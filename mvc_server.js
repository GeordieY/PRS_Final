var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

app.use(require('./controllers/user'));
var Users = require(__dirname +'/models/User');
var Villains = require(__dirname +'/models/Villain');
var userName;
var userPassword;
var vilname;


var port = 3000;

app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  console.log('Request- default route');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/login', function(request, response){
var user_data = {
  name: request.query.player_name,
  password: request.query.password
};

userName = user_data.name;
userPassword = user_data.password;
var failure = " ";

if(request.query.type == "on"){
  console.log("On happened");
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('game', {user:user_data});
}

if(userName == ""){
  console.log("No name submitted");
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('index', {user:user_data, error:failure});
}
//else{
console.log("I am here")
Users.getUser(userName, function(user_d){
  //console.log("Users.get")
  console.log(user_d)
  console.log("I am here now")
    var usrpassword = user_d.password;
  //  console.log("User gotten" + user);
  //  console.log("user Password" + usrpassword);

    if(usrpassword == userPassword){
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render('game', {user:user_d});
    }
    else{
      failure = "Failure" ;
      userName = "";
      userPassword = "";
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('index', {user:user_d, error:failure});
    }
    console.log('Request- login');
});


});


app.get('/rules', function(request, response){
  console.log('Request- rules');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

/*
app.get('/:user/playagain',function(request,response){
  var user_data = {
    name: request.params.user,
    password:""
  }
  var c = Users.getuser(request,params.user,function(){
    console.log(request.params.user);
  })

  user_data.password = c.password;


  response.status(200);
  response.setHeader('Content-Type','text/html');
  response.render('game', {user:user_data});
});
*/
//what should the callback be?
app.get('/stats', function(request, response){
  var data = {};
  var user_data;
  var villain_data;
  Users.getUsers(function(user_data){
  Villains.getVillains(function(villain_data){
  //  console.log("MVC User" + JSON.stringify(user_data));
  //  console.log("MVC Villain" + JSON.stringify(villain_data));
    //will have to order user data

      //console.log("type" + typeof(user_data));

     //console.log("Player" + JSON.stringify(data["player"]));
     //console.log("Villain" + JSON.stringify(data["villain"]));

      //console.log("user data" + JSON.stringify(user_data));
      //console.log("villain data" + JSON.stringify(villain_data));
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render('stats', {user:user_data, villain:villain_data});
  });
    console.log("Finished");


  });


  /*
  console.log('Request- stats');
  var users_data = Users.getUsers(function(userName){
    console.log("");
  });
  var name = request.param.villain;
  var villains_data = Villains.getVillains(function(name){
    console.log(name);
  });
  // var data = {};
  // data["villain"] = villains_data;
  //console.log("IMPORTANT"+villains_data)
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
<<<<<<< HEAD
  response.render('stats', {user:users_data, villain:villains_data});
=======
  response.render('stats', {users:data});
  */
});

app.get('/about', function(request, response){
  console.log('Request- about');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});

/*
Deleted HTML EJS:
<!--  <object id = "villain_image" type="image/svg+xml" data="../images/<%=user.villain.replace(' ', '_').toLowerCase()%>_<%=user.weapon.toLowerCase()%>.svg" width = "150vw" height = "150vh"></object>
object id = "user_image" type="image/svg+xml" data="../images/user_<%=user.weapon.toLowerCase()%>.svg" width = "150vw" height = "150vh"></object>
  <img id="player_image" src="../images/user_<%=user.weapon.toLowerCase()%>.png" height=135; width=135;>
-->
*/
