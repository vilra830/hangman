import { getRandomWord } from "./modules/math.js";
import { createEl, removeEl } from "./modules/dom.js";
const userInputSection = document.getElementById("user-input-section");
const wordLength = document.getElementById("word-length");

const newGameButton = document.getElementById("new-game-button");
const newGameContainer = document.getElementById("new-game");
const keyboard = document.getElementById("keyboard");
const resultText = document.getElementById("result-text");
const hangmanImage = document.getElementById("starting_img");

let randWord = "";
let correctLetters = 0;
let wrongLetters = 0;

const keyboardKeys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

/**This function resets the screen, empties the divs like keyboard, userInputSection,
 * intializes wrongLetters and correct Letters back to zero
 * shows full image of hangman
 * New Game button is displayed to prompt user to play again
 */

const reset = () => {
  newGameButton.style.display = "block";
  userInputSection.innerText = "";
  wordLength.innerHTML = "";
  keyboard.innerHTML = "";
  correctLetters = 0;
  wrongLetters = 0;
};

/**
 * When new game button is clicked, it calls the startGame function.
 * start games calls the getRandomWord function to generate a word , createEl function to generate the letter buttons inside the keyboard DIV, wrongCountImage function to
 * generate images corresponding to the number of wrongLetters clicked.
 *
 */
const startGame = () => {
  resultText.innerHTML = "";
  newGameButton.style.display = "none";
  let randWords = getRandomWord().toUpperCase();
  let displayItem = randWords.replace(/./g, '<span class="dashes">_</span>');
  wordLength.innerHTML = `<p> The word has ${randWords.length} letters <p>`;
  userInputSection.innerHTML = displayItem;
  console.log(randWords);
  console.log(randWords.length);
  hangmanImage.src = "././img/h-4.jpg";

  for (let i = 0; i < keyboardKeys.length; i++) {
    const button = document.createElement("button");
    createEl(button, keyboardKeys[i], keyboard, "class", "letters");
    button.addEventListener("click", () => {
      let randWord = randWords.split("");
      console.log(randWord);
      let dashes = document.getElementsByClassName("dashes");
      if (randWord.includes(button.innerText)) {
        randWord.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerHTML = char;
            correctLetters += 1;
            if (correctLetters === randWord.length) {
              hangmanImage.src = "././img/h-11.jpg";
              resultText.innerHTML = `<h2>You guessed it right!!!</h2 class="winner"</h2><p class="winner">The word was <span>${randWord.join(
                ""
              )}</span>.</p>`;

              reset();
            }
          }
        });
      } else {
        wrongLetters += 1;
        wrongCountimage(wrongLetters);
        if (wrongLetters === 6) {
          hangmanImage.src = "././img/h-10.jpg";
          resultText.innerHTML = `<h2 class="lost"> You lose</h2><p  class="lost">The word was <span>${randWord.join(
            ""
          )}</span>.</p>`;
          reset();
        }
      }
      button.disabled = true;
    });
  }
};

//A function that throws new image that correponds to the number of wrong letters
const wrongCountimage = (wrongLetters) => {
  switch (wrongLetters) {
    case 1:
      hangmanImage.src = "././img/h-5.jpg";
      break;
    case 2:
      hangmanImage.src = "././img/h-6.jpg";
      break;
    case 3:
      hangmanImage.src = "././img/h-7.jpg";
      break;
    case 4:
      hangmanImage.src = "././img/h-8.jpg";
      break;
    case 5:
      hangmanImage.src = "././img/h-9.jpg";
      break;
    case 6:
      hangmanImage.src = "././img/h-10.jpg";
      break;
    default:
      break;
  }
};

// New Game button is clicked to start the game - calls the startGame function
newGameButton.addEventListener("click", startGame);
