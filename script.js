$(document).ready(function(){

  var phrase = {
    initialInput: [],
    array: [],
    setLetters: function(letter){
      phrase.array.forEach(function(letter){
        if(letter === " "){
          $('#letterSpaces>section').append("<div class='spaceDiv'><span class='letterSpan'>" + letter + "</span></div>");
        } else {
          $('#letterSpaces>section').append("<div class='letterDiv'><span class='letterSpan'>" + letter + "</span></div>");
        }})}
      }

      var gameState = {
        hangmanImage: {
          img0: "rgba(255,255,255,0.8) url('images/Hangman-0.png') no-repeat center",
          img1: "rgba(255,255,255,0.8) url('images/Hangman-1.png') no-repeat center",
          img2: "rgba(255,255,255,0.8) url('images/Hangman-2.png') no-repeat center",
          img3: "rgba(255,255,255,0.8) url('images/Hangman-3.png') no-repeat center",
          img4: "rgba(255,255,255,0.8) url('images/Hangman-4.png') no-repeat center",
          img5: "rgba(255,255,255,0.8) url('images/Hangman-5.png') no-repeat center",
        },
        unusedLetters: [],
        score: 0,
        timer: 0
      }

      //start button click event
      $("#startButton").on("click",startGame)

      function startGame(){
        phrase.initialInput = prompt('Please enter the phrase you would like your opponent to guess!', 'Enter phrase here');
        phrase.initialInput = phrase.initialInput.toLowerCase();
        initializeScreen();
      }

      function initializeScreen(){
        //remove intruction text
        $("#letterSpaces>h2").text("");
        //hide start button
        $("#startButton").css('visibility', 'hidden');
        //set initial hangman image
        $("#animation").css('background', gameState.hangmanImage.img0);
        //initialize unused letters module
        gameState.unusedletters = "abcdefghijklmnopqrstuvwxyz".split("");
        gameState.unusedletters.forEach(function(value){
          $("#usedletters").append("<span class='unused'>" + value + "</span>");
        })
        //initialize blank letter tiles
        phrase.array = phrase.initialInput.split("");
        phrase.setLetters();
        $('#letterSpaces').append("<h2>Guess a letter!</h2>")
        //begin listening for keypresses
        $(document).on("keypress", validateLetter);
      }

      function validateLetter(){
        var letterGuess = event.key;
        //set letter coloring
        var unusedIndex = gameState.unusedletters.indexOf(letterGuess);
        $('#usedletters span').eq(unusedIndex).removeClass('unused').addClass('used');

      //set a variable letterCheck that stores either a letter in phrase or "undefined"
      var letterCheck = phrase.array.find(function(letter){
            return letterGuess === letter;
          });
      // console.log(letterCheck);
        // if(typeof letterCheck !== "undefined"){
        if(letterCheck){
            console.log("match");

            //checking for multiples - could refactor to use filter with index parameter
            phrase.array.forEach(function(phraseLetter, i){
                if (letterGuess === phraseLetter){
                  $('#letterSpaces .letterSpan').eq(i).attr('style', 'display: block');
                } else {
                }
              })
          } else {
            console.log("no match");
            //****add code to lose a life***
          }
        }

    })





    // -  As a user, I want to be able to enter a word to be guessed so that another user can guess the word during gameplay;


    // -  As a user, I want to be able to see the letters that have been guessed correctly tracked in the chosen word;
