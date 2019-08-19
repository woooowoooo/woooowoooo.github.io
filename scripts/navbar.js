var navbar = document.getElementById("navbar");
var linkArray = ["index.html","sitemap.html","about.html","contact.html","donate.html","selector.html","themes.html"];
var titleArray = ["Home","Sitemap","About","Contact","Donate","My Games","Themes"];
var pathArray = location.href.split("/");
var find = "woooowoooo.github.io";
var childAmount = pathArray.length - pathArray.indexOf(find) - 2;
var parentPath = "../";
var activeIndex = linkArray.indexOf(pathArray[pathArray.length - 1]);
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