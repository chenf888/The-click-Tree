// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		forceTooltips: true,
		hideMilestonePopups: false,
		rainbowMode: false,
		noSelect: false,
		noZoom: false,
		compactTree: false,
	}
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
	if (["noSelect","noZoom","compactTree"].includes(name)) applyQoL();
}
var styleCooldown = 0;

function applyQoL() {
	document.body.style.userSelect = options.noSelect ? "none" : "";
	document.body.style.webkitUserSelect = options.noSelect ? "none" : "";
	let meta = document.querySelector('meta[name="viewport"]');
	if (!meta) {
		meta = document.createElement("meta");
		meta.name = "viewport";
		document.head.appendChild(meta);
	}
	meta.content = options.noZoom
		? "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		: "width=device-width, initial-scale=1.0";
	document.documentElement.style.setProperty("--tree-scale", options.compactTree ? "0.7" : "1");
}

function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function toggleRainbow() {
	options.rainbowMode = !options.rainbowMode;
	if (options.rainbowMode) {
		document.body.classList.add("rainbow-mode");
	} else {
		document.body.classList.remove("rainbow-mode");
	}
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate=true
}

const MS_DISPLAYS = ["全部", "最后, 自动, 未完成", "自动化, 未完成", "未完成", "无"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
			break;
		case "automation":
			return (auto) || !complete;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}

let formatOption = (opt) => opt ? '开' : '关'
