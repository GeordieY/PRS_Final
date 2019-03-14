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
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('game', {user:user_data});
}

else{

Users.getUser(userName, function(user_data){
  if(user_data.name == ""){
    console.log("No name submitted");
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('index', {user:user_data, error:failure});
  }
  else if(user_data.password == userPassword){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('game', {user:user_data});
  }
  else{
    failure = "Failure" ;
    userName = "";
    userPassword = "";
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('index', {user:user_data, error:failure});
  }
});

}
  console.log('Request- login');
  //var u = Users.getUser(request.query.player_name);
//need to write MVC server details;

/* do you need this if this is in the controller ?
app.get('/:user/results', function(request, response){
  console.log('Request- /'+request.params.user+'/results');

  var user_data={
      name: request.params.user,
      weapon: request.query.weapon
  };

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.send(JSON.stringify(user_data));
*/
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
  Users.getUsers(function(user_data){
  Villains.getVillains(function(villain_data){
    console.log("MVC User" + user_data);
    console.log("MVC Villain" + villain_data);
    //will have to order user data
      data["player"] = user_data;
      data["villain"] = villain_data;

      //console.log("type" + typeof(user_data));

    //  console.log("Player" + JSON.stringify(data["player"]));
    //  console.log("Villain" + JSON.stringify(data["villain"]));

      //console.log("user data" + JSON.stringify(user_data));
      //console.log("villain data" + JSON.stringify(villain_data));
  });
    console.log("Finished");
  });

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats', {user:data});
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
>>>>>>> f85394f3e58f155af5e2ef6f564d86129e0795d8
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
