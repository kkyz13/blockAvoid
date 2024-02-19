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
  });
});

const laneArray = document.querySelectorAll(".lane"); // grabs the lanes as an array
const playAreaArray = document.querySelectorAll(".playarea"); //grabs the playAreaArray bottom selector as an array
let activeLaneIdx = 0;

//CONTROLLER//
window.addEventListener("keydown", moveMe);
function moveMe(e) {
  if (e.key === "ArrowLeft") {
    if (activeLaneIdx === 0) {
      //Additional Goal: Selector loops around the lane
      activeLaneIdx = 0;
    } else {
      playAreaArray.forEach((laneEntry) => {
        laneEntry.classList.remove("active");
      });
      activeLaneIdx--;
      playAreaArray[activeLaneIdx].classList.add("active");
      laneActiver();
    }
  } else if (e.key === "ArrowRight") {
    if (activeLaneIdx === 2) {
      activeLaneIdx = 2;
    } else {
      playAreaArray.forEach((laneEntry) => {
        laneEntry.classList.remove("active");
      });
      activeLaneIdx++;
      playAreaArray[activeLaneIdx].classList.add("active");
      laneActiver();
    }
    return;
  }
}

function laneActive() {
  laneArray.forEach((lane) => {
    lane.classList.remove("laneactive");
  });
  laneArray[activeLaneIdx].classList.add("laneactive");
}
function laneActiver() {
  //adds the activer for aiding collision detection
  laneActive();
  fallArray.forEach((laneEntry) => {
    laneEntry.classList.remove("activer");
  });
  for (let j = activeLaneIdx; j <= fallArray.length - 1; ) {
    fallArray[j].classList.add("activer");
    j += 3;
  }
}

laneActiver();
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

function gameStart() {
  delay(500);
  setInterval(collisionDetect, 1);
  setInterval(dropBoxOnly, 200);
  console.log("GameStart!");
}
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", gameStart);

function gameLose() {
  //can't seem to get this to work
  const dropBox = setInterval(dropBoxOnly, 200);
  clearInterval(dropBox);
  console.log("You lose");
}

const stopBtn = document.querySelector("#stop");
stopBtn.addEventListener("click", gameLose);

//the kill line is at y = 557px, bottom  = 582px
//xpos p1 top left = 348 (width 104) p2 top left = 448px p3 top left = 548px

function collisionDetect() {
  fallArray.forEach((box) => {
    boxCollisionDetect(box);
  });
}
function boxCollisionDetect(droppingBox) {
  let box = droppingBox.getBoundingClientRect();

  // console.log(droppingBox.classList)
  if (box.y > 555 && box.y < 570 && droppingBox.classList.contains("activer")) {
    console.log("COLLISION");
    laneArray[activeLaneIdx].classList.add("collision");
  }
}
const box2 = document.querySelector(".box2");
// boxCollisionDetect(box2)
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
