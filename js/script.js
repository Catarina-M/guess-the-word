const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guesses = document.querySelector(".remaining");
const spanGuess = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");


let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );

    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word); 
};


getWord();


const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word )  {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};



guessButton.addEventListener("click", function (e) {
    e.preventDefault();
//empty message paragraph
    message.innerText = "";
//lets grab what was entered in input
   const guess = letterInput.value;
// make sure its a single letter  
   const goodGuess= validateInput(guess);
   
   if (goodGuess){
       makeGuess(guess)
   }
    letterInput.value="";
});



const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if ( input.length === 0){
        message.innerText = "Please enter a letter!";
    } else if (input.length > 1 ) {
        message.innerText = "Please enter only 1 letter!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter letter from A to Z!";
    } else {
        return input;
    }
   
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter, try again!";
} else  {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateRemainingGusses(guess);
    showGuesses();
    updateWordInProgress(guessedLetters);
}
};

const showGuesses = function (){
    //empty list
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){ 
    //create new item
    const li = document.createElement("li");
    li.innerText = letter;
    //add to list
    guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray)  {
        if(guessedLetters.includes(letter)){
        revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateRemainingGusses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `The word doesn't contain ${guess}!`;
        remainingGuesses -= 1; 
    } else {
        message.innerText = `The word has the letter ${guess}!`;
    }

    if (remainingGuesses === 0){
        message.innerHTML = `Game Over. The word was <span class = "highlight">${word}</span>!`;
    } else if (remainingGuesses === 1) {
        spanGuess.innerText = `${remainingGuesses} guess`;
    } else {
        spanGuess.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class = "highligh">You guessed the correct word! Congrats!</p>`;
    } 
};


