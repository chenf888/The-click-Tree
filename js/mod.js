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
	num: "0.32",
	name: "The Click Tree",
}

let changelog = `<h1>更新日志：</h1><br>
    <h3>v0.32</h3><br>
        修了一些bug，更改了游戏部分机制，添加了更多软上限<br>
		删除了100个主题<br>
		添加了一些提高游戏体验的选项和一个层级<br>
    <h3>v0.31</h3><br>
        修了一些bug<br>
    <h3>v0.3</h3><br>
		添加了更多的无意义内容，现在的点击墙已经变得超级大<br>
		你最少需要点击1500亿下才能抵达残局<br>
		你害怕了吗？<br>
    <h3>v0.21</h3><br>
	    为全局提供了中文翻译<br>
        新增100种主题样式和全局炫彩模式（你喜欢彩虹吗？）<br>
		<span style="color: #888; font-size: 12px;">如果你也想为你的tree添加炫彩模式，可以参考<a href="css/rainbow.css" target="_blank" style="color: #888;">rainbow.css</a>文件，或者直接使用它！点击文件名快速跳转。</span><br>
    <h3>v0.2</h3><br>
		添加了3个层，大大加强了点击墙，哈哈哈<br>
		游戏体验史诗级降低<br>
		zako zako艾斯贼<br>
    <h3>v0.12</h3><br>
		修复了一些BUG<br>
    <h3>v0.11</h3><br>
		添加了c2层和新的点击升级和里程碑以及很多BUG<br>
	<h3>v0.1</h3><br>
		新增 "click 1" 层<br>`

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