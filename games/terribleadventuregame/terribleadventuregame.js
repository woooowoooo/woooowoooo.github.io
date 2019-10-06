//Initialization
const canvas = document.getElementById("game");
var screenSize = {
	x: 960,
	y: 640
};
canvas.width = screenSize.x;
canvas.height = screenSize.y;
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
function getMedia(thing, path, audio) {
	thing.loaded = false;
	if (audio) {
		thing.media = new Audio();
		thing.type = "audio/mpeg";
	} else {
		thing.media = new Image();
	}
	thing.media.src = path;
	thing.media.onload = function() {
		thing.loaded = true;
	}
}
var start = {};
getMedia(start, "images/start.png", false);
var theme = {};
getMedia(theme, "sounds/theme.mp3", true);
var baby = {
	name: "Zoosmell Pooplord",
	age: 0,
	smarts: 0,
	speech: 0,
	strength: 0
};
//Noting input
var keysPressed = {};
var clicked = false;
var mousePos = {
	x: 0,
	y: 0
};
function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = event.clientX - rect.left;
    mousePos.y = event.clientY - rect.top;
}
addEventListener("keydown", function(e) {
	keysPressed[e.code] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysPressed[e.code];
}, false);
addEventListener("mousedown", function(e) {
	clicked = true;
	getMousePos(canvas, e);
}, false);
addEventListener("mouseup", function(e) {
	clicked = false;
}, false);
//Handling input
var handle = function() {
	
}
//Pausing
var paused = false;
var pPressed = false;
var pause = function() {
	if ("KeyP" in keysPressed && !pPressed) {
		paused = !paused;
		if (paused) {
			ctx.beginPath();
			ctx.rect(0, 0, screenSize.x, screenSize.y);
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fill();
			ctx.font = "60px sans-serif";
			ctx.textAlign = "center";
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.fillText("PAUSED", screenSize.x / 2, screenSize.y / 4);
			theme.media.pause();
		} else {
			ctx.clearRect(0, 0, screenSize.x, screenSize.y);
			theme.media.play();
		}
		pPressed = true;
	} else if (!("KeyP" in keysPressed)) {
		pPressed = false;
	}
}
//Rendering items
var render = function() {
	if (start.loaded) {
		ctx.drawImage(start.media, 0, 0, screenSize.x, screenSize.y);
	}
	if (theme.loaded) {
		theme.media.play();
	}
}
//Game loop
var game = function() {
	if (!paused) {
		handle();
		render();
	}
	pause();
	requestAnimationFrame(game);
}
game();