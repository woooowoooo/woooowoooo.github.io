//General things
function createText(text) {
	this.appendChild(document.createTextNode(text));
}
//For pages up the directories
var pathArray = location.href.split("/");
var find = "woooowoooo.github.io";
var childAmount = pathArray.length - pathArray.indexOf(find) - 2;
var parentPath = "../";
//Navbar
var navbar = document.getElementById("navbar");
var linkArray = ["index.html","sitemap.html","about.html","contact.html","donate.html","selector.html","themes.html"];
var titleArray = ["Home","Sitemap","About","Contact","Donate","My Games","Themes"];
var activeIndex = linkArray.indexOf(pathArray[pathArray.length - 1]);
if (pathArray[pathArray.length - 1] == "") {
	activeIndex = 0;
}
var createLink = function(element, index, array) {
	li = document.createElement("li");
	navbar.appendChild(li);
	a = document.createElement("a");
	a.href = parentPath.repeat(childAmount) + element;
	a.textContent = titleArray[index];
	li.appendChild(a);
	if (index == activeIndex) {
		a.classList.add("active");
	}
}
navbar.textContent = "";
linkArray.forEach(createLink);
var themes = navbar.lastChild.lastChild;
themes.classList.add("right");
//Responsive navbar
var header = document.getElementsByTagName("header")[0];
var openIcon = document.createElement("h1");
openIcon.id = "open-icon";
openIcon.classList.add("shown");
createText.call(openIcon, "》");
var closeIcon = document.createElement("h1");
closeIcon.id = "close-icon";
createText.call(closeIcon, "《");
header.appendChild(openIcon);
header.appendChild(closeIcon);
openIcon.addEventListener("click", function() {
	navbar.classList.add("shown");
	closeIcon.classList.add("shown");
	openIcon.classList.remove("shown");
}, false);
closeIcon.addEventListener("click", function() {
	navbar.classList.remove("shown");
	closeIcon.classList.remove("shown");
	openIcon.classList.add("shown");
}, false);
//Footer
var footer = document.getElementsByTagName("footer")[0];
function createLicense() {
	var license = document.createElement("a");
	license.rel = "license";
	license.href = "http://creativecommons.org/licenses/by-sa/4.0/";
	createText.call(license, "Creative Commons Attribution-ShareAlike 4.0 International License");
	footer.appendChild(license);
}
function createFig() {
	var fig = document.createElement("figure");
	var image = document.createElement("img");
	image.alt = "CC BY-SA 4.0 (image could not be shown)";
	image.src = parentPath.repeat(childAmount) + "images/CC-BYSA-license.png";
	image.style.borderWidth = 0;
	var caption = document.createElement("figcaption");
	createText.call(caption, "CC BY-SA 4.0");
	fig.appendChild(image);
	fig.appendChild(caption);
	footer.appendChild(fig);
}
footer.innerHTML = "";
createText.call(footer, "Made by Ryan Z.");
createFig();
createText.call(footer, "This work is licensed under a ");
createLicense();
//Meta
var head = document.getElementsByTagName("head")[0];
function createMeta(name, content) {
	var meta = document.createElement("meta");
	meta.name = name;
	meta.content = content;
	head.appendChild(meta);
}
createMeta("author", "Ryan Z.");
createMeta("viewport", "width=device-width, initial-scale=1.0");
//Color storage
var theRoot = document.documentElement.style;
theRoot.setProperty("--primary-color", localStorage.getItem("primaryColor"));
theRoot.setProperty("--secondary-color", localStorage.getItem("secondaryColor"));
theRoot.setProperty("--accent-color", localStorage.getItem("accentColor"));
theRoot.setProperty("--background-color", localStorage.getItem("backgroundColor"));
theRoot.setProperty("--text-color", localStorage.getItem("textColor"));