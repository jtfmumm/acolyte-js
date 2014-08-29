define(function(require) {
    "use strict";

    var Coords = require("js/utils/Coords");
    var ActiveAgents = require("js/agents/ActiveAgents");


    function Agent(world, wCoords) {
        this.position = wCoords;
        this.world = world;
        this.code = null;
    }

    Agent.prototype = {
        act: function () {
            //Must be implemented
        },
        move: function (posChange) {
            var posChange = Coords.makeCoords(arguments);
            var newPos = this.position.plus(posChange);
            this.tryMove(newPos);
        },
        tryMove: function (position) {
            var position = Coords.makeCoords(arguments);
            if (!this.world.isImpenetrable(position) && this.world.isWithinBoundaries(position)) {
                this.moveTo(position);
            }
        },
        moveTo: function(newPos) {
            var newPos = Coords.makeCoords(arguments);
            this.world.removeOccupant(this.position);
            this.world.addOccupant(newPos, this);
            this.position = newPos;
        },
        getCode: function() {
            return this.code;
        },
        setPosition: function(wCoords) {
            this.position = wCoords;
        },
        isImpenetrable: function () {
            return true;
        }
    };

    return Agent;
});