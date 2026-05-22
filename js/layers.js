function getClickGain() {
    if (inChallenge("c1", 12)) return new Decimal(1);
    let base = new Decimal(1);
    if (hasUpgrade("c1", 11)) base = base.add(upgradeEffect("c1", 11));
    if (hasUpgrade("c1", 13)) base = base.add(upgradeEffect("c1", 13));
    if (hasUpgrade("c1", 15)) base = base.add(upgradeEffect("c1", 15));
    if (hasUpgrade("c1", 17)) base = base.add(upgradeEffect("c1", 17));
    if (hasUpgrade("c2", 12)) base = base.add(upgradeEffect("c2", 12));
    if (hasUpgrade("c1", 12)) base = base.times(upgradeEffect("c1", 12));
    if (hasUpgrade("c1", 14)) base = base.times(upgradeEffect("c1", 14));
    if (hasUpgrade("c1", 16)) base = base.times(upgradeEffect("c1", 16));
    if (hasUpgrade("c1", 18)) base = base.times(upgradeEffect("c1", 18));
    if (hasUpgrade("c2", 13)) base = base.times(upgradeEffect("c2", 13));
    if (hasAchievement("a", 13)) base = base.times(achievementEffect("a", 13));
    if (hasAchievement("a", 14)) base = base.times(achievementEffect("a", 14));
    if (hasAchievement("a", 15)) base = base.add(achievementEffect("a", 15));
    if (hasMilestone("c1", 0)) base = base.times(1.2);
    if (hasMilestone("c1", 1)) base = base.times(1.2);
    if (hasMilestone("c1", 2)) base = base.times(1.5);
    if (inChallenge("c1", 11)) base = base.times(0.1);
    if (hasChallenge("c1", 11)) base = base.times(1.1);
    if (hasChallenge("c1", 12)) base = base.times(1.1);
    if (layers.c2 && player.c2.points.gt(0)) {
        let basePow = hasUpgrade("c2", 11) ? 1.3 : 1.2;
        let powerBonus = Decimal.pow(basePow, player.c2.points);
        if (hasAchievement("a", 16)) powerBonus = powerBonus.times(achievementEffect("a", 16));
        base = base.times(powerBonus);
    }
    return base;
}

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
            challenge11Start: new Decimal(0),
            challenge11StartTime: 0,
            challenge12Start: new Decimal(0),
        }
    },

    tabFormat: {
        "主界面": {
            content: [
                "main-display",
                ["display-text", () => `每次点击获得：${format(getClickGain())} 点击分数`],
                "blank",
                "clickables",
                "blank",
                "upgrades",
                "blank",
                "milestones",
            ]
        },
        "挑战": {
            content: [
                ["display-text", "在挑战中也能点击！"],
                ["clickable", 11],
                "blank",
                "challenges",
            ]
        }
    },

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
            description: "未来每次点击 ×1.5",
            cost: new Decimal(50),
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); }
        },
        13: {
            title: "点击 3",
            description: "基础点击收益 +3",
            cost: new Decimal(200),
            effect() { return new Decimal(3); }
        },
        14: {
            title: "点击 4",
            description: "未来每次点击 ×1.5",
            cost: new Decimal(1000),
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 0); }
        },
        15: {
            title: "点击 5",
            description: "基础点击收益 +20",
            cost: new Decimal(5000),
            effect() { return new Decimal(20); },
            unlocked() { return hasMilestone("c1", 1); }
        },
        16: {
            title: "点击 6",
            description: "未来每次点击 ×1.5",
            cost: new Decimal(25000),
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 1); }
        },
        17: {
            title: "点击 7",
            description: "基础点击收益 +100",
            cost: new Decimal(100000),
            effect() { return new Decimal(100); },
            unlocked() { return hasMilestone("c1", 1); }
        },
        18: {
            title: "点击 8",
            description: "未来每次点击 ×2",
            cost: new Decimal(500000),
            effect() { return new Decimal(2); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 1); }
        }
    },

    challenges: {
        11: {
            name: "极速点击",
            challengeDescription: "点击收益变为原本的 10%。",
            goalDescription: "在挑战内获得 500 点击分数（30秒内）",
            rewardDescription: "点击收益 ×1.1（永久）",
            canComplete() {
                let gained = player.c1.points.sub(player.c1.challenge11Start);
                let elapsed = (Date.now() - player.c1.challenge11StartTime) / 1000;
                return gained.gte(500) && elapsed <= 30;
            },
            onEnter() {
                player.c1.challenge11Start = player.c1.points;
                player.c1.challenge11StartTime = Date.now();
            },
            onExit() { },
            onComplete() { },
            unlocked() { return hasMilestone("c1", 0); }
        },
        12: {
            name: "精准操控",
            challengeDescription: "每次点击固定获得 1 点（忽略所有升级）。",
            goalDescription: "在挑战内手动点击 2000 次（获得 2000 点击分数）",
            rewardDescription: "点击收益 ×1.1（永久）",
            canComplete() {
                let gained = player.c1.points.sub(player.c1.challenge12Start);
                return gained.gte(2000);
            },
            onEnter() {
                player.c1.challenge12Start = player.c1.points;
            },
            onExit() { },
            onComplete() { },
            unlocked() { return hasMilestone("c1", 1); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "拥有 1,000 点击分数",
            effectDescription: "点击收益 ×1.2，解锁更多",
            done() { return player.c1.points.gte(1000); }
        },
        1: {
            requirementDescription: "拥有 10,000 点击分数",
            effectDescription: "点击收益再次 ×1.2，解锁更多",
            done() { return player.c1.points.gte(10000); }
        },
        2: {
            requirementDescription: "拥有 100,000 点击分数",
            effectDescription: "点击收益 ×1.5，解锁 c2 层",
            done() { return player.c1.points.gte(100000); }
        }
    },

    update(diff) {
        if (inChallenge("c1", 11)) {
            let elapsed = (Date.now() - player.c1.challenge11StartTime) / 1000;
            if (elapsed > 30) {
                player.c1.activeChallenge = null;
            }
        }
    }
});

