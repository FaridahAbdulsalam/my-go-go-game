/*
PSUDOCODE

When start is clicked then page will generate a random word from Words with one clue.
User then tyoes into input box, if input.texcontent matches with the random word, YAY message is displayed with the correct word.
    However if the word input by the user does NOT match, BooHoo message appears and user can input guess again or clcik "another clue" that will generate the next clue word in the array 
        If there are no more words in the arrary to display and user still has not guessed correctly, then display "Oh No" message with "skip word" button
*/

import { Words } from "./word-data";

const begin = document.querySelector(".start-game");
const clueCard = document.querySelector<HTMLInputElement>(".clue__word");


if(!begin || !clueCard){
    throw new Error ("Issue with selector")
}

const handlStartGame = () => {
    const random = Words[Math.floor(Math.random()*Words.length)]
    clueCard.innerText = random.clues[0]
}

begin.addEventListener("click", handlStartGame);


//generates game words randomly
// const random = Words[0].clues[Math.floor(Math.random()*Words.length)]




