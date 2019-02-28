//Enter the Game Logic in here
var gaussian = require('gaussian');



exports.winner = function(villainchoice, userchoice, villain_name, user_name){
  if(villainchoice == "Paper"){
    if(userchoice == "Paper"){
      return "Tie";
    }
    else if(userchoice == "Scissors"){
      return user_name;
    }
    else{
      return villain_name;
    }
  }

  else if(villainchoice == "Rock"){
    if(userchoice == "Paper"){
      return user_name;
    }
    else if(userchoice == "Scissors"){
      return villain_name;
    }
    else{
      return "Tie";
    }
  }

  else{
    if(userchoice == "Paper"){
      return villain_name;
    }
    else if(userchoice == "Scissors"){
      return "Tie";
    }
    else{
      return user_name;
    }
  }
}



exports.Villainthrows = function(villain, userchoice) {
var userthrow = this.userchoice;
var villainschoice = randomThrow();
console.log("userthrow" + userthrow);
var random = (10 * Math.random());
var index = [];
var compare;
var nothrow = false;
var paper = "Paper";
var scissors = "Scissors";
var rock = "Rock";

if(villain == "Bones" || villain == "Spock" || villain=="Pixie" || villain=="Harry"||villain=="The Magician"){
  return villainschoice
}
else if(villain=="Manny"){
  return "Paper";
}
else if(villain=="Mickey"){
  return "Scissors";
}
else if(villain=="Regal"){
  return "Rock";
}
else if(villain=="The Boss"){
  return handleStrategy(userthrow,"Win");
}
else if(villain=="Comic Hans"){
  return handleStrategy(userthrow, "Loss");
}

else if(villain=="Gato"){
  var distribution = gaussian(0.3,0.10);
    if(distribution<0.5){
      return "Rock";
    }
    else if(distribution>0.5 && distribution<0.7){
      return "Paper";
    }
    else{
      return "Scissors";
    }
}

else if(villain=="Mr Modern"){
  var distribution = gaussian(0.3,0.10);
    if(distribution<0.5){
      return "Paper";
    }
    else if(distribution>0.5 && distribution<0.7){
      return "Scissors";
    }
    else{
      return "Rock";
    }
  }
}

exports.getVillain = function(){

}

function handleStrategy(userchoice, villainoutcome){
  if(villainoutcome == "Win"){
    if(userchoice == "Paper"){
      return "Scissors";
    }
    else if(userchoice == "Rock"){
      return "Paper";
    }
    else{
      return "Rock";
    }
  }
  else if(villainoutcome == "Loss"){
    if(userchoice == "Paper"){
      return "Rock";
    }
    else if(userchoice == "Rock"){
      return "Scissors";
    }
    else{
      return "Paper";
    }
  }
  else{
    return userchoice;
  }
}

function randomThrow(){
  var throwoptions = ["Rock", "Paper", "Scissors"];
  return throwoptions[(3*Math.random())|0];
}