addLayer("c2", {
    name: "力量",
    symbol: "P",
    position: 1,
    row: 1,
    color: "#FFA500",
    resource: "点击力量",
    baseResource: "点击分数",
    baseAmount() { return player.c1.points; },
    requires: new Decimal(1e5),
    type: "normal",
    exponent: 0.5,
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    roundUpCost: false,

    layerShown() { return hasMilestone("c1", 2) || player.c2.unlocked; },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => `当前力量倍率：×${format(Decimal.pow(1.2, player.c2.points))}${hasAchievement("a", 16) ? "（双倍激活）" : ""}`],
        "blank",
        "upgrades",
        "blank",
        "milestones"
    ],

    upgrades: {
        11: {
            title: "力量 1",
            description: "力量倍率的基础从 1.2 提升到 1.3",
            cost: new Decimal(1),
            onPurchase() { }
        },
        12: {
            title: "力量 2",
            description: "基础点击收益 +70",
            cost: new Decimal(3),
            effect() { return new Decimal(70); },
        },
        13: {
            title: "力量倍增",
            description: "未来每次点击 ×1.5",
            cost: new Decimal(5),
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); }
        },
        14: {
            title: "力量爆发",
            description: "点击力量 ×1.5（永久保留）",
            cost: new Decimal(8),
            onPurchase() {
                player.c2.points = player.c2.points.times(1.5);
            }
        }
    },

milestones: {
    0: {
        requirementDescription: "拥有 5 点击力量",
        effectDescription: "每次重置后自动获得前 3 个点击升级",
        done() { return player.c2.points.gte(5); }
    },
    1: {
        requirementDescription: "拥有 25 点击力量",
        effectDescription: "每次重置后自动获得前 5 个点击升级",
        done() { return player.c2.points.gte(25); }
    },
    2: {
        requirementDescription: "拥有 125 点击力量",
        effectDescription: "每次重置后自动获得全部 8 个点击升级",
        done() { return player.c2.points.gte(125); }
    }
},

 doReset(resettingLayer) {
    if (resettingLayer === "c2") {
        let savedPoints = player.points;
        let savedMilestones = player.c1.milestones;
        let savedChallenges = player.c1.challenges;

        layerDataReset("c1");

        player.c1.milestones = savedMilestones;
        player.c1.challenges = savedChallenges;
        player.c1.challenge11Start = new Decimal(0);
        player.c1.challenge11StartTime = 0;
        player.c1.challenge12Start = new Decimal(0);
        player.points = savedPoints;

        let autoIds = [];
        if (hasMilestone("c2", 2)) autoIds = [11,12,13,14,15,16,17,18];
        else if (hasMilestone("c2", 1)) autoIds = [11,12,13,14,15];
        else if (hasMilestone("c2", 0)) autoIds = [11,12,13];

        autoIds.forEach(id => {
            if (!player.c1.upgrades.includes(id)) {
                player.c1.upgrades.push(id);
            }
        });
    }
}
});

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
            tooltip: "累积 100,000 点击分数。奖励：点击收益 ×1.5",
            done() { return player.c1.points.gte(100000); },
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "点击收益 ×1.5"; }
        },
        15: {
            name: "力量!!!",
            tooltip: "获得至少 1 点点击力量。奖励：基础点击 +1",
            done() { return player.c2.points.gte(1); },
            effect() { return new Decimal(1); },
            effectDisplay() { return "基础点击 +1"; }
        },
        16: {
            name: "我需要更多",
            tooltip: "获得 10 点点击力量。奖励：力量倍率 ×1.5",
            done() { return player.c2.points.gte(10); },
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "力量倍率 ×1.5"; }
        }
    }
});