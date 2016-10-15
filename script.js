$(document).ready(function(){

  var phrase = {
    array: [],
    getWord: function(){
      phrase.initialInput = prompt('Please enter the phrase you would like your opponent to guess!', 'Enter phrase here');
      phrase.initialInput = phrase.initialInput.toLowerCase();
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
    timer: 0,
    lives: 6
  }



      //start button click event
      $("#startButton").on("click", startGame)

      function startGame(){
        phrase.getWord();
        gameState.initializeScreen();
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

        //joins array into string so check for 'includes' can be performed
        var letterCheck = phrase.array.join()
          if(letterCheck.includes(letterGuess)){
            console.log("match");
            //checking for multiples - could refactor to use filter with index parameter
            phrase.array.forEach(function(phraseLetter, i){
              if (letterGuess === phraseLetter){
                $('#letterSpaces .letterSpan').eq(i).attr('style', 'display: block');
                addToScore();
              } else {
              }
            })
          } else {
            console.log("no match");
            updateLives();
          }
        }
      }

      function addToScore(){
        gameState.score += 10;
        $("#score div").text(gameState.score);
      }

      function updateLives(){
        $("#animation").css('background', gameState.hangmanImage[gameState.imageCounter]);
        gameState.imageCounter++;
        gameState.lives--;
    }


})


    // -  As a user, I want to be able to enter a word to be guessed so that another user can guess the word during gameplay;


    // -  As a user, I want to be able to see the letters that have been guessed correctly tracked in the chosen word;
