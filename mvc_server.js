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



if(request.query.new == "new"){
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

app.get('/playagain',function(request,response){
  var user_data = {
    name: userName,
    password: userPassword
  }
  response.status(200);
  response.setHeader('Content-Type','text/html');
  response.render('game', {user:user_data});
});
//what should the callback be?
app.get('/stats', function(request, response){
  console.log('Request- stats');
  var users_data = Users.getUsers(function(userName){
    console.log(userName);
  });
  var name = request.param.villain;
  var villains_data = Villains.getVillains(function(name){
    console.log(name);
  });
  var data = {};
  data["player"] = users_data;
  data["villain"] = villains_data;
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats', {users:data});
});

app.get('/about', function(request, response){
  console.log('Request- about');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});
