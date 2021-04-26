const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guesses = document.querySelector(".remaining");
const spanGuess = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");

const word = "magnolia";

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
    const guess = letterInput.value; 
    console.log(guess);
    letterInput.value = "";
});
