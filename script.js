$(document).ready(function(){


phraseArray = [];
  //start button click event
  $("#startButton").on("click",startGame)

  function startGame(){
    var phrase = prompt('Please enter the phrase you would like your opponent to guess!', 'Enter phrase here');

    setBlankLetters(phrase);
  }

//creates blank letter tiles

  function setBlankLetters(phrase){
    //initialize interface to guessing state
    $("#letterSpaces>h2").text("");
    //add code to switch start button to reset button

    //splits phrase letter array
    phraseArray = phrase.split("");

    //generates letter fields
    phraseArray.forEach(function(letter){
      if(letter === " "){
        $('#letterSpaces>section').append("<div class='spaceDiv'><span class='letterSpan'>" + letter + "</span></div>")
      } else {
        $('#letterSpaces>section').append("<div class='letterDiv'><span class='letterSpan'>" + letter + "</span></div>")
    }})
    $('#letterSpaces').append("<h2>Guess a letter!</h2>")

    //begin listening for keypresses
    $(document).on("keypress", validateLetter);
    }

    function validateLetter(){
      var letterGuess = event.key;

      phraseArray.forEach(function(phraseLetter, i){
        if (phraseLetter === letterGuess){
          $('#letterSpaces .letterSpan').eq(i).attr('style', 'display: block');

        } else {
//TO-DO ... ADD ELSE STATEMENT -- e.g., lose life
          console.log('wrong letter - try again!');


        }
      })
    }
})





  // -  As a user, I want to be able to enter a word to be guessed so that another user can guess the word during gameplay;


  // -  As a user, I want to be able to see the letters that have been guessed correctly tracked in the chosen word;
