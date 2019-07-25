let gridParent = document.querySelector('.game-container')
let gridChildren = document.querySelectorAll('.game-container div');
let colorStat = 0;


function generateRandomNum(end) {
    // Generates a random whole number from 0 to end

    return Math.floor(Math.random() * Math.floor(end + 1));
}


function generateRandomColor() {
    return `rgb(${generateRandomNum(255)}, ${generateRandomNum(255)}, ${generateRandomNum(255)})`;
}


function createGridChildren(num) {

    for (let i=0; i<num*num; i++) {        
        gridParent.appendChild(document.createElement('div'));
    }

    console.info(`${num*num} divs created`);
    
}


function updateChildren() {
    gridChildren = document.querySelectorAll('.game-container div');
    console.info(`children refreshed, ${gridChildren.length} children`);
}


function removeGridChildren() {
    updateChildren();

    for (let i=0; i<gridChildren.length; i++) {
        gridParent.removeChild(gridChildren[i]);
    }

    console.info(`${gridChildren.length} divs removed`);
}


function resizeGridChildren(num) {
    updateChildren();

    for (let i=0; i<gridChildren.length; i++) {
         
        gridChildren[i].style.width = `calc(60vw / ${num})`;
        gridChildren[i].style.height = `calc(65vh / ${num})`;
    }
    console.info('resize complete');
}


function colorWhenHover(colorCode) {

    if (colorCode === 0) {
        gridParent.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'black';
        })    
    }

    else if (colorCode === 1) {
        gridParent.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = generateRandomColor();
        })
    }
}


function colorButtonPressed() {
    ++colorStat;

    if (colorStat % 2 === 0) {
        colorWhenHover(0);
    }

    else if (colorStat % 2 === 1) {
        colorWhenHover(1);
    }
    
}


function getSizeFromUser() {
    let userWanted;

    userWanted = prompt('Grid size? (width=height, enter either)', '');

    if (!(userWanted)) alert('Illegal number. Try again.');
    else {
        return Number(userWanted);
    }
    return -1;
}


function resetGrid() {
    updateChildren();

    for (let i=0; i<gridChildren.length; i++) {
        gridChildren[i].style.backgroundColor = 'hsl(30, 47%, 72%)';
    }
}


function changeGridSize() {
    updateChildren();
    
    let userWants = getSizeFromUser();

    removeGridChildren();
    createGridChildren(userWants);
    resizeGridChildren(userWants);
}


function main() {
    createGridChildren(20);
    resizeGridChildren(20);

    colorWhenHover(0);
}

main();