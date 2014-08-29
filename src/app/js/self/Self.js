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
            this.world.addOccupant(this.position, this);
//            world.initializeAgents();
        },
        updateWorld: function(world) {
            this.world = world;
        },
        move: function(posChange) {
            var posChange = Coords.makeCoords(arguments);
            var newPos = this.position.plus(posChange);
            this.tryMove(newPos);
        },
        tryMove: function(wCoords) {
            if (!this.world.isImpenetrable(wCoords)) {
                this.moveTo(position);
            }
        },
        moveTo: function(newPos) {
            this.world.removeOccupant(this.position);
            this.world.addOccupant(newPos, this);
            this.position = newPos;
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
    }

    // if (!self) self = Object.create(Self);

    return Self;
})