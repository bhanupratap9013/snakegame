//game constants
let foodSound = new Audio("../music/food.mp3");
let gameOverSound = new Audio("../music/gameover.mp3");
let moveSound = new Audio("../music/move.mp3");
let musicSound = new Audio("../music/music.mp3");
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:13}
]
let food = {x:15,y:15}
let foodBoundLX = 10;
let foodBoundLY = 10;
let foodBoundUX = 15;
let foodBoundUY = 15;
let inputDir = {x: 0, y: 0}; 
let score = 0;

function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime-lastPaintTime)/1000<1/speed){
        return;
    }   
    lastPaintTime = currentTime;
    console.log("Frame Updated");
    gameEngine();
}

function isCollide(snakeArr){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
        return true;
    }

    return false;
}

function gameEngine(){
    //play game music
    musicSound.play();
    //check if the snakes collided
    
    if(isCollide(snakeArr)){
        score = 0;
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        return;
    }

    //update the snake array and eat food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        score++;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+inputDir.y});
        food = {x: Math.floor(Math.random() *(foodBoundUX-foodBoundLX+1))+foodBoundLX, y: Math.floor(Math.random() *(foodBoundUY-foodBoundLY+1))+foodBoundLY};
    }
    console.log(snakeArr.length);
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    console.log("Before DIsplay");
    console.log(snakeArr.length);
    //display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    document.getElementsByClassName("top-right")[0].innerHTML = "Score: "+score;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    moveSound.play();
    let snakeLength = snakeArr.length;
    // Determine the new direction based on the key pressed
    let newDir = {x: 0, y: 0};
    switch (e.key) {
        case "ArrowUp":
            newDir.x = 0;
            newDir.y = -1;
            break;

        case "ArrowDown":
            newDir.x = 0;
            newDir.y = 1;
            break;

        case "ArrowLeft":
            newDir.x = -1;
            newDir.y = 0;
            break;

        case "ArrowRight":
            newDir.x = 1;
            newDir.y = 0;
            break;
        default:
            return; // Exit if the key is not recognized
    }

    // If snake length is 1, it can move in any direction
    if (snakeLength === 1) {
        inputDir = newDir;
    } else {
        console.log("Else RUn");
        // If snake length is greater than 1, ensure it does not move in the opposite direction
        if (newDir.x !== -inputDir.x || newDir.y !== -inputDir.y) {
            inputDir = newDir;
        }
    }
});
