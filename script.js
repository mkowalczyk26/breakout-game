const gameArea = document.querySelector('.main');
const blockWidth = 100;
const blockHeight = 20;

const userStartPosition = [230, 20];
let currentPosition = userStartPosition;

const ballStartPosition = [270, 60];
let currentBallPosition = ballStartPosition;

let timer;
let ballX = 2;
let ballY = 2;


gameArea.addEventListener('click', () => {
    console.log('123')
})

class Block {
    constructor(x, y) {
        this.topLeft = [x, y + blockHeight];
        this.topRight = [x + blockWidth, y + blockHeight];
        this.bottomLeft = [x, y];
        this.bottomRight = [x + blockWidth, y];
    }
}

const blocks = [
    new Block(10, 350),
    new Block(120, 350),
    new Block(230, 350),
    new Block(340, 350),
    new Block(450, 350),
    new Block(10, 320),
    new Block(120, 320),
    new Block(230, 320),
    new Block(340, 320),
    new Block(450, 320),
    new Block(10, 290),
    new Block(120, 290),
    new Block(230, 290),
    new Block(340, 290),
    new Block(450, 290),
]
console.log(blocks[0]);

function createBlocks() {
    for (let i = 0; i < blocks.length; i += 1) {
        const block = document.createElement('div');
        block.className = 'block';
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        gameArea.appendChild(block);
    }
}

createBlocks();

const platform = document.createElement('div');
platform.className = 'block';
platform.style.backgroundColor = 'blue';
updateUser();
gameArea.appendChild(platform);

function updateUser() {
    platform.style.left = currentPosition[0] + 'px';
    platform.style.bottom = currentPosition[1] + 'px';
}


function movePlatrom(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0)
            currentPosition[0] -= 10;
            updateUser();
            break;
        case 'ArrowRight':
            if (currentPosition[0] < 560 - blockWidth)
            currentPosition[0] += 10;
            updateUser();
            break;
    }
}


document.addEventListener('keydown', movePlatrom);


function updateBall() {
    ball.style.left = currentBallPosition[0] + 'px';
    ball.style.bottom = currentBallPosition[1] + 'px';
}


const ball = document.createElement('div');
ball.className = 'ball';
updateBall();
gameArea.appendChild(ball);

function moveBall() {
    checkBallCollisions();
    currentBallPosition[0] += ballX;
    currentBallPosition[1] += ballY;
    updateBall();
}

timer = setInterval(moveBall, 20);

function checkBallCollisions() {
    if (currentBallPosition[0] >= 560 - 20) {
        ballX = -2;
    }

    if (currentBallPosition[1] >= 400 - 20) {
        ballY = -2;
    }

    if (currentBallPosition[0] == 0) {
        ballX = 2;
    }

    if (currentBallPosition[1] == 0) {
        ballY = 2;
    }


}


