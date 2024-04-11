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
const clueTrackerMessage = document.querySelector(".clue__tracker-message")
const guessInput = document.querySelector<HTMLInputElement>("#input-box");
const submit = document.querySelector(".user-guess__submit");


if(!begin || !clueCard||!clueTrackerMessage|| !guessInput || !submit){
    throw new Error ("Issue with selector")
}

//The word the user is trying to guess
const random = Words[Math.floor(Math.random()*Words.length)];
let cluesUsed = 1;

//The function that controls the commencement of the game. Will always start with the first clue in the clues array
const handlStartGame = () => {
    clueCard.innerText = random.clues[0] + "\n"
}

//This function handles the next clue showing up on the card, by incrementing the counter and appending that to the card. 
const nextClue = () =>{
    if(cluesUsed < random.clues.length){
        clueCard.innerText += `${random.clues[cluesUsed]} \n`
        cluesUsed++
        alert ("Try again")
        clueTrackerMessage.innerHTML = `You have had ${cluesUsed} out of ${random.clues.length} clues`
    }else if(cluesUsed = random.clues.length){
        alert("You have run out of clues")
    }
}


//The function that checks the guess of the user against the word. Returns a well done message if guess is correct. Otherwise a try again message if it is not a match
const handleGuessInput = () => {
    const guessWord = guessInput.value.toUpperCase();
    if(guessWord == random.word.toUpperCase()){
        alert("WELL DONE")
    }else{
        nextClue();
    }
    guessInput.value = "";
}

//variable that contains each clue given, and allows you to input again until you have no clues left 
//start on [0], then user guesses, and clicks submit. If guess is wrong, card shows [0, 1], user can guess again and click sumbit again. if still wrong shows [0, 1, 2,], user can guess again, and click submit. If still wrong return "You are out of clues".


begin.addEventListener("click", handlStartGame);
submit.addEventListener("click", handleGuessInput);

//generates game words randomly
// const random = Words[0].clues[Math.floor(Math.random()*Words.length)]


/*

if(!hasSubmitBeenClicked && guessWord !== random.word){
        clueCard.innerText += random.clues[1]
    }

const guessWord = guessInput.value
    if(guessWord === random.word){
        alert("WELL DONE")
    } else{
        clueCard.innerText = random.clues[0] + "\n"
        for(let i = 1; i < random.clues.length; i++){
            clueCard.innerText += random.clues[i] + "\n";
        }
        alert ("Try again")
    }

    
    const guessWord = guessInput.value
    let cluesUsed = 0
    for(let i=1; i < random.clues.length; i++)
    {
        if(guessWord !== random.word)
        {
            cluesUsed++
            clueCard.innerHTML += cluesUsed
        } else {
            alert("WELL DONE")
        }
    }
 */

    // const nextClue = () => {
    //     clueCard.innerHTML = random.clues[0]
    //     const hasSubmitBeenClicked = false
    //     if(!hasSubmitBeenClicked){
    //         console.log(random.clues.splice(0,1)); 
    //         console.log(random.clues.splice(0,1));
    //         console.log(random.clues.splice(0,1));
    //         console.log(random.clues.splice(0,1));
    //         console.log(random.clues.splice(0,1));
    //         console.log(random.clues.splice(0,1));
    //     }
    // }

    // nextClue();


