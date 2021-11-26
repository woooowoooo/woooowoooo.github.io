const video = document.getElementById("rickroll");
const text = document.getElementsByTagName("h1")[0];
addEventListener("click", function () {
	video.play();
	text.innerHTML = ":)";
	setTimeout(function () {
		text.style.display = "none";
	}, 800);
});