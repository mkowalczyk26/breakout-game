const score = document.querySelector('.score');
const speedBtn = document.querySelector('.speed-btn');

const blockWidth = 100;
const blockHeight = 20;

let currentScore = 0
score.innerHTML = currentScore;

let game = false;

let counter = 3;

let timer;
let ballX = 2;
let ballY = 2;

let startingSpeed = 20;
gameSpeed = startingSpeed;

speedBtn.innerText = '1X';

let bodyBg;
let blocksBg;
//document.body.style.backgroundColor = 'rgb(' + rgb + ')';


function newGame() {    
    game = true;
    const gameArea = document.querySelector('.main');

    const userStartPosition = [230, 20];
    let currentPosition = userStartPosition;

    const ballStartPosition = [270, 60];
    let currentBallPosition = ballStartPosition;

    function generateColors() {
        bodyBg = [randomInteger(150), randomInteger(150), randomInteger(150)];
        blocksBg = [bodyBg[0]/2, bodyBg[1]/2, bodyBg[2]/2];
        console.log(bodyBg) 
    }
    generateColors();

    document.body.style.backgroundColor = 'rgb(' + bodyBg + ')';


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
    //console.log(blocks[0]);
    
    function randomInteger(x) {
        return Math.floor(Math.random()*(x + 1));
    }


    function createBlocks() {
        for (let i = 0; i < blocks.length; i += 1) {
            const block = document.createElement('div');
            block.className = 'block';
            block.style.left = blocks[i].bottomLeft[0] + 'px';
            block.style.bottom = blocks[i].bottomLeft[1] + 'px';
            block.style.backgroundColor = 'rgb(' + blocksBg + ')';
            gameArea.appendChild(block);
        }
    }
    
    createBlocks();
    
    const platform = document.createElement('div');
    platform.className = 'block';
    platform.style.backgroundColor = 'rgb(' + blocksBg + ')';
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
    
    timer = setInterval(moveBall, gameSpeed);
    
    speedBtn.addEventListener('click', speedFunction = () => {
        if (game) {
            if(gameSpeed == 20) {
                clearInterval(timer)
                gameSpeed = 15;
                speedBtn.innerText = '2X';
                timer = setInterval(moveBall, gameSpeed);
            } else if (gameSpeed == 15){
                clearInterval(timer)
                gameSpeed = 10;
                speedBtn.innerText = '3X';
                timer = setInterval(moveBall, gameSpeed)
            } else {
                clearInterval(timer)
                gameSpeed = 20;
                speedBtn.innerText = '1X';
                timer = setInterval(moveBall, gameSpeed)
            }
        }
    })
    

    function checkBallCollisions() {
        if (
            currentBallPosition[0] >= 560 - 20 ||
            currentBallPosition[1] >= 400 - 20 ||
            currentBallPosition[0] == 0
            ) {
                wallCollision();
    
        } else {
            userCollision()
        }
    
        if (currentBallPosition[1] <= 0) {      //ball hit bottom border
            clearInterval(timer);
            game = false;
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerText = 'You Lost'
            modal.appendChild(document.createElement('button'));
            modal.querySelector('button').className = 'newGameBtn';
            const newGameBtn = modal.querySelector('.newGameBtn');
            newGameBtn.innerText = 'New Game';
            document.body.appendChild(modal);
            document.querySelector('.container').style.filter = 'blur(3px)';
    
            newGameBtn.addEventListener('click', () => {
                //console.log(userStartPosition)
                modal.remove();
                document.querySelector('.container').style.filter = 'none';
                gameArea.remove()
                //resetValues();
                const main = document.createElement('div')
                main.className = 'main';
                document.querySelector('.container').appendChild(main);
                currentScore = 0;
                score.innerHTML = currentScore;
                countdown = setInterval(counting, 1000);
                //newGame();
            })
    
        }
    
        for (let i = 0; i < blocks.length; i += 1) {
            if (
                currentBallPosition[0] >= blocks[i].bottomLeft[0] - 20 &&
                currentBallPosition[0] <= blocks[i].bottomRight[0] + 20 &&
                currentBallPosition[1] >= blocks[i].bottomLeft[1] - 20 && 
                currentBallPosition[1] <= blocks[i].topLeft[1] + 20
            ) {
                const allBlocks = document.querySelectorAll('.block');
                //console.log(allBlocks)
                allBlocks[i].classList.remove('block')
                blocks.splice(i,1)
                changeBallDirection()
                currentScore += 1;
                score.innerHTML = currentScore;
            }
            
        }
        if (blocks.length == 0) {
            clearInterval(timer);
            

            game = false;
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerText = 'You Win'
            modal.appendChild(document.createElement('button'));
            modal.querySelector('button').className = 'newGameBtn';
            const newGameBtn = modal.querySelector('.newGameBtn');
            newGameBtn.innerText = 'Next Level';
            document.body.appendChild(modal);
            document.querySelector('.container').style.filter = 'blur(3px)';
    
            newGameBtn.addEventListener('click', () => {
                //console.log(userStartPosition)
                modal.remove();
                document.querySelector('.container').style.filter = 'none';
                gameArea.remove()
                //resetValues();
                const main = document.createElement('div')
                main.className = 'main';
                document.querySelector('.container').appendChild(main);
                
                score.innerHTML = currentScore;
                countdown = setInterval(counting, 1000);
                //newGame();
            })

        }
    
    }
    function counting() {
        if (counter > 0) {
            if(document.querySelector('.counter'))
                document.querySelector('.counter').remove()

            //console.log(counter);
            const modal = document.createElement('div');
            modal.className = 'counter';
            modal.innerText = counter;
            document.body.appendChild(modal);
            counter -= 1;
        }else if (counter == 0) {
            document.querySelector('.counter').remove();
            speedBtn.removeEventListener('click', speedFunction);
            newGame();
            clearInterval(countdown);
            game = true
            counter = 3;
        }
    }

    function changeBallDirection() {
        if (ballX == 2 && ballY == 2) {
            ballY = -2
            return
        }
        if (ballX == -2 && ballY == 2) {
            ballY = -2
            return
        } 
        if (ballX == -2 && ballY == -2) {
            ballY = 2;
            return
        }
        if (ballX == 2 && ballY == -2) {
            ballX = -2
            return
        }
    
    }
    
    function wallCollision() {
        if (ballX == 2 && ballY == 2 && currentBallPosition[0] >= 560-20) {
            ballX = -2
            return
        }
        if (ballX == 2 && ballY == 2 && currentBallPosition[1] >= 400-20) {
            ballY = -2
            return
        }
        if (ballX == -2 && ballY == 2 && currentBallPosition[0] <= 0) {
            ballX = 2
            return
        } 
        if (ballX == -2 && ballY == 2 && currentBallPosition[1] >= 400-20) {
            ballY = -2
            return
        } 
        if (ballX == -2 && ballY == -2 && currentBallPosition[0] <= 0) {
            ballX = 2;
            return
        }
        if (ballX == -2 && ballY == -2 && currentBallPosition[1] <= 0) {
            ballY = 2;
            return
        }
        if (ballX == 2 && ballY == -2) {
            ballX = -2
            return
        }
    }
    
    function userCollision() {
        if(ballX == 2 && ballY == -2 && (currentBallPosition[0] >= currentPosition[0] && currentBallPosition[0] <= currentPosition[0] + 100 && currentBallPosition[1] <= currentPosition[1] + 20)){
            ballY = 2
            return
        }
        if(ballX == -2 && ballY == -2 && (currentBallPosition[0] >= currentPosition[0] && currentBallPosition[0] <= currentPosition[0] + 100 && currentBallPosition[1] <= currentPosition[1] + 20)){
            ballY = 2
            return
        }
    }
}

newGame()

