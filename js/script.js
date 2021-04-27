const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guesses = document.querySelector(".remaining");
const spanGuess = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholder = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordProgress.innerText = placeholderLettters.join("");
}; 



guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value; 
   
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
      }
      letterInput.value = "";
});



const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter";
    } else if (input.length > 1){
    message.innerText = "Enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z!";
    } else {
        return input;
    }
};

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter";
    } else  {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordProgress(guessedLetters);
    }
};

const showGuessedLetters = function(){ 
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
    
};

const updateWordProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
   const revealWord = [];
   for (const letter of wordArray) {
       if (guessedLetters.includes(letter)){
           revealWord.push(letter.toUpperCase());
       } else {
           revealWord.push("●");
       }
   }
   wordProgress.innerText = revealWord.join("");
   checkIfWin();
};

const checkIfWin = function(){
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class = "highlight"> You guessed the correct word! Congrats!</p>`
    }
};


