var fs = require("fs");

exports.getVillain = function(villain_id) {
  console.log("Villain.getUser: "+villain_id);
  var villain = createBlankUser();
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

exports.updateVillain = function(villain_id, new_info){
//asser the new info is like an object {0,0,0,0,0,0 }
//if this false throw Error
  var villainup = getUser(villain_id);
  var k = new_info.split(",");
  villainup.name = k[0];
  villainup.games_played = k[1];
  villainup.lost = k[2];
  villainup.won = k[3];
  villainup.tied = k[4];
  villainup.paper_played = k[5];
  villainup.rock_played = k[6];
  villainup.scissors_played = k[7];
  villainup.password = k[8];
  var villain = JSON.stringify(villainup);
  var file = writeFile(userinfo);
  return villain;
}


var getAllDatabaseRows= function(){
  return fs.readFileSync(__dirname +'/../data/villains.csv', 'utf8').split('\n');
}

function writeFile(info){
  var c = fs.writeFileSync(__dirname +'/../data/villains.csv', info, 'utf8');
  return c;
}
