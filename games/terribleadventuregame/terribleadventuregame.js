//Variables
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
	keysPressed[e.key] = true;
	console.log("The \"" + e.key + "\" key was pressed.");
});
addEventListener("keyup", function(e) {
	delete keysPressed[e.key];
	console.log("The \"" + e.key + "\" key was released.");
});
addEventListener("mousedown", function(e) {
	clicked = true;
	getMousePos(canvas, e);
	console.log("The mouse was clicked on " + mousePos.x + ", " + mousePos.y + ".");
});
addEventListener("mouseup", function(e) {
	clicked = false;
	console.log("The mouse was released.");
});
//Handling input
function handle() {
	
}
//Pausing
var paused = false;
var pPressed = false;
function pause() {
	if (("p" in keysPressed || "P" in keysPressed) && !pPressed) {
		paused = !paused;
		if (paused) {
			ctx.beginPath();
			ctx.rect(0, 0, screenSize.x, screenSize.y);
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fill();
			ctx.font = "120px Century Gothic, Apple Gothic, AppleGothic, sans-serif";
			ctx.textAlign = "center";
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.fillText("PAUSED", screenSize.x / 2, screenSize.y / 2);
			theme.media.pause();
		} else {
			ctx.clearRect(0, 0, screenSize.x, screenSize.y);
			theme.media.play();
		}
		pPressed = true;
	} else if (!("p" in keysPressed || "P" in keysPressed)) {
		pPressed = false;
	}
}
//Start menu
function drawStart() {
	if (start.loaded) {
		ctx.drawImage(start.media, 0, 0, screenSize.x, screenSize.y);
	}
	if (theme.loaded) {
		theme.media.play();
	}
}
//Rendering other items
function render() {
	
}
//Game loop
function game() {
	if (!paused) {
		handle();
		drawStart();
		render();
	}
	pause();
	requestAnimationFrame(game);
}
//Start menu
function initialize() {
	drawStart();
	requestAnimationFrame(game);
}
initialize();