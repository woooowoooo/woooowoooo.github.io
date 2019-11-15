var theRoot = document.documentElement.style;
theRoot.setProperty("--primary-color", localStorage.getItem("primaryColor"));
theRoot.setProperty("--secondary-color", localStorage.getItem("secondaryColor"));
theRoot.setProperty("--accent-color", localStorage.getItem("accentColor"));
theRoot.setProperty("--background-color", localStorage.getItem("backgroundColor"));
theRoot.setProperty("--text-color", localStorage.getItem("textColor"));