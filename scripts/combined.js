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
const root = document.documentElement.style;
const colorNames = ["background", "primary", "secondary", "accent", "text"];
for (const name of colorNames) {
	root.setProperty(`--${name}-color`, localStorage.getItem(`${name}Color`));
}
// Meta
const head = document.getElementsByTagName("head")[0];
const title = document.createElement("title");
createText(title, "woooowoooo's website");
head.appendChild(title);
function createMeta(name, content) {
	const meta = document.createElement("meta");
	meta.name = name;
	meta.content = content;
	head.appendChild(meta);
}
createMeta("description", "A personal website.");
createMeta("author", "woooowoooo");
createMeta("viewport", "width=device-width, initial-scale=1.0");
function createLink(relation, destination, append) {
	const link = document.createElement("link");
	link.rel = relation;
	link.href = parentPath + destination;
	if (append) {
		head.appendChild(link);
	}
	return link;
}
createLink("icon", "favicon.ico", true);
// Theme stylesheets
const darkStylesheet = createLink("stylesheet", "styles/dark.css", false);
let darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
let themeType = localStorage.getItem("themeType");
if (darkQuery.matches && themeType === null || themeType === "dark") {
	head.appendChild(darkStylesheet);
}
const noneStylesheet = createLink("stylesheet", "styles/none.css", false);
if (themeType === "none") {
	head.appendChild(noneStylesheet);
}
// Header
const header = document.getElementsByTagName("header")[0];
function createIcon(iconId, iconText, iconFunction) {
	const icon = document.createElement("h1");
	icon.id = iconId;
	createText(icon, iconText);
	header.appendChild(icon);
	icon.addEventListener("click", iconFunction);
	return icon;
}
function hide(element) {
	element.classList.add("hidden");
}
function unhide(element) {
	element.classList.remove("hidden");
};
const openIcon = createIcon("open-icon", "⟫", function () {
	unhide(navbar);
	unhide(closeIcon);
	hide(openIcon);
});
const closeIcon = createIcon("close-icon", "⟪", function () {
	hide(navbar);
	hide(closeIcon);
	unhide(openIcon);
});
hide(closeIcon);
// Navbar
const navbar = document.getElementById("navbar");
navbar.innerHTML = "";
navbar.classList.add("hidden"); // Navbar is shown if JS is disabled.
const links = {
	"index.html": "Home",
	"sitemap.html": "Sitemap",
	"about.html": "About",
	"contact.html": "Contact",
	"donate.html": "Donate",
	"selector.html": "JS Things",
	"themes.html": "Themes"
};
const pageName = pathArray[pathArray.length - 1];
function createNavbarLink(page) {
	const li = document.createElement("li");
	navbar.appendChild(li);
	const a = document.createElement("a");
	a.href = parentPath + page;
	a.textContent = links[page];
	li.appendChild(a);
	if (pageName === page) {
		a.classList.add("active");
	}
}
Object.keys(links).forEach(createNavbarLink);
const themes = navbar.lastChild;
themes.classList.add("right");
// Footer
const footer = document.getElementsByTagName("footer")[0];
footer.innerHTML = "";
const footerText = document.createElement("p");
createText(footerText, "Made by woooowoooo. Check out this website's ");
const githubLink = document.createElement("a");
githubLink.href = "https://github.com/woooowoooo/woooowoooo.github.io/";
createText(githubLink, "source code.");
footerText.appendChild(githubLink);
footer.appendChild(footerText);