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
        nextInput: null,
        level: null,
        stats: {
            name: "Acolyte",
            level: 1,
            hp: 30,
            combatMode: CombatModes.NONE
        },

        init: function(input) {
            this.input = input;
//            this.highlighted = true;
            this.updateConsoleStats();
        },
        describe: function() {
            return "a very attractive character.";
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
        talk: function(position) {
            Console.msg("Talking!");
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
                    this.move(Directions[this.nextInput]);
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