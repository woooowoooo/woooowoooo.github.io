var theRoot = document.documentElement.style;
theRoot.setProperty("--primary-color", localStorage.getItem("color1Local"));
theRoot.setProperty("--secondary-color", localStorage.getItem("color2Local"));
theRoot.setProperty("--accent-color", localStorage.getItem("color3Local"));
theRoot.setProperty("--background-color", localStorage.getItem("color4Local"));