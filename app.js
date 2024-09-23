// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const hurry = document.querySelector(".hurry");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const nextBtn = document.querySelector(".next-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const playAgainBtn2 = document.querySelector(".play-again2");

const scoreNumber = document.querySelector(".score__number");
const comp = document.querySelector(".compscore");
const human = document.querySelector(".humanscore");

let score = 0;

// Initialize scores from localStorage
let compscore = localStorage.getItem('compscore') ? parseInt(localStorage.getItem('compscore')) : 0;
let userscore = localStorage.getItem('userscore') ? parseInt(localStorage.getItem('userscore')) : 0;

human.innerText = userscore;
comp.innerText = compscore;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = "YOU WIN </br> AGINST PC";
      resultDivs[0].classList.toggle("winner");
      uScore(1);
      nextBtn.classList.remove("hidden"); // Show the Next button
    } else if (aiWins) {
      resultText.innerHTML = "YOU LOST </br> AGINST PC";
      resultDivs[1].classList.toggle("winner");
      sScore(1);
    } else {
      resultText.innerText = "TIE UP";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function uScore(point) {
  userscore += point;
  human.innerText = userscore;
  localStorage.setItem('userscore', userscore); // Store user score
}

function sScore(point) {
  compscore += point;
  comp.innerText = compscore;
  localStorage.setItem('compscore', compscore); // Store computer score
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  nextBtn.classList.add("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Reset Game
nextBtn.addEventListener("click", () => {
  nextBtn.classList.add("hidden"); // Hide next button
  hurry.classList.toggle("show-modal");
  
  resetGame();
});



function resetGame() {
  gameDiv.classList.remove("hidden");
  resultsDiv.classList.add("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.add("hidden");
  resultsDiv.classList.remove("show-winner");
}

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
