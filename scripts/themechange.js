//theRoot is from combined.js
let buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function () {
		for (i = 0; i < names.length; i++) {
			changeTheme("--" + (i+1) + "color", names[i]);
		}
	});
};
function changeTheme(property, name) {
	let theRoot = document.documentElement.style;
	let style = window.getComputedStyle(event.target);
	let color = style.getPropertyValue(property);
	theRoot.setProperty("--" + name + "-color", color);
	localStorage.setItem(name + "Color", color);
};
document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
});