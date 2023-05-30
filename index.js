const gamebord = document.querySelector('#gamebord');
const ctx = gamebord.getContext('2d');
const scoretext = document.querySelector('#scoretext');
const resetbtn = document.querySelector('#resetbtn');
const gameWidth = gamebord.width;
const gameHeight = gamebord.height;
const boardBackground = 'white';
const snakeColor = "orange";
const snakeBorder = "black";
const foodColor = 'green';
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener('keydown', changeDirection);
resetbtn.addEventListener('click', resetGame);

gameStart()


//declare func

function gameStart(){
    running = true;
    scoretext.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    }
    else{displayGameOver()}
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize)
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                y: snake[0].y + yVelocity};

    snake.unshift(head);  
    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoretext.textContent = score;
        createFood()
    }
    else{
        snake.pop()
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed)
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUP = (yVelocity == -unitSize);
    const goingDOWN = (yVelocity == unitSize);
    const goingRIGHT = (xVelocity == unitSize);
    const goingLEFT = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRIGHT):
            xVelocity = -unitSize;
            yVelocity = 0
            break;

        case(keyPressed == UP && !goingDOWN):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLEFT):
            xVelocity = unitSize;
            yVelocity = 0
            break;  
        case(keyPressed == DOWN && !goingUP):
            xVelocity = 0;
            yVelocity = unitSize
            break;    
    }  
}
function checkGameOver(){
    switch(true){
    case(snake[0].x < 0):
        running = false;
        break;
    case(snake[0].x >= gameWidth):
        running = false;
        break;
    case(snake[0].y < 0):
        running = false;
        break;
    case(snake[0].y >= gameHeight):
        running = false;
        break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    
};
}
function displayGameOver(){
    ctx.font = '50px MV Boli';
    ctx.fillStyle = 'black';
    ctx.textAligh = 'center';
    ctx.fillText('GAME OVER', gameWidth / 5 , gameHeight / 2);
    running = false
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
    
};