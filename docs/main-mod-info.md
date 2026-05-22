# mod.js

大多数你可能编辑的非层代码和数据都在 [mod.js](/js/mod.js) 中。
[mod.js](/js/mod.js) 中的所有内容都不会被更新所更改，除了新增内容之外。

以下是其中的内容详解：

- `modInfo` 是模组大部分基础配置所在。它包含：
    - `name`：你的模组名称。（字符串）
    - `id`：你的模组 id，一个唯一字符串，用于确定存档文件位置。在开始制作模组时请务必设置它，之后不要更改，否则会清除所有存档。
    - `author`：作者名称，显示在信息标签页中。
    - `pointsName`：更改主货币显示时替代“points”的文本。（不影响代码中的名称）
    - `modFiles`：一个文件地址数组，这些文件将被加载用于此模组。使用较小的文件可以让你更容易找到所需内容。

    - `discordName`、`discordLink`：如果你有 Discord 服务器或其他讨论区，可以添加链接。

        `discordName` 是链接上的文本，`discordLink` 是邀请的 URL。如果使用 Discord 邀请，请确保设置为永不过期。

    - `offlineLimit`：玩家可以累积的最大离线时间，以小时为单位。超出部分会丢失。（数字）

        这很有用，因为大多数这类模组节奏较快，过多的离线时间会破坏平衡，例如更新之间的时间。这就是我建议开发者在自己的存档上禁用离线时间的原因。

    - `initialStartPoints`：一个新玩家应该拥有的初始点数，用 `Decimal` 表示。

- `VERSION` 用于描述你模组的当前版本。它包含：
    - `num`：模组的版本号，显示在树标签页的右上角。
    - `name`：版本的名称，与版本号一同显示在信息标签页中。

- `changelog` 是显示在更新日志标签页中的 HTML。如果它变得特别长，最好放入单独的文件中（请务必将该文件添加到 index.html）。

- `doNotCallTheseFunctionsEveryTick` 非常重要，如果你正在添加非标准函数的话。TMT 会在每个 tick 调用 `layers` 中任何地方的每个函数并存储结果，除非特别告知不要这样做。用于执行操作的函数需要被识别出来。“官方”函数（文档中列出的那些）都没问题，但如果你创建任何新函数，请将它们的名称添加到此数组中。

```js
// （这里的是示例，所有官方函数都已处理）
var doNotCallTheseFunctionsEveryTick = ["doReset", "buy", "onPurchase", "blowUpEverything"]
```

- `getStartPoints()`：一个用于确定重置后玩家初始点数的函数。（返回 `Decimal` 值）

- `canGenPoints()`：返回布尔值的函数，用于判断是否应该生成点数。如果你想用一个升级来解锁点数生成，可以使用它。

- `getPointGen()`：计算你每秒点数的函数。任何影响点数获得的内容都应放入此计算中。

- `addedPlayerData()`：一个函数，返回你想要添加到存档数据和 `player` 对象中的任何与层无关的数据。

```js
function addedPlayerData() { return {
    weather: "Yes",
    happiness: new Decimal(72),
}}
```

- `displayThings`：一个函数数组，用于在树标签页顶部显示额外内容。每个函数返回一个字符串，即要显示的一行文本（支持基础 HTML）。如果函数不返回任何内容，则什么都不显示（也不占用一行）。

- `isEndgame()`：一个函数，用于判断玩家是否已到达游戏终点，到达后会显示“你赢了！”画面。

以下是不太重要的内容！

- `backgroundStyle`：一个 CSS 对象，包含整个游戏背景的样式。也可以是一个函数！

- `maxTickLength()`：返回最大 tick 长度，以毫秒为单位。仅在你拥有随时间减少且长 tick 会干扰（通常是挑战）的内容时才有用。

- `fixOldSave()`：可用于在加载到新版本游戏时修改存档文件。使用此函数来撤销通货膨胀，永远不要强制硬重置你的玩家。