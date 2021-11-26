const video = document.getElementById("rickroll");
const text = document.getElementsByTagName("h1")[0];
addEventListener("click", function () {
	// Play for prize.html, unmute for 404.html
	video.play();
	video.muted = false;
	text.innerHTML = ":)";
	setTimeout(function () {
		text.style.display = "none";
	}, 800);
});