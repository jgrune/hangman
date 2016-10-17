$(document).ready(function(){

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
                    } else {
                      var className = "letter"
                      }
        $('#letterSpaces>section').append("<div class='" + className + "Div'><span class='letterSpan'>" + letter + "</span></div>");
                  })
                },
    correctGuesses: 0,

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
      //set score
      $("#score").append('<div>' + gameState.score + '</div>')
      //initialize unused letters module
      gameState.unusedletters = "abcdefghijklmnopqrstuvwxyz".split("");
      gameState.unusedletters.forEach(function(value){
        $("#usedletters").append("<span class='unused'>" + value + "</span>");
      })
      $('#letterSpaces').append("<h2>Guess a letter!</h2>")
    },
    score: 0,
    timer: 60,
  }

  var countDown;


  //start button click event
  $("#startButton").on("click", startGame)
  $("#resetButton").on("click", resetGame)
  $("#winButton").on("click", resetGame)

  function startGame(){
    phrase.getWord();
    gameState.initializeScreen();
    countDown = setInterval(startTimer, 1000);
    //begin listening for keypresses
    $(document).on("keypress", validateLetter)
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
    $("#score div").text(gameState.score);
  }

  function loseLife(){
    $("#animation").css('background', gameState.hangmanImage[gameState.imageCounter]);
    gameState.imageCounter++;
    console.log(gameState.imageCounter);
    if (gameState.imageCounter === 7){
      setTimeout(function(){
        resetState();
      }, 200);
    }
  }

  function startTimer (){
      $("#timer>div").html(gameState.timer);
      gameState.timer--;
      if(gameState.timer === -1){
        resetState();
      }
    }

  function checkWin (){
    if (phrase.correctGuesses === phrase.array.length){
      console.log("you win!");
      resetState();
    }
  }

  function resetState(){
    clearInterval(countDown);
    $(document).off("keypress")
      if (phrase.correctGuesses === phrase.array.length){
          $('#animation').css('background-color', 'rgba(0,255,0,0.8)')
          $('#winButton').attr('style', 'display: block');}
          else{
              $('#animation').css('background-color', 'rgba(255,0,0,0.8)')
              $('#resetButton').attr('style', 'display: block');
    }
  }

  function resetGame(){
    window.location.reload();
  }

  })


  // -  As a user, I want to be able to enter a word to be guessed so that another user can guess the word during gameplay;


  // -  As a user, I want to be able to see the letters that have been guessed correctly tracked in the chosen word;
