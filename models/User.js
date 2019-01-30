var fs = require("fs");

exports.getUser = function(user_id) {
  console.log("Users.getUser: "+user_id);
  var user = createBlankUser();
  var all_users = getAllDatabaseRows();

  for(var i=1; i<all_users.length; i++){
    var u = all_users[i].split(',');
    if(u[0].trim()==user_id.trim()){
      user={
        name:u[0].trim(),
        games_played:parseInt(u[1].trim()),
        lost:parseInt(u[2].trim()),
        won:parseInt(u[3].trim()),
        tied:parseInt(u[4].trim()),
        paper_played:parseInt(u[5].trim()),
        rock_played:parseInt(u[6].trim()),
        scissors_played:parseInt(u[7].trim()),
        password:u[8].trim()
      }
    }
  }
  return user;
}

exports.updateUser = function(user_id, new_info){
//asser the new info is like an object {0,0,0,0,0,0 }
//if this false throw Error
  console.log("Users.updateUser");
  var all_users = getAllDatabaseRows();

  for(var i=1; i<all_users.length; i++){
    var u = all_users[i].split(',');
    if(u[0].trim()==user_id.trim()){
      user={
        name:u[0].trim(),
        games_played:parseInt(u[1].trim()),
        lost:parseInt(u[2].trim()),
        won:parseInt(u[3].trim()),
        tied:parseInt(u[4].trim()),
        paper_played:parseInt(u[5].trim()),
        rock_played:parseInt(u[6].trim()),
        scissors_played:parseInt(u[7].trim()),
        password:u[8].trim()
      }
    }
  }

  var k = new_info.split(",");
  user.name = k[0];
  user.games_played = k[1];
  user.lost = k[2];
  user.won = k[3];
  user.tied = k[4];
  user.paper_played = k[5];
  user.rock_played = k[6];
  user.scissors_played = k[7];
  user.password = k[8];

  var userinfo = JSON.stringify(user);
  var file = writeFile(userinfo);
  return user;
}

exports.deleteUser = function(user_id){
  console.log("Users.deleteUser");
  var string;
  var all_users = getAllDatabaseRows();
  var newarray = all_users.filter(function(w){
    var u = all_users[w].split(',');
    if(u[0].trim()!=user_id.trim()){
      return true;
    }
  });
  var deletestring = newArray.toString();
  writeFile(deletestring);
}

exports.createUser = function(user_info){
  console.log("Users.createUser");
  console.log()
  var all_users = getAllDatabaseRows();
  var k = JSON.stringify(user_info);
  var final_string = all_users + k;
  writeFile(final_string);
}


var getAllDatabaseRows= function(){
  return fs.readFileSync(__dirname +'/../data/users.csv', 'utf8').split('\n');
}

function writeFile(info){
  var c = fs.writeFileSync(__dirname +'/../data/users.csv', info, 'utf8');
  return c;
}


var createBlankUser= function(){
  var user={
    name:"test",
    games_played:"0",
    lost:"0",
    won:"0",
    password:"test"
  };
  return user;
}
