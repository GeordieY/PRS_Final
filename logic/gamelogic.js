//Enter the Game Logic in here
exports.VillainThrows = function(villainname, userchoice) {
var userthrow = this.userchoice;
var villainthrow;
console.log("userthrow" + throw);
var random = (10 * Math.random());
var index = [];
var compare;
var nothrow = false;

if(villain == "Bones"){

  compare = user.localeCompare(choice);
}












    else if(villain == "Manny"){
      choice = "Paper";
      if(user == "Paper"){
        compare = 0;
      }
      else{
        compare = -1;
      }
    }
    else if(villain == "Gato"){
      if(random>7){
        choice = villainschoice;
      }
      else if(random<7 && random>5){
        if(userchoice == "Rock"){
          choice = "Scissors";
        }
        if(userchoice == "Paper"){
          choice = "Rock";
        }
        else{
          choice = "Paper";
        }
      }
      else if(random<5 && random>3){
        choice = userchoice;
      }
      else{
        if(userchoice == "Rock"){
          choice = "Paper";
        }
        if(userchoice == "Paper"){
          choice = "Rock";
        }
        else{
          choice = "Scissors";
        }
      }
      compare = user.localeCompare(choice);
      //console.log("Gato choice" + choice + "userchoice" + user + "Compare" + compare);
    }
    else if(villain == "Mr Modern"){
      if(random<2){
        choice = villainschoice;

      }
      else if(random<7 && random>5){
        choice = "Rock"
      }
      else if(random>5 && random<7){
        if(userchoice == "Rock"){
          choice = "Paper";
        }
        if(userchoice == "Paper"){
          choice = "Rock";
        }
        else{
          choice = "Scissors";
        }
      }
      else{
        choice = userchoice;
      }
      compare = user.localeCompare(choice);
      //console.log("Mr.Modern choice" + choice + "userchoice" + user + "Compare" + compare);
    }

    else if(villain == "Regal"){
      choice = "Rock";
      if(user == "Rock"){
      compare = 0;
      }
      else if(user == "Paper"){
        compare = 1;
      }
      else{
        compare = -1;
      }
      //console.log("Regal choice" + choice + "userchoice" + user + "Compare" + compare);
    }

  //The Boss: Always Wins
    else if(villain == "The Boss"){
      if(userchoice == "Rock"){
        choice = "Paper";
        compare = 1;
        //console.log("Attempt Rock" + choice);
      }
      else if(userchoice == "Paper"){
        choice = "Scissors";
        compare = -1;
      //  console.log("Attempt Paper" + choice);

      }
      else if(userchoice == "Scissors"){
        choice = "Rock";
        compare = -1;
        //console.log("Attempt Scissors" + choice);
      }
    //  console.log("The Boss choice" + choice + "userchoice" + user + "Compare" + compare);
    }


  //Comic Hans: Always Loses
    else if(villain == "Comic Hans"){
    //  console.log("userchoiceboss" + userchoice);
      if(userchoice == "Rock"){
        choice = "Scissors";
        compare = 1
      //  console.log("Choicehappened" + choice);

      }
      else if(userchoice == "Paper"){
        choice = "Rock";
        compare = 1
      //  console.log("Choicehappened" + choice);

      }
      else{
        choice = "Paper";
        compare = -1
        //console.log("Choicehappened" + choice);

      }
      //console.log("Comic Hans choice" + choice + "userchoice" + user + "Compare" + compare);
    }
  //throws depending on what last villain chose
    else if(villain == "Harry"){
      choice = villainschoice;
      compare = user.localeCompare(choice);
      /*
      if(villainsthrowsarray[villainsthrowsarray.length-1][1]=="undefined"){
        choice = "Rock";
      }
      else if(villainsthrowsarray[villainsthrowsarray.length-1][1]=="Paper"){
        choice = "Scissors";
      }
      else if(villainsthrowsarray[villainsthrowsarray.length-1][1]=="Scissors"){
        choice = "Paper";
      }
      else{
        choice = "Rock";
      }
      */
      //choice = randomChoice();
    //  compare = user.localeCompare(choice);
    //  console.log(compare);
      //console.log("Mr.Modern choice" + choice + "userchoice" + user + "Compare" + compare);
    }

  //Always throw Scissors
    else if(villain == "Mickey"){
      choice = "Scissors";
      if(user =="Scissors"){
        compare = 0;
      }
      else{
        compare = 1;
      }
    }

    else if(villain == "Pixie"){
      choice = villainschoice;
      compare = user.localeCompare(choice);
      //console.log("Pixie choice" + choice + "userchoice" + user + "Compare" + compare);
    }
    else if(villain == "Spock"){
      choice = villainschoice;
      compare = user.localeCompare(choice);
      //console.log("Spock choice" + choice + "userchoice" + user + "Compare" + compare);
    }
  //Never Throws the Same Thing Twice
    else if(villain == "The Magician"){
      choice = villainschoice;
      compare = user.localeCompare(choice);
      /*
      for(var i=villainsthrowsarray.length-1; i>=0; i--){
        //console.log("Throw array" + villainsthrowsarray[i]);
        //console.log("Throw array name" + villainsthrowsarray[i][0]);
        if(villainsthrowsarray[i][0] == villain){
          //console.log(villains)
          index == i;
          break;
        }
        else{
          if(i!=0){
          continue;
          }
          else{
            index = 0;
            nothrow = true;

          }
        }
      }
  /*
      if(villainsthrowsarray[index][1]=="undefined"){
        choice = "Rock";
      }
      */

    /*
      if(nothrow == true){
        choice = "Rock";
      }
      else if(villainsthrowsarray[index][1]=="Paper"){
        choice = "Rock";
      }
      else if(villainsthrowsarray[index][1]=="Scissors"){
        choice = "Paper";
      }
      else{
        choice = "Scissors";
      }
      */
      //choice = randomThrow();
      //compare = user.localeCompare(choice);

    //  console.log("Mr.Modern choice" + choice + "userchoice" + user + "Compare" + compare);

    }


  if(choice!=""){
    villainsthrowsarray.push([villain,choice]);
  //  console.log("Throw array" + villainsthrowsarray)
  }
  var k = [choice, compare];
    //console.log("final return vil" + choice);
    return k;
  }
}








exports.getVillain = function(){

}



function randomThrow(){
  var throwoptions = ["Rock", "Paper", "Scissors"];
  return throwoptions[(3*Math.random())|0];
}
