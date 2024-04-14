/*
PSUDOCODE

When start is clicked then page will generate a random word from Words with one clue.
User then tyoes into input box, if input.texcontent matches with the random word, YAY message is displayed with the correct word.
    However if the word input by the user does NOT match, BooHoo message appears and user can input guess again or clcik "another clue" that will generate the next clue word in the array 
        If there are no more words in the arrary to display and user still has not guessed correctly, then display "Oh No" message with "skip word" button
*/

import "./styles.scss";
import { Words } from "./word-data";
import confetti, { Options } from "canvas-confetti";

const instructionsCard = document.querySelector<HTMLInputElement>(".intro");
const begin = document.querySelector<HTMLButtonElement>(".start-game");
const nextWord = document.querySelector<HTMLButtonElement>(".next-word");
const clueCard = document.querySelector<HTMLInputElement>(".clue__word");
const clueMessageContainer = document.querySelector<HTMLElement>(
  ".clue__messages-container"
);
const clueTrackerMessage = document.querySelector(".clue__tracker-message");
const clueFail = document.querySelector(".clue__fail-message");
const userGuessContainer = document.querySelector<HTMLElement>(".user-guess");
const guessInput = document.querySelector<HTMLInputElement>("#input-box");
const submit = document.querySelector<HTMLButtonElement>(".user-guess__submit");
const timeContainer = document.querySelector<HTMLElement>(".timer");
const scoreTracker = document.querySelector<HTMLElement>(".score-tracker");
const restartButton =document.querySelector<HTMLButtonElement>(".restart-button");

if (
  !instructionsCard ||
  !begin ||
  !nextWord ||
  !clueCard ||
  !clueMessageContainer ||
  !clueTrackerMessage ||
  !clueFail ||
  !userGuessContainer ||
  !guessInput ||
  !submit ||
  !timeContainer ||
  !scoreTracker ||
  !restartButton
) {
  throw new Error("Issue with selector");
}

//All my variables - use let so they can be reset later
let secs = 59;
let minutes = 4;
let copyWords = [...Words];
let usedWords: string[] = [];
let theRandomWord: { word: string; clues: string[] }; //declaring variable but no value assigned (so I don't have to call the function outside)
let cluesUsed: number;
let timer: number | ReturnType<typeof setInterval>; //use a TS utility type which allows you to create a type that suits the return type of the function.
let score = (copyWords.length)*12;
submit.disabled = true;
userGuessContainer.style.display = "none";
nextWord.style.display = "none";
clueMessageContainer.style.display = "none";
scoreTracker.style.display = "none";


// const getRandomNumberInRange = (min: number, max: number) => {
//     return Math.random() * (max - min) + min;
//   };

const fireConfetti = () => {
  const options: Options = {
    particleCount: 200,
    spread: 180,
    colors: ["#ee2fbe", "#fff", "#800080", "#e3d10e"],
    scalar: 0.6,
    shapes: ["circle", "star"],
  };

  confetti(options);
};

//The function that gets the random word
const getRandomWord = () => {
  const numberOfWord = Math.floor(Math.random() * copyWords.length);
  const randomWord = copyWords[numberOfWord];
  const currentWord = copyWords.indexOf(randomWord);
  copyWords.splice(currentWord, 1);

  if (copyWords.length == 0) {
    clueCard.innerText = "Well done, you have guessed all the words";
    clueTrackerMessage.innerHTML = `Total Score: ${score}`;
    clearInterval(timer);
  } else {
    clueCard.innerText = randomWord.clues[0] + "\n";
    clueTrackerMessage.innerHTML = "This is your first clue";
    clueFail.innerHTML = "";
  }

  usedWords.push(randomWord.word);
  nextWord.disabled = true;
  theRandomWord = randomWord; //assign value to theRandomWord so I can use in the rest of my code
  cluesUsed = 1; //resets back to 1 everytime getRandomWord is called
};

//The function that controls the commencement of the game.
const handlStartGame = () => {
  getRandomWord();

  //Timer begins when game is started
  timer = setInterval(() => {
    if (secs < 0) {
      minutes--;
      secs = 59;
    } else if (secs == 0 && minutes == 0) {
      clearInterval(timer);
      timeContainer.innerHTML = `Time's Up!`;
      userGuessContainer.style.display = "none";
      nextWord.style.display = "none";
      clueTrackerMessage.innerHTML = `Your total score is: ${score}`;
      clueFail.innerHTML = "";
      clueCard.innerText = `You guessed ${usedWords.length}/25 words`;
      return;
    }

    timeContainer.innerHTML = `0${minutes}:${secs}`;
    if (secs <= 9) {
      timeContainer.innerHTML = `0${minutes}:0${secs}`;
    }
    secs--;
  }, 1000);

  userGuessContainer.style.display = "flex";
  begin.style.display = "none";
  nextWord.style.display = "block";
  nextWord.disabled = true;
  instructionsCard.style.display = "none";
  clueMessageContainer.style.display = "flex";
  scoreTracker.style.display = "flex";
  scoreTracker.innerHTML = `${score}`;
};

const enableSubmit = () => {
  if (guessInput.value !== "") {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
};

//This function handles the next clue showing up on the card, by incrementing the counter and appending that to the card.
export const nextClue = () => {
  if (cluesUsed < theRandomWord.clues.length) {
    clueCard.innerText += `${theRandomWord.clues[cluesUsed]} \n`;
    cluesUsed++;
    let currentScore = (score -= 2);
    clueFail.innerHTML = `Try again, your current score is: ${currentScore}`;
    scoreTracker.innerHTML = `${currentScore}`;

    clueTrackerMessage.innerHTML = `You have had ${cluesUsed} out of ${theRandomWord.clues.length} clues`;
  } else if ((cluesUsed = theRandomWord.clues.length)) {
    clueFail.innerHTML = "Oh no!, you have run out of clues";
    clueCard.innerText = `The word was: ${theRandomWord.word}`;
    nextWord.disabled = false;
  }
};

//The function that checks the guess of the user against the word. Returns a well done message if guess is correct. Otherwise a try again message if it is not a match
export const handleGuessInput = () => {
  const guessWord = guessInput.value.toUpperCase();
  if (guessWord == theRandomWord.word.toUpperCase()) {
    clueCard.innerText = `Yay! You got it!`;
    clueTrackerMessage.innerHTML = `Your clues used: ${cluesUsed}`;
    fireConfetti();
    clueFail.innerHTML = "";
    nextWord.disabled = false;
  } else {
    nextClue();
  }
  guessInput.value = "";
  submit.disabled = true;
};

const restartGame = () => {
  instructionsCard.style.display = "block";
  begin.style.display = "block";
  score = (copyWords.length)*12;
  copyWords = [...Words];
  usedWords = [];
  secs = 59;
  minutes = 4;
  userGuessContainer.style.display = "none";
  nextWord.style.display = "none";
  clueCard.innerHTML = "Click start to begin playing";
  clueMessageContainer.style.display = "none";
  clueTrackerMessage.innerHTML = "";
  clueFail.innerHTML = "";
  scoreTracker.style.display = "none";
  clearInterval(timer);
  timeContainer.innerHTML =
    "<h3>Your 5 minute timer will begin when the game starts</h3>";
};

begin.addEventListener("click", handlStartGame);
nextWord.addEventListener("click", getRandomWord);
guessInput.addEventListener("keyup", enableSubmit);
submit.addEventListener("click", handleGuessInput);
restartButton.addEventListener("click", restartGame);
