$(document).ready(function(){


phraseArray = [];
  //set click event for start button
  $("#startButton").on("click",startGame)

  function startGame(){
    var phrase = prompt('Please enter the phrase you would like your opponent to guess!', 'Enter phrase here');
    // console.log(wordChoice);
    displayHiddenPhrase(phrase);
  }

  function displayHiddenPhrase(phrase){
    //initialize interface to guessing state
    $("#letterSpaces>h2").text("");
    //add code to switch start button to reset button

    //splits phrase letter array
    phraseArray = phrase.split("");

    //sets letter fields
    phraseArray.forEach(function(letter){
      if(letter === " "){
        $('#letterSpaces>section').append("<div class='spaceDiv'><span class='letterSpan'>" + letter + "</span></div>")
      } else {
        $('#letterSpaces>section').append("<div class='letterDiv'><span class='letterSpan'>" + letter + "</span></div>")
    }})
    $('#letterSpaces').append("<h2>Guess a letter!</h2>")

    //set keypress event for document
    $(document).on("keypress", checkLetter);
    }

    function checkLetter(){
      var letterGuess = event.key;
      console.log(letterGuess);

      phraseArray.forEach(function(letter){
        if (letter === letterGuess){
          var indexValue = phraseArray.indexOf(letter);
          $('#letterSpaces .letterSpan').eq(indexValue).attr('style', 'display: block');
        } else {

//TO-DO ... ADD ELSE STATEMENT

        }
      })
      // letterPressed = $(evt).target
    }






  // -  As a user, I want to be able to enter a word to be guessed so that another user can guess the word during gameplay;


  // -  As a user, I want to be able to see the letters that have been guessed correctly tracked in the chosen word;



})
