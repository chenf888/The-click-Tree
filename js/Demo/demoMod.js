let modInfo = {
	name: "模组树",
	id: "modbase",
	pointsName: "点数",
	modFiles: ["Demo/layers/c.js", "Demo/layers/f.js", "Demo/layers/a.js", "Demo/demoTree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // 用于完全重置和新玩家
	offlineLimit: 1,  // 单位：小时
}

// 设置你的版本号与版本名
let VERSION = {
	num: "2.6.6",
	name: "固定的现实",
}

let changelog = `<h1>更新日志：</h1><br>
	<h3>v0.0</h3><br>
		- 添加了一些东西。<br>
		- 添加了一些内容。`

let winText = `恭喜！你已经到达终点并通关了这个游戏，但是……`
// 如果你在任何层中添加了新的函数，并且这些函数在被调用时会产生效果，请将它们添加到这里。
// （这里的例子只是示范，所有官方函数都已经处理好了）
var doNotCallTheseFunctionsEveryTick = ["doReset", "buy", "onPurchase", "blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 决定是否显示“点数/秒”
function canGenPoints(){
	return hasUpgrade("c", 11)
}

// 计算点数/秒！
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("c", 12)) gain = gain.times(upgradeEffect("c", 12))
	return gain
}

// 你可以在这里添加与层无关的、需要存入 player 并保存的变量，以及它们的默认值
function addedPlayerData() { return {
	weather: "是",
	happiness: new Decimal(72),
}}

// 在页面顶部显示额外的东西
var displayThings = [
	function() {if (player.points.eq(69)) return "嘻嘻！"},
	function() {if (player.f.points.gt(1)) return `你有 ${player.f.points} 个农场点数。（它们什么用都没有。）`},
	function() {if (inChallenge("c", 11)) return "游戏目前 <h1>0%</h1> 更难了。"},
]

// 决定游戏何时“结束”
function isEndgame() {
	return player.points.gte(new Decimal("11"))
}



// 以下是不太重要的内容！

// 背景样式，可以是函数
var backgroundStyle = {
}

// 如果某些情况会因为长 tick 而出错，可以修改这个最大值
function maxTickLength() {
	return(3600) // 默认为1小时，这个值够大了
}

// 如果你需要撤销旧版本带来的通货膨胀，可以使用这个函数。
// 如果存档版本低于修复问题的版本，可以用此函数限制玩家当前的资源。
function fixOldSave(oldVersion){
}