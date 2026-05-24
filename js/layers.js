function updateCombo() {
    if (player.lastClickTime === undefined) player.lastClickTime = 0;
    if (player.clickCombo === undefined) player.clickCombo = 0;

    let comboWindow = 1.5;
    if (layers.c4 && hasUpgrade("c4", 11)) comboWindow += 0.5;
    if (layers.c4 && hasUpgrade("c4", 13)) comboWindow += 0.5;
    if (layers.c4 && hasUpgrade("c4", 14)) comboWindow += 1;
    if (hasAchievement("a", 20)) comboWindow += 0.3;
    if (layers.c5 && player.c5.grid && player.c5.grid[201]) comboWindow += player.c5.grid[201] * 0.1;

    let now = Date.now();
    if (now - player.lastClickTime < comboWindow * 1000) {
        player.clickCombo++;
    } else {
        let minCombo = 0;
        if (layers.c4 && hasMilestone("c4", 1)) minCombo = 5;
        if (layers.c4 && hasMilestone("c4", 2)) minCombo = 10;
        player.clickCombo = minCombo;
    }
    player.lastClickTime = now;
}

function getClickGain() {
    let base = new Decimal(1);

    if (hasUpgrade("c1", 11)) base = base.add(upgradeEffect("c1", 11));
    if (hasUpgrade("c1", 13)) base = base.add(upgradeEffect("c1", 13));
    if (hasUpgrade("c1", 15)) base = base.add(upgradeEffect("c1", 15));
    if (hasUpgrade("c1", 17)) base = base.add(upgradeEffect("c1", 17));
    if (hasUpgrade("c1", 19)) base = base.add(upgradeEffect("c1", 19));
    if (hasUpgrade("c6", 13)) base = base.add(upgradeEffect("c6", 13));
    if (hasUpgrade("c2", 12)) base = base.add(upgradeEffect("c2", 12));
    if (hasUpgrade("c2", 21)) base = base.add(upgradeEffect("c2", 21));
    if (hasAchievement("a", 15)) base = base.add(achievementEffect("a", 15));

    if (hasUpgrade("c1", 12)) base = base.times(upgradeEffect("c1", 12));
    if (hasUpgrade("c1", 14)) base = base.times(upgradeEffect("c1", 14));
    if (hasUpgrade("c1", 16)) base = base.times(upgradeEffect("c1", 16));
    if (hasUpgrade("c1", 18)) base = base.times(upgradeEffect("c1", 18));
    if (hasUpgrade("c1", 21)) base = base.times(upgradeEffect("c1", 21));
    if (hasUpgrade("c2", 13)) base = base.times(upgradeEffect("c2", 13));
    if (hasUpgrade("c2", 22)) base = base.times(upgradeEffect("c2", 22));
    if (hasAchievement("a", 13)) base = base.times(achievementEffect("a", 13));
    if (hasAchievement("a", 14)) base = base.times(achievementEffect("a", 14));
    if (hasMilestone("c1", 0)) base = base.times(1.1);
    if (hasMilestone("c1", 1)) base = base.times(1.1);
    if (hasMilestone("c1", 2)) base = base.times(1.2);
    if (inChallenge("c1", 11)) base = base.times(0.1);
    if (hasChallenge("c1", 11)) base = base.times(1.1);
    if (hasChallenge("c1", 13)) base = base.times(1.08);

    if (layers.c2 && player.c2.points.gt(0)) {
        let rawPow = player.c2.points;
        let softcapStart = new Decimal(10);
        let effectivePow;
        if (rawPow.lte(softcapStart)) {
            effectivePow = rawPow;
        } else {
            let excess = rawPow.sub(softcapStart);
            effectivePow = softcapStart.add(excess.pow(0.5));
        }
        let basePow = hasUpgrade("c2", 11) ? 1.20 : 1.12;
        if (hasChallenge("c2", 11)) basePow += 0.05;
        if (layers.c5 && player.c5.grid && player.c5.grid[101]) basePow += player.c5.grid[101] * 0.02;
        let powerBonus = Decimal.pow(basePow, effectivePow);
        if (layers.c2 && layers.c2.buyables) powerBonus = powerBonus.times(buyableEffect("c2", 11));
        if (hasAchievement("a", 16)) powerBonus = powerBonus.times(achievementEffect("a", 16));
        if (powerBonus.gt(100)) powerBonus = powerBonus.sqrt().times(10);
        base = base.times(powerBonus);
    }

    if (layers.c3 && player.c3.points.gt(0)) {
        let critCap = hasUpgrade("c3", 14) ? 0.9 : 0.75;
        if (hasMilestone("c6", 2)) critCap = 1;
        let critChance = Math.min(player.c3.points.toNumber() * 0.02, critCap);
        if (hasMilestone("c3", 2)) critChance = Math.min(critChance + 0.1, critCap);
        if (hasAchievement("a", 17)) critChance = Math.min(critChance + achievementEffect("a", 17).toNumber(), critCap);
        if (hasMilestone("c5", 1)) critChance = Math.min(critChance + 0.5, 1);
        if (hasChallenge("c3", 11)) critChance = Math.min(critChance + 0.05, critCap);
        if (layers.c3 && layers.c3.buyables) critChance = Math.min(critChance + buyableEffect("c3", 11).toNumber(), critCap);

        let critMult = new Decimal(3);
        if (hasUpgrade("c3", 11)) critMult = critMult.add(upgradeEffect("c3", 11));
        if (hasUpgrade("c3", 13)) critMult = critMult.add(upgradeEffect("c3", 13));
        if (hasAchievement("a", 18)) critMult = critMult.add(achievementEffect("a", 18));
        if (layers.c5 && player.c5.grid && player.c5.grid[102]) critMult = critMult.add(player.c5.grid[102] * 0.5);

        player._critChance = critChance;
        player._critMult = critMult;
    } else {
        player._critChance = 0;
        player._critMult = new Decimal(1);
    }

    if (layers.c4 && player.c4.points.gt(0)) {
        let combo = player.clickCombo || 0;
        if (combo > 0) {
            let comboBase = player.c4.points.times(0.5);
            if (hasUpgrade("c4", 12)) comboBase = comboBase.times(1.5);
            if (hasAchievement("a", 19)) comboBase = comboBase.times(1.25);
            if (hasMilestone("c4", 3)) comboBase = comboBase.times(2);
            let logCombo = Math.log2(combo + 1);
            let comboMult = new Decimal(1).add(new Decimal(logCombo).times(comboBase));
            base = base.times(comboMult);
        }
    }

    if (layers.c5 && player.c5.points.gt(0)) {
        let transPow = hasUpgrade("c5", 12) ? 1.05 : 1.03;
        let transBonus = Decimal.pow(transPow, player.c5.points);
        base = base.times(transBonus);
    }

    if (hasAchievement("a", 21)) base = base.times(1.1);
    if (hasAchievement("a", 22)) base = base.times(1.2);
    if (hasAchievement("a", 24)) base = base.times(1.5);
    if (hasAchievement("a", 25)) base = base.times(1.2);
    if (hasAchievement("a", 26)) base = base.times(1.2);
    if (hasMilestone("c7", 2)) base = base.times(2);

    if (hasUpgrade("c5", 13)) {
        base = base.times(upgradeEffect("c5", 13));
    }

    if (layers.c6 && player.c6.points.gt(0)) {
        let scReduction = player.c6.points.times(0.04);
        if (hasUpgrade("c6", 11)) scReduction = scReduction.times(1.5);
        if (hasAchievement("a", 23)) scReduction = scReduction.add(0.1);
        if (hasUpgrade("c6", 15)) scReduction = scReduction.times(2).min(0.95);
        if (layers.c5 && player.c5.grid && player.c5.grid[202]) scReduction = scReduction.add(player.c5.grid[202] * 0.02);
        if (scReduction.gt(0.95)) scReduction = new Decimal(0.95);
        if (scReduction.gt(0.8)) scReduction = new Decimal(0.8).add(scReduction.sub(0.8).pow(0.5));
        let scMult = new Decimal(1).sub(scReduction);
        let bonus = new Decimal(1).div(scMult.max(0.1));
        if (hasUpgrade("c6", 12)) bonus = bonus.times(2);
        base = base.times(bonus);
    }

    if (layers.c7 && player.c7.points.gt(0)) {
        let raw = player.c7.points;
        let stability = raw.times(0.05);
        if (hasUpgrade("c7", 11)) stability = stability.times(1.5);
        if (stability.gt(0.9)) stability = new Decimal(0.9);
        let baseMult = new Decimal(1);

        if (layers.c7.clickables && player.c7.clickables[12]) {
            let state = player.c7.clickables[12];
            let wheelMap = { "微风": 1.5, "和风": 2, "旋风": 3, "暴风": 5, "风暴": 8, "混沌风暴": 12 };
            baseMult = new Decimal(wheelMap[state] || 1);
            if (hasUpgrade("c7", 13)) baseMult = baseMult.times(1.3);
            if (hasUpgrade("c7", 14)) baseMult = baseMult.times(1.25);
        }

        let varianceMult = new Decimal(0.7).add(stability.times(1.3));
        if (varianceMult.gt(1)) varianceMult = new Decimal(1);
        let min = baseMult.times(varianceMult);
        if (hasUpgrade("c7", 12)) min = min.add(0.3);
        if (hasUpgrade("c7", 15)) min = min.add(0.5);
        if (hasMilestone("c7", 1)) min = min.add(0.3);
        if (hasAchievement("a", 25)) min = min.add(0.2);
        let max = baseMult.times(new Decimal(2).sub(stability));
        if (max.lt(min.add(0.3))) max = min.add(0.3);
        let avg = min.add(max).div(2);
        base = base.times(avg);
    }

    let cap1 = new Decimal(5000);
    if (base.gt(cap1)) {
        let excess = base.sub(cap1);
        base = cap1.add(excess.pow(0.5).times(50));
    }

    return base;
}

