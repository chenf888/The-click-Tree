var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: [["c1", "c2", "c3", "c4"], ["c5", "c6", "c7"], ["ctrl"]]
}


addNode("blank", {
    layerShown: "ghost",
})

addNode("link1", {
    branches: [["c1", "orange", 3], ["c2", "orange", 3]],
    layerShown: "ghost",
    row: 0,
})
addNode("link2", {
    branches: [["c2", "orange", 3], ["c3", "orange", 3]],
    layerShown: "ghost",
    row: 0,
})
addNode("link3", {
    branches: [["c3", "orange", 3], ["c4", "orange", 3]],
    layerShown: "ghost",
    row: 0,
})
addNode("link4", {
    branches: [["c4", "orange", 3], ["c5", "orange", 3]],
    layerShown: "ghost",
    row: 0,
})
addNode("link5", {
    branches: [["c5", "orange", 3], ["c6", "orange", 3]],
    layerShown: "ghost",
    row: 0,
})
addNode("link6", {
    branches: [["c6", "orange", 3], ["c7", "orange", 3]],
    layerShown: "ghost",
    row: 0,
})


addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})