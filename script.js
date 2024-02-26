const fallArray = document.querySelectorAll(".fallbox"); //this is to grab all fallbox inside HTML
const laneArray = document.querySelectorAll(".lane"); // grabs the lanes as an array
const playAreaArray = document.querySelectorAll(".playarea"); //grabs the playAreaArray bottom selector as an array
let activeLaneIdx = 0;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let fallSpeed = 1;
let gameRunning = false;

//on page load, grab highscore and print it//
highScoreCounter();
//------------------------------------------//

// function delay(milliseconds) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, milliseconds);
//   });
// }

fallArray.forEach((boxEntry) => {
  //this adds animationend to all the .fallbox, the fallingAnimation CSS property would only be removed when the box fully falls
  boxEntry.addEventListener("animationend", () => {
    boxEntry.classList.remove("fallingAnimation");
    score++;
  });
});

//CONTROLLER//
window.addEventListener("keydown", moveMe);
function moveMe(e) {
  if (e.code === "Space" && gameRunning === false) {
    gameStart();
  }
  if (e.key === "ArrowLeft") {
    if (activeLaneIdx === 0) {
      activeLaneIdx = 3;
    }
    playAreaArray.forEach((laneEntry) => {
      laneEntry.classList.remove("playactive");
      laneEntry.innerHTML = `&nbsp;`;
    });
    activeLaneIdx--;
    playAreaArray[activeLaneIdx].classList.add("playactive");
    playAreaArray[activeLaneIdx].innerHTML = "&#9650;";
    boxActiver();
  } else if (e.key === "ArrowRight") {
    if (activeLaneIdx === 2) {
      activeLaneIdx = -1;
    }
    playAreaArray.forEach((laneEntry) => {
      laneEntry.classList.remove("playactive");
      laneEntry.innerHTML = `&nbsp;`;
    });
    activeLaneIdx++;
    playAreaArray[activeLaneIdx].classList.add("playactive");
    playAreaArray[activeLaneIdx].innerHTML = "&#9650;";
    boxActiver();
  } else if (e.key === "q") {
    activeLaneIdx = 0;
    playAreaArray.forEach((laneEntry) => {
      laneEntry.classList.remove("playactive");
      laneEntry.innerHTML = `&nbsp;`;
    });
    playAreaArray[activeLaneIdx].classList.add("playactive");
    playAreaArray[activeLaneIdx].innerHTML = "&#9650;";
    boxActiver();
  } else if (e.key === "w") {
    activeLaneIdx = 1;
    playAreaArray.forEach((laneEntry) => {
      laneEntry.classList.remove("playactive");
      laneEntry.innerHTML = `&nbsp;`;
    });
    playAreaArray[activeLaneIdx].classList.add("playactive");
    playAreaArray[activeLaneIdx].innerHTML = "&#9650;";
    boxActiver();
  } else if (e.key === "e") {
    activeLaneIdx = 2;
    playAreaArray.forEach((laneEntry) => {
      laneEntry.classList.remove("playactive");
      laneEntry.innerHTML = `&nbsp;`;
    });
    playAreaArray[activeLaneIdx].classList.add("playactive");
    playAreaArray[activeLaneIdx].innerHTML = "&#9650;";
    boxActiver();
  }
}

function laneActive() {
  //colors the lane
  laneArray.forEach((lane) => {
    lane.classList.remove("laneactive");
  });
  laneArray[activeLaneIdx].classList.add("laneactive");
}
function boxActiver() {
  //adds an "eventlistener" .boxactive for aiding collision detection
  laneActive();
  fallArray.forEach((laneEntry) => {
    laneEntry.classList.remove("boxactive");
  });
  for (let j = activeLaneIdx; j <= fallArray.length - 1; ) {
    fallArray[j].classList.add("boxactive");
    j += 3;
  }
}

function randomLane() {
  return Math.ceil(Math.random() * 9);
}

function speedUp() {
  for (boxEntry of fallArray) {
    boxEntry.style.animationDuration = `${fallSpeed}s`;
  }
  fallSpeed -= 0.05;
}
function dropBoxOnly() {
  //animates the box falling
  fallArray[randomLane() - 1].classList.add("fallingAnimation");
}

function laneText() {}
function gameStart() {
  gameRunning = true;
  score = 0;
  messageBoxOut();
  boxActiver();
  startBtn.classList.add("inactive");
  startBtn.removeEventListener("click", gameStart);
  let clearLaneCollision = document.querySelectorAll(".collision");
  for (entry of clearLaneCollision) {
    entry.classList.remove("collision", "collisioned");
  }

  setInterval(collisionDetect, 1);
  setInterval(scoreCounter, 200);
  startSpeed = setInterval(speedUp, 2000);
  startDropbox = setInterval(dropBoxOnly, 200);
}
const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", gameStart);

