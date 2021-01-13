// Canvas
let canvas = document.getElementById("game");
let gameSize = {
	x: 1920,
	y: 1280
};
canvas.width = gameSize.x;
canvas.height = gameSize.y;
let canvasContext = canvas.getContext("2d");
canvasContext.imageSmoothingEnabled = false;