function doClick() {
    updateCombo();
    let gain = getClickGain();
    if (player._critChance > 0 && Math.random() < player._critChance) {
        gain = gain.times(player._critMult || 1);
    }
    player.c1.points = player.c1.points.add(gain);
    player.points = player.points.add(1);
}

addLayer("c1", {
    name: "起源",
    symbol: "C1",
    position: 0,
    row: 0,
    displayRow: 0,
    color: "#4BDC13",
    resource: "点击分数",
    layerShown() { return true; },

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            challenge11Start: new Decimal(0),
            challenge11StartTime: 0,
            challenge13Start: new Decimal(0),
        }
    },

    tabFormat: {
        "起源": {
            content: [
                "main-display",
                ["display-text", () => `戳一下 → +${format(getClickGain())} 点击分数`],
                "blank",
                "clickables",
                "blank",
                "upgrades",
                "blank",
                "milestones",
            ]
        },
        "试炼": {
            content: [
                ["display-text", "挑战中也能戳！戳就完事了。"],
                ["display-text", () => `当前点击分数：${format(player.c1.points)}`],
                ["clickable", 11],
                "blank",
                "challenges",
            ]
        }
    },

    clickables: {
        11: {
            title: "戳我！",
            display() {
                return `戳一下 → +${format(getClickGain())} 点击分数`;
            },
            canClick() { return true; },
            onClick() { doClick(); }
        }
    },

    upgrades: {
        11: {
            title: "热身运动",
            description: "每多按一下，世界就多一分美好。基础 +1",
            cost: new Decimal(10),
            effect() { return new Decimal(1); }
        },
        12: {
            title: "小试牛刀",
            description: "你的手指开始发热了！每次点击 ×1.5",
            cost: new Decimal(50),
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); }
        },
        13: {
            title: "渐入佳境",
            description: "手指有点酸？没事，基础 +3",
            cost: new Decimal(200),
            effect() { return new Decimal(3); }
        },
        14: {
            title: "点击成瘾",
            description: "你确定停得下来吗？每次点击 ×2",
            cost: new Decimal(1000),
            effect() { return new Decimal(2); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 0); }
        },
        15: {
            title: "手速狂飙",
            description: "腱鞘炎警告！基础 +10",
            cost: new Decimal(5000),
            effect() { return new Decimal(10); },
            unlocked() { return hasMilestone("c1", 0); }
        },
        16: {
            title: "指间风暴",
            description: "快到冒烟！每次点击 ×1.5",
            cost: new Decimal(25000),
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 1); }
        },
        17: {
            title: "麒麟臂",
            description: "你的右手已经超越了人类极限。基础 +100",
            cost: new Decimal(100000),
            effect() { return new Decimal(100); },
            unlocked() { return hasMilestone("c1", 1); }
        },
        18: {
            title: "神之一指",
            description: "传说中只有天选之人才能达到的境界。每次点击 ×1.3",
            cost: new Decimal(500000),
            effect() { return new Decimal(1.3); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 1); }
        },
        19: {
            title: "指尖传说",
            description: "你的手指已经成为神话。基础 +500",
            cost: new Decimal(2000000),
            effect() { return new Decimal(500); },
            unlocked() { return hasMilestone("c1", 2); }
        },
        21: {
            title: "极限突破",
            description: "超越人类极限的一击。每次点击 ×1.2",
            cost: new Decimal(10000000),
            effect() { return new Decimal(1.2); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c1", 3); }
        }
    },

    challenges: {
        11: {
            name: "闪电突袭",
            challengeDescription: "时间不等人！收益暴跌至 10%，靠纯手速说话。",
            goalDescription: "30 秒内狂点出 500 点击分数",
            rewardDescription: "永久点击收益 ×1.1",
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
        13: {
            name: "耐久马拉松",
            challengeDescription: "没有花招，没有限制——就是点，一直点。",
            goalDescription: "在挑战内增量获得 3,000,000 点击分数",
            rewardDescription: "永久点击收益 ×1.08",
            canComplete() {
                let gained = player.c1.points.sub(player.c1.challenge13Start);
                return gained.gte(3000000);
            },
            onEnter() {
                player.c1.challenge13Start = player.c1.points;
            },
            onExit() { },
            onComplete() { },
            unlocked() { return hasMilestone("c1", 2); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "累积 1,000 点击分数",
            effectDescription: "感觉来了！点击 ×1.1，解锁更多升级",
            done() { return player.c1.points.gte(1000); }
        },
        1: {
            requirementDescription: "累积 10,000 点击分数",
            effectDescription: "你确定不是在开连点器？点击 ×1.1",
            done() { return player.c1.points.gte(10000); }
        },
        2: {
            requirementDescription: "累积 100,000 点击分数",
            effectDescription: "点击之神降临！点击 ×1.2，解锁力量层",
            done() { return player.c1.points.gte(100000); }
        },
        3: {
            requirementDescription: "累积 1,000,000 点击分数",
            effectDescription: "超越传说！解锁终极起源升级",
            done() { return player.c1.points.gte(1000000); }
        }
    },

    update(diff) {
        player._lastClickCount = player.points;
        if (inChallenge("c1", 11)) {
            let elapsed = (Date.now() - player.c1.challenge11StartTime) / 1000;
            if (elapsed > 30) {
                player.c1.activeChallenge = null;
            }
        }
    },

    doReset(resettingLayer) {

        if (resettingLayer === "c2" || resettingLayer === "c3" || resettingLayer === "c4" || resettingLayer === "c5" || resettingLayer === "c6" || resettingLayer === "c7") {
            let savedClickCount = player._savedClickCount;

            let savedMilestones = player.c1.milestones;
            let savedChallenges = player.c1.challenges;
            let savedBest = player.c1.best;
            let savedTotal = player.c1.total;

            layerDataReset("c1");

            player.c1.milestones = savedMilestones;
            player.c1.challenges = savedChallenges;
            player.c1.best = savedBest;
            player.c1.total = savedTotal;
            player.c1.challenge11Start = new Decimal(0);
            player.c1.challenge11StartTime = 0;
            player.c1.challenge13Start = new Decimal(0);
            player.c1.upgrades = [];
            let autoIds = [];
            if (hasMilestone("c2", 2)) autoIds = [11, 12, 13, 14, 15, 16, 17, 18];
            else if (hasMilestone("c2", 1)) autoIds = [11, 12, 13, 14, 15];
            else if (hasMilestone("c2", 0)) autoIds = [11, 12, 13];

            if (hasMilestone("c1", 2)) autoIds.push(19);
            if (hasMilestone("c1", 3)) autoIds.push(21);

            autoIds.forEach(id => {
                if (!player.c1.upgrades.includes(id)) {
                    player.c1.upgrades.push(id);
                }
            });

            if (savedClickCount !== undefined) {
                player.points = savedClickCount;
            } else if (player._lastClickCount !== undefined) {
                player.points = player._lastClickCount;
            }
            player._savedClickCount = undefined;
        }
    }
});

