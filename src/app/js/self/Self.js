define(function(require) {
    "use strict";
    
    var config = require("js/data/config");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var Directions = require("js/movement/Directions");
    var Console = require("js/screens/Console");
    var CombatModes = require("js/data/CombatModes");
    var Talk = require("js/talk/Talk");
    var Dice = require("js/rules/Dice");
    var Inventory = require("js/inventory/Inventory");
    var Holding = require("js/inventory/Holding");

    var Self = {
        isActive: false,
        position: null,
        nextInput: null,
        level: null,
        hitBonus: 0,
        inventory: new Inventory(),
        holding: new Holding(),
        maxWeight: 100,
        stats: {
            name: "Acolyte",
            level: 1,
            hp: 30,
            combatMode: CombatModes.NONE
        },

        init: function(input) {
            this.input = input;
            this.updateConsoleStats();
        },
        describe: function() {
            return "a very attractive character.";
        },
        talk: function() {
            return "Talking to myself...";
        },
        enterLevel: function(level, coords) {
            this.level = level;
            this.position = coords;
            this.stats.combatMode = CombatModes.NONE;
        },
        getStats: function() {
            return this.stats;
        },
        updateConsoleStats: function() {
            for (var prop in this.stats) {
                Console.updateStat(prop, this.stats[prop]);
            }
        },
        getName: function() {
            return this.stats.name;
        },
        updateLevel: function(level) {
            this.level = level;
        },
        setPosition: function(position) {
            this.position = position;
        },
        getPosition: function() {
            return this.position;
        },
        getLevel: function() {
            return this.level;
        },
        move: function(posChange) {
            this.level.moveSelf(this, this.position, posChange);
        },
        look: function(position) {
            var thisTile = this.level.examineTile(position);
            Console.msg(thisTile);
        },
        attackOrMove: function(direction) {
            if (this.level.hasOccupantAt(this.position.plus(direction))) {
                this.attack(direction);
            } else {
                this.move(direction);
            }
        },
        attack: function(direction) {
            this.level.attackAgent(this, this.position, direction);
        },
        fire: function(direction) {
            if (this.canFire()) {
                Console.msg("Fire!");
            } else {
                Console.msg("Nothing to fire!");
            }
        },
        canFire: function() {
            return true;
        },
        rollToHit: function(targetArmorClass) {
            return Rand.roll(20) > targetArmorClass;
        },
        rollToDamage: function() {
            return this.getAttackDice().roll() + this.hitBonus;
        },
        loseHP: function(damage) {
            this.stats.hp -= damage;
        },
        getAttackDice: function() {
            return this.holding.getAttackDice();
        },
        getArmorClass: function() {
            return this.holding.getArmorClass();
        },
        talkTo: function(position) {
            Talk.talkTo(this.level.talkTo(position));
        },
        getCode: function() {
            return "self";
        },
        setNextInput: function(input) {
            this.nextInput = input;
        },
        act: function() {
            if (this.isActive) {
                if (this.stats.hp < 1) {
                    Console.msg("You have fallen!");
                    return;
                }

                if (Directions.isDirection(this.nextInput)) {
                    var direction = Directions[this.nextInput];
                    if (this.stats.combatMode === CombatModes.ATTACK) {
                        this.attackOrMove(direction);
                    } else {
                        this.move(direction);
                    }
                } else {
                    this.lookUpAction();
                }

                this.nextInput = null;
                this.updateConsoleStats();
            }
        },
        lookUpAction: function() {
            switch (this.nextInput) {
                case "ATTACK":
                    this.stats.combatMode = CombatModes.ATTACK;
                    break;
                case "DEFEND":
                    this.stats.combatMode = CombatModes.DEFEND;
                    break;
                case "NORMAL":
                    this.stats.combatMode = CombatModes.NONE;
                    break;
            }
        },
        addToInventory: function(item) {
            if (!this.inventory.isOverLimitAfterItem(this.maxWeight, item)) {
                this.inventory.addItem(item);
            } else {
                Console.msg("You're holding too much weight!");
            }
        },
        isDead: function() {
            return this.stats.hp < 1;
        },
        isImpenetrable: function() {
            return true;
        },
        activate: function() {
            this.isActive = true;
        },
        deactivate: function() {
            this.isActive = false;
        },
        toggleHighlighted: function() {
            this.highlighted = !this.highlighted;
        },
        isHighlighted: function() {
            return this.highlighted;
        },
        ///For dev editing of map
        placeLevel: function(coords, levelSeed) {
            this.level.placeLevel(coords, levelSeed);
        }
    };

    return Self;
});