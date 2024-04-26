const cards = document.querySelectorAll(".memory-card");
let timer;
let seconds = 60;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let pairs = cards.length / 2;
let gets1 = document.querySelector(".s1");

var btn = document.getElementsByTagName("button");
startTimer();
function restart() {
  clearInterval(timer); 
  seconds = 60;
  resetBoard();
 

  (function shuffle() {
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach((card) => card.classList.remove("flip"));
  cards.forEach((card) => card.addEventListener("click", flipCard));

  score = 0;
  gets1.innerText = score;
  document.querySelector(".timer").textContent = seconds;
  document.querySelector(".timer").style.color = "white";

  startTimer(); 
}

function flipCard() {
  if (!lockBoard && this !== firstCard) {
    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
    
    } else {
      hasFlippedCard = false;
      secondCard = this;
      checkForMatch();
    }
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();

    score++;
    gets1.innerText = score;

    if (score === pairs) {
      clearInterval(timer);
      setTimeout(() => {
        alert("Congratulations! You Win the Game!");
        restart();
      }, 500);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

function startTimer() {
  timer = setInterval(() => {
    updateTimer();
  }, 1000);
}

function updateTimer() {
  seconds--;
  document.querySelector(".timer").textContent = seconds;

  if (seconds <= 15) {
    document.querySelector(".timer").style.color = "red";
  }

  if (seconds === 0) {
    clearInterval(timer);
    document.querySelector(".timer").textContent = 0;
    seconds = 60;
    document.querySelector(".timer").style.color = "white";
    setTimeout(() => {
      alert(`Time's up! Your score is ${score}. Please click on restart to play again.`);
      resetBoard();
      restart();
    }, 1000);
  }
}










