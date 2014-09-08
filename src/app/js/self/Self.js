define(function(require) {
    "use strict";
    
    var config = require("js/data/config");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var Directions = require("js/movement/Directions");
    var Console = require("js/screens/Console");
    var CombatModes = require("js/data/CombatModes");

    // var self = self || null;

    var Self = {
        position: null, //in wCoords
        nextInputList: [], //Can hold a command and followup commands
        world: null,
        stats: {
            name: "Acolyte",
            level: 1,
            hp: 30,
            combatMode: CombatModes.NONE
        },

        init: function(world, wCoords, input) {
            this.world = world;
            this.position = wCoords;
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
        setWorld: function(world) {
            this.world = world;
        },
        setPosition: function(position) {
            this.position = position;
        },
        move: function(posChange) {
            this.world.moveSelf(this, this.position, posChange);
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
                this.world.endGame();
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
                    var thisTile = this.world.examineTile(this.position);
                    Console.msg(thisTile);
                default:
                    break;
            }
            this.nextInputList = [];
            this.updateConsoleStats();
        },
        isImpenetrable: function() {
            return true;
        }
    };

    // if (!self) self = Object.create(Self);

    return Self;
});