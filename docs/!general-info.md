# The Modding Tree

使用 The Modding Tree 制作游戏主要是为对象定义参数或函数。如果你还没有阅读[入门指南](tutorials/getting-started.md)，你应该先在 [mod.js](/js/mod.js) 中[设置你的基本模组信息](main-mod-info.md)。设置一个模组 ID 很重要，这样可以确保存档正常运作。

除此之外，添加内容的主要方式是通过创建“层”。你可以调用 `addLayer(layername, layerdata)` 来添加新层。[layers.js](/js/layers.js) 中有一个基础层的例子。它只是一个示例，可以随意删除。你也可以把它当作参考或自己层的基础。

你可以在浏览器中打开 [index.html](/index.html) 文件来测试你的模组。

大多数时候，你不需要深入研究代码来创建东西，但如果你真的想这样做也是可以的，例如在 [components.js](/js/components.js) 中添加新的 Vue 组件。

The Modding Tree 使用 [break_eternity.js](https://github.com/Patashu/break_eternity.js) 来存储大数值。这意味着许多数字都是 `Decimal` 对象，处理方式必须有所不同。例如，你必须使用 `new Decimal(x)` 来创建一个 `Decimal` 值，而不是普通数字（x 可以是数字或用于更大数值的字符串）。你通过调用函数来对它们执行运算。例如，不要用 `x = x + y`，而要用 `x = x.add(y)`。请注意，这同样适用于比较运算符，应改用 `.gt`、`.gte`、`.lt`、`.lte`、`.eq` 和 `.neq` 函数。更多关于 `Decimal` 值的详细信息请参阅 [break_eternity.js](https://github.com/Patashu/break_eternity.js) 文档。

几乎所有值都可以是常量值或动态值。动态值通过定义一个函数来定义，该函数返回在任何给定时刻应有的值。

所有显示文本都可以使用基本的 HTML 元素（但你不能在那里使用大多数 Vue 特性）。

在阅读本文档时，将使用以下标记来描述特性：

- **无标记**：这是必需的，如果不包含，游戏可能会崩溃。
- **sometimes required / 有时需要**：根据层中的其他内容，这可能是必需的。
- **optional / 可选**：如果你不打算为层使用该功能，可以省略。
- **assigned automagically / 自动分配**：该值将被自动设置，并覆盖你设置的任何值。
- **deprecated / 已弃用**：不建议使用此特性，因为较新的特性能够以更好、更简单的方式实现同样的效果。

## 目录

### 通用

- [入门](tutorials/getting-started.md)：通过 Github Desktop 设置你自己的代码副本的指南。
- [制作模组](tutorials/making-a-mod.md)：使用 TMT 制作基础模组的指南。
- [主模组信息](main-mod-info.md)：如何在 [mod.js](/js/mod.js) 中设置模组的通用内容。
- [基础层剖析](basic-layer-breakdown.md)：分解具有最少特性的层的组成部分。
- [层特性](layer-features.md)：对你可以赋予层的所有不同属性的解释。
- [自定义标签页布局](custom-tab-layouts.md)：为标签页提供不同布局的可选方式。你甚至可以创建全新的组件来使用。
- [自定义游戏布局](trees-and-tree-customization.md)：你可以移除树标签页，在树上添加按钮和其他东西，甚至可以像层标签页一样自定义标签页的布局。
- [更新 TMT](tutorials/updating-tmt.md)：使用 Github Desktop 更新你的模组所依赖的 TMT 版本。
- [其他内容](other.md)：TMT 拥有的其他简洁特性，但不需要单独页面介绍。

### 常用组件

- [升级](upgrades.md)：如何为层创建升级。
- [里程碑](milestones.md)：如何为层创建里程碑。
- [可购买项](buyables.md)：为层创建可重复购买的升级（可选择支持重置）。例如可用于制作“增强器”或“太空建筑”。
- [可点击项](clickables.md)：可购买项的一个更通用的变体，适用于任何有时可点击的东西。通过可点击项和可购买项，你几乎可以实现任何功能。
- [成就](achievements.md)：如何为层（或整个游戏）创建成就。

### 其他组件与特性

- [挑战](challenges.md)：如何为层创建挑战。
- [进度条](bars.md)：以进度条、仪表盘或类似形式显示一些信息。它们高度可定制，也支持水平和垂直方向。
- [子标签页和微标签页](subtabs-and-microtabs.md)：为你的标签页创建子标签页，以及可以放在标签页内的“微标签页”组件。你甚至可以用它们将一个层嵌入到另一个层中！
- [网格](grids.md)：创建一组行为相同但拥有各自数据的按钮。适用于地图图块、物品栏网格等。
- [信息框](infoboxes.md)：可以显示或隐藏的包含文本的框。
- [树与树自定义](trees-and-tree-customization.md)：制作你自己的树。你也可以创建非层按钮节点！
- [粒子系统](particles.md)：可用于创建视觉效果粒子，也可以创建像黄金饼干或收集品这样的可交互物体。