addLayer("c2", {
    name: "力量",
    symbol: "C2",
    position: 1,
    row: 1,
    displayRow: 0,
    color: "#FFA500",
    resource: "点击力量",
    baseResource: "点击分数",
    baseAmount() { return player.c1.points; },
    requires: new Decimal(1e5),
    type: "normal",
    exponent: 0.5,
    softcap: new Decimal(20),
    softcapPower: new Decimal(0.5),
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

    onPrestige() {
        player._savedClickCount = player.points;
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => `当前点击分数：${format(player.c1.points)}`],
        ["display-text", () => {
            let rawPow = player.c2.points;
            let softcapStart = new Decimal(10);
            let effectivePow = rawPow.lte(softcapStart) ? rawPow : softcapStart.add(rawPow.sub(softcapStart).pow(0.5));
            let basePow = hasUpgrade("c2", 11) ? 1.20 : 1.12;
            if (hasChallenge("c2", 11)) basePow += 0.05;
            let bonus = Decimal.pow(basePow, effectivePow);
            if (hasAchievement("a", 16)) bonus = bonus.times(achievementEffect("a", 16));
            if (bonus.gt(100)) bonus = bonus.sqrt().times(10);
            let scNote = rawPow.gt(softcapStart) ? "（软上限）" : "";
            let scNote2 = Decimal.pow(basePow, effectivePow).gt(100) ? "（倍率已压缩）" : "";
            return `力量涌动：每次点击 ×${format(bonus)}${scNote}${scNote2}${hasAchievement("a", 16) ? "（渴望之力加倍！）" : ""}`;
        }],
        "blank",
        "clickables",
        "blank",
        "upgrades",
        "blank",
        "bars",
        "blank",
        "buyables",
        "blank",
        "milestones",
        "blank",
        "challenges"
    ],

    clickables: {
        11: {
            title: "猛击！",
            display() {
                return `蓄力一击 → +${format(getClickGain())} 点击分数`;
            },
            canClick() { return true; },
            onClick() { doClick(); }
        }
    },

    upgrades: {
        11: {
            title: "力量觉醒",
            description: "力量倍率基础从 1.12 飙升至 1.20",
            cost: new Decimal(1),
            onPurchase() { }
        },
        12: {
            title: "蛮力打击",
            description: "不需要技巧，大力出奇迹！基础 +50",
            cost: new Decimal(3),
            effect() { return new Decimal(50); },
        },
        13: {
            title: "力量灌注",
            description: "每一丝力量都注入点击之中。每次点击 ×1.3",
            cost: new Decimal(5),
            effect() { return new Decimal(1.3); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); }
        },
        14: {
            title: "力量爆发",
            description: "瞬间释放全部潜能！点击力量 ×1.3（永久保留）",
            cost: new Decimal(8),
            onPurchase() {
                player.c2.points = player.c2.points.times(1.3);
            }
        },
        21: {
            title: "力量余震",
            description: "力量扩散到每一次点击。基础 +200",
            cost: new Decimal(15),
            effect() { return new Decimal(200); },
            unlocked() { return hasMilestone("c2", 1); }
        },
        22: {
            title: "力量共鸣",
            description: "力量在指尖回响。每次点击 ×1.2",
            cost: new Decimal(25),
            effect() { return new Decimal(1.2); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasMilestone("c2", 2); }
        }
    },

    challenges: {
        11: {
            name: "力竭",
            challengeDescription: "力量被抽干！倍率基础降至 1.05",
            goalDescription: "在挑战中累积达到 20 点击力量",
            rewardDescription: "永久力量倍率基础 +0.05",
            canComplete() {
                return player.c2.points.gte(20);
            },
            onEnter() { },
            onExit() { },
            onComplete() { },
            unlocked() { return hasMilestone("c2", 0); }
        }
    },

    bars: {
        powerGauge: {
            direction: RIGHT,
            width: 275,
            height: 20,
            progress() { return player.c2.points.div(30).min(1).toNumber(); },
            display() { return `力量蓄能：${format(player.c2.points)} / 30`; },
            fillStyle: { 'background-color': '#FFA500' },
            baseStyle: { 'background-color': '#333' },
            borderStyle: { 'border-radius': '10px' },
            textStyle: { 'font-size': '12px' },
            unlocked: true,
        },
    },

    buyables: {
        respecText: "重置增幅器",
        11: {
            title: "力量增幅器",
            cost(x) { return Decimal.pow(1.5, x.pow(1.2)).floor(); },
            effect(x) { return new Decimal(1).add(x.times(0.03)); },
            display() {
                let data = tmp[this.layer].buyables[this.id];
                return `成本：${format(data.cost)} 点击力量 | 持有：${formatWhole(player[this.layer].buyables[this.id])}\n当前增幅：点击 ×${format(this.effect())}`;
            },
            unlocked() { return player[this.layer].unlocked; },
            canAfford() { return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost); },
            buy() {
                let cost = tmp[this.layer].buyables[this.id].cost;
                player[this.layer].points = player[this.layer].points.sub(cost);
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: { 'height': '120px' },
            purchaseLimit: new Decimal(50),
        },
    },

    milestones: {
        0: {
            requirementDescription: "拥有 5 点击力量",
            effectDescription: "不用从头开始了！重置后自动拿前 3 个起源升级",
            done() { return player.c2.points.gte(5); }
        },
        1: {
            requirementDescription: "拥有 25 点击力量",
            effectDescription: "越来越熟练。重置后自动拿前 5 个起源升级",
            done() { return player.c2.points.gte(25); }
        },
        2: {
            requirementDescription: "拥有 125 点击力量",
            effectDescription: "满配开局！重置后起源全自动满级",
            done() { return player.c2.points.gte(125); }
        }
    },

    doReset(resettingLayer) {

        if (resettingLayer === this.layer) return;

        if (resettingLayer === "c3" || resettingLayer === "c4" || resettingLayer === "c5" || resettingLayer === "c6" || resettingLayer === "c7") {
            let savedMilestones = player.c2.milestones;
            let savedChallenges = player.c2.challenges;
            let savedBest = player.c2.best;
            let savedTotal = player.c2.total;

            layerDataReset("c2");

            player.c2.milestones = savedMilestones;
            player.c2.challenges = savedChallenges;
            player.c2.best = savedBest;
            player.c2.total = savedTotal;

            player.c2.upgrades = [];
            let autoIds = [];
            if (hasMilestone("c3", 1) || hasMilestone("c3", 2)) autoIds = [11, 12, 13, 14, 21, 22];
            else if (hasMilestone("c3", 0)) autoIds = [11, 12];

            autoIds.forEach(id => {
                if (!player.c2.upgrades.includes(id)) {
                    player.c2.upgrades.push(id);
                }
            });
        }
    }
});

