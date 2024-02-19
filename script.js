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

let activeLane = 0

window.addEventListener("keydown", function(e){

  if (e.key === "ArrowLeft"){
    if (activeLane === 0){
//Additional Goal: Selector loops around the lane
      activeLane = 0
    }else{
    playarea.forEach((laneEntry) =>{
      laneEntry.classList.remove("active")
    }); 
    activeLane --
    playarea[activeLane].classList.add("active")
  }
  } else if (e.key ==="ArrowRight"){
    if (activeLane === 2){
      activeLane = 2
    }else{
      playarea.forEach((laneEntry) =>{
        laneEntry.classList.remove("active")
      });
      activeLane ++;
      playarea[activeLane].classList.add("active");
      }
  return}
});

// function moveMe(e) {

  // for (entry of playarea) {
    // if (e.key === "KeyLeft"){
    //   console.log("LEFT")
    // }
//   }
//   ;
// }


function randomLane() {
  return Math.ceil(Math.random() * 9);
}

function dropBoxOnly() {
  fallArray[1].classList.add("fallingAnimation");
  //   fallArray[randomLane() - 1].classList.add("fallingAnimation");
  //   setTimeout(function () {
  //     AnimRemoval();
  //   }, 1000);
}

// setTimeout(() => {
//   fallArray[randomLane() - 1].classList.remove("fallingAnimation");
// }, 1000);

function detectOverlapping() {} // code that detects if the box overlaps with a moving box
const box2 = document.querySelector(".box2")


function gameStart() {
  delay(500);
  setInterval(collisionDetect(box2), 500);
  setInterval(dropBoxOnly,200);
  console.log("GameStart!")
}
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", gameStart);


function gameLose() {
  const dropBox = setInterval(dropBoxOnly, 200);
  clearInterval(dropBox)
  alert("You lose");
}

const stopBtn = document.querySelector("#stop");
stopBtn.addEventListener("click", gameLose)

//the kill line is at y = 557px, bottom  = 582px
//p1 top left = 348 (width 104) p2 top left = 448px p3 top left = 548px

function collisionDetect(droppingBox) {
  let box = droppingBox.getBoundingClientRect()
  console.log("I'm checking") 
  if (box.y === 557 && droppingBox.classList.contains("active")) {
    gameLose();
  }
}
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