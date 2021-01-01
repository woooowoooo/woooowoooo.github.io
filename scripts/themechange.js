function getProperty(name) {
	let style = window.getComputedStyle(event.target);
	return style.getPropertyValue(name).trim(); // For some reason CSS does not ignore leading whitespace.
}
let buttons = document.getElementsByTagName("button");
for (let button of buttons) {
	button.addEventListener("click", function (item, index) {
		names.forEach(changeTheme);
		themeType = getProperty("--theme-type");
		localStorage.setItem("themeType", themeType);
		if (themeType == "dark") {
			head.appendChild(darkStylesheet);
		} else if (head == darkStylesheet.parentElement) {
			head.removeChild(darkStylesheet);
		}
	});
}
function changeTheme(name, index) {
	let color = getProperty("--" + (index + 1) + "color");
	root.setProperty("--" + name + "-color", color); // root is from combined.js
	localStorage.setItem(name + "Color", color);
};
document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
});