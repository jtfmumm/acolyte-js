define(function(require) {
    "use strict";
    
    var config = require("js/data/config");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var Directions = require("js/movement/Directions");
    var Console = require("js/screens/Console");

    // var self = self || null;

    var Self = {
        position: null, //in wCoords
        nextInput: null,
        world: null,
        stats: {
            name: "Acolyte",
            level: 1,
            hp: 30
        },

        init: function(world, wCoords) {
            this.world = world;
            this.position = wCoords;
            this.updateConsoleStats();
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
        setInput: function(input) {
            this.nextInput = input;
        },
        act: function() {
            if (this.stats.hp < 1) {
                Console.msg("You have fallen!");
                this.world.endGame();
                return;
            }
            switch (this.nextInput) {
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
                case "EXAMINE":
                    var thisTile = this.world.examineTile(this.position);
                    Console.msg(thisTile);
                default:
                    break;
            }
            this.nextInput = null;
            this.updateConsoleStats();
        },
        isImpenetrable: function() {
            return true;
        }
    };

    // if (!self) self = Object.create(Self);

    return Self;
});