function gameLose() {
  fallArray.forEach((laneEntry) => {
    laneEntry.classList.remove("fallingAnimation", "boxactive");
    laneEntry.removeAttribute("style");
  });
  clearInterval(startDropbox);
  clearInterval(startSpeed);
  fallSpeed = 1;
  console.log("You lose");

  highScoreCounter();
  //prevents the player from mashing the button to start the game
  setTimeout(() => {
    startBtn.addEventListener("click", gameStart);
    startBtn.classList.remove("inactive");
    gameRunning = false;
  }, 750);
}

function messageBoxIn() {
  message = document.querySelector(".message");
  message.style.visibility = "visible";
  message.classList.add("messagein");
}

function messageBoxOut() {
  message = document.querySelector(".message");
  message.classList.remove("messagein");
  message.classList.add("messageout");
  setTimeout(() => {
    message.classList.remove("messagein", "messageout");
    message.style.visibility = "hidden";
  }, 500);
}
//////////////////Collision Detection Logic/////////////////////////////

function collisionDetect() {
  fallArray.forEach((box) => {
    boxCollisionDetect(box, getPlayAreaY());
  });
}
function boxCollisionDetect(droppingBox, colliderArea) {
  let box = droppingBox.getBoundingClientRect();
  if (
    box.y > colliderArea[0] + box.height / 3 && //the y values are slightly modified to make the game feel more fair
    box.y < colliderArea[1] - box.height / 4 && //our eyes perceives movement but reaches our brain slightly later
    droppingBox.classList.contains("boxactive")
  ) {
    gameLose();
    laneArray[activeLaneIdx].classList.add("collision");
    setTimeout(function () {
      const collided = document.querySelector(".collision");
      collided.classList.add("collisioned");
    }, 500);
    messageBoxIn();
  }
}
function getPlayAreaY() {
  //returns an array
  let playArea = document.querySelector(".playarea");
  let boxDimension = playArea.getBoundingClientRect();
  let yTop = boxDimension.y - boxDimension.height;
  let yBottom = boxDimension.y + boxDimension.height;
  return [yTop, yBottom];
}

//Score and Highscore Logic//
function scoreCounter() {
  scoreWriter = document.querySelector("#score");
  scoreWriter.innerText = score;
}

function highScoreCounter() {
  if (score > highscore) {
    highscore = score;
  }
  localStorage.setItem("highscore", highscore);
  highscorePrinter = document.querySelector("#highscore");
  highscorePrinter.innerText = "";
  highscorePrinter.innerText = localStorage.getItem("highscore");
}

//highscore clear logic//
function attachHighscoreClick() {
  //don't variable shadow with your functions
  highscoreClick = document.querySelector(".highscorecontainer");
  highscoreClick.addEventListener("click", highscoreClearConfirm);
}

function highscoreClearConfirm() {
  confirmationPrinter = document.querySelector(".highscorecontainer");
  div = document.createElement("div");
  div.classList.add("clearconfirm");
  confirmationPrinter.parentNode.insertBefore(
    div,
    confirmationPrinter.nextSibling
  );
  confirmationText = document.querySelector(".clearconfirm");
  highscoreClick.removeEventListener("click", highscoreClearConfirm);
  confirmationText.innerText = "Click this to reset highscore";
  confirmationText.addEventListener("click", clearHighscore);
}

function clearHighscore() {
  localStorage.clear();
  localStorage.setItem("highscore", 0);
  highscorePrinter.innerText = "0";
  highscore = 0;
  highScoreCounter;
  removeConfirmBox = document.querySelector(".clearconfirm");
  removeConfirmBox.remove();
  attachHighscoreClick();
}

attachHighscoreClick();

function instructionsHider() {
  instructionBox = document.querySelector(".instructionsbox");
  if (instructionBox.innerText != "Instructions") {
    instructionBox.classList.add("instructionboxscale");
    instructionBox.innerText = "Instructions";
  } else {
    instructionBox.innerHTML =
      "<b>Avoid</b> the falling blocks! Use your arrow keys to switch lanes!";
  }
}

let instructionBox = document
  .querySelector(".instructionsbox")
  .addEventListener("click", instructionsHider);
let easterEgg3d = document
  .querySelector(".title")
  .addEventListener("click", threeDfy);

function threeDfy() {
  document.querySelector(".gamegrid").classList.toggle("gamegrid3d");
}
//DEBUGGER ------------
// const box1 = document.querySelector(".playarea");
// let rect = box1.getBoundingClientRect();
// for (const key in rect) {
//   if (typeof rect[key] !== "function") {
//     let para = document.createElement("p");
//     para.textContent = `${key} : ${rect[key]}`;
//     document.body.appendChild(para);
//   }
// }
//DEBUGGER -----------
