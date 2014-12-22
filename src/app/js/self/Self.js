define(function(require) {
    "use strict";
    
    var config = require("js/data/config");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var Directions = require("js/movement/Directions");
    var Console = require("js/screens/Console");
    var CombatModes = require("js/data/CombatModes");

    var Self = {
        isActive: false,
        position: null,
        nextInputList: [], //Can hold a command and followup commands
        level: null,
        stats: {
            name: "Acolyte",
            level: 1,
            hp: 30,
            combatMode: CombatModes.NONE
        },

        init: function(input) {
            this.input = input;
            this.highlighted = true;
            this.updateConsoleStats();
        },
        enterLevel: function(level, coords) {
            this.level = level;
            this.position = coords;
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
        move: function(posChange) {
            this.level.moveSelf(this, this.position, posChange);
        },
        look: function(posChange) {
            var thisTile = this.level.examineTile(this.position.plus(posChange));
            Console.msg(thisTile);
        },
        getCode: function() {
            return "self";
        },
        setInputList: function(input) {
            this.nextInputList = input;
        },
        act: function() {
            if (this.isActive) {
                if (this.stats.hp < 1) {
                    Console.msg("You have fallen!");
                    return;
                }

                if (Directions.isDirection(this.nextInputList[0])) {
                    this.move(Directions[this.nextInputList[0]]);
                } else {
                    this.lookUpAction();
                }

                this.nextInputList = [];
                this.updateConsoleStats();
            }
        },
        lookUpAction: function() {
            switch (this.nextInputList[0]) {
                case "ATTACK":
                    this.stats.combatMode = CombatModes.ATTACK;
                    break;
                case "DEFEND":
                    this.stats.combatMode = CombatModes.DEFEND;
                    break;
                case "NORMAL":
                    this.stats.combatMode = CombatModes.NONE;
                    break;
                case "LOOK":
                    if (Directions.isDirection(this.nextInputList[1])) {
                        this.look(Directions[this.nextInputList[1]]);
                    } else {
                        Console.msg("Invalid direction");
                    }
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
        }
    };

    return Self;
});