addLayer("c3", {
    name: "精准",
    symbol: "C3",
    row: 2,
    displayRow: 0,
    position: 2,
    color: "#FF4444",
    resource: "点击精准",
    baseResource: "点击力量",
    baseAmount() { return player.c2.points; },
    requires: new Decimal(50),
    type: "normal",
    exponent: 0.4,
    softcap: new Decimal(15),
    softcapPower: new Decimal(0.5),
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    roundUpCost: false,

    layerShown() { return player.c3.unlocked || player.c2.best.gte(50); },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }
    },

    onPrestige() {
        player._savedClickCount = player.points;
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => {
            let cc = Math.min(player.c3.points.toNumber() * 0.02, hasUpgrade("c3", 14) ? 0.9 : 0.75);
            if (hasMilestone("c3", 2)) cc = Math.min(cc + 0.1, hasUpgrade("c3", 14) ? 0.9 : 0.75);
            let cm = new Decimal(3);
            if (hasUpgrade("c3", 11)) cm = cm.add(upgradeEffect("c3", 11));
            if (hasUpgrade("c3", 13)) cm = cm.add(upgradeEffect("c3", 13));
            let scNote = player.c3.points.gt(15) ? "（获取软上限生效中）" : "";
            return `瞄准要害：暴击率 ${(cc * 100).toFixed(1)}% | 暴击倍率 ×${format(cm)}${scNote}`;
        }],
        "blank",
        ["display-text", () => `当前点击分数：${format(player.c1.points)}`],
        "blank",
        "clickables",
        "blank",
        "upgrades",
        "blank",
        "buyables",
        "blank",
        "milestones",
        "blank",
        "challenges"
    ],

    clickables: {
        11: {
            title: "精准打击！",
            display() {
                return `致命一击 → +${format(getClickGain())} 点击分数`;
            },
            canClick() { return true; },
            onClick() { doClick(); }
        }
    },

    upgrades: {
        11: {
            title: "要害感知",
            description: "找到弱点了！暴击倍率 +1",
            cost: new Decimal(1),
            effect() { return new Decimal(1); },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id)); }
        },
        12: {
            title: "幸运眷顾",
            description: "幸运女神今天站在你这边。暴击率 +5%",
            cost: new Decimal(3),
        },
        13: {
            title: "致命一击",
            description: "一击入魂！暴击倍率 +2",
            cost: new Decimal(7),
            effect() { return new Decimal(2); },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id)); }
        },
        14: {
            title: "命运之轮",
            description: "命运的天平向你倾斜。暴击率上限提升至 90%",
            cost: new Decimal(15),
        }
    },

    challenges: {
        11: {
            name: "镣铐之舞",
            challengeDescription: "暴击倍率被压制到 ×1.5，但你依然可以起舞！",
            goalDescription: "在挑战中累积获得 100 点击力量",
            rewardDescription: "永久暴击率 +5%",
            canComplete() {
                if (player.c3.challenge11Start === undefined) return false;
                let gained = player.c2.best.sub(player.c3.challenge11Start);
                return gained.gte(100);
            },
            onEnter() {
                player.c3.challenge11Start = player.c2.best;
            },
            onExit() { },
            onComplete() { },
            unlocked() { return hasMilestone("c3", 0); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "拥有 3 点击精准",
            effectDescription: "重置后自动拿前 2 个力量升级",
            done() { return player.c3.points.gte(3); }
        },
        1: {
            requirementDescription: "拥有 8 点击精准",
            effectDescription: "重置后力量全员满配",
            done() { return player.c3.points.gte(8); }
        },
        2: {
            requirementDescription: "拥有 20 点击精准",
            effectDescription: "暴击率 +10%！瞄准更加致命",
            done() { return player.c3.points.gte(20); }
        }
    },

    doReset(resettingLayer) {

        if (resettingLayer === this.layer) return;

        if (resettingLayer === "c4" || resettingLayer === "c5" || resettingLayer === "c6" || resettingLayer === "c7") {
            let savedMilestones = player.c3.milestones;
            let savedChallenges = player.c3.challenges;
            let savedBest = player.c3.best;
            let savedTotal = player.c3.total;

            layerDataReset("c3");

            player.c3.milestones = savedMilestones;
            player.c3.challenges = savedChallenges;
            player.c3.best = savedBest;
            player.c3.total = savedTotal;

            player.c3.upgrades = [];
            let autoIds = [];
            if (hasMilestone("c4", 1) || hasMilestone("c4", 2) || hasMilestone("c4", 3)) autoIds = [11, 12, 13, 14];
            else if (hasMilestone("c4", 0)) autoIds = [11, 12];

            autoIds.forEach(id => {
                if (!player.c3.upgrades.includes(id)) {
                    player.c3.upgrades.push(id);
                }
            });
        }
    }
});

