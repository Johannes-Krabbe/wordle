let parent = document.querySelector("#parent");

const rowLength = 6;
const letterLenght = 5;

const rowElements = [];
const letterElements = [];

const words = ["crate", "react", "pzazz"];
const correctWord = "abaca";
//words[Math.floor(Math.random() * words.length)];

for (let i = 0; i < rowLength; i++) {
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  let tmp = [];
  for (let i = 0; i < letterLenght; i++) {
    let p = document.createElement("div");
    p.setAttribute("class", "letter");
    p.style.backgroundColor = "lightgrey";
    // p.textContent = "!";

    row.appendChild(p);
    tmp.push(p);
  }
  parent.appendChild(row);
  letterElements.push(tmp);
  rowElements.push(row);
}

let currentRow = 0;
let currentLetter = 0;

// get user keyboard input
document.addEventListener("keydown", (event) => {
  // get the key that was pressed
  const keyName = event.key;
  // if key is backspace, delete the letter
  if (keyName === "Backspace") {
    // move to the previous letter
    if (currentLetter !== 0) {
      currentLetter--;
    }
    letterElements[currentRow][currentLetter].textContent = "";
    return;
  }

  // if key is not a letter, ignore it
  if (!keyName.match(/^[a-z]$/i)) {
    return;
  }

  const letterElement = letterElements[currentRow][currentLetter];
  letterElement.textContent = keyName;
  // move to the next letter
  currentLetter++;
  if (letterLenght === currentLetter) {
    checkWord();
  }
});

function checkWord() {
  const letters = letterElements[currentRow];
  const input = letters.map((letter) => letter.textContent).join("");

  const tmpCorrectWord = correctWord.split("");

  for (let i = 0; i < letterLenght; i++) {
    if (letters[i].textContent === correctWord[i]) {
      letters[i].style.backgroundColor = "green";
      tmpCorrectWord[i] = "0";
    }
  }

  for (let i = 0; i < letterLenght; i++) {
    if (letters[i].style.backgroundColor === "lightgrey") {
      if (tmpCorrectWord.includes(letters[i].textContent)) {
        letters[i].style.backgroundColor = "orange";
        tmpCorrectWord[tmpCorrectWord.indexOf(letters[i].textContent)] = "0";
      }
    }
  }

  for (let i = 0; i < letterLenght; i++) {
    if (letters[i].style.backgroundColor === "lightgrey") {
      letters[i].style.backgroundColor = "grey";
    }
  }

  if (input !== correctWord) {
    currentRow++;
    currentLetter = 0;
  }
}
