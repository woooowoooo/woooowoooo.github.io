//Variables
var canvas = document.getElementById("game");
var screenSize = {
	x: 960,
	y: 640
};
canvas.width = screenSize.x;
canvas.height = screenSize.y;
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
var person = {
	name: "Zoosmell Pooplord",
	age: 15,
	brains: 80,
	brawn: 30,
	beauty: 40,
};
//Loading assets
var cache = {};
function loadResources(images, sounds, callback) {
	var successes = 0;
	console.log("Images has length " + images.length + ".");
	console.log("Sounds has length " + sounds.length + ".");
	var success = function() {
		successes ++;
		console.log(this.src + " has loaded; total " + successes + " successes.");
		if (successes == images.length + sounds.length) {
			callback();
		}
	};
	for (var i = 0; i < images.length; i++) {
		var path = images[i];
		cache[path] = document.createElement("img");
		cache[path].addEventListener("load", success, false);
		cache[path].src = "images/" + path + ".png";
		console.log("Image " + path + " cached.");
	}
	for (var j = 0; j < sounds.length; j++) {
		var path = sounds[j];
		cache[path] = document.createElement("audio");
		cache[path].addEventListener("canplaythrough", success, false);
		cache[path].src = "sounds/" + path + ".mp3";
		console.log("Sound " + path + " cached.");
	}
}
var images = ["start"];
var sounds = ["goldbergAria"];
//Noting input
var keysPressed = {};
var clicked = false;
var mousePos = {
	x: 0,
	y: 0
};
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
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
var pausedAudio = {};
function pause() {
	if (("p" in keysPressed || "P" in keysPressed) && !pPressed) {
		paused = !paused;
		console.log("Pause state (paused) is now " + paused);
		pPressed = true;
		if (paused) {
			ctx.beginPath();
			ctx.rect(0, 0, screenSize.x, screenSize.y);
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fill();
			ctx.font = "120px Century Gothic, Apple Gothic, AppleGothic, sans-serif";
			ctx.textAlign = "center";
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.fillText("PAUSED", screenSize.x / 2, screenSize.y / 2);
			for (var i = 0; i < sounds.length; i++) {
				if (!cache[sounds[i]].paused) {
					cache[sounds[i]].pause();
					pausedAudio[i] = true;
					console.log("PausedAudio[" + i + "] is now " + pausedAudio[i] + ".");
				}
			}
		} else {
			ctx.clearRect(0, 0, screenSize.x, screenSize.y);
			for (var i = 0; i < sounds.length; i++) {
				console.log("PausedAudio[" + i + "] is: " + pausedAudio[i] + ", and if true will become false.");
				if (pausedAudio[i]) {
					cache[sounds[i]].play();
					pausedAudio[i] = false;
				}
			}
		}
	} else if (!("p" in keysPressed || "P" in keysPressed)) {
		pPressed = false;
	}
}
//Rendering other items
function render() {
	ctx.drawImage(cache.start, 0, 0, screenSize.x, screenSize.y);
}
//Game loop
function game() {
	if (!paused) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		handle();
		render();
	}
	pause();
	//To test sound and pausing sound
	if ("t" in keysPressed) {
		cache.goldbergAria.play();
	}
	requestAnimationFrame(game);
}
//Start menu
function startGame() {
	console.log(cache.start);
	console.log("0, 0 to " + screenSize.x + ", " + screenSize.y);
	ctx.drawImage(cache.start, 0, 0, screenSize.x, screenSize.y);
	game();
}
loadResources(images, sounds, startGame);