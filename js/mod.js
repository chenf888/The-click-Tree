let modInfo = {
	name: "点击树",
	author: "陈风就是浪",
	pointsName: "点击次数",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0),
	offlineLimit: 1,
}

let VERSION = {
	num: "0.11",
	name: "CLICK",
}

let changelog = `<h1>更新日志：</h1><br>
    <h3>v0.11</h3><br>
		- 添加了新的点击升级和里程碑以及很多BUG<br>
	<h3>v0.1</h3><br>
		- 新增层 "click 1"，可点击按钮获得点击分数。<br>
		- 4 个点击升级,3 个里程碑。<br>
		- 增加 4 个成就。<br>`

let winText = `恭喜！你已经到达终点并通关了这个游戏，但是……`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints() {
	return true
}

function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	return gain
}

function addedPlayerData() {
	return {
	}
}

var displayThings = [
]

function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}

var backgroundStyle = {

}

function maxTickLength() {
	return (3600)
}

function fixOldSave(oldVersion) {
}