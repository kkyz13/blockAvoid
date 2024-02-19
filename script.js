function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const fallArray = document.querySelectorAll(".fallbox"); //this is to grab all fallbox inside HTML
fallArray.forEach((boxEntry) => {
  //this adds animationend to all the .fallbox
  boxEntry.addEventListener("animationend", () => {
    boxEntry.classList.remove("fallingAnimation");
    console.log("removed");
  });
});

const playarea = document.querySelectorAll(".playarea"); //grabs the lanes as an array
const laneActive = document.querySelector(".active"); //grabs the active lane, can only have one active
window.addEventListener("keydown", moveMe);
function moveMe(e) {
  for (entry of playarea) {
  }
  console.log(e);
}
moveMe();
//DEBUGGER ------------
// const box1 = document.querySelector(".p3");
// let rect = box1.getBoundingClientRect();
// for (const key in rect) {
//   if (typeof rect[key] !== "function") {
//     let para = document.createElement("p");
//     para.textContent = `${key} : ${rect[key]}`;
//     document.body.appendChild(para);
//   }
// }
//DEBUGGER -----------
function randomLane() {
  return Math.ceil(Math.random() * 9);
}

function dropBoxOnly() {
  fallArray[randomLane() - 1].classList.add("fallingAnimation");
  //   fallArray[randomLane() - 1].classList.add("fallingAnimation");
  //   setTimeout(function () {
  //     AnimRemoval();
  //   }, 1000);
}

// setTimeout(() => {
//   fallArray[randomLane() - 1].classList.remove("fallingAnimation");
// }, 1000);

function detectOverlapping() {} // code that detects if the box overlaps with a moving box
function gameStart() {
  delay(500);
  setInterval(detectOverlapping, 25);
  setInterval(dropBoxOnly, 200);
}
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", gameStart);

function gameLose() {
  alert("You lose");
}
//the kill line is at y = 557px, bottom  = 582px
//p1 top left = 348 (width 104) p2 top left = 448px p3 top left = 548px

function collisionDetect(box) {
  if (box.y === 557 && lane.classList.contains("active")) {
    gameGame();
  }
}
