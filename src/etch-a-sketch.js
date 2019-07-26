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


function randomColor(e) {
    e.target.style.backgroundColor = generateRandomColor();
}


function blackColor(e) {
    e.target.style.backgroundColor = 'black';
}


function highlightColor(e) {
    let targetColor = getComputedStyle(e.target).backgroundColor;
    let rgbaInit = 'rgba(0,0,0,0.2)';

    if (targetColor === 'rgb(217, 184, 150)') {

        e.target.style.backgroundColor = rgbaInit;
    }

    else {
        e.target.style.backgroundColor = modifyRgbaString(targetColor);
    }
}


function colorWhenHover(colorFlag) {

    if (colorFlag === 0) {
        gridParent.addEventListener('mouseover', blackColor);
    }
    
    else if (colorFlag === 1) {
        gridParent.addEventListener('mouseover', randomColor);
    }

    else if (colorFlag === 2) {
        gridParent.addEventListener('mouseover', highlightColor);
    }

    else console.warn('colorWhenHover got an illegal colorFlag');
}


function modifyRgbaString(rgbaString) {
    let rgbaPattern = /(rgba)(\(.,\s?.,\s?.,\s?)(.*)(\))/g;
    let searchResult = rgbaPattern.exec(rgbaString);

    if (searchResult !== null) {
        // Break the string into its groups and record them

        let rgba = searchResult[1];
        let rgbColorPart = searchResult[2];
        let alpha = searchResult[3];
        let finalParantheses = searchResult[4];
        let finalString = '';

        if (alpha < 1) {
            // Overcoming float arithmetic precision problem(s)
            alpha = (10*alpha + 2) / 10;
        }
        // Stitch the string back together
        finalString = rgba + rgbColorPart + alpha + finalParantheses;
        return finalString;
    }
    
    else return 'rgb(0,0,0)';
}


function colorButtonPressed() {
    removeAllMouseoverListeners();
    ++colorStat;

    if (colorStat % 2 === 0) {

        colorWhenHover(0);
    }

    else if (colorStat % 2 === 1) {

        colorWhenHover(1);
    }
    
}


function removeAllMouseoverListeners() {
    gridParent.removeEventListener('mouseover', blackColor);
    gridParent.removeEventListener('mouseover', randomColor);
    gridParent.removeEventListener('mouseover', highlightColor);
}


function highlightButtonPressed() {
    removeAllMouseoverListeners();
    ++highlightStat;

    if (highlightStat % 2 === 0) {
        removeAllMouseoverListeners();
        colorWhenHover(0);
        console.info('highlight deactivated');
    }

    else if (highlightStat % 2 === 1) {
        colorWhenHover(2);
        console.info('highlight activated');
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

    colorWhenHover(0);
}

main();