var theRoot = document.documentElement.style;
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", changeTheme);
};
function changeTheme() {
	var style = window.getComputedStyle(event.target);
	var color1 = style.getPropertyValue("--1color");
	var color2 = style.getPropertyValue("--2color");
	var color3 = style.getPropertyValue("--3color");
	var color4 = style.getPropertyValue("--4color");
	var color5 = style.getPropertyValue("--5color");
	theRoot.setProperty("--primary-color", color1);
	theRoot.setProperty("--secondary-color", color2);
	theRoot.setProperty("--accent-color", color3);
	theRoot.setProperty("--background-color", color4);
	theRoot.setProperty("--text-color", color5);
	localStorage.setItem("primaryColor", color1);
	localStorage.setItem("secondaryColor", color2);
	localStorage.setItem("accentColor", color3);
	localStorage.setItem("backgroundColor", color4);
	localStorage.setItem("textColor", color5);
};
document.getElementById("clear").addEventListener("click", clearStorage());
function clearStorage() {
	localStorage.clear();
};