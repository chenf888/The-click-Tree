// ************ Themes ************
var themes = ["default", "blackwhite", "light"];

var colors = {
    default: {
        1: "#ffffff",
        2: "#bfbfbf",
        3: "#7f7f7f",
        color: "#dfdfdf",
        points: "#ffffff",
        locked: "#bf8f8f",
        background: "#0f0f0f",
        background_tooltip: "rgba(0, 0, 0, 0.75)",
    },
    blackwhite: {
        1: "#ffffff",
        2: "#cccccc",
        3: "#999999",
        color: "#ffffff",
        points: "#ffffff",
        locked: "#999999",
        background: "#000000",
        background_tooltip: "rgba(0, 0, 0, 0.85)",
    },
    light: {
        1: "#666666",
        2: "#999999",
        3: "#cecece",
        color: "#a1a1a1",
        points: "#393636",
        locked: "#aa5555",
        background: "#efefef",
        background_tooltip: "rgba(255, 255, 255, 0.95)",
    }
};

function changeTheme() {
    let themeName = options.theme || "default";
    let theme = colors[themeName];
    if (!theme) theme = colors.default;

    document.body.style.setProperty('--background', theme.background);
    document.body.style.setProperty('--background_tooltip', theme.background_tooltip);
    document.body.style.setProperty('--color', theme.color);
    document.body.style.setProperty('--points', theme.points);
    document.body.style.setProperty("--locked", theme.locked);
}

function getThemeName() {
    return options.theme || "default";
}

function switchTheme() {
    let current = options.theme;
    let idx = themes.indexOf(current);
    if (idx === -1 || idx >= themes.length - 1) {
        options.theme = themes[0];
    } else {
        options.theme = themes[idx + 1];
    }
    changeTheme();
    if (typeof window.resizeCanvas === 'function') {
        window.resizeCanvas();
    }
}
if (typeof window.addEventListener === 'function') {
    window.addEventListener('DOMContentLoaded', function() {
        if (typeof options !== 'undefined' && options.theme === undefined) {
            options.theme = "default";
        }
        changeTheme();
    });
}