addLayer("c4", {
    name: "共鸣",
    symbol: "C4",
    position: 1,
    row: 3,
    displayRow: 1,
    position: 2,
    color: "#4488FF",
    resource: "点击共鸣",
    baseResource: "点击精准",
    baseAmount() { return player.c3.points; },
    requires: new Decimal(30),
    type: "normal",
    exponent: 0.35,
    softcap: new Decimal(12),
    softcapPower: new Decimal(0.5),
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    roundUpCost: false,

    layerShown() { return player.c4.unlocked || player.c3.best.gte(30); },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }
    },

    onPrestige() {
        player._savedClickCount = player.points;
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => {
            let combo = player.clickCombo || 0;
            let comboWindow = 1.5;
            if (hasUpgrade("c4", 11)) comboWindow += 0.5;
            if (hasUpgrade("c4", 13)) comboWindow += 0.5;
            if (hasUpgrade("c4", 14)) comboWindow += 1;
            if (hasAchievement("a", 20)) comboWindow += 0.3;
            if (layers.c5 && player.c5.grid && player.c5.grid[201]) comboWindow += player.c5.grid[201] * 0.1;
            let comboBase = player.c4.points.times(0.5);
            if (hasUpgrade("c4", 12)) comboBase = comboBase.times(1.5);
            if (hasMilestone("c4", 3)) comboBase = comboBase.times(2);
            let comboVal = combo > 0 ? format(new Decimal(1).add(new Decimal(Math.log2(combo + 1)).times(comboBase))) : "×1";
            return `连击 ${combo} 层 | 倍率 ${comboVal} | 窗口 ${comboWindow.toFixed(1)}秒`;
        }],
        "blank",
        ["display-text", () => `当前点击分数：${format(player.c1.points)}`],
        "blank",
        "clickables",
        "blank",
        "bars",
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
        "challenges"
    ],

    bars: {
        comboCrescendo: {
            direction: RIGHT,
            width: 275,
            height: 20,
            progress() {
                let c = player.clickCombo || 0;
                return Math.min(c / 100, 1);
            },
            display() { return `连击充能：${player.clickCombo || 0} / 100`; },
            fillStyle: { 'background-color': '#4488FF' },
            baseStyle: { 'background-color': '#333' },
            borderStyle: { 'border-radius': '10px' },
            textStyle: { 'font-size': '12px' },
            unlocked: true,
        },
    },

    clickables: {
        11: {
            title: "共鸣点击！",
            display() {
                return `共鸣回响 → +${format(getClickGain())} 点击分数`;
            },
            canClick() { return true; },
            onClick() { doClick(); }
        }
    },

    upgrades: {
        11: {
            title: "疾风骤雨",
            description: "手指如暴雨般落下！连击窗口 +0.5 秒",
            cost: new Decimal(1),
        },
        12: {
            title: "共鸣放大",
            description: "每一下都在回响。连击倍率 +50%",
            cost: new Decimal(3),
        },
        13: {
            title: "心跳节拍",
            description: "跟着你的心跳节奏走。连击窗口 +0.5 秒",
            cost: new Decimal(6),
        },
        14: {
            title: "时空凝滞",
            description: "时间…慢下来了…连击窗口 +1 秒",
            cost: new Decimal(12),
        }
    },

    challenges: {
        11: {
            name: "刀尖起舞",
            challengeDescription: "连击窗口缩至 0.8 秒！在刀尖上跳舞吧。",
            goalDescription: "在挑战中达到 30 连击",
            rewardDescription: "永久连击倍率 +25%",
            canComplete() {
                return (player.clickCombo || 0) >= 30;
            },
            onEnter() { },
            onExit() { player.clickCombo = 0; },
            onComplete() { },
            unlocked() { return hasMilestone("c4", 0); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "拥有 3 点击共鸣",
            effectDescription: "重置后自动拿前 2 个精准升级",
            done() { return player.c4.points.gte(3); }
        },
        1: {
            requirementDescription: "拥有 8 点击共鸣",
            effectDescription: "节奏不会断！连击中断后保留 5 层",
            done() { return player.c4.points.gte(8); }
        },
        2: {
            requirementDescription: "拥有 15 点击共鸣",
            effectDescription: "稳如老狗！保底 10 层，重置后精准满配",
            done() { return player.c4.points.gte(15); }
        },
        3: {
            requirementDescription: "拥有 30 点击共鸣",
            effectDescription: "共鸣达到顶峰！连击倍率翻倍",
            done() { return player.c4.points.gte(30); }
        }
    },

    update(diff) {

        if (tmp[this.layer].deactivated) return;
        if (player.lastClickTime === undefined) player.lastClickTime = 0;
        if (player.clickCombo === undefined) player.clickCombo = 0;

        let comboWindow = 1.5;
        if (hasUpgrade("c4", 11)) comboWindow += 0.5;
        if (hasUpgrade("c4", 13)) comboWindow += 0.5;
        if (hasUpgrade("c4", 14)) comboWindow += 1;
        if (hasAchievement("a", 20)) comboWindow += 0.3;
        if (layers.c5 && player.c5.grid && player.c5.grid[201]) comboWindow += player.c5.grid[201] * 0.1;

        if (Date.now() - player.lastClickTime >= comboWindow * 1000 && player.clickCombo > 0) {
            let minCombo = 0;
            if (hasMilestone("c4", 1)) minCombo = 5;
            if (hasMilestone("c4", 2)) minCombo = 10;
            player.clickCombo = minCombo;
        }
    },

    doReset(resettingLayer) {

        if (resettingLayer === this.layer) {
            player.clickCombo = 0;
            return;
        }

        if (resettingLayer === "c5" || resettingLayer === "c6" || resettingLayer === "c7") {
            let savedMilestones = player.c4.milestones;
            let savedChallenges = player.c4.challenges;
            let savedBest = player.c4.best;
            let savedTotal = player.c4.total;

            layerDataReset("c4");

            player.c4.milestones = savedMilestones;
            player.c4.challenges = savedChallenges;
            player.c4.best = savedBest;
            player.c4.total = savedTotal;

            player.c4.upgrades = [];
            let autoIds = [];
            if (hasMilestone("c5", 0) || hasMilestone("c5", 1)) autoIds = [11, 12, 13, 14];

            autoIds.forEach(id => {
                if (!player.c4.upgrades.includes(id)) {
                    player.c4.upgrades.push(id);
                }
            });
        }
        player.clickCombo = 0;
    }
});

