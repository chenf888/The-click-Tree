// ************ Themes ************
var themes = [
    "default", "aqua", "red", "green", "purple", "orange", "pink", "lime", "teal", "cyan",
    "brown", "indigo", "coral", "amber", "blue", "violet", "gold", "silver", "blackwhite", "midnight",
    "crimson", "salmon", "tomato", "ruby", "cherry", "rose", "magenta", "fuchsia", "plum", "lavender",
    "wisteria", "periwinkle", "sky", "azure", "cerulean", "navy", "denim", "sapphire", "cobalt", "tealblue",
    "seafoam", "mint", "jungle", "forest", "emerald", "olive", "chartreuse", "yellowgreen", "mustard", "honey",
    "apricot", "peach", "melon", "tangerine", "cinnamon", "rust", "copper", "bronze", "brass", "khaki",
    "tan", "beige", "ivory", "cream", "linen", "floralwhite", "snow", "whitesmoke", "lightgray", "gainsboro",
    "darkgray", "dimgray", "charcoal", "onyx", "jet", "raisin", "ebony", "cafe", "umber", "taupe",
    "sage", "dustyrose", "thistle", "orchid", "heliotrope", "lilac", "mauve", "mulberry", "burgundy", "claret",
    "vermillion", "amberlight", "citrine", "peridot", "jade", "malachite", "verdigris", "cerise", "carnation", "hibiscus"
]
var colors = {
    default: {
        1: "#ffffff", 2: "#bfbfbf", 3: "#7f7f7f",
        color: "#dfdfdf", points: "#ffffff", locked: "#bf8f8f",
        background: "#0f0f0f", background_tooltip: "rgba(0, 0, 0, 0.75)",
    },
    aqua: {
        1: "#bfdfff", 2: "#8fa7bf", 3: "#5f6f7f",
        color: "#bfdfff", points: "#dfefff", locked: "#c4a7b3",
        background: "#001f3f", background_tooltip: "rgba(0, 15, 31, 0.75)",
    },
    red: {
        1: "#ffbfbf", 2: "#bf8f8f", 3: "#7f5f5f",
        color: "#ffbfbf", points: "#ffdfdf", locked: "#bf8f8f",
        background: "#3f0000", background_tooltip: "rgba(31, 0, 0, 0.75)",
    },
    green: {
        1: "#bfffbf", 2: "#8fbf8f", 3: "#5f7f5f",
        color: "#bfffbf", points: "#dfffdf", locked: "#8fbf8f",
        background: "#003f00", background_tooltip: "rgba(0, 31, 0, 0.75)",
    },
    purple: {
        1: "#e0bfff", 2: "#a08fbf", 3: "#705f7f",
        color: "#e0bfff", points: "#f0dfff", locked: "#b3a0c4",
        background: "#1a0f2a", background_tooltip: "rgba(12, 8, 20, 0.75)",
    },
    orange: {
        1: "#ffd2bf", 2: "#bf9a8f", 3: "#7f625f",
        color: "#ffd2bf", points: "#ffe8df", locked: "#c4a78b",
        background: "#3f1e00", background_tooltip: "rgba(31, 15, 0, 0.75)",
    },
    pink: {
        1: "#ffbfdf", 2: "#bf8faf", 3: "#7f5f6f",
        color: "#ffbfdf", points: "#ffdfef", locked: "#c48fa7",
        background: "#3f0f2a", background_tooltip: "rgba(31, 8, 20, 0.75)",
    },
    lime: {
        1: "#dfffbf", 2: "#afbf8f", 3: "#6f7f5f",
        color: "#dfffbf", points: "#efffdf", locked: "#afbf8f",
        background: "#1f3f00", background_tooltip: "rgba(15, 31, 0, 0.75)",
    },
    teal: {
        1: "#bfffdf", 2: "#8fbfaf", 3: "#5f7f6f",
        color: "#bfffdf", points: "#dfffef", locked: "#8fbfaf",
        background: "#003f2f", background_tooltip: "rgba(0, 31, 23, 0.75)",
    },
    cyan: {
        1: "#bfffff", 2: "#8fbfbf", 3: "#5f7f7f",
        color: "#bfffff", points: "#dfffff", locked: "#8fbfbf",
        background: "#003f3f", background_tooltip: "rgba(0, 31, 31, 0.75)",
    },
    brown: {
        1: "#dfcfbf", 2: "#af9f8f", 3: "#6f5f4f",
        color: "#dfcfbf", points: "#efe3df", locked: "#c4a78b",
        background: "#2a1a0f", background_tooltip: "rgba(21, 12, 8, 0.75)",
    },
    indigo: {
        1: "#bfbfef", 2: "#8f8faf", 3: "#5f5f6f",
        color: "#bfbfef", points: "#dfdfef", locked: "#a0a0c4",
        background: "#0f0f2a", background_tooltip: "rgba(8, 8, 20, 0.75)",
    },
    coral: {
        1: "#ffcfbf", 2: "#bf9f8f", 3: "#7f6f5f",
        color: "#ffcfbf", points: "#ffe8df", locked: "#c49f8b",
        background: "#3f1500", background_tooltip: "rgba(31, 10, 0, 0.75)",
    },
    amber: {
        1: "#ffe8bf", 2: "#bfb08f", 3: "#7f705f",
        color: "#ffe8bf", points: "#fff4df", locked: "#c4b08b",
        background: "#3f2a00", background_tooltip: "rgba(31, 20, 0, 0.75)",
    },
    blue: {
        1: "#bfdfff", 2: "#8fa7bf", 3: "#5f6f7f",
        color: "#bfdfff", points: "#dfefff", locked: "#8fafcf",
        background: "#001f5f", background_tooltip: "rgba(0, 15, 47, 0.75)",
    },
    violet: {
        1: "#dfbfff", 2: "#af8fbf", 3: "#6f5f7f",
        color: "#dfbfff", points: "#efdfff", locked: "#b38fc4",
        background: "#1f0f3f", background_tooltip: "rgba(15, 8, 31, 0.75)",
    },
    gold: {
        1: "#fff0bf", 2: "#bfb88f", 3: "#7f785f",
        color: "#fff0bf", points: "#fff8df", locked: "#c4b88b",
        background: "#3f3000", background_tooltip: "rgba(31, 23, 0, 0.75)",
    },
    silver: {
        1: "#e0e0e0", 2: "#a0a0a0", 3: "#606060",
        color: "#e0e0e0", points: "#f0f0f0", locked: "#b0b0b0",
        background: "#202020", background_tooltip: "rgba(16, 16, 16, 0.75)",
    },
    blackwhite: {
        1: "#ffffff", 2: "#cccccc", 3: "#999999",
        color: "#ffffff", points: "#ffffff", locked: "#999999",
        background: "#000000", background_tooltip: "rgba(0, 0, 0, 0.85)",
    },
    midnight: {
        1: "#b0c0d0", 2: "#708090", 3: "#405060",
        color: "#b0c0d0", points: "#d0e0f0", locked: "#8fa0b0",
        background: "#0a1428", background_tooltip: "rgba(5, 10, 20, 0.75)",
    },
    crimson: {
        1: "#f0b0b0", 2: "#b08080", 3: "#805050",
        color: "#f0b0b0", points: "#f8d0d0", locked: "#c08080",
        background: "#400000", background_tooltip: "rgba(40, 0, 0, 0.75)",
    },
    salmon: {
        1: "#ffc0b0", 2: "#c09080", 3: "#806050",
        color: "#ffc0b0", points: "#ffe0d0", locked: "#d0a090",
        background: "#401000", background_tooltip: "rgba(32, 8, 0, 0.75)",
    },
    tomato: {
        1: "#ffb0a0", 2: "#c08070", 3: "#805048",
        color: "#ffb0a0", points: "#ffd8c8", locked: "#d09080",
        background: "#400800", background_tooltip: "rgba(32, 4, 0, 0.75)",
    },
    ruby: {
        1: "#e0a0a0", 2: "#b07070", 3: "#804848",
        color: "#e0a0a0", points: "#f0c8c8", locked: "#c07878",
        background: "#380000", background_tooltip: "rgba(28, 0, 0, 0.75)",
    },
    cherry: {
        1: "#f0a0b0", 2: "#b07080", 3: "#804850",
        color: "#f0a0b0", points: "#f8c8d0", locked: "#d08090",
        background: "#3f0008", background_tooltip: "rgba(31, 0, 4, 0.75)",
    },
    rose: {
        1: "#f0c0d0", 2: "#b090a0", 3: "#805868",
        color: "#f0c0d0", points: "#fce0e8", locked: "#d0a8b8",
        background: "#3f1020", background_tooltip: "rgba(31, 8, 16, 0.75)",
    },
    magenta: {
        1: "#f0a0f0", 2: "#b070b0", 3: "#804880",
        color: "#f0a0f0", points: "#f8c8f8", locked: "#d080d0",
        background: "#3f003f", background_tooltip: "rgba(31, 0, 31, 0.75)",
    },
    fuchsia: {
        1: "#ffb0ff", 2: "#c080c0", 3: "#805080",
        color: "#ffb0ff", points: "#ffd8ff", locked: "#e090e0",
        background: "#400040", background_tooltip: "rgba(32, 0, 32, 0.75)",
    },
    plum: {
        1: "#d0b0d0", 2: "#a080a0", 3: "#705070",
        color: "#d0b0d0", points: "#e8d0e8", locked: "#b890b8",
        background: "#2f102f", background_tooltip: "rgba(20, 8, 20, 0.75)",
    },
    lavender: {
        1: "#d0d0f0", 2: "#a0a0b0", 3: "#707080",
        color: "#d0d0f0", points: "#e8e8f8", locked: "#b0b0d0",
        background: "#101030", background_tooltip: "rgba(8, 8, 24, 0.75)",
    },
    wisteria: {
        1: "#c0b0e0", 2: "#9080a0", 3: "#605868",
        color: "#c0b0e0", points: "#e0d0f0", locked: "#a898c0",
        background: "#181030", background_tooltip: "rgba(12, 8, 24, 0.75)",
    },
    periwinkle: {
        1: "#b0c0f0", 2: "#8090b0", 3: "#506070",
        color: "#b0c0f0", points: "#d0dff8", locked: "#98a8d0",
        background: "#08102f", background_tooltip: "rgba(4, 8, 24, 0.75)",
    },
    sky: {
        1: "#b0d0f0", 2: "#80a0b0", 3: "#507078",
        color: "#b0d0f0", points: "#d0e8f8", locked: "#90b0d0",
        background: "#001833", background_tooltip: "rgba(0, 12, 26, 0.75)",
    },
    azure: {
        1: "#c0e0ff", 2: "#90a8c0", 3: "#607080",
        color: "#c0e0ff", points: "#e0f0ff", locked: "#a8c0e0",
        background: "#001f40", background_tooltip: "rgba(0, 15, 32, 0.75)",
    },
    cerulean: {
        1: "#a0d0f0", 2: "#7898b0", 3: "#506070",
        color: "#a0d0f0", points: "#c8e8f8", locked: "#88b0d0",
        background: "#002040", background_tooltip: "rgba(0, 16, 32, 0.75)",
    },
    navy: {
        1: "#a0a0d0", 2: "#7070a0", 3: "#484868",
        color: "#a0a0d0", points: "#c8c8e8", locked: "#8888b0",
        background: "#080830", background_tooltip: "rgba(4, 4, 24, 0.75)",
    },
    denim: {
        1: "#90a0c0", 2: "#687898", 3: "#405060",
        color: "#90a0c0", points: "#c0d0e0", locked: "#7888a8",
        background: "#101a30", background_tooltip: "rgba(8, 12, 24, 0.75)",
    },
    sapphire: {
        1: "#90b0f0", 2: "#6080b0", 3: "#405070",
        color: "#90b0f0", points: "#c0d0f8", locked: "#7898d0",
        background: "#001040", background_tooltip: "rgba(0, 8, 32, 0.75)",
    },
    cobalt: {
        1: "#80a0e0", 2: "#5870a0", 3: "#384868",
        color: "#80a0e0", points: "#b8c8f0", locked: "#6880b8",
        background: "#000838", background_tooltip: "rgba(0, 4, 28, 0.75)",
    },
    tealblue: {
        1: "#90c0d0", 2: "#6890a0", 3: "#406068",
        color: "#90c0d0", points: "#c0e0e8", locked: "#78a0b0",
        background: "#002838", background_tooltip: "rgba(0, 20, 28, 0.75)",
    },
    seafoam: {
        1: "#b0f0e0", 2: "#80b0a0", 3: "#507068",
        color: "#b0f0e0", points: "#d0f8f0", locked: "#90d0c0",
        background: "#003028", background_tooltip: "rgba(0, 24, 20, 0.75)",
    },
    mint: {
        1: "#c0f0d0", 2: "#90b0a0", 3: "#607060",
        color: "#c0f0d0", points: "#e0f8e8", locked: "#a0d0b0",
        background: "#003020", background_tooltip: "rgba(0, 24, 16, 0.75)",
    },
    jungle: {
        1: "#90d0b0", 2: "#689880", 3: "#406058",
        color: "#90d0b0", points: "#c0e8d0", locked: "#78b898",
        background: "#002820", background_tooltip: "rgba(0, 20, 16, 0.75)",
    },
    forest: {
        1: "#90c090", 2: "#689068", 3: "#406040",
        color: "#90c090", points: "#c0e0c0", locked: "#78a878",
        background: "#002800", background_tooltip: "rgba(0, 20, 0, 0.75)",
    },
    emerald: {
        1: "#90e0b0", 2: "#68a080", 3: "#406858",
        color: "#90e0b0", points: "#c0f0d0", locked: "#78c098",
        background: "#003018", background_tooltip: "rgba(0, 24, 12, 0.75)",
    },
    olive: {
        1: "#c0c090", 2: "#909068", 3: "#606040",
        color: "#c0c090", points: "#e0e0c0", locked: "#a8a878",
        background: "#282800", background_tooltip: "rgba(20, 20, 0, 0.75)",
    },
    chartreuse: {
        1: "#d0f080", 2: "#a0b060", 3: "#607040",
        color: "#d0f080", points: "#e8f8b0", locked: "#b8d068",
        background: "#203000", background_tooltip: "rgba(16, 24, 0, 0.75)",
    },
    yellowgreen: {
        1: "#d0e080", 2: "#a0b060", 3: "#607040",
        color: "#d0e080", points: "#e8f0b0", locked: "#b8c868",
        background: "#202800", background_tooltip: "rgba(16, 20, 0, 0.75)",
    },
    mustard: {
        1: "#e0d080", 2: "#b0a060", 3: "#706840",
        color: "#e0d080", points: "#f0e8b0", locked: "#c8b868",
        background: "#302800", background_tooltip: "rgba(24, 20, 0, 0.75)",
    },
    honey: {
        1: "#f0e0a0", 2: "#b0b070", 3: "#707048",
        color: "#f0e0a0", points: "#f8f0c8", locked: "#d0c888",
        background: "#302800", background_tooltip: "rgba(24, 20, 0, 0.75)",
    },
    apricot: {
        1: "#f0d0a0", 2: "#b0a070", 3: "#706848",
        color: "#f0d0a0", points: "#f8e8c8", locked: "#d0b888",
        background: "#382000", background_tooltip: "rgba(28, 16, 0, 0.75)",
    },
    peach: {
        1: "#ffd0b0", 2: "#c0a080", 3: "#806858",
        color: "#ffd0b0", points: "#ffe8d0", locked: "#e0b898",
        background: "#401800", background_tooltip: "rgba(32, 12, 0, 0.75)",
    },
    melon: {
        1: "#f0c0a0", 2: "#b09070", 3: "#806048",
        color: "#f0c0a0", points: "#f8e0c8", locked: "#d0a880",
        background: "#381800", background_tooltip: "rgba(28, 12, 0, 0.75)",
    },
    tangerine: {
        1: "#ffc080", 2: "#c09060", 3: "#806040",
        color: "#ffc080", points: "#ffe0b0", locked: "#e0a878",
        background: "#401800", background_tooltip: "rgba(32, 12, 0, 0.75)",
    },
    cinnamon: {
        1: "#e0b080", 2: "#b08060", 3: "#806040",
        color: "#e0b080", points: "#f0d0b0", locked: "#c89878",
        background: "#381800", background_tooltip: "rgba(28, 12, 0, 0.75)",
    },
    rust: {
        1: "#d0a070", 2: "#a07050", 3: "#804830",
        color: "#d0a070", points: "#e8c898", locked: "#b88858",
        background: "#381000", background_tooltip: "rgba(28, 8, 0, 0.75)",
    },
    copper: {
        1: "#d0a080", 2: "#a07860", 3: "#805040",
        color: "#d0a080", points: "#e8c8b0", locked: "#b88868",
        background: "#301000", background_tooltip: "rgba(24, 8, 0, 0.75)",
    },
    bronze: {
        1: "#c0a070", 2: "#907850", 3: "#605030",
        color: "#c0a070", points: "#e0c898", locked: "#a88858",
        background: "#281800", background_tooltip: "rgba(20, 12, 0, 0.75)",
    },
    brass: {
        1: "#d0c080", 2: "#a09060", 3: "#706040",
        color: "#d0c080", points: "#e8e0b0", locked: "#b8a878",
        background: "#302000", background_tooltip: "rgba(24, 16, 0, 0.75)",
    },
    khaki: {
        1: "#d0c0a0", 2: "#a09078", 3: "#706850",
        color: "#d0c0a0", points: "#e8e0c8", locked: "#b8a888",
        background: "#2a2010", background_tooltip: "rgba(20, 16, 8, 0.75)",
    },
    tan: {
        1: "#d0b890", 2: "#a08868", 3: "#806048",
        color: "#d0b890", points: "#e8d8b8", locked: "#b8a080",
        background: "#2a1a10", background_tooltip: "rgba(20, 12, 8, 0.75)",
    },
    beige: {
        1: "#e0d0b0", 2: "#b0a088", 3: "#807058",
        color: "#e0d0b0", points: "#f0e8d0", locked: "#c8b898",
        background: "#2a2018", background_tooltip: "rgba(20, 16, 12, 0.75)",
    },
    ivory: {
        1: "#f0f0d0", 2: "#c0c0a0", 3: "#808068",
        color: "#f0f0d0", points: "#f8f8e8", locked: "#d0d0b0",
        background: "#202018", background_tooltip: "rgba(16, 16, 12, 0.75)",
    },
    cream: {
        1: "#f0e8c0", 2: "#c0b898", 3: "#807868",
        color: "#f0e8c0", points: "#f8f0e0", locked: "#d0c8a8",
        background: "#282018", background_tooltip: "rgba(20, 16, 12, 0.75)",
    },
    linen: {
        1: "#f0e0d0", 2: "#c0b0a0", 3: "#807870",
        color: "#f0e0d0", points: "#f8f0e8", locked: "#d0c0b0",
        background: "#201818", background_tooltip: "rgba(16, 12, 12, 0.75)",
    },
    floralwhite: {
        1: "#fff0e0", 2: "#c0b8a8", 3: "#808070",
        color: "#fff0e0", points: "#fff8f0", locked: "#e0d0c0",
        background: "#1a1a1a", background_tooltip: "rgba(13, 13, 13, 0.75)",
    },
    snow: {
        1: "#f0f0f0", 2: "#c0c0c0", 3: "#808080",
        color: "#f0f0f0", points: "#ffffff", locked: "#d0d0d0",
        background: "#181818", background_tooltip: "rgba(12, 12, 12, 0.75)",
    },
    whitesmoke: {
        1: "#e8e8e8", 2: "#b0b0b0", 3: "#787878",
        color: "#e8e8e8", points: "#f8f8f8", locked: "#c8c8c8",
        background: "#1a1a1a", background_tooltip: "rgba(13, 13, 13, 0.75)",
    },
    lightgray: {
        1: "#d0d0d0", 2: "#a0a0a0", 3: "#707070",
        color: "#d0d0d0", points: "#e8e8e8", locked: "#b8b8b8",
        background: "#1c1c1c", background_tooltip: "rgba(14, 14, 14, 0.75)",
    },
    gainsboro: {
        1: "#dcdcdc", 2: "#acacac", 3: "#7c7c7c",
        color: "#dcdcdc", points: "#f0f0f0", locked: "#c4c4c4",
        background: "#202020", background_tooltip: "rgba(16, 16, 16, 0.75)",
    },
    darkgray: {
        1: "#a0a0a0", 2: "#787878", 3: "#505050",
        color: "#a0a0a0", points: "#c0c0c0", locked: "#888888",
        background: "#282828", background_tooltip: "rgba(20, 20, 20, 0.75)",
    },
    dimgray: {
        1: "#808080", 2: "#606060", 3: "#404040",
        color: "#808080", points: "#a0a0a0", locked: "#686868",
        background: "#2a2a2a", background_tooltip: "rgba(21, 21, 21, 0.75)",
    },
    charcoal: {
        1: "#707070", 2: "#505050", 3: "#383838",
        color: "#707070", points: "#909090", locked: "#585858",
        background: "#1a1a1a", background_tooltip: "rgba(13, 13, 13, 0.75)",
    },
    onyx: {
        1: "#585858", 2: "#404040", 3: "#282828",
        color: "#585858", points: "#787878", locked: "#484848",
        background: "#101010", background_tooltip: "rgba(8, 8, 8, 0.75)",
    },
    jet: {
        1: "#505050", 2: "#383838", 3: "#202020",
        color: "#505050", points: "#707070", locked: "#404040",
        background: "#0a0a0a", background_tooltip: "rgba(5, 5, 5, 0.75)",
    },
    raisin: {
        1: "#604848", 2: "#483030", 3: "#302020",
        color: "#604848", points: "#806868", locked: "#503838",
        background: "#180808", background_tooltip: "rgba(12, 4, 4, 0.75)",
    },
    ebony: {
        1: "#404848", 2: "#283030", 3: "#182020",
        color: "#404848", points: "#606868", locked: "#303838",
        background: "#080c0c", background_tooltip: "rgba(4, 6, 6, 0.75)",
    },
    cafe: {
        1: "#c0a080", 2: "#907860", 3: "#605040",
        color: "#c0a080", points: "#e0c8a8", locked: "#a88868",
        background: "#2a1a0c", background_tooltip: "rgba(21, 13, 6, 0.75)",
    },
    umber: {
        1: "#b09070", 2: "#807050", 3: "#584838",
        color: "#b09070", points: "#d0b898", locked: "#987858",
        background: "#261a0c", background_tooltip: "rgba(19, 13, 6, 0.75)",
    },
    taupe: {
        1: "#b0a090", 2: "#807868", 3: "#585048",
        color: "#b0a090", points: "#d0c0b0", locked: "#988878",
        background: "#201a14", background_tooltip: "rgba(16, 13, 10, 0.75)",
    },
    sage: {
        1: "#c0d0b0", 2: "#90a080", 3: "#607058",
        color: "#c0d0b0", points: "#e0e8d0", locked: "#a8b898",
        background: "#1a2414", background_tooltip: "rgba(13, 18, 10, 0.75)",
    },
    dustyrose: {
        1: "#d0b0b0", 2: "#a08080", 3: "#685858",
        color: "#d0b0b0", points: "#e8d0d0", locked: "#b89898",
        background: "#281818", background_tooltip: "rgba(20, 12, 12, 0.75)",
    },
    thistle: {
        1: "#d0c0d0", 2: "#a090a0", 3: "#706870",
        color: "#d0c0d0", points: "#e8e0e8", locked: "#b8a8b8",
        background: "#201820", background_tooltip: "rgba(16, 12, 16, 0.75)",
    },
    orchid: {
        1: "#e0c0e0", 2: "#b090b0", 3: "#806880",
        color: "#e0c0e0", points: "#f0e0f0", locked: "#c8a8c8",
        background: "#281828", background_tooltip: "rgba(20, 12, 20, 0.75)",
    },
    heliotrope: {
        1: "#d0b0f0", 2: "#a080b0", 3: "#705878",
        color: "#d0b0f0", points: "#e8d0f8", locked: "#b898d0",
        background: "#201030", background_tooltip: "rgba(16, 8, 24, 0.75)",
    },
    lilac: {
        1: "#d0c0e0", 2: "#a090b0", 3: "#706878",
        color: "#d0c0e0", points: "#e8e0f0", locked: "#b8a8c8",
        background: "#1a1428", background_tooltip: "rgba(13, 10, 20, 0.75)",
    },
    mauve: {
        1: "#e0b0d0", 2: "#b080a0", 3: "#805868",
        color: "#e0b0d0", points: "#f0d0e8", locked: "#c898b8",
        background: "#2a1020", background_tooltip: "rgba(21, 8, 16, 0.75)",
    },
    mulberry: {
        1: "#d0a0b0", 2: "#a07080", 3: "#805058",
        color: "#d0a0b0", points: "#e8c8d0", locked: "#b88898",
        background: "#300818", background_tooltip: "rgba(24, 4, 12, 0.75)",
    },
    burgundy: {
        1: "#c09090", 2: "#906868", 3: "#604040",
        color: "#c09090", points: "#e0b0b0", locked: "#a87878",
        background: "#300808", background_tooltip: "rgba(24, 4, 4, 0.75)",
    },
    claret: {
        1: "#c08090", 2: "#905868", 3: "#603840",
        color: "#c08090", points: "#e0a8b8", locked: "#a86878",
        background: "#300008", background_tooltip: "rgba(24, 0, 4, 0.75)",
    },
    vermillion: {
        1: "#e06040", 2: "#b04830", 3: "#803028",
        color: "#e06040", points: "#f09070", locked: "#c85038",
        background: "#400800", background_tooltip: "rgba(32, 4, 0, 0.75)",
    },
    amberlight: {
        1: "#ffe080", 2: "#c0b060", 3: "#807040",
        color: "#ffe080", points: "#fff0b0", locked: "#e0c868",
        background: "#402800", background_tooltip: "rgba(32, 20, 0, 0.75)",
    },
    citrine: {
        1: "#f0e080", 2: "#b0a060", 3: "#706840",
        color: "#f0e080", points: "#f8f0b0", locked: "#d0c068",
        background: "#382400", background_tooltip: "rgba(28, 18, 0, 0.75)",
    },
    peridot: {
        1: "#d0f080", 2: "#a0b060", 3: "#607040",
        color: "#d0f080", points: "#e8f8b0", locked: "#b8d068",
        background: "#203000", background_tooltip: "rgba(16, 24, 0, 0.75)",
    },
    jade: {
        1: "#90e0c0", 2: "#68a090", 3: "#406860",
        color: "#90e0c0", points: "#c0f0e0", locked: "#78c8a8",
        background: "#003020", background_tooltip: "rgba(0, 24, 16, 0.75)",
    },
    malachite: {
        1: "#80e0a0", 2: "#58a070", 3: "#386848",
        color: "#80e0a0", points: "#b0f0c8", locked: "#68c888",
        background: "#003018", background_tooltip: "rgba(0, 24, 12, 0.75)",
    },
    verdigris: {
        1: "#a0e0d0", 2: "#70a8a0", 3: "#486868",
        color: "#a0e0d0", points: "#c8f0e8", locked: "#88c8b8",
        background: "#002828", background_tooltip: "rgba(0, 20, 20, 0.75)",
    },
    cerise: {
        1: "#f080b0", 2: "#b05880", 3: "#803058",
        color: "#f080b0", points: "#f8b0d0", locked: "#d06898",
        background: "#400020", background_tooltip: "rgba(32, 0, 16, 0.75)",
    },
    carnation: {
        1: "#ffb0c0", 2: "#c08090", 3: "#805860",
        color: "#ffb0c0", points: "#ffd8e0", locked: "#e098a8",
        background: "#401020", background_tooltip: "rgba(32, 8, 16, 0.75)",
    },
    hibiscus: {
        1: "#f0a0b0", 2: "#b07080", 3: "#804850",
        color: "#f0a0b0", points: "#f8c8d0", locked: "#d08898",
        background: "#3f0010", background_tooltip: "rgba(31, 0, 8, 0.75)",
    }
}
function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
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
    resizeCanvas();
}