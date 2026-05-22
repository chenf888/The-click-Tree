function getClickGain() {
    let base = new Decimal(1);
    if (hasUpgrade("c1", 11)) base = base.add(upgradeEffect("c1", 11));
    if (hasUpgrade("c1", 12)) base = base.times(upgradeEffect("c1", 12));
    if (hasUpgrade("c1", 13)) base = base.add(upgradeEffect("c1", 13));
    if (hasUpgrade("c1", 14)) base = base.times(upgradeEffect("c1", 14));
    if (hasAchievement("a", 13)) base = base.times(achievementEffect("a", 13));
    if (hasAchievement("a", 14)) base = base.times(achievementEffect("a", 14));
    if (hasMilestone("c1", 0)) base = base.times(2);
    if (hasMilestone("c1", 1)) base = base.times(2);
    if (hasMilestone("c1", 2)) base = base.times(3);
    return base;
}

//c1
addLayer("c1", {
    name: "click 1",
    symbol: "c1",
    position: 0,
    row: 0,
    color: "#4BDC13",
    resource: "点击分数",
    layerShown() { return true; },

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },

    tabFormat: [
        "main-display",
        ["display-text", () => `每次点击获得：${format(getClickGain())} 点击分数`],
        "blank",
        "clickables",
        "blank",
        "upgrades",
        "blank",
        "milestones",
    ],

    clickables: {
        11: {
            title: "点击！",
            display() { return `获得 ${format(getClickGain())} 点击分数`; },
            canClick() { return true; },
            onClick() {
                let gain = getClickGain();
                player.c1.points = player.c1.points.add(gain);
                player.points = player.points.add(1);
            }
        }
    },

    upgrades: {
        11: {
            title: "点击 1",
            description: "基础点击收益 +1",
            cost: new Decimal(10),
            effect() { return new Decimal(1); }
        },
        12: {
            title: "点击 2",
            description: "未来每次点击 ×2",
            cost: new Decimal(50),
            effect() { return new Decimal(2); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); }
        },
        13: {
            title: "点击 3",
            description: "基础点击收益 +5",
            cost: new Decimal(200),
            effect() { return new Decimal(5); }
        },
        14: {
            title: "点击 4",
            description: "未来每次点击 ×3",
            cost: new Decimal(1000),
            effect() { return new Decimal(3); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 0); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "拥有 1,000 点击分数",
            effectDescription: "点击收益 ×2，解锁“点击 4”升级",
            done() { return player.c1.points.gte(1000); }
        },
        1: {
            requirementDescription: "拥有 10,000 点击分数",
            effectDescription: "点击收益再次 ×2",
            done() { return player.c1.points.gte(10000); }
        },
        2: {
            requirementDescription: "拥有 100,000 点击分数",
            effectDescription: "点击收益×3了，数值膨胀:)  /拜谢",
            done() { return player.c1.points.gte(100000); }
        }
    }
});

//成就
addLayer("a", {
    name: "成就",
    symbol: "A",
    row: "side",
    color: "#FFD700",
    resource: "成就点数",
    layerShown() { return true; },

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },

    tabFormat: [
        "achievements",
    ],

    achievements: {
        11: {
            name: "开始点击",
            tooltip: "累积 100 点击分数",
            done() { return player.c1.points.gte(100); }
        },
        12: {
            name: "尝试在点击中获得乐趣",
            tooltip: "累积 1,000 点击分数",
            done() { return player.c1.points.gte(1000); }
        },
        13: {
            name: "逐渐喜欢上点击了",
            tooltip: "累积 10,000 点击分数。奖励：点击收益 ×1.5",
            done() { return player.c1.points.gte(10000); },
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "点击收益 ×1.5"; }
        },
        14: {
            name: "真正的点击就要开始了",
            tooltip: "累积 100,000 点击分数。奖励：点击收益 ×2",
            done() { return player.c1.points.gte(100000); },
            effect() { return new Decimal(2); },
            effectDisplay() { return "点击收益 ×2"; }
        }
    }
});