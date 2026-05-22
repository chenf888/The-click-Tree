# 层特性

这是一个更全面的现有特性列表，用于添加到层中。如果你想为层关联其他函数或值，也可以自由添加。不过，以下这些特性具有特殊功能。

你可以将几乎所有值设置为动态的（使用函数代替），包括所有显示字符串和样式/颜色特性。

## 层定义特性

- `layer`：**自动分配**。它的值与该层的名称相同，因此你可以使用 `player[this.layer].points` 之类的写法来访问保存的值。这使得将代码复制到新层更加容易。该值也会被赋予所有升级、可购买项等。

- `name`：**可选**。用于重置确认（以及默认信息框的标题）。如果省略，则直接使用层的 id。

- `startData()`：一个函数，返回该层的默认存档数据。将你拥有的任何变量添加进去。请确保使用 `Decimal` 值而不是普通数字。

    标准值：
        - 必需：
            - `unlocked`：布尔值，决定该层是否已解锁
            - `points`：Decimal，该层的主要货币
        - 可选：
            - `total`：Decimal，追踪主要 prestige 货币的总获得量。始终被追踪，但只有当你在这里添加它时才会显示。
            - `best`：Decimal，追踪主要 prestige 货币的历史最高值。始终被追踪，但只有当你在这里添加它时才会显示。
            - `unlockOrder`：用于记录在此层之前解锁的相关层。
            - `resetTime`：数字，自上次重置该层（或被其他层重置）以来经过的时间。

- `color`：与该层关联的颜色，在许多地方使用。（带 # 的十六进制字符串）

- `row`：层所在的行，从 0 开始。这会影响节点在标准树上的出现位置，以及哪些重置会影响该层。

    使用 `"side"` 而不是数字会使该层作为一个小型节点显示在侧边（适用于成就和统计）。侧边层不受重置影响，除非你为它们添加了 `doReset`。

- `displayRow`：**覆盖**。在不改变重置顺序的情况下更改层节点的显示行位置。

- `resource`：通过重置该层获得的主要货币的名称。

- `effect()`：**可选**。一个函数，计算并返回主要货币本身带来的任何当前加成值。可以返回一个数值，或者一个包含多个数值的对象。*你还必须在效果生效的地方实现该效果。*

- `effectDescription`：**可选**。一个返回此效果描述的函数。如果文本保持不变，也可以直接是一个字符串。

- `layerShown()`：**可选**。返回布尔值的函数，决定该层的节点是否应在树中显示。也可以返回 `"ghost"`，这将隐藏该层，但其节点仍会占据树中的空间。默认为 `true`。

- `hotkeys`：**可选**。一个数组，包含与该层关联的任何热键信息：

    ```js
    hotkeys: [
        {
            key: "p", // 热键按键。如果要与 Shift 组合请使用大写，或使用 "ctrl+x" 表示按住 ctrl。
            description: "p: 重置点数以获得 prestige 点数", // 在游戏的“如何游玩”标签页中显示的热键描述
            onPress() { if (player.p.unlocked) doReset("p") },
            unlocked() {return hasMilestone('p', 3)} // 决定是否可以使用热键，可选
        }
    ]
    ```

- `style`：**可选**。一个“CSS 对象”，其中键是 CSS 属性，包含任何应影响该层整个标签页的 CSS。

- `tabFormat`：**可选**。如果你想向标签页添加额外内容或更改布局，请使用此特性。[更多信息请参见此处。](custom-tab-layouts.md)

- `midsection`：**可选**。`tabFormat` 的替代方案，会被插入到标准标签页布局中的里程碑和可购买项之间。（不能使用子标签页）

## 大型功能（均为可选）

- `upgrades`：一组一次性购买项，可以具有独特的解锁条件、货币成本和加成。[更多信息请参见此处。](upgrades.md)

- `milestones`：在达到资源的某些阈值时获得的加成列表。常用于自动化/体验改善。[更多信息请参见此处。](milestones.md)

- `challenges`：玩家可以进入挑战，这会使游戏变得更难。如果达成目标并击败挑战，他们将获得奖励。[更多信息请参见此处。](challenges.md)

- `buyables`：本质上是可多次购买的升级，并且可以选择洗点。用途广泛。[更多信息请参见此处。](buyables.md)

- `clickables`：极其通用且灵活的按钮，只能在某些时候点击。[更多信息请参见此处。](clickables.md)

- `microtabs`：一个功能类似于一组子标签页的区域，顶部的按钮会改变其中的内容。（高级）[更多信息请参见此处。](subtabs-and-microtabs.md)