addLayer("c5", {
    name: "升华",
    symbol: "C5",
    row: 4,
    displayRow: 1,
    position: 1,
    color: "#AA00FF",
    resource: "点击升华",
    baseResource: "点击共鸣",
    baseAmount() { return player.c4.points; },
    requires: new Decimal(20),
    type: "normal",
    exponent: 0.3,
    softcap: new Decimal(10),
    softcapPower: new Decimal(0.5),
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    roundUpCost: false,

    layerShown() { return player.c5.unlocked || player.c4.best.gte(20); },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }
    },

    onPrestige() {
        player._savedClickCount = player.points;
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => {
            let transPow = hasUpgrade("c5", 12) ? 1.05 : 1.03;
            return `超越凡尘：全局点击 ×${format(Decimal.pow(transPow, player.c5.points))}`;
        }],
        "blank",
        ["display-text", () => `当前点击分数：${format(player.c1.points)}`],
        "blank",
        "clickables",
        "blank",
        "grid",
        "blank",
        "upgrades",
        "blank",
        "milestones"
    ],

    clickables: {
        11: {
            title: "升华一击！",
            display() {
                return `超凡入圣 → +${format(getClickGain())} 点击分数`;
            },
            canClick() { return true; },
            onClick() { doClick(); }
        }
    },

    grid: {
        rows: 2,
        cols: 2,
        maxRows: 2,
        getStartData(id) { return 0; },
        getUnlocked(id) {
            if (id === 101) return player.c2.unlocked;
            if (id === 102) return player.c3.unlocked;
            if (id === 201) return player.c4.unlocked;
            if (id === 202) return player.c6.unlocked;
            return false;
        },
        getCanClick(data, id) {
            let costs = { 101: 50, 102: 15, 201: 10, 202: 3 };
            let base = costs[id] || 10;
            let cost = Decimal.pow(2, data).times(base);
            return player.c5.points.gte(cost);
        },
        onClick(data, id) {
            let costs = { 101: 50, 102: 15, 201: 10, 202: 3 };
            let base = costs[id] || 10;
            let cost = Decimal.pow(2, data).times(base);
            player.c5.points = player.c5.points.sub(cost);
            player[this.layer].grid[id]++;
        },
        getTitle(data, id) {
            let names = { 101: "力量升华", 102: "精准升华", 201: "共鸣升华", 202: "永恒升华" };
            return names[id] || "升华 #" + id;
        },
        getDisplay(data, id) {
            let costs = { 101: 50, 102: 15, 201: 10, 202: 3 };
            let base = costs[id] || 10;
            let cost = Decimal.pow(2, data).times(base);
            if (data === 0) return `消耗 ${format(cost)} 升华 → 解锁此升华`;
            let effects = {
                101: `力量基础倍率 +0.02 (当前 +${(data * 0.02).toFixed(2)})`,
                102: `暴击倍率 +0.5 (当前 +${(data * 0.5).toFixed(1)})`,
                201: `连击窗口 +0.1秒 (当前 +${(data * 0.1).toFixed(1)}秒)`,
                202: `永恒压缩效率 +2% (当前 +${(data * 2)}%)`,
            };
            let eff = effects[id] || `增益`;
            let next = Decimal.pow(2, data).times(base);
            return `${eff}\n下次消耗 ${format(next)} 升华`;
        },
        getStyle(data, id) {
            let colors = { 101: '#FFA500', 102: '#FF4444', 201: '#4488FF', 202: '#00FFFF' };
            let alpha = data > 0 ? 'dd' : '66';
            return { 'background-color': (colors[id] || '#AA00FF') + alpha, 'height': '95px', 'width': '130px', 'border-radius': '12px', 'font-size': '10px' };
        },
    },

    upgrades: {
        11: {
            title: "荣耀映射",
            description: "你的所有成就将照耀每一次点击。成就效果 ×2",
            cost: new Decimal(1),
        },
        12: {
            title: "升华之力",
            description: "突破极限！升华倍率从 1.03 跃升至 1.05",
            cost: new Decimal(3),
        },
        13: {
            title: "终焉一击",
            description: "传说中的最终奥义。所有点击收益 ×3",
            cost: new Decimal(8),
            effect() { return new Decimal(3); },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "拥有 2 点击升华",
            effectDescription: "重置后共鸣自动满配",
            done() { return player.c5.points.gte(2); }
        },
        1: {
            requirementDescription: "拥有 5 点击升华",
            effectDescription: "暴击率永久 +50%！强到逆天",
            done() { return player.c5.points.gte(5); }
        }
    },

    doReset(resettingLayer) {
        if (resettingLayer === this.layer) return;
        if (resettingLayer === "c6" || resettingLayer === "c7") {
            let savedMilestones = player.c5.milestones;
            let savedBest = player.c5.best;
            let savedTotal = player.c5.total;

            layerDataReset("c5");

            player.c5.milestones = savedMilestones;
            player.c5.best = savedBest;
            player.c5.total = savedTotal;

            player.c5.upgrades = [];
            if (hasMilestone("c6", 0) || hasUpgrade("c6", 14)) player.c5.upgrades = [11, 12, 13];
        }
    }
});

addLayer("c6", {
    name: "永恒",
    symbol: "C6",
    row: 5,
    displayRow: 1,
    position: 0,
    color: "#00FFFF",
    resource: "永恒印记",
    baseResource: "点击升华",
    baseAmount() { return player.c5.points; },
    requires: new Decimal(10),
    type: "normal",
    exponent: 0.25,
    softcap: new Decimal(8),
    softcapPower: new Decimal(0.5),
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    roundUpCost: false,
    glowColor: "#00FFFF",

    layerShown() { return player.c6.unlocked || player.c5.best.gte(10); },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }
    },

    onPrestige() {
        player._savedClickCount = player.points;
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => `当前点击分数：${format(player.c1.points)}`],
        ["display-text", () => {
            let scReduction = player.c6.points.times(0.04);
            if (hasUpgrade("c6", 11)) scReduction = scReduction.times(1.5);
            if (hasAchievement("a", 23)) scReduction = scReduction.add(0.1);
            if (hasUpgrade("c6", 15)) scReduction = scReduction.times(2).min(0.95);
            if (layers.c5 && player.c5.grid && player.c5.grid[202]) scReduction = scReduction.add(player.c5.grid[202] * 0.02);
            if (scReduction.gt(0.95)) scReduction = new Decimal(0.95);
            if (scReduction.gt(0.8)) scReduction = new Decimal(0.8).add(scReduction.sub(0.8).pow(0.5));
            let scMult = new Decimal(1).sub(scReduction);
            let bonus = new Decimal(1).div(scMult.max(0.1));
            if (hasUpgrade("c6", 12)) bonus = bonus.times(2);
            return `时空扭曲：软上限压缩 ${(scReduction.times(100)).toFixed(1)}% → 等效 ×${format(bonus)}`;
        }],
        "blank",
        "clickables",
        "blank",
        "bars",
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
        "challenges"
    ],

    bars: {
        compressionGauge: {
            direction: RIGHT,
            width: 350,
            height: 25,
            progress() {
                let scReduction = player.c6.points.times(0.04);
                if (hasUpgrade("c6", 11)) scReduction = scReduction.times(1.5);
                return scReduction.min(0.95).toNumber();
            },
            display() {
                let scReduction = player.c6.points.times(0.04);
                if (hasUpgrade("c6", 11)) scReduction = scReduction.times(1.5);
                return `时空压缩进度：${(scReduction.times(100)).min(95).toFixed(1)}%`;
            },
            fillStyle: { 'background-color': '#00FFFF' },
            baseStyle: { 'background-color': '#111' },
            borderStyle: { 'border-radius': '12px', 'border': '2px solid #00FFFF' },
            textStyle: { 'font-size': '12px', 'color': '#00FFFF' },
            unlocked: true,
        },
    },

    clickables: {
        11: {
            title: "永恒之触！",
            display() {
                return `穿越时空 → +${format(getClickGain())} 点击分数`;
            },
            canClick() { return true; },
            onClick() { doClick(); }
        }
    },

    upgrades: {
        11: {
            title: "时间凝滞",
            description: "永恒印记带来的软上限减免效果 +50%",
            cost: new Decimal(1),
        },
        12: {
            title: "永恒具象",
            description: "永恒印记倍率翻倍",
            cost: new Decimal(4),
        },
        13: {
            title: "时空回溯",
            description: "每次点击额外获得 c1 升级 19 的效果（基础 +500）",
            cost: new Decimal(8),
            effect() { return new Decimal(500); },
        },
        14: {
            title: "永恒不朽",
            description: "所有下层自动购买提前一档触发",
            cost: new Decimal(15),
        },
        15: {
            title: "时间尽头",
            description: "软上限压缩效率翻倍，但永不上限突破 95%",
            cost: new Decimal(25),
        }
    },

    challenges: {
        11: {
            name: "时间牢笼",
            challengeDescription: "软上限压缩暂不可用，从零证明自己。",
            goalDescription: "在挑战中累积获得 50,000,000 点击分数",
            rewardDescription: "永久软上限压缩 +5%",
            canComplete() { return player.c1.points.gte(50000000); },
            onEnter() { },
            onExit() { },
            onComplete() { },
            unlocked() { return hasMilestone("c6", 0); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "拥有 3 永恒印记",
            effectDescription: "重置后 c5 自动满配",
            done() { return player.c6.points.gte(3); }
        },
        1: {
            requirementDescription: "拥有 8 永恒印记",
            effectDescription: "重置后 c6 自留前 2 升级",
            done() { return player.c6.points.gte(8); }
        },
        2: {
            requirementDescription: "拥有 15 永恒印记",
            effectDescription: "暴击率上限突破至 100%",
            done() { return player.c6.points.gte(15); }
        }
    },

    doReset(resettingLayer) {
        if (resettingLayer === this.layer) return;
        if (resettingLayer === "c7") {
            let savedMilestones = player.c6.milestones;
            let savedBest = player.c6.best;
            let savedTotal = player.c6.total;

            layerDataReset("c6");

            player.c6.milestones = savedMilestones;
            player.c6.best = savedBest;
            player.c6.total = savedTotal;

            player.c6.upgrades = [];
            if (hasMilestone("c7", 0)) player.c6.upgrades = [11, 12, 13, 14, 15];

            let savedM5 = player.c5.milestones;
            let savedB5 = player.c5.best;
            let savedT5 = player.c5.total;

            layerDataReset("c5");

            player.c5.milestones = savedM5;
            player.c5.best = savedB5;
            player.c5.total = savedT5;
            player.c5.upgrades = [];
            let autoIds = [];
            if (hasMilestone("c6", 0)) autoIds = [11, 12, 13];
            autoIds.forEach(id => {
                if (!player.c5.upgrades.includes(id)) player.c5.upgrades.push(id);
            });
        }
    }
});

