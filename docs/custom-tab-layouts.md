# 自定义标签页布局

注意：如果你使用了子标签页（subtabs），`tabFormat` 的用法会有所不同，但定义其布局的格式是一样的。[关于子标签页的更多信息请参见此处](subtabs-and-microtabs.md)。

自定义标签页布局可以让你在标签页窗口中实现几乎任何内容，尤其是与层的 `style` 特性结合使用时。`tabFormat` 特性是一个数组，包含如下内容：

```js
tabFormat: [
    "main-display",
    ["prestige-button"],
    "blank",
    ["display-text",
        function() { return '我有 ' + format(player.points) + ' 个尖尖的点数！' },
        { "color": "red", "font-size": "32px", "font-family": "Comic Sans MS" }],
    "blank",
    ["toggle", ["c", "beep"]],
    "milestones",
    "blank",
    "blank",
    "upgrades"
]
```

这是一个组件列表，每个组件可以只是一个名称，或者是一个带参数的数组。如果是数组，第一个元素是组件的名称，第二个是传递给组件的数据，第三个（可选）是一个“CSS 对象”，用于对该组件应用 CSS 样式，其中键是 CSS 属性。

以下是现有的组件，你也可以在 [components.js](/js/components.js) 中创建更多组件：

- `display-text`：显示一些文本（可以使用基础 HTML）。参数是要显示的文本。也可以是一个返回动态文本的函数。

- `display-image`：显示一张图片。参数是图片的 URL。

- `h-line`、`v-line`：分别显示一条水平或垂直的分隔线。

- `raw-html`：显示一些基础 HTML，也可以是一个函数。

- `blank`：添加空白空间。默认尺寸为 8px × 17px。参数可以改变尺寸。如果是一个单独的值（例如 `"20px"`），则决定高度。如果提供两个参数，第一个是宽度，第二个是高度。

- `row`：水平显示一组组件。参数是一个数组，数组中的元素是标签页布局格式的组件。

- `column`：垂直显示一组组件。参数是一个数组，数组中的元素是标签页布局格式的组件。这在一行内需要显示多列时非常有用。

- `main-display`：显示该层主要货币及其效果的文本。参数是精度（小数位数），允许显示非整数。

- `resource-display`：显示该层所基于的货币，以及该层 prestige 货币的最佳值和/或总值（如果这些值已放入该层的 `startData` 中）。

- `prestige-button`：用于重置该层货币的按钮。

- `text-input`：一个文本输入框。参数是 `player[layer]` 中该输入框所对应的变量名，即 `player[layer][argument]`（适用于字符串、数字和 `Decimal`！）

- `slider`：让用户通过滑块输入一个值。参数是一个三元数组：`[名称, 最小值, 最大值]`。名称是 `player[layer]` 中该输入框所对应的变量名，最小值和最大值是滑块的限制。（不适用于 `Decimal` 值）

- `drop-down`：让用户通过下拉菜单输入一个值。参数是一个二元数组：`[名称, 选项数组]`。名称是 `player[layer]` 中该输入框所对应的变量名，选项数组是一个字符串数组，表示可用的选项。

- `upgrades`、`milestones`、`challenges`、`achievements`、`buyables`、`clickables`：分别显示该层的升级/里程碑/挑战/成就/可购买项/可点击项。参数是可选的，如果不想包含所有行，可以指定该组件应包含哪些行的列表。

- `microtabs`：为一个区域显示一组子标签页。参数是 `microtabs` 特性中定义的微标签页集合的名称。

- `bar`：显示一个进度条。参数是要显示的进度条的 id。

- `infobox`：显示一个信息框。参数是要显示的信息框的 id。

- `tree`：显示一个树。参数是一个数组的数组，包含树中节点的名称（先按行，再按列）。[关于树布局和节点的更多信息请参见此处！](trees-and-tree-customization.md)

- `upgrade-tree`、`buyable-tree`、`clickable-tree`：显示本层中升级/可购买项/可点击项的树形结构。参数是一个数组的数组，包含树中升级等的 id（先按行，再按列）。一棵树中只能包含一种类型的组件。

- `toggle`：一个切换按钮，用于切换一个布尔值。参数是一个二元组，用于标识要切换的布尔值在 `player` 中的位置，例如 `[layer, id]`。`layer` 也会影响切换按钮的颜色。

- `grid`：显示该层的网格（gridable）。如果你需要多个网格，可以使用层代理（layer proxy）。参数是可选的，如果不想包含所有行，可以指定该组件应包含哪些行的列表。

- `layer-proxy`：让你可以使用另一层的组件。参数是一个二元组 `[layer, data]`，包含要代理的层的 id，以及要显示的组件的 `tabFormat`。（注意：你不能在层代理内部使用微标签页）

其余组件是子组件。它们可以像其他组件一样使用，但通常作为其他组件的一部分出现。

- `upgrade`、`milestone`、`challenge`、`buyable`、`clickable`、`achievement`、`gridable`：单个升级、挑战等。参数是 id。例如，当你希望将升级拆分到多个子标签页中时，可以使用这种方式。

- `respec-button`、`master-button`：分别对应可购买项和可点击项的重置按钮和主按钮。

- `sell-one`、`sell-all`：分别对应可购买项的“出售一个”和“出售全部”按钮。参数是可购买项的 id。