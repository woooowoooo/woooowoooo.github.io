var navbar = document.getElementById("navbar");
var linkArray = ["index.html","sitemap.html","about.html","contact.html","donate.html","selector.html","themes.html"];
var titleArray = ["Home","Sitemap","About","Contact","Donate","My Games","Themes"];
//For pages up the directories
var pathArray = location.href.split("/");
var find = "woooowoooo.github.io";
var childAmount = pathArray.length - pathArray.indexOf(find) - 2;
var parentPath = "../";
var activeIndex = linkArray.indexOf(pathArray[pathArray.length - 1]);
if (pathArray[pathArray.length - 1] == "") {
	activeIndex = 0;
}
//Navbar
var create = function(element, index, array) {
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
linkArray.forEach(create);
var themes = navbar.lastChild.lastChild;
themes.classList.add("right");
//Responsive navbar
var header = document.getElementsByTagName("header")[0];
var openIcon = document.createElement("h1");
openIcon.id = "open-icon";
openIcon.classList.add("shown");
openIcon.appendChild(document.createTextNode("》"));
var closeIcon = document.createElement("h1");
closeIcon.id = "close-icon";
closeIcon.appendChild(document.createTextNode("《"));
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
function createLicense(type) {
	var license = document.createElement("a");
	license.rel = "license";
	license.href = "http://creativecommons.org/licenses/by-sa/4.0/";
	if (type == "image") {
		var licenseImg = document.createElement("img");
		licenseImg.alt = "CC BY-SA 4.0 (image could not be shown)";
		licenseImg.src = parentPath.repeat(childAmount) + "images/CC-BYSA-license.png";
		licenseImg.style.borderWidth = 0;
		license.appendChild(licenseImg);
	} else {
		license.appendChild(document.createTextNode("Creative Commons Attribution-ShareAlike 4.0 International License"));
	}
	footer.appendChild(license);
}
function createBr() {
	footer.appendChild(document.createElement("br"));
}
function createText(text) {
	footer.appendChild(document.createTextNode(text));
}
footer.innerHTML = "";
createText("Made by Ryan Z.");
createBr();
createBr();
createLicense("image");
createBr();
createText("This work is licensed under a ");
createLicense("text");
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