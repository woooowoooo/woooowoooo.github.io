var theRoot = document.documentElement.style;
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", changeTheme);
};
function changeTheme() {
	var buttonColor = window.getComputedStyle(event.target);
	var color1 = buttonColor.getPropertyValue("--1color");
	var color2 = buttonColor.getPropertyValue("--2color");
	var color3 = buttonColor.getPropertyValue("--3color");
	var color4 = buttonColor.getPropertyValue("--4color");
	theRoot.setProperty("--primary-color", color1);
	theRoot.setProperty("--secondary-color", color2);
	theRoot.setProperty("--accent-color", color3);
	theRoot.setProperty("--background-color", color4);
};