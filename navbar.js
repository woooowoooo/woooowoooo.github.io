var navbar = document.getElementById("navbar");
var linkArray = ["index.html","sitemap.html","about.html","contact.html","donate.html","selector.html","themes.html"];
var titleArray = ["Home","Sitemap","About","Contact","Donate","My Games","Themes"];
var fileNameArray = location.href.split("/").slice(-1);
var fileName = fileNameArray[0];
var activeIndex = linkArray.indexOf(fileName);
var create = function(element, index, array) {
	li = document.createElement("li");
	navbar.appendChild(li);
	a = document.createElement("a");
	a.href = element;
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