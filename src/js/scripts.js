/* eslint-disable max-len */
const btn = document.querySelector('#btn');
const container = document.querySelector('.container');
const color = document.querySelector('.heading-color__color');

const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

btn.addEventListener('click', () => {
    const hexColor = generateHex();
    container.style.backgroundColor = hexColor;
    color.textContent = hexColor;
});

// eslint-disable-next-line require-jsdoc
function generateHex() {
    let generateColor = '#';

    for (let i = 0; i < 6; i++) {
        generateColor += hex[getRandomInt(hex.length)];
    }

    return generateColor;
}

// eslint-disable-next-line require-jsdoc
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
