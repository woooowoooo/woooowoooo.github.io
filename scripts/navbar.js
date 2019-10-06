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