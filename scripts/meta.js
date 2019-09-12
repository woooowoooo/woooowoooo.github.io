var head = document.getElementsByTagName("head")[0];
function createMeta(name, content) {
	var meta = document.createElement("meta");
	meta.name = name;
	meta.content = content;
	head.appendChild(meta);
}
createMeta("author", "Ryan Z.");
