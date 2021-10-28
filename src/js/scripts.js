/* eslint-disable require-jsdoc */
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

// -

const colorBlock = document.getElementById('color-block');
const ctx1 = colorBlock.getContext('2d');
const width1 = colorBlock.width;
const height1 = colorBlock.height;

const colorStrip = document.getElementById('color-strip');
const ctx2 = colorStrip.getContext('2d');
const width2 = colorStrip.width;
const height2 = colorStrip.height;

const colorLabel = document.getElementById('color-label');

let x = 0;
let y = 0;
let drag = false;
let rgbaColor = 'rgba(255,0,0,1)';
let hexColor = '#FFFFFF';

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
const grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

// eslint-disable-next-line require-jsdoc
function click(e) {
    x = e.offsetX;
    y = e.offsetY;
    const imageData = ctx2.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    fillGradient();
}

// eslint-disable-next-line require-jsdoc
function fillGradient() {
    ctx1.fillStyle = rgbaColor;
    ctx1.fillRect(0, 0, width1, height1);

    const grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width1, height1);

    const grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width1, height1);
}

// eslint-disable-next-line require-jsdoc
function mousedown(e) {
    drag = true;
    changeColor(e);
}

// eslint-disable-next-line require-jsdoc
function mousemove(e) {
    if (drag) {
        changeColor(e);
    }
}

// eslint-disable-next-line require-jsdoc
function mouseup(e) {
    drag = false;
}

// eslint-disable-next-line require-jsdoc
function changeColor(e) {
    x = e.offsetX;
    y = e.offsetY;
    const imageData = ctx1.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';

    hexColor = rgbToHex(imageData[0], imageData[1], imageData[2]);
    color.textContent = hexColor;
    container.style.backgroundColor = hexColor;

    colorLabel.style.backgroundColor = rgbaColor;
}

colorStrip.addEventListener('click', click, false);
colorBlock.addEventListener('mousedown', mousedown, false);
colorBlock.addEventListener('mouseup', mouseup, false);
colorBlock.addEventListener('mousemove', mousemove, false);

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
