//theRoot is from combined.js
let buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function (item, index) {
		names.forEach(changeTheme);
	});
};
function changeTheme(name, index) {
	let theRoot = document.documentElement.style;
	let style = window.getComputedStyle(event.target);
	let color = style.getPropertyValue("--" + (index + 1) + "color");
	theRoot.setProperty("--" + name + "-color", color);
	localStorage.setItem(name + "Color", color);
};
document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
});