- `bars`：以进度条、仪表盘或类似形式显示一些信息。它们高度可定制，也支持垂直方向。[更多信息请参见此处。](bars.md)

- `achievements`：有点像里程碑，但显示样式不同且有一些其他区别。后续会有更多功能！[更多信息请参见此处。](achievements.md)

- `achievementPopups`、`milestonePopups`：**可选**。如果为 `false`，则获得成就/里程碑时禁用弹窗消息。默认为 `true`。

- `infoboxes`：在可显示或隐藏的框中显示一些文本。[更多信息请参见此处。](infoboxes.md)

- `grid`：一组行为相同但拥有各自数据的按钮网格。[更多信息请参见此处。](grids.md)

## Prestige 公式特性

- `type`：**可选**。决定使用哪种 prestige 公式。默认为 `"none"`。

    - `"normal"`：获得的 prestige 货币数量与其当前数量无关（类似于 Prestige）。加成前的公式基于 `baseResource^exponent`
    - `"static"`：成本依赖于重置后的总额。加成前的公式基于 `base^(x^exponent)`
    - `"custom"`：你可以自己定义所有内容，从计算到按钮上的文字。（详见底部）
    - `"none"`：该层不进行 prestige，因此不需要本节中的任何其他特性。

- `baseResource`：决定重置时获得多少主要 prestige 货币的资源的名称。

- `baseAmount()`：一个函数，获取基础资源的当前值。

- `requires`：一个 `Decimal`，表示获得 1 个 prestige 货币所需的基础资源数量。同时也是解锁该层所需的数量。你也可以将其设为一个函数，使其在另一层先解锁的情况下变得更难（基于 `unlockOrder`）。

- `exponent`：如上所述使用。

- `base`：**有时需要**。对于 `"static"` 层必需，如上所述使用。如果省略，默认为 2。必须大于 1。

- `roundUpCost`：**可选**。布尔值，如果资源成本需要向上取整，则为 `true`。（当基础资源是“static”类型货币时使用）

- `gainMult()`、`gainExp()`：**可选**。对于普通层，这些函数计算来自升级和加成等的资源收益乘数和指数。大多数加成请放在这里。对于 static 层，它们分别乘以资源成本和对成本开根号。（因此要制作加成，你需要让 gainMult 变小，gainExp 变大）

- `directMult()`：**可选**。在指数和软上限之后，直接乘以资源收益。对于 static 层，实际上是乘以资源收益，而不是减少成本。

- `softcap`、`softcapPower`：**可选**。对于普通层，超出 [softcap] 的收益会被取 [softcapPower] 次幂。softcap 默认为 1e7，power 默认为 0.5。

## 其他 Prestige 相关特性

- `canBuyMax()`：**有时需要**。对于 static 层必需，用于判断是否允许购买最大数量的函数。

- `onPrestige(gain)`：**可选**。当该层进行 prestige 时、在获得货币之前触发的函数。可用于在 prestige 时获得次级资源，或重新计算某些内容等。

- `resetDescription`：**可选**。用于将 Prestige 按钮上的“重置以获取 ”替换为其他文字。

- `prestigeButtonText()`：**有时需要**。用于完全自定义 Prestige 按钮上的文字。仅对 custom 层必需，但所有类型都可以使用。

- `passiveGeneration()`：**可选**，返回一个普通数字。你每秒会自动生成收益乘以这个数字的点数（如果省略则无效）。这对于自动化普通层很有用。

- `autoPrestige()`：**可选**，返回一个布尔值。如果为 `true`，该层会在可能时自动进行 prestige。这对于自动化 static 层很有用。

## 树/节点特性

- `symbol`：**可选**。显示在该层节点上的文本。默认为首字母大写的层 id。

- `image`：**覆盖**。节点上显示的图片的 URL（本地或全局）。（覆盖 `symbol`）

- `position`：**可选**。决定在标准树中该层在其行内的水平位置。默认情况下，使用层 id，层按字母顺序排序。

- `branches`：**可选**。一个包含层/节点 id 的数组。在树上，会从该层到列表中的所有层显示一条连线。另外，数组中的条目也可以是一个二元数组，包含层 id 和一个颜色值。颜色值可以是一个十六进制颜色代码字符串，或者一个 1-3 的数字（受主题影响的颜色）。数组中的第三个元素可选地指定线宽。

- `nodeStyle`：**可选**。一个 CSS 对象，其中键是 CSS 属性，用于样式化该层在树上的节点。

