/*
PSUDOCODE

When start is clicked then page will generate a random word from Words with one clue.
User then tyoes into input box, if input.texcontent matches with the random word, YAY message is displayed with the correct word.
    However if the word input by the user does NOT match, BooHoo message appears and user can input guess again or clcik "another clue" that will generate the next clue word in the array 
        If there are no more words in the arrary to display and user still has not guessed correctly, then display "Oh No" message with "skip word" button
*/

import "./styles.scss";
import { Words } from "./word-data";

const begin = document.querySelector(".start-game");
const clueCard = document.querySelector<HTMLInputElement>(".clue__word");
const clueTrackerMessage = document.querySelector(".clue__tracker-message");
const clueFail = document.querySelector(".clue__fail-message");
const guessInput = document.querySelector<HTMLInputElement>("#input-box");
const submit = document.querySelector<HTMLButtonElement>(".user-guess__submit");

if (
  !begin ||
  !clueCard ||
  !clueTrackerMessage ||
  !clueFail ||
  !guessInput ||
  !submit
) {
  throw new Error("Issue with selector");
}

//The word the user is trying to guess
const random = Words[Math.floor(Math.random() * Words.length)];
let cluesUsed = 1;
submit.disabled = true;

//The function that controls the commencement of the game. Will always start with the first clue in the clues array
const handlStartGame = () => {
  clueCard.innerText = random.clues[0] + "\n";
  clueTrackerMessage.innerHTML = "This is your first clue";
};

const enableSubmit = (event: Event) => {    
    if (event) {
       submit.disabled = false;
  } else {
    submit.disabled = true;
  }
};

//This function handles the next clue showing up on the card, by incrementing the counter and appending that to the card.
const nextClue = () => {
  if (cluesUsed < random.clues.length) {
    clueCard.innerText += `${random.clues[cluesUsed]} \n`;
    cluesUsed++;
    clueFail.innerHTML = "Try again";
    clueTrackerMessage.innerHTML = `You have had ${cluesUsed} out of ${random.clues.length} clues`;
  } else if ((cluesUsed = random.clues.length)) {
    clueFail.innerHTML = "Oh no!, you have run out of clues";
    clueCard.innerText = `The word was: ${random.word}`;
  }
};

//The function that checks the guess of the user against the word. Returns a well done message if guess is correct. Otherwise a try again message if it is not a match
const handleGuessInput = () => {
  const guessWord = guessInput.value.toUpperCase();
  if (guessWord == random.word.toUpperCase()) {
    clueCard.innerText = "Yay! You got it!";
    clueTrackerMessage.innerHTML = `Your clues used: ${cluesUsed}`;
    clueFail.innerHTML = "";
  } else {
    nextClue();
  }
  guessInput.value = "";
};

begin.addEventListener("click", handlStartGame);
guessInput.addEventListener("keypress", enableSubmit);
submit.addEventListener("click", handleGuessInput);

/*
Things to fix:
    - Submit cannot be clicked if the input box is empty 
    - Start button can only be clicked at beginning of game 
    - New button needs to be implemented to generate new random word, but cannot generate word already used
    - 
*/
