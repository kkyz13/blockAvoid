# blockAvoid 
 A Game by Kenneth Koh
 
## For General Assembly SEI-49

 It's like a rhythm game but in reverse. **AVOID** the blocks with your arrow keys. 
 
<img src="https://github.com/kkyz13/blockAvoid/assets/155720573/375b0bfd-d571-4962-81e7-a4aac7b6ebd1" alt="Gamescreen" width="500px">


## Technologies:

 Written in good ol' HTML, CSS and Javascript. This should work on most modern browsers. 

## How to Play

![Instructions](https://github.com/kkyz13/blockAvoid/assets/155720573/9894f65d-61da-4227-9ef2-2fbacdc8f88e)



 **Use the arrow keys** (← or →) to change the lane being selected. There are extra features not obvious on the front but I try to make it as intuitive as possible:
- Spacebar starts the game so you don't have to use your mouse
- Lane selection can be quickly changed by using the Q, W or E keys.
- You can clear the highscore by clicking on it, then clicking on the confirmation box that appears
- There is 1 easter egg somewhere on the page

## Next Steps

- ability to dismiss highscore reset confirmation box
- Invert collision logic and it is almost a rhythm game
- I wanted to add a 'all lane' obstacle requiring spacebar to hop over the obstacle, but the game ends too quickly and is hard enough as it is; which leads to...
- Difficulty settings: so people can choose a slower speed

## Reference

- [Idea of using getBoundingClientRect() for collision detection](https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements)
- [A lot of reading about CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations#using_animation_events)
- [General Idea of using setInterval() to poll collision detection](https://stackoverflow.com/questions/4230029/jquery-javascript-collision-detection)
- [The easter egg inspiration](https://stackoverflow.com/questions/19970081/adding-depth-to-a-2d-rotated-element)
- [A lot of the fancy animation is referencing this curve for how it enters into the page](https://cubic-bezier.com/#.17,.67,.83,.67)
