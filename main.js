const playerpara = document.querySelector(".player-info");
const button = document.querySelector(".newgamebtn");
const boxes = document.querySelectorAll(".box");
const buttonImg = document.querySelector(".btn-div>img");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";

    // to remove green color
    box.classList = `box box${index + 1}`;
  });
  button.classList.remove("active");
  buttonImg.classList.remove("active");
  playerpara.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapPlayerTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  playerpara.innerText = `Current Player - ${currentPlayer}`;
}



function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // check who is winner
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    playerpara.innerText = `winner is - ${answer}`;
    button.classList.add("active");
    buttonImg.classList.add("active");
    return;
  }

  //  tie or not
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  if (fillCount === 9) {
    playerpara.innerText = "Game Tied";
    button.classList.add("active");
  }
}

function handleClicks(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapPlayerTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClicks(index);
  });
});

button.addEventListener("click", initGame);
