define(function(require) {
    "use strict";
    
    var config = require("js/data/config");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var Directions = require("js/movement/Directions");
    var Console = require("js/screens/Console");
    var CombatModes = require("js/data/CombatModes");

    var Self = {
        position: null,
        nextInputList: [], //Can hold a command and followup commands
        level: null,
        stats: {
            name: "Acolyte",
            level: 1,
            hp: 30,
            combatMode: CombatModes.NONE
        },

        init: function(level, coords, input) {
            this.level = level;
            this.position = coords;
            this.input = input;
            this.updateConsoleStats();
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
        getCode: function() {
            return "self";
        },
        setInputList: function(input) {
            this.nextInputList = input;
        },
        act: function() {
            if (this.stats.hp < 1) {
                Console.msg("You have fallen!");
                return;
            }
            switch (this.nextInputList[0]) {
                case "UP":
                    this.move(Directions.north);
                    break;
                case "DOWN":
                    this.move(Directions.south);
                    break;
                case "LEFT":
                    this.move(Directions.west);
                    break;
                case "RIGHT":
                    this.move(Directions.east);
                    break;
                case "NORTH":
                    this.move(Directions.north);
                    break;
                case "SOUTH":
                    this.move(Directions.south);
                    break;
                case "WEST":
                    this.move(Directions.west);
                    break;
                case "EAST":
                    this.move(Directions.east);
                    break;
                case "NORTHWEST":
                    this.move(Directions.northWest);
                    break;
                case "NORTHEAST":
                    this.move(Directions.northEast);
                    break;
                case "SOUTHWEST":
                    this.move(Directions.southWest);
                    break;
                case "SOUTHEAST":
                    this.move(Directions.southEast);
                    break;

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
                    switch (this.nextInputList[1]) {
                        case "UP":
                            Console.msg("UP");
                            break;
                        default:
                            Console.msg(this.nextInputList[1]);
                            break;
                    }
                    break;
                case "EXAMINE":
                    var thisTile = this.level.examineTile(this.position);
                    Console.msg(thisTile);
                default:
                    break;
            }
            this.nextInputList = [];
            this.updateConsoleStats();
        },
        isDead: function() {
            return this.stats.hp < 1;
        },
        isImpenetrable: function() {
            return true;
        }
    };

    return Self;
});