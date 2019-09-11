var navbar = document.getElementById("navbar");
var linkArray = ["index.html","sitemap.html","about.html","contact.html","donate.html","selector.html","themes.html"];
var titleArray = ["Home","Sitemap","About","Contact","Donate","My Games","Themes"];
//For pages up the directories
var pathArray = location.href.split("/");
var find = "woooowoooo.github.io";
var childAmount = pathArray.length - pathArray.indexOf(find) - 2;
var parentPath = "../";
var activeIndex = linkArray.indexOf(pathArray[pathArray.length - 1]);
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
openIcon.appendChild(document.createTextNode("》"));
var closeIcon = document.createElement("h1");
closeIcon.id = "close-icon";
closeIcon.classList.add("hidden");
closeIcon.appendChild(document.createTextNode("《"));
header.prepend(openIcon, closeIcon);
openIcon.addEventListener("click", function() {
	navbar.classList.add("shown");
	closeIcon.classList.remove("hidden");
	openIcon.classList.add("hidden");
}, false);
closeIcon.addEventListener("click", function() {
	navbar.classList.remove("shown");
	closeIcon.classList.add("hidden");
	openIcon.classList.remove("hidden");
}, false);