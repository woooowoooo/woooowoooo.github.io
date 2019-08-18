//Initialization
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
function getImage(loaded, name, path) {
	var loaded = false;
	var name = Image();
	name.onload = function() {
		loaded = true;
	}
	name.src = path;
}
getImage(bgLoaded, background, "images/background.png");
getImage(babyLoaded, baby, "images/baby.png");
getImage(cribLoaded, crib, "images/crib.png");
var baby = {
	name: "You shouldn't see this",
	age: 0,
	smarts: 0,
	strength: 0
};
//Noting input
var keysPressed = {};
var mouse = {
	clicked: false,
	x: 1,
	y: 0
};
addEventListener("keydown", function(e) {
	keysPressed[e.keycode] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysPressed[e.keycode];
}, false);
addEventListener("mousedown", function(e) {
	mouse.clicked = true;
}, false);
addEventListener("mouseup", function(e) {
	mouse.clicked = false;
}, false);
//Handling input
//Game loop