//theRoot is from combined.js
let buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", changeThemes);
};
function changeThemes() {
	changeTheme("--1color", "--primary-color", "primaryColor");
	changeTheme("--2color", "--secondary-color", "secondaryColor");
	changeTheme("--3color", "--accent-color", "accentColor");
	changeTheme("--4color", "--background-color", "backgroundColor");
	changeTheme("--5color", "--text-color", "textColor");
}
function changeTheme(themeColor, cssColor, storageColor) {
	let style = window.getComputedStyle(event.target);
	let color = style.getPropertyValue(themeColor);
	theRoot.setProperty(cssColor, color);
	localStorage.setItem(storageColor, color);
};
document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
});