- `tooltip()` / `tooltipLocked()`：**可选**。返回文本的函数，分别表示层解锁或锁定时节点的提示框。默认情况下提示框的行为与原始 Prestige Tree 相同。如果值为 `""`，则禁用提示框。

- `marked`：**可选**。在节点的角上添加一个标记。如果为 `true`，则显示星形；也可以是一个图片 URL。

## 其他特性

- `doReset(resettingLayer)`：**可选**。当在行号大于或等于该层的层上进行重置时触发。默认行为是重置该行上的所有内容，但仅当它是由更高行的层触发时才会发生。对于侧边层，`doReset` 总是被调用，但默认行为是什么都不重置。

    如果你希望保留某些内容，请根据 `resettingLayer`、`milestones` 等决定保留什么，然后调用 `layerDataReset(layer, keep)`，其中 `layer` 是当前层，`keep` 是一个包含要保留内容名称的数组。它可以包含诸如 `"points"`、`"best"`、`"total"`（对于该层的 prestige 货币）、`"upgrades"`、任何独特的变量如 `"generatorPower"` 等。如果你只想保留特定的升级或类似内容，请将它们保存在一个单独的变量中，然后调用 `layerDataReset`，再将 `player[this.layer].upgrades` 设置为保存的升级。

- `update(diff)`：**可选**。此函数在每个游戏 tick 时调用。用于任何被动资源生产或基于时间的事情。`diff` 是自上一个 tick 以来经过的时间。

- `autoUpgrade`：**可选**，布尔值。如果为 `true`，游戏会尝试在每个 tick 购买该层的升级。默认为 `false`。

- `automate()`：**可选**。此函数在每个游戏 tick 的生产之后调用。用于激活其他方式不支持的自动化内容。

- `resetsNothing`：**可选**。如果返回 `true`，则该层在 prestige 时不应触发任何重置。

- `increaseUnlockOrder`：**可选**。一个包含层 id 的数组。当该层首次解锁时，此列表中任何尚未解锁的层的 `unlockOrder` 值都会增加。这可用于使它们更难解锁。

- `shouldNotify`：**可选**。一个函数，如果该层应在树中高亮显示则返回 `true`。无论你是否拥有此函数，只要你能购买升级，层就会自动高亮显示。

- `glowColor`：**可选**。如果层需要通知，它将被高亮显示的颜色。默认为红色。如果你想要几种不同的通知类型，可以使用此特性！

- `componentStyles`：**可选**。一个对象，包含一组返回 CSS 对象的函数。每个函数将应用于层上具有其 id 对应类型的任何组件。示例：

```js
componentStyles: {
    "challenge"() { return {'height': '200px'} },
    "prestige-button"() { return {'color': '#AA66AA'} }
}
```

- `leftTab`：**可选**。如果为 `true`，该层将使用左侧标签页而不是右侧标签页。

- `previousTab`：**可选**，一个层的 id。如果一个层有 `previousTab`，则该层将始终显示一个返回箭头，按下该层上的返回箭头将带你前往具有该 id 的层。

- `deactivated`：**可选**。如果为 `true`，则 `hasUpgrade`、`hasChallenge`、`hasAchievement` 和 `hasMilestone` 对该层中的内容将返回 `false`，你将无法购买或点击任何东西，也无法获得该层上的成就/里程碑。你需要自己禁用可购买项的效果、层的内在效果以及可能其他内容。

## 自定义 Prestige 类型
（以下所有内容也可被其他 prestige 类型使用）

- `getResetGain()`：**主要用于自定义 prestige 类型**。返回如果现在重置你应该获得多少点数。你可以调用 `getResetGain(this.layer, useType = "static")` 或类似方法，来计算在另一种 prestige 类型下的收益（前提是该层具有所需的所有特性）。

- `getNextAt(canMax=false)`：**主要用于自定义 prestige 类型**。返回需要多少基础资源才能达到下一个点数。`canMax` 是一个可选变量，用于类似 static 的层，以区分是在寻找可以重置的第一个点，还是获得任何收益所需的条件（最好同时支持两者）。你也可以调用 `getNextAt(this.layer, canMax=false, useType = "static")` 或类似方法，来计算在另一种 prestige 类型下的“下一次所需”（前提是该层具有所需的所有特性）。

- `canReset()`：**主要用于自定义 prestige 类型**。仅当你有足够的资源进行 prestige 时返回 `true`。

- `prestigeNotify()`：**主要用于自定义 prestige 类型**，如果该层应被轻微高亮以提示你可以进行有意义的 prestige，则返回 `true`。