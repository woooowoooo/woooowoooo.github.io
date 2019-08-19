var footer = document.querySelector("footer");
var pathArray = location.href.split("/");
var find = "woooowoooo.github.io";
var childAmount = pathArray.length - pathArray.indexOf(find) - 2;
var parentPath = "../";
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
		createText("Creative Commons Attribution-ShareAlike 4.0 International License", license);
	}
	footer.appendChild(license);
}
function createBr() {
	footer.appendChild(document.createElement("br"));
}
function createText(text, object) {
	object.appendChild(document.createTextNode(text));
}
footer.innerHTML = "";
createText("Made by Ryan Z.", footer);
createBr();
createBr();
createLicense("image");
createBr();
createText("This work is licensed under a ", footer);
createLicense("text");