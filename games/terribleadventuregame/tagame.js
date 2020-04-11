//Canvas
var canvas = document.getElementById("game");
var screenSize = {
	x: 960,
	y: 640
};
canvas.width = screenSize.x;
canvas.height = screenSize.y;
console.log("Canvas dimensions are " + screenSize.x + " by " + screenSize.y + ".");
var canvasContext = canvas.getContext("2d");
canvasContext.imageSmoothingEnabled = false;
//Loading assets
var cache = {};
function loadResources(images, sounds, callback) {
	var successes = 0;
	console.log("Images has length " + images.length + " and sounds has length " + sounds.length + ".");
	var initialize = function(type, eventType, folder, path, extension) {
		cache[path] = document.createElement(type);
		cache[path].addEventListener(eventType, success, false);
		cache[path].src = folder + path + extension;
	};
	var success = function() {
		successes ++;
		console.log(this.tagName + " " + this.src.split("/")[this.src.split("/").length - 1] + " has loaded; total " + successes + " successes.");
		if (successes == images.length + sounds.length) {
			callback();
		}
	};
	for (var i = 0; i < images.length; i++) {
		initialize("img", "load", "images/", images[i], ".png");
	}
	for (var j = 0; j < sounds.length; j++) {
		initialize("audio", "canplaythrough", "sounds/", sounds[j], ".mp3");
	}
}
var images = ["start"];
var sounds = ["goldbergAria", "burp"];
//Noting input
var keysPressed = {};
var clicked = false;
var mousePosition = {
	x: 0,
	y: 0
};
function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;
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
	getMousePosition(canvas, e);
	console.log("The mouse was clicked on " + mousePosition.x + ", " + mousePosition.y + ".");
});
addEventListener("mouseup", function(e) {
	clicked = false;
	console.log("The mouse was released.");
});
//Dunno
var person = {
	name: "Zoosmell Pooplord",
	age: 15,
	brains: 80,
	brawn: 30,
	beauty: 40,
};
//State machine
var stateMachine = new StateMachine({
	init: "booting",
	transitions: [
		{name: "ready", from: "booting", to: "menu"},
		{name: "pause", from: "menu", to: "paused"},
		{name: "unpause", from: "paused", to: "menu"},
	],
	methods: {
		onTransition: function(lifecycle) {
			console.log("----- " + lifecycle.transition);
		},
		onReady: function() {
			console.log(cache);
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.drawImage(cache.start, 0, 0, screenSize.x, screenSize.y);
			loop();
		},
		onPause: function() {
			canvasContext.rect(0, 0, screenSize.x, screenSize.y);
			canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
			canvasContext.fill();
			canvasContext.font = "120px Century Gothic, Apple Gothic, AppleGothic, sans-serif";
			canvasContext.textAlign = "center";
			canvasContext.fillStyle = "rgba(255, 255, 255, 1)";
			canvasContext.fillText("PAUSED", screenSize.x / 2, screenSize.y / 2);
			for (var i = 0; i < sounds.length; i++) {
				if (!cache[sounds[i]].paused) {
					cache[sounds[i]].pause();
					pausedAudio[i] = true;
					console.log("PausedAudio[" + i + "], " + sounds[i] + ", is now true.");
				}
			}
		},
		onUnpause: function() {
			canvasContext.clearRect(0, 0, screenSize.x, screenSize.y);
			for (var i = 0; i < sounds.length; i++) {
				if (pausedAudio[i]) {
					cache[sounds[i]].play();
					pausedAudio[i] = false;
					console.log("PausedAudio[" + i + "], " + sounds[i] + ", is now false.");
				}
			}
		}
	}
});
//Game loop
function loop() {
	pause();
	if (!stateMachine.is("paused")) {
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		handle();
		render();
	}
	requestAnimationFrame(loop);
}
//Checking for pause/unpause
var pPressed = false;
var pausedAudio = {};
function pause() {
	if (("p" in keysPressed || "P" in keysPressed) && !pPressed) {
		pPressed = true;
		if (!stateMachine.is("paused")) {
			stateMachine.pause();
		} else {
			stateMachine.unpause();
		}
	}
	else if (!("p" in keysPressed || "P" in keysPressed)) {
		pPressed = false;
	}
}
//Rendering other items
function render() {
	canvasContext.drawImage(cache.start, 0, 0, screenSize.x, screenSize.y);
}
//Handling input
function handle() {
	if ("t" in keysPressed) {
		cache.goldbergAria.play();
	}
	if ("b" in keysPressed) {
		cache.burp.play();
	}
}
//Start menu
function startGame() {
	stateMachine.ready();
}
loadResources(images, sounds, startGame);