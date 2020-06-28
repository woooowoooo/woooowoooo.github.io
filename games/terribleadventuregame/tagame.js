//Canvas
let canvas = document.getElementById("game");
let screenSize = {
	x: 960,
	y: 640
};
canvas.width = screenSize.x;
canvas.height = screenSize.y;
console.log("Canvas dimensions are " + screenSize.x + " by " + screenSize.y + ".");
let canvasContext = canvas.getContext("2d");
canvasContext.imageSmoothingEnabled = false;
//Loading assets
let cache = {};
function loadResources(images, sounds) {
	let successes = 0;
	console.log("Images has length " + images.length + " and sounds has length " + sounds.length + ".");
	let initialize = function(type, eventType, folder, path, extension) {
		cache[path] = document.createElement(type);
		cache[path].addEventListener(eventType, success, false);
		cache[path].src = folder + path + extension;
	};
	let success = function() {
		successes ++;
		console.log(this.tagName + " " + this.src.split("/")[this.src.split("/").length - 1] + " has loaded; total " + successes + " successes.");
		if (successes == images.length + sounds.length) {
			stateMachine.ready();
		}
	};
	for (let i = 0; i < images.length; i++) {
		initialize("img", "load", "images/", images[i], ".png");
	}
	for (let j = 0; j < sounds.length; j++) {
		initialize("audio", "canplaythrough", "sounds/", sounds[j], ".mp3");
	}
}
const images = ["start"];
const sounds = ["goldbergAria", "burp"];
//Noting input
let keysPressed = {};
let clicked = false;
let mousePosition = {
	x: 0,
	y: 0
};
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
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
let person = {
	name: "Zoosmell Pooplord",
	age: 15,
	brains: 80,
	brawn: 30,
	beauty: 40,
};
//State machine
let stateMachine = new StateMachine({
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
		onBooting: function() {
			canvasContext.rect(0, 0, screenSize.x, screenSize.y);
			canvasContext.fillStyle = "rgb(0, 0, 0)";
			canvasContext.fill();
			canvasContext.font = "120px Century Gothic, Apple Gothic, AppleGothic, sans-serif";
			canvasContext.textAlign = "center";
			canvasContext.fillStyle = "rgb(255, 255, 255)";
			canvasContext.fillText("LOADING", screenSize.x / 2, screenSize.y / 2);
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
			canvasContext.fillStyle = "rgb(255, 255, 255)";
			canvasContext.fillText("PAUSED", screenSize.x / 2, screenSize.y / 2);
			for (let i = 0; i < sounds.length; i++) {
				if (!cache[sounds[i]].paused) {
					cache[sounds[i]].pause();
					pausedAudio[i] = true;
					console.log("PausedAudio[" + i + "], " + sounds[i] + ", is now true.");
				}
			}
		},
		onUnpause: function() {
			canvasContext.clearRect(0, 0, screenSize.x, screenSize.y);
			for (let i = 0; i < sounds.length; i++) {
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
let pPressed = false;
let pausedAudio = {};
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
//Handling input
function handle() {
	if ("t" in keysPressed) {
		cache.goldbergAria.play();
	}
	if ("b" in keysPressed) {
		cache.burp.play();
	}
}
//Rendering other items
function render() {
	canvasContext.drawImage(cache.start, 0, 0, screenSize.x, screenSize.y);
}
//Start menu
loadResources(images, sounds);