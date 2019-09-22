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
var start = {
	loaded: false,
	media: new Image()
};
var theme = {
	loaded: false,
	media: new Audio(),
	type: "audio/mpeg"
}
var baby = {
	name: "Zoosmell Pooplord",
	age: 0,
	smarts: 0,
	speech: 0,
	strength: 0
};
function getMedia(thing, path) {
	thing.media.src = path;
	thing.media.onload = function() {
		thing.loaded = true;
	}
}
getMedia(start, "images/start.png");
getMedia(theme, "theme.mp3");
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
		} else {
			ctx.clearRect(0, 0, screenSize.x, screenSize.y);
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