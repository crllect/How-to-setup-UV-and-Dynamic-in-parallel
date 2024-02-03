let isUVEnabledByDefault = true;

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleUVEnabled");

    toggleButton.addEventListener("click", function () {
        let UVEnabled = JSON.parse(localStorage.getItem("UVEnabled")) || isUVEnabledByDefault;

        UVEnabled = !UVEnabled;

        toggleButton.textContent = UVEnabled
            ? "Dynamic: OFF, UV: ON"
            : "Dynamic: ON, UV: OFF";

        localStorage.setItem("UVEnabled", JSON.stringify(UVEnabled));
    });

    let initialUVEnabled =
        JSON.parse(localStorage.getItem("UVEnabled")) || isUVEnabledByDefault;
    toggleButton.textContent = initialUVEnabled
        ? "Dynamic: OFF, UV: ON"
        : "Dynamic: ON, UV: OFF";
});

document // makes it so you can press enter to submit as opposed to just being able to press a button
    .getElementById("urlInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });

document.getElementById("searchButton").onclick = function (event) {
    event.preventDefault();

    let url = document.getElementById("urlInput").value; // If no periods are detected in the input, search google instead
    let searchUrl = "https://www.google.com/search?q=";

    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) { // if no http or https is detected, add https automatically
            url = "https://" + url;
        }
    }

    if (UVEnabled) {
        iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    } else {
        iframeWindow.src =
            __dynamic$config.prefix +
            "route?url=" +
            encodeURIComponent(url);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var savedEngine = localStorage.getItem("preferredSearchEngine");
    if (savedEngine) {
        document.getElementById("searchEngineSelect").value = savedEngine;
    }
});

let UVEnabled = JSON.parse(localStorage.getItem("UVEnabled")) || isUVEnabledByDefault;
