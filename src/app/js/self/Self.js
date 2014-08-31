define(function(require) {
    "use strict";
    
    var config = require("js/data/config");
    var Coords = require("js/utils/Coords");
    var Directions = require("js/movement/Directions");

    // var self = self || null;

    var Self = {
        position: null, //in wCoords
        nextInput: null,
        world: null,

        init: function(world, wCoords) {
            this.world = world;
            this.position = wCoords;
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
                default:
                    break;
            }
            this.nextInput = null;
        },
        isImpenetrable: function() {
            return true;
        }
    };

    // if (!self) self = Object.create(Self);

    return Self;
});