addLayer("c7", {
    name: "混沌",
    symbol: "C7",
    row: 6,
    displayRow: 2,
    position: 1,
    color: "#FF00FF",
    resource: "混沌能量",
    baseResource: "永恒印记",
    baseAmount() { return player.c6.points; },
    requires: new Decimal(5),
    type: "normal",
    exponent: 0.2,
    softcap: new Decimal(5),
    softcapPower: new Decimal(0.5),
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    roundUpCost: false,
    glowColor: "#FF00FF",

    layerShown() { return player.c7.unlocked || player.c6.best.gte(5); },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }
    },

    onPrestige() {
        player._savedClickCount = player.points;
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => `当前点击分数：${format(player.c1.points)}`],
        ["display-text", () => {
            let raw = player.c7.points;
            let stability = raw.times(0.05);
            if (hasUpgrade("c7", 11)) stability = stability.times(1.5);
            if (stability.gt(0.9)) stability = new Decimal(0.9);
            let wheelState = (layers.c7.clickables && player.c7.clickables[12]) ? player.c7.clickables[12] : "静止";
            let wheelMap = { "静止": 1, "微风": 1.5, "和风": 2, "旋风": 3, "暴风": 5, "风暴": 8, "混沌风暴": 12 };
            let baseMult = new Decimal(wheelMap[wheelState] || 1);
            if (hasUpgrade("c7", 13)) baseMult = baseMult.times(1.3);
            if (hasUpgrade("c7", 14)) baseMult = baseMult.times(1.25);
            let min = baseMult.times(new Decimal(0.7).add(stability.times(1.3)).min(1));
            let max = baseMult.times(new Decimal(2).sub(stability).max(0.3));
            if (hasUpgrade("c7", 12)) min = min.add(0.3);
            if (hasUpgrade("c7", 15)) min = min.add(0.5);
            if (hasMilestone("c7", 1)) min = min.add(0.3);
            if (hasAchievement("a", 25)) min = min.add(0.2);
            if (max.lt(min.add(0.3))) max = min.add(0.3);
            let stabilityPct = (stability.times(100)).toFixed(0);
            return `神秘风 [${wheelState}]：${wheelState !== "静止" ? "基础 ×" + format(baseMult) + " | " : ""}稳定 ${stabilityPct}% | 范围 ${format(min)}× ~ ${format(max)}×`;
        }],
        "blank",
        "clickables",
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
        "challenges"
    ],

    clickables: {
        11: {
            title: "混沌一击！",
            display() {
                return `命运轮盘 → +${format(getClickGain())} 点击分数`;
            },
            canClick() { return true; },
            onClick() { doClick(); }
        },
        12: {
            title: "神秘风",
            display() {
                let state = getClickableState(this.layer, this.id) || "静止";
                let costs = { "静止": 0, "微风": 3, "和风": 5, "旋风": 10, "暴风": 20, "风暴": 50, "混沌风暴": 120 };
                let desc = {
                    "静止": "无加成",
                    "微风": "每次点击 ×1.5",
                    "和风": "每次点击 ×2",
                    "旋风": "每次点击 ×3",
                    "暴风": "每次点击 ×5",
                    "风暴": "每次点击 ×8",
                    "混沌风暴": "每次点击 ×12",
                };
                let nextState = "";
                let states = ["静止", "微风", "和风", "旋风", "暴风", "风暴", "混沌风暴"];
                let idx = states.indexOf(state);
                if (idx >= 0 && idx < states.length - 1) {
                    nextState = states[idx + 1];
                }
                let nextCost = nextState ? costs[nextState] : 0;
                return `当前状态：${state} → ${desc[state] || ""}<br>${nextState ? "升级到 " + nextState + " 需 " + nextCost + " 混沌能量" : "已达最高"}`;
            },
            unlocked() { return hasMilestone("c7", 0); },
            canClick() {
                let state = getClickableState(this.layer, this.id) || "静止";
                if (state === "混沌风暴") return false;
                let costs = { "静止": 0, "微风": 3, "和风": 5, "旋风": 10, "暴风": 20, "风暴": 50, "混沌风暴": 120 };
                let states = ["静止", "微风", "和风", "旋风", "暴风", "风暴", "混沌风暴"];
                let idx = states.indexOf(state);
                if (idx < 0 || idx >= states.length - 1) return false;
                let next = states[idx + 1];
                return player.c7.points.gte(costs[next]);
            },
            onClick() {
                let state = getClickableState(this.layer, this.id) || "静止";
                let costs = { "静止": 0, "微风": 3, "和风": 5, "旋风": 10, "暴风": 20, "风暴": 50, "混沌风暴": 120 };
                let states = ["静止", "微风", "和风", "旋风", "暴风", "风暴", "混沌风暴"];
                let idx = states.indexOf(state);
                let next = states[Math.min(idx + 1, states.length - 1)];
                if (costs[next]) player.c7.points = player.c7.points.sub(costs[next]);
                setClickableState(this.layer, this.id, next);
            },
            style() {
                let states = ["静止", "微风", "和风", "旋风", "暴风", "风暴", "混沌风暴"];
                let colors = ['#555', '#aaf', '#88f', '#66f', '#f0f', '#f0a', '#f00'];
                let cur = getClickableState(this.layer, this.id) || "静止";
                let idx = states.indexOf(cur);
                return { 'background-color': colors[idx] || '#333', 'height': '100px', 'border-radius': '20px' };
            },
            effect() {
                let state = getClickableState(this.layer, this.id) || "静止";
                let multMap = { "静止": 1, "微风": 1.5, "和风": 2, "旋风": 3, "暴风": 5, "风暴": 8, "混沌风暴": 12 };
                return new Decimal(multMap[state] || 1);
            },
        },
    },

    upgrades: {
        11: {
            title: "混沌启蒙",
            description: "混沌稳定性提升 50%",
            cost: new Decimal(1),
        },
        12: {
            title: "命运之锚",
            description: "随机下限永久 +0.3",
            cost: new Decimal(3),
        },
        13: {
            title: "混沌归一",
            description: "混沌期望倍率 ×1.3",
            cost: new Decimal(7),
        },
        14: {
            title: "量子纠缠",
            description: "混沌倍率同时影响暴击期望 +25%",
            cost: new Decimal(12),
        },
        15: {
            title: "万物归墟",
            description: "随机下限再 +0.5，告别低roll时代",
            cost: new Decimal(20),
        }
    },

    challenges: {
        11: {
            name: "混沌风暴",
            challengeDescription: "混沌倍率范围扩至 0.1×~5×，走向极端。",
            goalDescription: "在挑战中累积获得 200,000,000 点击分数",
            rewardDescription: "永久混沌期望倍率 +20%",
            canComplete() { return player.c1.points.gte(200000000); },
            onEnter() { },
            onExit() { },
            onComplete() { },
            unlocked() { return hasMilestone("c7", 0); }
        }
    },

    milestones: {
        0: {
            requirementDescription: "拥有 2 混沌能量",
            effectDescription: "重置后 c6 自动满配",
            done() { return player.c7.points.gte(2); }
        },
        1: {
            requirementDescription: "拥有 5 混沌能量",
            effectDescription: "随机下限再 +0.3，告别低roll",
            done() { return player.c7.points.gte(5); }
        },
        2: {
            requirementDescription: "拥有 10 混沌能量",
            effectDescription: "所有层基础收益翻倍",
            done() { return player.c7.points.gte(10); }
        }
    },

    doReset(resettingLayer) {
        if (resettingLayer === this.layer) return;
    }
});

