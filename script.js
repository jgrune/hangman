$(document).ready(function(){

// high score code - test

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
                      // slight indentation issue
        $('#letterSpaces>section').append("<div class='" + className + "Div'><span class='letterSpan'>" + letter + "</span></div>");
                  })
                },
    correctGuesses: 0,
    spaceCount: 0,

  }

  var gameState = {
    // this is a small clerical thing, but this array your mapping is a hard coded value. as another developer, i'm unsure what your trying to map
    // constant values like this should be instantiate at the top of the scope something like this:
    // var imageIndexes = [0,1,2,3,4,5,6] or something like this
    // then it would be imageIndexes.map .... more code
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
      // another constant like the comment above
      gameState.unusedletters = "abcdefghijklmnopqrstuvwxyz".split("");
      gameState.unusedletters.forEach(function(value){
        $("#usedletters").append("<span class='unused'>" + value + "</span>");
      })
      $('#letterSpaces').append("<h2 id='guess'>Guess a letter!</h2>")
    },
    score: 0,
    timer: 59,
  }

  var countDown;

  //set score
  $("#score").append("<div id='gameScore'>" + gameState.score + '</div>');
  // i think you want undefined not in quotes here, or use unstrict comparison != otherwise it'll see if Storage is exactly the string "undefined"
  // I don't think it'll ever hit the else condition if browser doesn't support session stores and may cause your program to error when it hits the code sessionStorage
  if (typeof(Storage) !== "undefined") {
    // nice persistence!
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

  // you've already got two objects that abstract functionality, why not get this all into the gameState object? I think the start of a game has definitely somethign to do with game state
  function startGame(){
    phrase.getWord();
    gameState.initializeScreen();
    // countDown sounds like a part of a game's state
    // which you happen to have an object defined for that to live in.
    countDown = setInterval(startTimer, 1000);
  }

  // likewise, this sounds like something that belongs in the phrase object
  function validateLetter(event){
    var letterGuess = event.key;
    var unusedIndex = gameState.unusedletters.indexOf(letterGuess);

    //check if letter has already been guessed
    // this is a smell, reaeson being, is that 13, 9 , 16 will always evaluate to true and hence the if condition is really only evaluating whether the keycode is 32 or not
    // also super minor runtime enhancement is to move this if condition above your variable instantiation. otherwise it will instantiate those variables when it doesn't need to
    if(event.keyCode !== 32 && 13 && 9 && 16){
      if($('#usedletters span').eq(unusedIndex).hasClass('used')) {
        console.log("used letter");
      } else {
        //change coloring of guessed letter
        // how can you refactor this using toggle class? or just adding one class? its small but potentially could cut some code
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
          loseLife();
        }
      }
    }
}
  // it'd be cool if the score addition was variable depending on the timer
  function addToScore(){
    // 10 here is what's known as a "magic number" better would be to create a variable at the top of the scope something like this:
    // var scoreIncrementation = 10
    // gameState.score += scoreIncrementation
    // also makes the comment above the function easier to implement
    gameState.score += 10;
    $("#score #gameScore").text(gameState.score);

    if (!sessionStorage.highScore || (gameState.score > sessionStorage.highScore)){
      $("#score #gameScore").text(gameState.score).addClass('newHighScore');
      $("#score #highScore").text(gameState.score).addClass('newHighScore');
    }
  }

  // move this into gamestate, your already working with a couple properties in it!
  function loseLife(){
    $("#animation").css('background', gameState.hangmanImage[gameState.imageCounter]);
    gameState.imageCounter++;
    if (gameState.imageCounter === 7){
      setTimeout(function(){
        resetState('loss');
      }, 200);
    }
  }
  // same thing
  function startTimer (){
    //begin listening for keypresses
    $(document).on("keypress", validateLetter)

      $("#timer>div").html(gameState.timer);
      gameState.timer--;
      // it'd be cool if the timer got down to a certain value it would start flashing like the scores
      if(gameState.timer === -1){
        resetState('loss');
      }
    }
  // same thing
  function checkWin (){
    if (phrase.correctGuesses === (phrase.array.length - phrase.spaceCount)){
      if (!sessionStorage.highScore || (gameState.score > sessionStorage.highScore)){
        sessionStorage.highScore = gameState.score;
    }
      resetState('win');
    }
  }
  // seeing a reoccuring pattern here.. this function even has the word state in it!
  function resetState(result){
    clearInterval(countDown);
    $(document).off("keypress")
      if (result === 'win'){
          // $('#animation').css('background-color', 'rgba(0,255,0,0.8)')
          $('#winButton').attr('style', 'display: block').focus();

        } else{
          phrase.array.forEach(function(phraseLetter, i){
              $('#letterSpaces .letterSpan').eq(i).attr('style', 'display: block');
            });
          $('#animation').css('background-color', 'rgba(255,0,0,0.8)');
          $('#resetButton').attr('style', 'display: block').focus();
    }
  }
//testing
  // this reset function causes an entire page refresh thus ruining that single page application feel
  function resetGame(){
    window.location.reload();
  }

  })


  // -  As a user, I want to be able to enter a word to be guessed so that another user can guess the word during gameplay;


  // -  As a user, I want to be able to see the letters that have been guessed correctly tracked in the chosen word;
