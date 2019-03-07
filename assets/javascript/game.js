// Word list
var selectableWords = ["porkypig", 
                      "foghornleghorn", 
                      "pepelepew", 
                      "bugsbunny", 
                      "sylvester", 
                      "tweetybird", 
                      "daffyduck"];
//Sets max tries
const maxTries = 10;
//Stores the letters guessed by user
var guessedLetters = [];
// Index of the current Word in array
var currentWordIndex;
// Word we are building to match the currentWordIndex
var guessingWord = [];
// Guesses remaining
var remainingGuesses = 0;
// Flag for Press any key to try again
var hasFinished = false;
// How many wins
var wins = 0;

//reset game variables
function resetGame() {
    remainingGuesses = maxTries;
    
    //use math.floor to round the random number to nearest whole.  
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    //Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    //Build the guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    //Show display
    updateDisplay();
    
};

//Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    //Display how much of the word we've already guessed on screen
    //Printing the array would add commas - so we concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText +=  guessingWord[i];
    }
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};
//This function takes a letter and finds all instances of appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    //array to store positions of letters in string
    var positions = [];

    //Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    } 
    //If there are no indicies, remove a guess
    if(positions.length <= 0) {
        remainingGuesses--;
    } else {
        //Loop through no indicies, remove a guess
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
            }
        } 
};
//Checks for a win by seeing if there are any remaining underscores in the guessingWord we are building
    function checkWin() {
        if(guessingWord.indexOf("_") === -1) {
            document.getElementById("youwin-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
            wins++;
            hasFinished = true;
        }
    }; console.log();

//checks for a loss
function checkLoss() {
    if(remainingGuesses <= 0){
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFinished = true;
    } console.log();

}
//Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        //Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter); 
        } console.log ();
    }
};

// Event Listener
document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    } console.log();
};




