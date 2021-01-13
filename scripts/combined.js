// General things
function createText(text) {
	this.appendChild(document.createTextNode(text));
}
// For pages up the directories
const pathArray = location.href.split("/");
const find = "woooowoooo.github.io";
const childAmount = pathArray.length - pathArray.indexOf(find) - 2;
const parentPath = "../".repeat(childAmount);
// Theming
let root = document.documentElement.style;
const names = ["background", "primary", "secondary", "accent", "text"];
function setColor(name) {
	root.setProperty("--" + name + "-color", localStorage.getItem(name + "Color"));
}
names.forEach(setColor);
// Meta
let head = document.getElementsByTagName("head")[0];
let title = document.createElement("title");
createText.call(title, "woooowoooo's website");
head.appendChild(title);
function createMeta(name, content) {
	let meta = document.createElement("meta");
	meta.name = name;
	meta.content = content;
	head.appendChild(meta);
}
createMeta("description", "A personal website.");
createMeta("author", "woooowoooo");
createMeta("viewport", "width=device-width, initial-scale=1.0");
function createLink(relation, destination, append) {
	let link = document.createElement("link");
	link.rel = relation;
	link.href = parentPath + destination;
	if (append) {
		head.appendChild(link);
	} else {
		return link;
	}
}
createLink("icon", "favicon.ico", true);
// Theme stylesheets
let darkStylesheet = createLink("stylesheet", "styles/dark.css", false);
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
let themeType = localStorage.getItem("themeType");
if (darkQuery.matches && themeType == null || themeType == "dark") {
	head.appendChild(darkStylesheet);
}
let noneStylesheet = createLink("stylesheet", "styles/none.css", false);
if (themeType == "none") {
	head.appendChild(noneStylesheet);
}
// Navbar
let navbar = document.getElementById("navbar");
navbar.classList.add("hidden"); // If JS is disabled, the navbar should still be shown.
const linkArray = [
	"index.html",
	"sitemap.html",
	"about.html",
	"contact.html",
	"donate.html",
	"selector.html",
	"themes.html"
];
const titleArray = [
	"Home",
	"Sitemap",
	"About",
	"Contact",
	"Donate",
	"My Games",
	"Themes"
];
let activeIndex = linkArray.indexOf(pathArray[pathArray.length - 1]);
if (pathArray[pathArray.length - 1] == "") {
	activeIndex = 0;
}
let createLink = function(element, index) {
	let li = document.createElement("li");
	navbar.appendChild(li);
	let a = document.createElement("a");
	a.textContent = titleArray[index];
	a.href = parentPath + page;
	li.appendChild(a);
	if (index == activeIndex) {
		a.classList.add("active");
	}
}
navbar.textContent = "";
linkArray.forEach(createLink);
let themes = navbar.lastChild;
themes.classList.add("right");
// Open icon
let header = document.getElementsByTagName("header")[0];
let openIcon = document.createElement("h1");
openIcon.id = "open-icon";
createText.call(openIcon, "︾");
header.appendChild(openIcon);
openIcon.addEventListener("click", function () {
	navbar.classList.remove("hidden");
	closeIcon.classList.remove("hidden");
	openIcon.classList.add("hidden");
}, false);
// Close icon
let closeIcon = document.createElement("h1");
closeIcon.id = "close-icon";
closeIcon.classList.add("hidden");
createText.call(closeIcon, "︽");
header.appendChild(closeIcon);
closeIcon.addEventListener("click", function () {
	navbar.classList.add("hidden");
	closeIcon.classList.add("hidden");
	openIcon.classList.remove("hidden");
}, false);
// Footer
let footer = document.getElementsByTagName("footer")[0];
footer.innerHTML = "";
createText.call(footer, "Made by woooowoooo");
// Create license figure
let fig = document.createElement("figure");
let image = document.createElement("img");
image.alt = "CC BY-SA 4.0 (image could not be shown)";
image.src = parentPath + "images/CC-BYSA-license.png";
image.style.borderWidth = 0;
let caption = document.createElement("figcaption");
createText.call(caption, "CC BY-SA 4.0");
fig.appendChild(image);
fig.appendChild(caption);
footer.appendChild(fig);
// Create license
createText.call(footer, "This work is licensed under a ");
let license = document.createElement("a");
license.rel = "license";
license.href = "https://creativecommons.org/licenses/by-sa/4.0/";
createText.call(license, "Creative Commons Attribution-ShareAlike 4.0 International License");
footer.appendChild(license);