// Function declarations
function getProperty(name) {
	let style = window.getComputedStyle(event.target);
	return style.getPropertyValue(name).trim(); // For some reason CSS does not ignore leading whitespace.
}
function changeTheme(name, index) {
	let color = getProperty("--color" + (index + 1));
	root.setProperty("--" + name + "-color", color); // root is from combined.js
	localStorage.setItem(name + "Color", color);
}
function conditionalAppend(element, condition) {
	if (condition) {
		head.appendChild(element);
	} else if (head === element.parentElement) {
		head.removeChild(element);
	}
}
// Script starts here
let buttons = document.getElementsByTagName("button");
for (let button of buttons) {
	button.addEventListener("click", function () {
		colorNames.forEach(changeTheme); // colorNames is from combined.js
		themeType = getProperty("--theme-type");
		localStorage.setItem("themeType", themeType);
		conditionalAppend(darkStylesheet, themeType === "dark");
		conditionalAppend(noneStylesheet, themeType === "none");
	});
}
document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
	conditionalAppend(darkStylesheet, darkQuery.matches);
});