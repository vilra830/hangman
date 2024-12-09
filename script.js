import { getRandomWord } from "./modules/math.js";
import { createEl, removeEl } from "./modules/dom.js";
const userInputSection = document.getElementById("user-input-section");
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

const reset = () => {
  newGameButton.style.display = "block";
  userInputSection.innerText = "";
  keyboard.innerHTML = "";
  hangmanImage.src = "././img/h-10.jpg";
  correctLetters = 0;
  wrongLetters = 0;
};

//when new game is clicked
const startGame = () => {
  resultText.innerHTML = "";
  newGameButton.style.display = "none";
  let randWords = getRandomWord().toUpperCase();
  let displayItem = randWords.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = `<p> The word has ${displayItem.length} letters <p>`;
  userInputSection.innerHTML = displayItem;
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
              resultText.innerHTML = `<h2>You guessed it right!!!</h2 class="winner"><p class="winner">The word was <span>${randWord.join(
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

//image that correponds to the number of wrong letters
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

//newgame
newGameButton.addEventListener("click", startGame);