addLayer("a", {
    name: "成就",
    symbol: "A",
    row: "side",
    color: "#FFD700",
    resource: "成就点数",
    style: { 'margin-top': '40px' },
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
            name: "初来乍到",
            doneTooltip: "迈出第一步总是最难的。",
            goalTooltip: "累积 100 点击分数",
            done() { return player.c1.points.gte(100); }
        },
        12: {
            name: "渐入佳境",
            doneTooltip: "你开始享受这种感觉了。",
            goalTooltip: "累积 1,000 点击分数",
            done() { return player.c1.points.gte(1000); }
        },
        13: {
            name: "点击成瘾",
            doneTooltip: "点击 ×1.5 — 手指根本停不下来！",
            goalTooltip: "累积 10,000 点击分数 → 奖励点击 ×1.5",
            done() { return player.c1.points.gte(10000); },
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "点击收益 ×1.5"; }
        },
        14: {
            name: "不点不舒服",
            doneTooltip: "点击 ×1.5 — 你已经无可救药了。",
            goalTooltip: "累积 100,000 点击分数 → 奖励点击 ×1.5",
            done() { return player.c1.points.gte(100000); },
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "点击收益 ×1.5"; }
        },
        15: {
            name: "力量的味道",
            doneTooltip: "基础点击 +1 — 原来这就是力量的感觉！",
            goalTooltip: "获得 1 点击力量 → 奖励基础点击 +1",
            done() { return player.c2.points.gte(1); },
            effect() { return new Decimal(1); },
            effectDisplay() { return "基础点击 +1"; }
        },
        16: {
            name: "渴望更多",
            doneTooltip: "力量倍率 ×1.5 — 有了力量就想要更多力量！",
            goalTooltip: "获得 10 点击力量 → 奖励力量倍率 ×1.5",
            done() { return player.c2.points.gte(10); },
            effect() { return new Decimal(1.5); },
            effectDisplay() { return "力量倍率 ×1.5"; }
        },
        17: {
            name: "精准无误",
            doneTooltip: "暴击率 +3% — 每一击都找到要害。",
            goalTooltip: "解锁精准层 → 奖励暴击率 +3%",
            done() { return player.c3.unlocked; },
            effect() { return new Decimal(0.03); },
            effectDisplay() { return "暴击率 +3%"; }
        },
        18: {
            name: "暴击上瘾",
            doneTooltip: "暴击倍率 +0.5 — 暴击的快感让人欲罢不能。",
            goalTooltip: "获得 10 点击精准 → 奖励暴击倍率 +0.5",
            done() { return player.c3.points.gte(10); },
            effect() { return new Decimal(0.5); },
            effectDisplay() { return "暴击倍率 +0.5"; }
        },
        19: {
            name: "节奏大师",
            doneTooltip: "连击倍率 +25% — 你的节奏无人能敌。",
            goalTooltip: "达成 50 连击 → 奖励连击倍率 +25%",
            done() { return (player.clickCombo || 0) >= 50; }
        },
        20: {
            name: "心有灵犀",
            doneTooltip: "连击窗口 +0.3 秒 — 你和点击之间产生了共鸣。",
            goalTooltip: "解锁共鸣层 → 奖励连击窗口 +0.3 秒",
            done() { return player.c4.unlocked; }
        },
        21: {
            name: "超凡入圣",
            doneTooltip: "全局 +10% — 凡人已无法理解你的境界。",
            goalTooltip: "解锁升华层 → 奖励全局收益 +10%",
            done() { return player.c5.unlocked; }
        },
        22: {
            name: "点击之神",
            doneTooltip: "全层 +20% — 你就是点击之神本神！",
            goalTooltip: "获得 3 点击升华 → 奖励全层获得量 +20%",
            done() { return player.c5.points.gte(3); }
        },
        23: {
            name: "永恒之证",
            doneTooltip: "软上限减免 +10% — 时间在你指尖停留。",
            goalTooltip: "解锁永恒层 → 奖励软上限门槛降低 10%",
            done() { return player.c6.unlocked; }
        },
        24: {
            name: "时间领主",
            doneTooltip: "永恒倍率 +50% — 你已超越时间的束缚。",
            goalTooltip: "获得 5 永恒印记 → 奖励永恒倍率 +50%",
            done() { return player.c6.points.gte(5); }
        },
        25: {
            name: "混沌初开",
            doneTooltip: "随机下限 +0.2 — 混沌中也有一丝秩序。",
            goalTooltip: "解锁混沌层 → 奖励随机下限 +0.2",
            done() { return player.c7.unlocked; }
        },
        26: {
            name: "秩序之主",
            doneTooltip: "混沌倍率 +20% — 你已掌握混沌的本质。",
            goalTooltip: "获得 3 混沌能量 → 奖励混沌倍率 +20%",
            done() { return player.c7.points.gte(3); }
        }
    }
});