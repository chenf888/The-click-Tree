# 基础层剖析

这是一个功能相对最简化的层，只有很少的特性。大多数情况需要额外的特性。

```js
addLayer("p", {
    startData() { return {                  // startData 是一个函数，返回层的默认数据。
        unlocked: true,                     // 你可以在这里添加更多变量，将它们加入到你的层中。
        points: new Decimal(0),             // "points" 是该层主要资源内部使用的名称。
    }},

    color: "#4BDC13",                       // 该层的颜色，会影响许多元素。
    resource: "prestige points",            // 该层主要 prestige 资源的显示名称。
    row: 0,                                 // 该层所在的行（0 是第一行）。

    baseResource: "points",                 // prestige 收益所基于的资源名称。
    baseAmount() { return player.points },  // 返回当前 baseResource 数量的函数。

    requires: new Decimal(10),              // 获得 1 个 prestige 货币所需的 baseResource 数量。
                                            // 同时也是解锁该层所需的数量。

    type: "normal",                         // 决定用于计算 prestige 货币的公式。
    exponent: 0.5,                          // "normal" 类型的 prestige 收益为 (currency^exponent)。

    gainMult() {                            // 返回 prestige 资源收益的乘数。
        return new Decimal(1)               // 在这里填入任何乘数类的加成。
    },
    gainExp() {                             // 返回 prestige 资源收益的指数。
        return new Decimal(1)
    },

    layerShown() { return true },          // 返回布尔值，决定该层节点是否应在树中显示。

    upgrades: {
        // 查看升级文档了解这里应该放什么！
    },
})