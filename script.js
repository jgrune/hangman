$(document).ready(function(){

// high score code




  var phrase = {
    array: [],
    getWord: function(){
                phrase.initialInput = prompt('Please enter the phrase you would like your opponent to guess!', 'Enter phrase here').toLowerCase();
                //initialize blank letter tiles
                phrase.array = phrase.initialInput.split("");
                phrase.setLetters(phrase.array);
              },
    setLetters: function(letters){
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

  var gameState = {
    hangmanImage: [0,1,2,3,4,5,6].map(function(i){
      return "rgba(255,255,255,0.8) url('images/Hangman-" + i + ".png') no-repeat center"
    }),
    imageCounter: 1,
    initializeScreen: function() {
      //remove intruction text
      $("#letterSpaces>h2").text("");
      //hide start button
      $("#startButton").css('visibility', 'hidden');
      //set initial hangman image
      $("#animation").css('background', gameState.hangmanImage[0]);

      //set high score


      //initialize unused letters module
      gameState.unusedletters = "abcdefghijklmnopqrstuvwxyz".split("");
      gameState.unusedletters.forEach(function(value){
        $("#usedletters").append("<span class='unused'>" + value + "</span>");
      })
      $('#letterSpaces').append("<h2>Guess a letter!</h2>")
    },
    score: 0,
    timer: 59,
  }

  var countDown;

  //set score
  $("#score").append("<div id='gameScore'>" + gameState.score + '</div>');
// console.log(sessionStorage.highScore);
  if (typeof(Storage) !== "undefined") {
    if(sessionStorage.highScore){
    $("#score").append('High Score:'+ '<div id="highScore">' + sessionStorage.highScore + '</div>')
    } else{
    $("#score").append('High Score:'+ '<div id="highScore">' + '0' + '</div>')
    }
  } else {
      console.log("Sorry, your browser does not support Web Storage...");
  }

  //start button click event
  $("#startButton").on("click", startGame)
  $("#resetButton").on("click", resetGame)
  $("#winButton").on("click", resetGame)

  function startGame(){
    phrase.getWord();
    gameState.initializeScreen();
    countDown = setInterval(startTimer, 1000);

  }

  function validateLetter(event){
    var letterGuess = event.key;
    var unusedIndex = gameState.unusedletters.indexOf(letterGuess);

    //check if letter has already been guessed
    if($('#usedletters span').eq(unusedIndex).hasClass('used')) {
      console.log("used letter");
    } else{
      //change coloring of guessed letter
      $('#usedletters span').eq(unusedIndex).removeClass('unused').addClass('used');


      if(phrase.initialInput.includes(letterGuess)){
        //checking for multiples - could refactor to use filter with index parameter
        phrase.array.forEach(function(phraseLetter, i){
          if (letterGuess === phraseLetter){
            $('#letterSpaces .letterSpan').eq(i).attr('style', 'display: block');
            addToScore();
            phrase.correctGuesses++;
            checkWin();
          } else {
          }
        })
      } else {
        console.log("no match");
        loseLife();
      }
    }
  }

  function addToScore(){
    gameState.score += 10;
    $("#score #gameScore").text(gameState.score);

    if (!sessionStorage.highScore || (gameState.score > sessionStorage.highScore)){
      $("#score #gameScore").text(gameState.score).addClass('newHighScore');
      $("#score #highScore").text(gameState.score).addClass('newHighScore');
    }
  }

  function loseLife(){
    $("#animation").css('background', gameState.hangmanImage[gameState.imageCounter]);
    gameState.imageCounter++;
    console.log(gameState.imageCounter);
    if (gameState.imageCounter === 7){
      setTimeout(function(){
        resetState('loss');
      }, 200);
    }
  }

  function startTimer (){
    //begin listening for keypresses
    $(document).on("keypress", validateLetter)

      $("#timer>div").html(gameState.timer);
      gameState.timer--;
      if(gameState.timer === -1){
        resetState('loss');
      }
    }

  function checkWin (){
    if (phrase.correctGuesses === (phrase.array.length - phrase.spaceCount)){
      console.log("you win!");
      if (!sessionStorage.highScore || (gameState.score > sessionStorage.highScore)){
        sessionStorage.highScore = gameState.score;
    }
      resetState('win');
    }
  }

  function resetState(result){
    clearInterval(countDown);
    $(document).off("keypress")
      if (result === 'win'){
          $('#animation').css('background-color', 'rgba(0,255,0,0.8)')
          $('#winButton').attr('style', 'display: block').focus();

        } else{
              $('#animation').css('background-color', 'rgba(255,0,0,0.8)')
              $('#resetButton').attr('style', 'display: block').focus();
    }
  }
//testing
  function resetGame(){
    window.location.reload();
  }

  })


  // -  As a user, I want to be able to enter a word to be guessed so that another user can guess the word during gameplay;


  // -  As a user, I want to be able to see the letters that have been guessed correctly tracked in the chosen word;
