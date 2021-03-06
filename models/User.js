var fs = require("fs");
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1AGog7RTXx63dncaYKYJqKc1DGJZFWBO4MjWXxm5_ljg');
var user = {};

exports.getUser = function(user_id, callback) {
  var auser={};
  console.log("Users.getUser: "+user_id);
   getAllDatabaseRows(function(user_data){
    for(var i=0; i<user_data.length;i++){
    //  var user = {};
      if(user_data[i].name == String(user_id).trim()){
        console.log(user_data[i]);
          auser.name=user_data[i].name;

          auser.gamesplayed=user_data[i].gamesplayed;
          auser.lost=user_data[i].lost;
          auser.won=user_data[i].won;
          auser.tied=user_data[i].tied;
          auser.paperplayed=user_data[i].paperplayed;
          auser.rockplayed=user_data[i].rockplayed;
          auser.scissorsplayed=user_data[i].scissorsplayed;
          auser.password=user_data[i].password;
          //console.log("pass1 "+auser.name);
          console.log("getUser");
          callback(auser);
          //return auser;

      }

    }
  });
  //console.log("auser" + auser);
  return auser;
}

exports.getUsers = function(callback){
  var user_data = [];
  var user2 = {};
   getAllDatabaseRows(function(users){
    for(var i=0; i<users.length;i++){
      user2 = {
        name: users[i].name,
        gamesplayed: users[i].gamesplayed,
        won: users[i].won,
        tied: users[i].tied,
        lost: users[i].lost,
        paperplayed: users[i].paperplayed,
        rockplayed: users[i].rockplayed,
        scissorsplayed: users[i].scissorsplayed,
        password: users[i].password
      }
    //user_data.push(user);
  //  console.log("Non-pushed villain" + JSON.stringify(user));
    user_data.push(user2);
  //  console.log("Pushed villain" + user_data[i]);
  }
    //console.log("Users" + users);
    callback(users);
    //console.log(users)
  });
  //console.log("Data User" + user_data);
  return user_data;
}


exports.updateUser = function(user_id, updates, callback){
  updateRow(user_id, updates, function(){
    console.log("doing next");
    callback();
  });
}



var updateRow=function(userName, newStuff, callback){
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[0];
      sheet.getCells({
        'min-col': 1,
        'max-col': 1,
        'return-empty': true}, function(err, cells) {
        for(var i=0; i<cells.length;i++){
          if(cells[i].value==userName){
            sheet.getCells({'min-row': i+1,'max-row': i+1},
            function(err, cells) {
              for(var i=0; i<cells.length;i++){
                cells[i].setValue(newStuff[i]);
              }
            });
            break;
          }
        }
        console.log("doing callback");
        callback();
      });
    });
  });
}


exports.deleteUser = function(username,callback){
  getAllDatabaseRows(function(rows){
    for(var i = 0; i <rows.length; i++){ //check to see if this needs to be -1
        if(rows[i].name.trim() == username){
          //console.log(rows[i]);
        //  console.log("user found and updated");
           rows[i].del();
      callback();
      }
    }
});
}



/*
exports.updateUser = function(username, new_info, callback){
if(new_info.length == 9){
  var sheet;
  getAllDatabaseRows(function(rows){
    for(var i=0;i<rows.length;i++){
        if(rows[i].name == String(username).trim()){
            rows[i].name = new_info[0];
            rows[i].gamesplayed= new_info[1];
            rows[i].won = new_info[2];
            rows[i].tied = new_info[3];
            rows[i].lost = new_info[4];
            rows[i].paperplayed = new_info[5];
            rows[i].rockplayed = new_info[6];
            rows[i].scissorsplayed = new_info[7];
            rows[i].password = new_info[8];
            rows[i].save(callback);
            console.log("rows" + rows[i] + "new_info" + new_info);
        }
    }
  });



  /*
  doc.useServiceAccountAuth(creds, function(err){
      doc.getInfo(function(err,info){
        sheet = info.worksheets[doc];
        sheet.getCells(function(err, cells){
          for(var i=0; i<cells.length; i++){
            if(cells[i].value == username){
              sheet.getCells({'min-row': i+1, 'max-row': i+1}, function(err, cells2){
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
    callback();
    console.log("callback");
  });


  }

}
*/
/*
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
              rows[i-1].del(function(err){
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
*/

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
    gamesplayed:0,
    lost:0,
    won:0,
    tied:0,
    paperplayed:0,
    rockplayed:0,
    scissorsplayed:0,
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
  var user_data = [];
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
    gamesplayed:"0",
    lost:"0",
    won:"0",
    tied:"0",
    paperplayed:"0",
    rockplayed:"0",
    scissorsplayed:"0",
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
        gamesplayed:parseInt(u[1].trim()),
        lost:parseInt(u[2].trim()),
        won:parseInt(u[3].trim()),
        tied:parseInt(u[4].trim()),
        paperplayed:parseInt(u[5].trim()),
        rockplayed:parseInt(u[6].trim()),
        scissorsplayed:parseInt(u[7].trim()),
        password:u[8].trim()
      }
    }
  }
  */
