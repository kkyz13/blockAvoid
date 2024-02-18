function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
function randomLane(){
    return Math.ceil(Math.random()*9);
}
function dropBox(){
    const fallTrigger = document.querySelectorAll(".fallbox");
    fallTrigger[randomLane()-1].classList.add("fallingAnimation");

    setTimeout(() =>{

    fallTrigger[randomLane()-1].classList.remove("fallingAnimation");
    },1000)
}

function gameStart(){
    setInterval(dropBox, 200);
}

gameStart()
