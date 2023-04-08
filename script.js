const gameArea = document.querySelector('.main');
const blockWidth = 100;
const blockHeight = 20;




gameArea.addEventListener('click', () => {
    console.log('123')
})


function createBlocks () {
    const block = document.createElement('div');
    block.className = 'block';
    block.style.left = '100px';
    block.style.top = '50px';
    gameArea.appendChild(block);
}


createBlocks();


