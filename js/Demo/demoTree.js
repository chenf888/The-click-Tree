// 如果使用 treeLayout，将覆盖默认树的布局
var layoutInfo = {
    startTab: "c",
    startNavTab: "tree-tab",

    showTree: true,

    //treeLayout: ""
}

// 一个用于在树中偏移 f 的“幽灵”层
addNode("spook", {
    row: 1,
    layerShown: "ghost",
})

// 一个用于在树中偏移 f 的“幽灵”层
addNode("g", {
    symbol: "TH",
    branches: [["c", "red", 4]],
    color: '#6d3678',
    layerShown: true,
    canClick() {return player.points.gte(10)},
    tooltip: "灭掉你一半的点数",
    tooltipLocked: "灭掉你一半的点数",
    onClick() {player.points = player.points.div(2)
    console.log(this.layer)}
})

// 一个用于在树中偏移 f 的“幽灵”层
addNode("h", {
    branches: ["g"],
    layerShown: true,
    tooltip() {return "将你的点数恢复到 " + player.c.otherThingy},
    tooltipLocked() {return "将你的点数恢复到 " + player.c.otherThingy},
    row: "side",
    canClick() {return player.points.lt(player.c.otherThingy)},
    onClick() {player.points = new Decimal(player.c.otherThingy)}
})

addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
    style() {return  {'background-color': '#222222'}},
})