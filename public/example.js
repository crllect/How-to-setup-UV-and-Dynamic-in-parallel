let isUVEnabledByDefault = true;
let UVEnabled =
    JSON.parse(localStorage.getItem("UVEnabled")) || isUVEnabledByDefault;

// when the page first loads, check for the UV and Dynamic settings, and auto reload when you change proxies
document.addEventListener("DOMContentLoaded", function () {
    updateToggleButton();
    applyUVSetting();

    // when the button with the ID "toggleUVEnabled" is pressed, it adds it to local storage and also applies it
    document
        .getElementById("toggleUVEnabled")
        .addEventListener("click", function () {
            UVEnabled = !UVEnabled;
            localStorage.setItem("UVEnabled", JSON.stringify(UVEnabled));
            updateToggleButton();
            applyUVSetting();
        });

    // makes it so when you press enter, it will search like pressing the button
    document
        .getElementById("urlInput")
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("searchButton").click();
            }
        });

    // when you press the button, update the iframe wit a new link
    document.getElementById("searchButton").onclick = function (event) {
        event.preventDefault();
        updateIFrameSrc();
    };

    // load preferred search engine setting
    var savedEngine = localStorage.getItem("preferredSearchEngine");
    if (savedEngine) {
        document.getElementById("searchEngineSelect").value = savedEngine;
    }
});

// changes the Dynamic on off buttons display, not necessary, just like cool
function updateToggleButton() {
    const toggleButton = document.getElementById("toggleUVEnabled");
    toggleButton.textContent = UVEnabled
        ? "Dynamic: OFF, UV: ON"
        : "Dynamic: ON, UV: OFF";
}

// just update the iframe, add more code if you want it to do more stuff, like change the color scheme
function applyUVSetting() {
    updateIFrameSrc();
}

// update iframe to be whatever
function updateIFrameSrc() {
    let url = document.getElementById("urlInput").value;
    let searchUrl = "https://www.google.com/search?q="; // default search url if it doesn't detect a link

    if (!url.includes(".")) {
        // detects if its a link or a search term (does it have a "." or nah)
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            // if its a link, but has not https:// or http://. add it
            url = "https://" + url;
        }
    }
    // ----------------------------------------------------------------------------------------------
    // actually update the iframe when u change stuff
    let iframeWindow = document.getElementById("iframeWindow"); // replace with your iframe ID if you change it
    if (UVEnabled) {
        iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    } else {
        iframeWindow.src = __dynamic$config.prefix + "route?url=" + encodeURIComponent(url);
    }
    // ----------------------------------------------------------------------------------------------

    /* REPLACE THE ABOVE SNIPPET WITH:
        1. You want it to redirect the whole page
        2. You want it to open a new about:blank window
        3. You want it to open a popup window
    */

    /* 1. You want it to redirect the whole page
        if (UVEnabled) {
            window.location = __uv$config.prefix + __uv$config.encodeUrl(url);
        } else {
            window.location = __dynamic$config.prefix + "route?url=" + encodeURIComponent(url);
        }
    */

    /* 2. You want it to open a new about:blank window
        if (UVEnabled) {
            var win = window.open();
            var encUrl = `${__uv$config.prefix}${__uv$config.encodeUrl(url)}`;
            var iframe = win.document.createElement("iframe");
            iframe.style.position = "absolute";
            iframe.style.left = "0";
            iframe.style.top = "0";
            iframe.style.width = "100vw";
            iframe.style.height = "100vh";
            iframe.style.border = "none";
            iframe.style.margin = "0";
            iframe.style.padding = "0";
            iframe.src = encUrl;
            win.document.body.appendChild(iframe);
            win.document.body.style.overflow = "hidden";
        } else {
            var win = window.open();
            var encUrl = `${__dynamic$config.prefix}${"route?url="}${encodeURIComponent(url)}`;
            var iframe = win.document.createElement("iframe");
            iframe.style.position = "absolute";
            iframe.style.left = "0";
            iframe.style.top = "0";
            iframe.style.width = "100vw";
            iframe.style.height = "100vh";
            iframe.style.border = "none";
            iframe.style.margin = "0";
            iframe.style.padding = "0";
            iframe.src = encUrl;
            win.document.body.appendChild(iframe);
            win.document.body.style.overflow = "hidden";
        }
    */

    /* 3. You want it to open a popup window
        if (UVEnabled) {
            window.open(`${__uv$config.prefix}${__uv$config.encodeUrl(url)}`, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400');
        } else {
            window.open(`${__dynamic$config.prefix}${"route?url="}${encodeURIComponent(url)}`, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400');
        }
    */
}
