/*
PSUDOCODE

When start is clicked then page will generate a random word from Words with one clue.
User then tyoes into input box, if input.texcontent matches with the random word, YAY message is displayed with the correct word.
    However if the word input by the user does NOT match, BooHoo message appears and user can input guess again or clcik "another clue" that will generate the next clue word in the array 
        If there are no more words in the arrary to display and user still has not guessed correctly, then display "Oh No" message with "skip word" button
*/

import "./styles.scss";
import { Words } from "./word-data";

const begin = document.querySelector<HTMLButtonElement>(".start-game");
const nextWord = document.querySelector<HTMLButtonElement>(".next-word")
const clueCard = document.querySelector<HTMLInputElement>(".clue__word");
const clueTrackerMessage = document.querySelector(".clue__tracker-message");
const clueFail = document.querySelector(".clue__fail-message");
const userGuessContainer = document.querySelector<HTMLElement>(".user-guess");
const guessInput = document.querySelector<HTMLInputElement>("#input-box");
const submit = document.querySelector<HTMLButtonElement>(".user-guess__submit");

if (
  !begin ||
  !nextWord ||
  !clueCard ||
  !clueTrackerMessage ||
  !clueFail ||
  !userGuessContainer ||
  !guessInput ||
  !submit
) {
  throw new Error("Issue with selector");
}

//All my variables
const copyWords = [...Words]
const usedWords : string[] = [];
let theRandomWord: { word: string; clues: string[];}; //declaring variable but no value assigned (so I don't have to call the function outside)
let cluesUsed : number;
submit.disabled = true;
userGuessContainer.style.display = "none";
nextWord.style.display = "none"

//create function that gets the random word 
const getRandomWord = () => {
    const numberOfWord = Math.floor(Math.random()* copyWords.length);
    const randomWord = copyWords[numberOfWord]
    const currentWord = copyWords.indexOf(randomWord);
    copyWords.splice(currentWord, 1)
    
    if(copyWords.length == 0){
        clueCard.innerText = "Well done, you have guessed all the words";
        clueTrackerMessage.innerHTML = "";

    }else{
        clueCard.innerText = randomWord.clues[0] + "\n";
        clueTrackerMessage.innerHTML = "This is your first clue";

    }

    usedWords.push(randomWord.word)
    theRandomWord = randomWord //assign value to theRandomWord so I can use in the rest of my code 
    cluesUsed = 1
}


//The function that controls the commencement of the game. 
const handlStartGame = () => {
    getRandomWord()
    userGuessContainer.style.display = "block"
    begin.style.display = "none";
    nextWord.style.display = "block";
};


const enableSubmit = () => {         
    if(guessInput.value !== ""){
       submit.disabled = false;
    } else {
    submit.disabled = true;
    }
};

//This function handles the next clue showing up on the card, by incrementing the counter and appending that to the card.
const nextClue = () => {
    if (cluesUsed < theRandomWord.clues.length) {
        clueCard.innerText += `${theRandomWord.clues[cluesUsed]} \n`;
        cluesUsed++;
        clueFail.innerHTML = "Try again";
        clueTrackerMessage.innerHTML = `You have had ${cluesUsed} out of ${theRandomWord.clues.length} clues`;
    } else if ((cluesUsed = theRandomWord.clues.length)) {
        clueFail.innerHTML = "Oh no!, you have run out of clues";
        clueCard.innerText = `The word was: ${theRandomWord.word}`;
        //next word enable
    }
};

//The function that checks the guess of the user against the word. Returns a well done message if guess is correct. Otherwise a try again message if it is not a match
const handleGuessInput = () => {
    const guessWord = guessInput.value.toUpperCase();
    if (guessWord == theRandomWord.word.toUpperCase()) {
        clueCard.innerText = `Yay! You got it!`
        clueTrackerMessage.innerHTML = `Your clues used: ${cluesUsed}`;
        clueFail.innerHTML = "";
    } else {
        nextClue();
    }
    guessInput.value = "";
    submit.disabled = true;
};

const handleNextWord = (event: Event) => {
    console.log(event);
    console.log(theRandomWord.word);
    
    clueCard.innerText = theRandomWord.clues[0] + "\n"   

    // if(usedWords.includes(theRandomWord.word)){
    //     return null
    // }
}

begin.addEventListener("click", handlStartGame);
nextWord.addEventListener("click", getRandomWord);
guessInput.addEventListener("keyup", enableSubmit);
submit.addEventListener("click", handleGuessInput);

/*
Things to fix:
    - New button needs to be implemented to generate new random word, but cannot generate word already used
    

const getRandomWord = () => {
    const numberOfWord = Math.floor(Math.random()* Words.length);
    const randomWord = Words[numberOfWord]
    if(usedWords.includes(randomWord.word)){
        console.log(`${randomWord.word} has been used`); 
    }else{
        console.log(`This is the new word: ${randomWord.word}`);
    }
    console.log(usedWords);
    usedWords.push(randomWord.word)
}

*/
