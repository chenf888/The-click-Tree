// ************ Save stuff ************
let getModID = () => modInfo.id ?? `${modInfo.name.replace(/\s+/g, '-')}-${modInfo.author.replace(/\s+/g, '-')}`;

function save(force) {
	NaNcheck(player)
	if (NaNalert && !force) return
	localStorage.setItem(getModID(), btoa(unescape(encodeURIComponent(JSON.stringify(player)))));
	localStorage.setItem(getModID()+"_options", btoa(unescape(encodeURIComponent(JSON.stringify(options)))));

}
function startPlayerBase() {
	return {
		tab: layoutInfo.startTab,
		navTab: (layoutInfo.showTree ? layoutInfo.startNavTab : "none"),
		time: Date.now(),
		notify: {},
		versionType: getModID(),
		version: VERSION.num,
		beta: VERSION.beta,
		timePlayed: 0,
		keepGoing: false,
		hasNaN: false,

		points: modInfo.initialStartPoints,
		subtabs: {},
		lastSafeTab: (readData(layoutInfo.showTree) ? "none" : layoutInfo.startTab)
	};
}
function getStartPlayer() {
	playerdata = startPlayerBase();

	if (addedPlayerData) {
		extradata = addedPlayerData();
		for (thing in extradata)
			playerdata[thing] = extradata[thing];
	}

	playerdata.infoboxes = {};
	for (layer in layers) {
		playerdata[layer] = getStartLayerData(layer);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {
			playerdata.subtabs[layer] = {};
			playerdata.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			if (playerdata.subtabs[layer] == undefined)
				playerdata.subtabs[layer] = {};
			for (item in layers[layer].microtabs)
				playerdata.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
		if (layers[layer].infoboxes) {
			if (playerdata.infoboxes[layer] == undefined)
				playerdata.infoboxes[layer] = {};
			for (item in layers[layer].infoboxes)
				playerdata.infoboxes[layer][item] = false;
		}

	}
	return playerdata;
}
function getStartLayerData(layer) {
	layerdata = {};
	if (layers[layer].startData)
		layerdata = layers[layer].startData();

	if (layerdata.unlocked === undefined)
		layerdata.unlocked = true;
	if (layerdata.total === undefined)
		layerdata.total = decimalZero;
	if (layerdata.best === undefined)
		layerdata.best = decimalZero;
	if (layerdata.resetTime === undefined)
		layerdata.resetTime = 0;
	if (layerdata.forceTooltip === undefined)
		layerdata.forceTooltip = false;

	layerdata.buyables = getStartBuyables(layer);
	if (layerdata.noRespecConfirm === undefined) layerdata.noRespecConfirm = false
	if (layerdata.clickables == undefined)
		layerdata.clickables = getStartClickables(layer);
	layerdata.spentOnBuyables = decimalZero;
	layerdata.upgrades = [];
	layerdata.milestones = [];
	layerdata.lastMilestone = null;
	layerdata.achievements = [];
	layerdata.challenges = getStartChallenges(layer);
	layerdata.grid = getStartGrid(layer);
	layerdata.prevTab = ""

	return layerdata;
}
function getStartBuyables(layer) {
	let data = {};
	if (layers[layer].buyables) {
		for (id in layers[layer].buyables)
			if (isPlainObject(layers[layer].buyables[id]))
				data[id] = decimalZero;
	}
	return data;
}
function getStartClickables(layer) {
	let data = {};
	if (layers[layer].clickables) {
		for (id in layers[layer].clickables)
			if (isPlainObject(layers[layer].clickables[id]))
				data[id] = "";
	}
	return data;
}
function getStartChallenges(layer) {
	let data = {};
	if (layers[layer].challenges) {
		for (id in layers[layer].challenges)
			if (isPlainObject(layers[layer].challenges[id]))
				data[id] = 0;
	}
	return data;
}
function getStartGrid(layer) {
	let data = {};
	if (! layers[layer].grid) return data
	if (layers[layer].grid.maxRows === undefined) layers[layer].grid.maxRows=layers[layer].grid.rows
	if (layers[layer].grid.maxCols === undefined) layers[layer].grid.maxCols=layers[layer].grid.cols

	for (let y = 1; y <= layers[layer].grid.maxRows; y++) {
		for (let x = 1; x <= layers[layer].grid.maxCols; x++) {
			data[100*y + x] = layers[layer].grid.getStartData(100*y + x)
		}
	}
	return data;
}

function fixSave() {
	defaultData = getStartPlayer();
	fixData(defaultData, player);

	for (layer in layers) {
		if (player[layer].unlocked === undefined)
			player[layer].unlocked = false;
		if (player[layer].points !== undefined)
			player[layer].points = new Decimal(player[layer].points);
		if (player[layer].best !== undefined)
			player[layer].best = new Decimal(player[layer].best);
		if (player[layer].total !== undefined)
			player[layer].total = new Decimal(player[layer].total);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {

			if (!Object.keys(layers[layer].tabFormat).includes(player.subtabs[layer].mainTabs))
				player.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			for (item in layers[layer].microtabs)
				if (!Object.keys(layers[layer].microtabs[item]).includes(player.subtabs[layer][item]))
					player.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
	}
}
function fixData(defaultData, newData) {
	for (item in defaultData) {
		if (defaultData[item] == null) {
			if (newData[item] === undefined)
				newData[item] = null;
		}
		else if (Array.isArray(defaultData[item])) {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else if (defaultData[item] instanceof Decimal) { // Convert to Decimal
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				newData[item] = new Decimal(newData[item]);
		}
		else if ((!!defaultData[item]) && (typeof defaultData[item] === "object")) {
			if (newData[item] === undefined || (typeof defaultData[item] !== "object"))
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];
		}
	}
}
function load() {
	let get = localStorage.getItem(getModID());

	if (get === null || get === undefined) {
		player = getStartPlayer();
		options = getStartOptions();
	}
	else {
		player = Object.assign(getStartPlayer(), JSON.parse(decodeURIComponent(escape(atob(get)))));
		fixSave();
		loadOptions();
	}

	if (options.offlineProd) {
		if (player.offTime === undefined)
			player.offTime = { remain: 0 };
		player.offTime.remain += (Date.now() - player.time) / 1000;
	}
	player.time = Date.now();
	versionCheck();
	changeTheme();
	changeTreeQuality();
	if (options.rainbowMode) document.body.classList.add("rainbow-mode");
	updateLayers();
	setupModInfo();

	setupTemp();
	updateTemp();
	updateTemp();
	updateTabFormats()
	loadVue();
	applyQoL();
}

function loadOptions() {
	let get2 = localStorage.getItem(getModID()+"_options");
	if (get2) 
		options = Object.assign(getStartOptions(), JSON.parse(decodeURIComponent(escape(atob(get2)))));
	else 
		options = getStartOptions()
	if (themes.indexOf(options.theme) < 0) theme = "default"
	fixData(options, getStartOptions())

}

function setupModInfo() {
	modInfo.changelog = changelog;
	modInfo.winText = winText ? winText : `Congratulations! You have reached the end and beaten this game, but for now...`;

}
function fixNaNs() {
	NaNcheck(player);
}
function NaNcheck(data) {
	for (item in data) {
		if (data[item] == null) {
		}
		else if (Array.isArray(data[item])) {
			NaNcheck(data[item]);
		}
		else if (data[item] !== data[item] || checkDecimalNaN(data[item])) {
			if (!NaNalert) {
				clearInterval(interval);
				NaNalert = true;
				alert("Invalid value found in player, named '" + item + "'. Please let the creator of this mod know! You can refresh the page, and you will be un-NaNed.")
				return
			}
		}
		else if (data[item] instanceof Decimal) {
		}
		else if ((!!data[item]) && (data[item].constructor === Object)) {
			NaNcheck(data[item]);
		}
	}
}
function exportSave() {
	let str = btoa(unescape(encodeURIComponent(JSON.stringify(player))));
	navigator.clipboard.writeText(str).then(() => {
		alert("存档已复制到剪贴板！");
	}).catch(() => {
		const el = document.createElement("textarea");
		el.value = str;
		document.body.appendChild(el);
		el.select();
		el.setSelectionRange(0, 99999);
		document.execCommand("copy");
		document.body.removeChild(el);
	});
}
function importSave(imported = undefined, forced = false) {
	if (!imported) return;
	localStorage.setItem(getModID(), imported);
	window.location.reload();
}

function showImportDialog() {
	let existing = document.getElementById("importOverlay");
	if (existing) existing.remove();

	let overlay = document.createElement("div");
	overlay.id = "importOverlay";
	overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;";

	let box = document.createElement("div");
	box.style.cssText = "background:#222;border:2px solid #888;border-radius:12px;padding:20px;width:600px;max-width:90vw;text-align:center;color:#eee;font-family:'Lucida Console',monospace;";

	let title = document.createElement("h2");
	title.textContent = "导入存档";
	title.style.cssText = "margin:0 0 12px 0;color:#FFD700;";
	box.appendChild(title);

	let textarea = document.createElement("textarea");
	textarea.placeholder = "在此粘贴存档代码...";
	textarea.style.cssText = "width:100%;height:180px;background:#111;color:#fff;border:1px solid #555;border-radius:6px;padding:8px;font-family:monospace;font-size:13px;resize:vertical;";
	box.appendChild(textarea);

	let btnRow = document.createElement("div");
	btnRow.style.cssText = "margin-top:14px;display:flex;gap:12px;justify-content:center;";

	let cancelBtn = document.createElement("button");
	cancelBtn.textContent = "取消";
	cancelBtn.style.cssText = "padding:8px 28px;border-radius:6px;border:none;background:#555;color:#fff;cursor:pointer;font-size:15px;";
	cancelBtn.onclick = () => overlay.remove();
	btnRow.appendChild(cancelBtn);

	let confirmBtn = document.createElement("button");
	confirmBtn.textContent = "确定导入";
	confirmBtn.style.cssText = "padding:8px 28px;border-radius:6px;border:none;background:#4CAF50;color:#fff;cursor:pointer;font-size:15px;font-weight:bold;";
	confirmBtn.onclick = () => {
		let val = textarea.value.trim();
		if (!val) { alert("请先粘贴存档代码！"); return; }
		overlay.remove();
		importSave(val);
	};
	btnRow.appendChild(confirmBtn);

	box.appendChild(btnRow);
	overlay.appendChild(box);
	document.body.appendChild(overlay);
	textarea.focus();
}
function versionCheck() {
	let setVersion = true;

	if (player.versionType === undefined || player.version === undefined) {
		player.versionType = getModID();
		player.version = 0;
	}

	if (setVersion) {
		if (player.versionType == getModID() && VERSION.num > player.version) {
			player.keepGoing = false;
			if (fixOldSave)
				fixOldSave(player.version);
		}
		player.versionType = getStartPlayer().versionType;
		player.version = VERSION.num;
		player.beta = VERSION.beta;
	}
}
var saveInterval = setInterval(function () {
	if (player === undefined)
		return;
	if (tmp.gameEnded && !player.keepGoing)
		return;
	if (options.autosave)
		save();
}, 5000);

window.onbeforeunload = () => {
    if (player.autosave) {
        save();
    }
};