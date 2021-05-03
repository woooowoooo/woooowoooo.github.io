// General things
function createText(parent, text) {
	parent.appendChild(document.createTextNode(text));
}
// For pages up the directories
const pathArray = location.href.split("/");
const find = "woooowoooo.github.io";
const childAmount = pathArray.length - pathArray.indexOf(find) - 2;
const parentPath = "../".repeat(childAmount);
// Theming
let root = document.documentElement.style;
const colorNames = ["background", "primary", "secondary", "accent", "text"];
function setColor(name) {
	root.setProperty("--" + name + "-color", localStorage.getItem(name + "Color"));
}
colorNames.forEach(setColor);
// Meta
let head = document.getElementsByTagName("head")[0];
let title = document.createElement("title");
createText(title, "woooowoooo's website");
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
	}
	return link;
}
createLink("icon", "favicon.ico", true);
// Theme stylesheets
let darkStylesheet = createLink("stylesheet", "styles/dark.css", false);
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
let themeType = localStorage.getItem("themeType");
if (darkQuery.matches && themeType === null || themeType === "dark") {
	head.appendChild(darkStylesheet);
}
let noneStylesheet = createLink("stylesheet", "styles/none.css", false);
if (themeType === "none") {
	head.appendChild(noneStylesheet);
}
// Header
let header = document.getElementsByTagName("header")[0];
function createIcon(iconId, iconText, iconFunction) {
	let icon = document.createElement("h1");
	icon.id = iconId;
	createText(icon, iconText);
	header.appendChild(icon);
	icon.addEventListener("click", iconFunction, false);
	return icon;
}
function hide(element) {
	element.classList.add("hidden");
}
function unhide(element) {
	element.classList.remove("hidden");
};
let openIcon = createIcon("open-icon", "⟫", function () {
	unhide(navbar);
	unhide(closeIcon);
	hide(openIcon);
});
let closeIcon = createIcon("close-icon", "⟪", function () {
	hide(navbar);
	hide(closeIcon);
	unhide(openIcon);
});
hide(closeIcon);
// Navbar
let navbar = document.getElementById("navbar");
navbar.innerHTML = "";
navbar.classList.add("hidden"); // Navbar is shown if JS is disabled.
const links = {
	"index.html": "Home",
	"sitemap.html": "Sitemap",
	"about.html": "About",
	"contact.html": "Contact",
	"donate.html": "Donate",
	"selector.html": "My Games",
	"themes.html": "Themes"
};
const pageName = pathArray[pathArray.length - 1];
function createNavbarLink(page) {
	let li = document.createElement("li");
	navbar.appendChild(li);
	let a = document.createElement("a");
	a.href = parentPath + page;
	a.textContent = links[page];
	li.appendChild(a);
	if (pageName === page) {
		a.classList.add("active");
	}
}
Object.keys(links).forEach(createNavbarLink);
let themes = navbar.lastChild;
themes.classList.add("right");
// Footer
let footer = document.getElementsByTagName("footer")[0];
footer.innerHTML = "";
let footerText = document.createElement("p");
createText(footerText, "Made by woooowoooo. Check out this website's ");
let githubLink = document.createElement("a");
githubLink.href = "https://github.com/woooowoooo/woooowoooo.github.io/";
createText(githubLink, "source code.");
footerText.appendChild(githubLink);
footer.appendChild(footerText);
// Create license
let fig = document.createElement("figure");
let image = document.createElement("img");
image.alt = "CC BY-SA 4.0 (image could not be shown)";
image.src = parentPath + "images/cc-by-sa-license.png";
image.style.borderWidth = 0;
let caption = document.createElement("figcaption");
createText(caption, "Creative Commons BY-SA 4.0");
fig.appendChild(image);
fig.appendChild(caption);
footer.appendChild(fig);
createText(footer, "This website is licensed under a ");
let license = document.createElement("a");
license.rel = "license";
license.href = "https://creativecommons.org/licenses/by-sa/4.0/";
createText(license, "Creative Commons Attribution-ShareAlike 4.0 International License.");
footer.appendChild(license);