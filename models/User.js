var fs = require("fs");
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1AGog7RTXx63dncaYKYJqKc1DGJZFWBO4MjWXxm5_ljg');

var user = {};
exports.getUser = function(user_id, callback) {
  console.log("Users.getUser: "+user_id);
  exports.getUsers(function(user_data){
    for(var i=1; i<user_data.length;i++){
    //  var user = {};
      if(user_data[i].name == String(user_id).trim()){
        user={
          name: user_data[i].name,
          games_played:user_data[i].games_played,
          lost:user_data[i].lost,
          won:user_data[i].won,
          tied:user_data[i].tied,
          paper_played:user_data[i].paper_played,
          rock_played:user_data[i].rock_played,
          scissors_played:user_data[i].scissors_played,
          password:user_data[i].password
        }
      }
    }
  });
  return user;
}

exports.getUsers = function(callback){
  getAllDatabaseRows(function(users){
    callback(users);
  });
}

/*
exports.updateUser = function(user_id, new_info){
  var userup = exports.getUser(user_id, function(){
    console.log(user_id + "working");
  });
  var k = String(new_info).split(",");
  userup.name = k[0];
  userup.games_played = k[1];
  userup.lost = k[2];
  userup.won = k[3];
  userup.tied = k[4];
  userup.paper_played = k[5];
  userup.rock_played = k[6];
  userup.scissors_played = k[7];
  userup.password = k[8];
  var user = JSON.stringify(userup);
  var file = writeFile(user);
  return user;
}
*/

exports.changeParam= function(user_id, param, newinfo){
  var userup = getUser(user_id,function(){
    console.log(newinfo);
  });
  userup.param = newinfo;
  var user = JSON.stringify(userup);
  var file = writeFile(userinfo);
  return user;
}

exports.updateUser = function(username, new_info, callback){
if(new_info.length == 9){
  var sheet;
  doc.useServiceAccountAuth(creds, function(err){
      doc.getInfo(function(err,info){
        sheet = info.worksheets[doc];
        sheet.getCells(function(err, cells){
          for(var i=0; i<cells.length; i++){
            if(cells[i].value == username){
              sheet.getCells({'min-row': i, 'max-row': i}, function(err, cells2){
                for(var j=0; j<cells2.length; j++){
                cells2[j].setValue(new_info[j]);
                  }
              });
              break;
            }
          }
        console.log("UpdateUser");
        });
        console.log("Hi");
      });
    console.log("Bienvenidos");
  });
  }
  callback();
  console.log("callback");
}


exports.deleteUser = function(username, callback){
var sheet;
var index;
  doc.useServiceAccountAuth( creds, function (err) {
    doc.getInfo(function(err,info){
      sheet = info.worksheets[doc];
      sheet.getCells(function(err, cells){
        for(var i=0; i<cells.length; i++){
          if(cells[i].value == username){
            index = i;
            sheet.getRows(function(err,rows){
              rows[i].del(function(err){
                console.log("Deleted");
              });
            });
            break;
          }
        }
      });
    });
  });
  callback();
}



/*
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
  var file = writeFile(deletestring);
  return file;
}
*/

exports.createUser = function(user_info){
  if(user_info.length == 9){
  console.log("Users.createUser");
  //console.log()
  var k = doc.useServiceAccountAuth(creds, function (err) {
      doc.addRow(1, user_info,function(){
        console.log("New user added");
      });
  });
  return k;
}

else{
  return null;

}

  /*
  var all_users = getAllDatabaseRows();
  var k = JSON.stringify(user_info);
  var final_string = all_users + k;
  var file = writeFile(final_string);
  return file;
  */
}

exports.createnewUser = function(user_name, user_password, firstname, lastname){
if(user_name == null || user_password == null || firstname == null || lastname == null){
  return false;
}

else{
  var user = {
    name: user_name,
    games_played:0,
    lost:0,
    won:0,
    tied:0,
    paper_played:0,
    rock_played:0,
    scissors_played:0,
    password:0
  }
  //this should add a new user to the sheet
  doc.useServiceAccountAuth(creds, function (err ) {
      doc.addRow(1, user,function(){
        console.log("New user added");
      });
  });

  return user;

}
  /*
  var all_users = getAllDatabaseRows();
  var k = JSON.stringify(user);
  var final_string = all_users + k;
  var file = writeFile(final_string);
  return user;
  */
}

var getAllDatabaseRows= function(callback){
  //return fs.readFileSync(__dirname +'/../data/users.csv', 'utf8').split('\n');
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(1, function (err, rows){
  //  console.log(rows);
      callback(rows);
    });
  });

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


/*
  var user = createBlankUser();
  var all_users = getAllDatabaseRows(function(users){
    callback(users);
  });

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
  */
