let gridParent = document.querySelector('.game-container')
let gridChildren = document.querySelectorAll('.game-container div');
let colorStat = 0;
let highlightStat = 0;


function generateRandomNum(end) {
    // Generates a random whole number from 0 to end

    return Math.floor(Math.random() * Math.floor(end + 1));
}


function generateRandomColor() {
    return `rgb(${generateRandomNum(255)}, ${generateRandomNum(255)}, ${generateRandomNum(255)})`;
}


function createGridChildren(num) {
    updateChildren();

    for (let i=0; i<num*num; i++) {        
        gridParent.appendChild(document.createElement('div'));
    }

    console.info(`createGridChildren() created ${num*num} grid children`);
    
}


function updateChildren() {

    gridChildren = document.querySelectorAll('.game-container div');
    
    console.info(`updateChildren() updated ${gridChildren.length} children`);
}


function removeGridChildren() {
    updateChildren();

    for (let i=0; i<gridChildren.length; i++) {
        gridParent.removeChild(gridChildren[i]);
    }

    console.info(`removeGridChildren() removed ${gridChildren.length} children`);
}


function resizeGridChildren(num) {
    updateChildren();

    for (let i=0; i<gridChildren.length; i++) {
         
        gridChildren[i].style.width = `calc(60vw / ${num})`;
        gridChildren[i].style.height = `calc(65vh / ${num})`;
    }
    console.info(`resizeGridChildren resized ${gridChildren.length}`);
}


function colorWhenHover(colorFlag) {

    if (colorFlag === 0) {
        gridParent.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'black';
        })
        
        console.info('black color mode activated');
    }

    else if (colorFlag === 1) {
        gridParent.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = generateRandomColor();
        })

        console.info('color mode activated')
    }
}


function highlightWhenHover(highlightFlag) {
    let targetColor;
    let x=0.1;
    let rgbString = "rgba" + "(0,0,0," + x + ')';
    let splitRgb;
     

    if (highlightFlag) {
        
        gridParent.addEventListener('mouseover', (e) => {
            targetColor = getComputedStyle(e.target).backgroundColor;    

            if (targetColor === 'rgb(217, 184, 150)') {
                e.target.style.backgroundColor = rgbString;

                console.info(`color:${targetColor}`);
            }
            else {
                if (targetColor[11] < 1) {
                    x = targetColor[11] * 10;
                    x += 1;
                    x = x / 10;
                    e.target.style.backgroundColor = rgbString;
                }
            }
        });
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


function highlightButtonPressed() {
    ++highlightStat;

    if (highlightStat % 2 === 0) {
        highlightWhenHover(0);
    }

    else if (highlightStat % 2 === 1) {
        highlightWhenHover(1);
    }
}


function getSizeFromUser() {
    let userWanted;

    userWanted = prompt('Grid size? (width=height, enter either)', '');

    if (!(userWanted)) {

        alert('Illegal number. Try again.'); 
        return 0;
    } 

    else {
        console.info(`getSizeFromUser() got the size ${Number(userWanted)}`);
        return Number(userWanted);
    }
}


function cleanGrid() {
    updateChildren();

    for (let i=0; i<gridChildren.length; i++) {
        gridChildren[i].style.backgroundColor = 'hsl(30, 47%, 72%)';
    }
    console.info(`cleanGrid() resetted the colors of the grid`);
}


function changeGridSize() {
    updateChildren();
    
    let userWants = getSizeFromUser();

    removeGridChildren();
    console.info(`changeGridSize() removed all children`);

    createGridChildren(userWants);
    console.info(`changeGridSize() created ${userWants*userWants} children`);

    resizeGridChildren(userWants);
    console.info(`changeGridSize() resized ${userWants*userWants} children`);
}


function main() {
    createGridChildren(20);
    resizeGridChildren(20);

    console.info(`main() initialized the game with 400 grid children`);
}

main();