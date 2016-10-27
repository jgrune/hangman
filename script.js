$(document).ready(function(){

  // high score code - test
  let imageIndexes = [0,1,2,3,4,5,6]
  let alphaString = "abcdefghijklmnopqrstuvwxyz"
  var scoreIncrementation = 10
  let countDown;

  let phrase = {
    array: [],
    getWord(){
      phrase.initialInput = prompt('Please enter the phrase you would like your opponent to guess!', 'Enter phrase here').toLowerCase();
      //initialize blank letter tiles
      phrase.setLetters(phrase.initialInput.split(""));
    },
    setLetters(letters){
      letters.forEach(function(letter){
        if(letter === " "){
          var className = "space"
          phrase.spaceCount++;
        } else {
          var className = "letter"
        }
        $('#letterSpaces>section').append("<div class='" + className + "Div'><span class='letterSpan'>" + letter + "</span></div>");
      })
    },
    correctGuesses: 0,
    spaceCount: 0,
  }

  let gameState = {
    hangmanImage: imageIndexes.map(function(i){
      return "rgba(255,255,255,0.8) url('images/Hangman-" + i + ".png') no-repeat center"
    }),
    imageCounter: 1,
    setupScore() {
      //set score
      $("#score").append("<div id='gameScore'>" + gameState.score + '</div>');
      if (typeof(Storage) != "undefined") {
        // session persistence
        if(sessionStorage.highScore){
          $("#score").append('High Score:'+ '<div id="highScore">' + sessionStorage.highScore + '</div>')
        } else{
          $("#score").append('High Score:'+ '<div id="highScore">' + '0' + '</div>')
        }
      } else {
        console.log("Sorry, your browser does not support Web Storage...");
      }
    },
    initializeScreen() {
      //remove intruction text
      $("#letterSpaces>h2").text("");
      //hide start button
      $("#startButton").css('visibility', 'hidden');
      //set initial hangman image
      $("#animation").css('background', gameState.hangmanImage[0]);
      //initialize unused letters module
      gameState.unusedletters = alphaString.split("");
      gameState.unusedletters.forEach(function(value){
        $("#usedletters").append("<span class='unused'>" + value + "</span>");
      })
      $('#letterSpaces').append("<h2 id='guess'>Guess a letter!</h2>")
    },
    startGame(){
      phrase.getWord();
      gameState.initializeScreen();
      // countDown sounds like a part of a game's state
      // which you happen to have an object defined for that to live in.
      countDown = setInterval(gameState.startTimer, 1000);
    },
    resetGame(){
      window.location.reload();
    },
    loseLife(){
      $("#animation").css('background', gameState.hangmanImage[gameState.imageCounter]);
      gameState.imageCounter++;
      if (gameState.imageCounter === 7){
        setTimeout(function(){
          gameState.resetState('loss');
        }, 200);
      }
    },
    startTimer (){
      //begin listening for keypresses
      $(document).on("keypress", validateLetter)

      $("#timer>div").html(gameState.timer);
      gameState.timer--;
      // it'd be cool if the timer got down to a certain value it would start flashing like the scores
      if(gameState.timer === -1){
        gameState.resetState('loss');
      }
    },
    checkWin (){
      if (phrase.correctGuesses === (phrase.initialInput.split("").length - phrase.spaceCount)){
        if (!sessionStorage.highScore || (gameState.score > sessionStorage.highScore)){
          sessionStorage.highScore = gameState.score;
        }
        gameState.resetState('win');
      }
    },
    resetState(result){
      clearInterval(countDown);
      $(document).off("keypress")
      if (result === 'win'){
        // $('#animation').css('background-color', 'rgba(0,255,0,0.8)')
        $('#winButton').attr('style', 'display: block').focus();

      } else{
        phrase.initialInput.split("").forEach(function(phraseLetter, i){
          $('#letterSpaces .letterSpan').eq(i).attr('style', 'display: block');
        });
        $('#animation').css('background-color', 'rgba(255,0,0,0.8)');
        $('#resetButton').attr('style', 'display: block').focus();
      }
    },
    score: 0,
    timer: 59,
  }

  // it'd be cool if the score addition was variable depending on the timer
  function addToScore(){
    gameState.score += scoreIncrementation;
    $("#score #gameScore").text(gameState.score);
    //adjusts high score
    if (!sessionStorage.highScore || (gameState.score > sessionStorage.highScore)){
      $("#score #gameScore").text(gameState.score).addClass('newHighScore');
      $("#score #highScore").text(gameState.score).addClass('newHighScore');
    }
  }
  //start button click event
  $("#startButton").on("click", gameState.startGame)
  $("#resetButton").on("click", gameState.resetGame)
  $("#winButton").on("click", gameState.resetGame)

  gameState.setupScore();
  // likewise, this sounds like something that belongs in the phrase object
  function validateLetter(event){
    //check if letter has already been guessed
    // this is a smell, reaeson being, is that 13, 9 , 16 will always evaluate to true and hence the if condition is really only evaluating whether the keycode is 32 or not
    if(event.keyCode !== 32 && 13 && 9 && 16){
      let letterGuess = event.key;
      let unusedIndex = gameState.unusedletters.indexOf(letterGuess);
      if($('#usedletters span').eq(unusedIndex).hasClass('used')) {
      } else {
        //change coloring of guessed letter
        // how can you refactor this using toggle class? or just adding one class? its small but potentially could cut some code
        $('#usedletters span').eq(unusedIndex).removeClass('unused').addClass('used');

        if(phrase.initialInput.includes(letterGuess)){
          //checking for multiples - could refactor to use filter with index parameter
          phrase.initialInput.split("").forEach(function(phraseLetter, i){
            if (letterGuess === phraseLetter){
              $('#letterSpaces .letterSpan').eq(i).attr('style', 'display: block');
              addToScore();
              phrase.correctGuesses++;
              gameState.checkWin();
            } else {
            }
          })
        } else {
          gameState.loseLife();
        }
      }
    }
  }
})
