var theRoot = document.documentElement.style;
var primaryColor = localStorage.getItem("color1Local");
var secondaryColor = localStorage.getItem("color2Local");
var accentColor = localStorage.getItem("color3Local");
var backgroundColor = localStorage.getItem("color4Local");
theRoot.setProperty("--primary-color", primaryColor);
theRoot.setProperty("--secondary-color", secondaryColor);
theRoot.setProperty("--accent-color", accentColor);
theRoot.setProperty("--background-color", backgroundColor);