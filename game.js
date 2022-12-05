var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){

    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  // It tells me, the ID of the button I clicked
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

    //gives me a number
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
      //It goes back and forth, everytime we click a button.
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  }
  else{

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);


    $("#level-title").text("Ranking: "+score(level-1)+".");
    $("#level-title").append("<hr style = border:none> Press Any Key to Restart");

    startOver();
  }

}

function score(number){

  if (number < 3) {
      return "Beginner";
  }
  else if (number < 6) {
    return  "Novice";
  }
  else if (number < 9) {
    return  "Intermediate";
  }
  else if (number < 12) {
    return  "Advanced";
  }
  else{
    return "Elite";
  }

}

function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){

  //gives a sound in the folder sounds with the same name as "name"
  var audio = new Audio('sounds/'+ name +'.mp3');
      audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



function startOver(){
  //reset
  level = 0;
  gamePattern = [];
  started = false;
}
