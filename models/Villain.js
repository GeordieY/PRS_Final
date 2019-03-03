var fs = require("fs");
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1AGog7RTXx63dncaYKYJqKc1DGJZFWBO4MjWXxm5_ljg');

/*
exports.getVillain = function(villain_id) {
  console.log("Villain.getvillain: "+villain_id);
  var villain = createBlankvillain();
  var all_villains = getAllDatabaseRows();

  for(var i=1; i<all_villains.length; i++){
    var u = all_villains[i].split(',');
    if(u[0].trim()==villain_id.trim()){
      villain={
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
  return villain;
}
*/
var villain = {}
exports.getvillain = function(villain_id, callback) {
  console.log("villains.getvillain: "+villain_id);
  exports.getVillains(function(villain_data){
    for(var i=1; i<villain_data.length;i++){
      if(villain_data[i].name == String(villain_id).trim()){
        villain={
          name: villain_data[i].name,
          games_played:villain_data[i].games_played,
          lost:villain_data[i].lost,
          won:villain_data[i].won,
          tied:villain_data[i].tied,
          paper_played:villain_data[i].paper_played,
          rock_played:villain_data[i].rock_played,
          scissors_played:villain_data[i].scissors_played
        }
      }
    }
  });
  return villain;
}

exports.getVillains = function(callback){
  var villain_data = [];
  var k = getAllDatabaseRows(function(villains){
    for(var i=0; i<villains.length;i++){
      villain = {
        name: villains[i].name,
        games_played: villains[i].games_played,
        won: villains[i].won,
        tied: villains[i].tied,
        lost: villains[i].lost,
        paper_played: villains[i].paper_played,
        rock_played: villains[i].rock_played,
        scissors_played: villains[i].scissors_played,
        password: villains[i].password
      }
      villain_data.push(villain);
    }

  //  callback(villains);
  });
  return villain_data;
  //return k;

  //console.log("Get Villains" + k);

}


exports.updateVillain = function(villainname, new_info, callback){
if(new_info.length == 9){
  var sheet;
  doc.useServiceAccountAuth(creds, function(err){
      doc.getInfo(function(err,info){
        sheet = info.worksheets[doc];
        sheet.getCells(function(err, cells){
          for(var i=0; i<cells.length; i++){
            if(cells[i].value == villainname){
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
  });
  }
  callback();
  console.log("callback");
}


exports.deleteVillain = function(username, callback){
var sheet;
var index;
  doc.useServiceAccountAuth( creds, function (err) {
    doc.getInfo(function(err,info){
      sheet = info.worksheets[doc];
      sheet.getCells(function(err, cells){
        for(var i=0; i<cells.length; i++){
          if(cells[i].value == usernae){
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




/*
exports.updateVillain = function(villain_id, new_info){
//asser the new info is like an object {0,0,0,0,0,0 }
//if this false throw Error
  var villainup = exports.getvillain(villain_id,function(){
    console.log(villain_id);
  });
  var k = String(new_info).split(",");
  villainup.name = k[0];
  villainup.games_played = k[1];
  villainup.lost = k[2];
  villainup.won = k[3];
  villainup.tied = k[4];
  villainup.paper_played = k[5];
  villainup.rock_played = k[6];
  villainup.scissors_played = k[7];
  var villain = JSON.stringify(villainup);
  var file = writeFile(villain);
  return villain;
}
*/

/*
var getAllDatabaseRows= function(){
  return fs.readFileSync(__dirname +'/../data/villains.csv', 'utf8').split('\n');
}
*/
var getAllDatabaseRows= function(callback){
  //return fs.readFileSync(__dirname +'/../data/villains.csv', 'utf8').split('\n');
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(1, function (err, rows){
  //  console.log(rows);
      callback(rows);
    });
  });

}
function writeFile(info){
  var c = fs.writeFileSync(__dirname +'/../data/villains.csv', info, 'utf8');
  return c;
}
