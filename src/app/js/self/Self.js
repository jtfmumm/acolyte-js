define(function(require) {
    "use strict";
    
    var config = require("js/data/config");
    var Coords = require("js/utils/Coords");
    var Directions = require("js/movement/Directions");

    // var self = self || null;

    var Self = {
        position: new Coords(1, 1),
        nextInput: null,
        world: null,
        region: null,

        init: function(world) {
            this.updateWorld(world); 
            this.position = this.world.focus;
            this.world.addOccupant(this.position, this);
            world.initializeAgents();
        },
        setRegion: function(region) {
            this.region = region;
        },
        updateWorld: function(world) {
            this.world = world;
        },
        isActive: function() {
            return true;
        },
        move: function(posChange) {
            var posChange = Coords.makeCoords(arguments);
            var newPos = this.position.plus(posChange);
            this.tryMove(newPos);
        },
        tryMove: function(position) {
            var position = Coords.makeCoords(arguments);
            if (!this.world.isImpenetrable(position) && this.world.isWithinBoundaries(position)) {
                this.moveTo(position);
            }
        },
        moveTo: function(newPos) {
            var newPos = Coords.makeCoords(arguments);
            this.world.removeOccupant(this.position);
            this.world.addOccupant(newPos, this);
            this.world.updateFocus(newPos);
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
        activate: function() {
            console.log("Self activated!");
        },
        deactivate: function() {
            console.log("Self deactivated!!");
        },
        isImpenetrable: function() {
            return true;
        }
    }

    // if (!self) self = Object.create(Self);

    return Self;
})