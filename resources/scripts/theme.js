const img = document.getElementById("content-header__theme");
const button = document.getElementById("content-header__button");

let currentTheme = "light";

function switchTheme() {
    if (currentTheme == "dark") {
        currentTheme = "light";
    } else {
        currentTheme = "dark";
    }

    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length;i++) {
        var link = links[i];
        if (link.rel === "stylesheet"){
            if (link.href.match(new RegExp("resources\\/styles\\/root-\\w+\\.css"))) {
                link.href = `resources/styles/root-${currentTheme}.css`;
                img.src = `resources/svg/${currentTheme}.svg`;
                img.alt = currentTheme;
            }
        }
    }
}