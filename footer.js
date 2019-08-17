var footer = document.querySelector("footer");
footer.innerHTML = "";
function createLicense(type) {
	var license = document.createElement("a");
	license.rel = "license";
	license.href = "http://creativecommons.org/licenses/by-sa/4.0/";
	if (type == "image") {
		console.log("License link (image) made");
		var licenseImg = document.createElement("img");
		licenseImg.alt = "CC BY-SA 4.0 (image could not be shown)";
		licenseImg.src = "CC BY-SA license button.png";
		licenseImg.style.borderWidth = 0;
		license.appendChild(licenseImg);
	} else {
		console.log("License link (regular) made");
		createText("Creative Commons Attribution-ShareAlike 4.0 International License", license);
	}
	footer.appendChild(license);
}
function createBr() {
	footer.appendChild(document.createElement("br"));
	console.log("Line break made");
}
function createText(text, object) {
	object.appendChild(document.createTextNode(text));
	console.log("The text that was made is: " + text);
}
createText("Made by Ryan Z.", footer);
createBr();
createBr();
createLicense("image");
createBr();
createText("This work is licensed under a ", footer);
createLicense("text");