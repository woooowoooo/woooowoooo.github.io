// Function declarations
function getProperty(name) {
	let style = window.getComputedStyle(event.target);
	return style.getPropertyValue(name).trim(); // For some reason CSS does not ignore leading whitespace.
}
function changeTheme(name, index) {
	let color = getProperty("--" + (index + 1) + "color");
	root.setProperty("--" + name + "-color", color); // root is from combined.js
	localStorage.setItem(name + "Color", color);
}
function conditionalAppend(condition) {
	if (condition) {
		head.appendChild(this);
	} else if (head == this.parentElement) {
		head.removeChild(this);
	}
}
// Script starts here
let buttons = document.getElementsByTagName("button");
for (let button of buttons) {
	button.addEventListener("click", function (item, index) {
		colorNames.forEach(changeTheme); // colorNames is from combined.js
		themeType = getProperty("--theme-type");
		localStorage.setItem("themeType", themeType);
		conditionalAppend.call(darkStylesheet, themeType == "dark");
		conditionalAppend.call(noneStylesheet, themeType == "none");
	});
}
document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
	conditionalAppend(darkQuery.matches).call(darkStylesheet);
});