var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var currentLevel = 0;
var gameStarted = false;

$(document).keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Current level "+currentLevel);
    nextSequence();
  }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var userClickedPatternIndex = userClickedPattern.length -1;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPatternIndex);
  });

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random() * 4));
  currentLevel++;
  $("#level-title").text("Current level "+currentLevel);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var selectedButton = "#"+randomChosenColour;
  $(selectedButton).fadeIn(120).fadeOut(120).fadeIn(120);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audioFile = "sounds/"+name+".mp3";
  var buttonAudio = new Audio(audioFile);
  buttonAudio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function startOver() {
  currentLevel = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}
