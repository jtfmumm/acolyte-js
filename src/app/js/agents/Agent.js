define(function(require) {
    "use strict";

    var Coords = require("js/utils/Coords");
    var ActiveAgents = require("js/agents/ActiveAgents");


    function Agent(region, coords) {
        this.active = false;
        this.position = coords;
        this.region = region;
        this.code = null;
    }

    Agent.prototype = {
        act: function () {
        },
        move: function (posChange) {
            var posChange = Coords.makeCoords(arguments);
            var newPos = this.position.plus(posChange);
            this.tryMove(newPos);
        },
        tryMove: function (position) {
            var position = Coords.makeCoords(arguments);
            if (!this.region.isImpenetrable(position) && this.region.isWithinBoundaries(position)) {
                this.moveTo(position);
            }
        },
        moveTo: function (newPos) {
            var newPos = Coords.makeCoords(arguments);
            this.region.removeOccupant(this.position);
            this.region.addOccupant(newPos, this);
            this.position = newPos;
        },
        isActive: function () {
            return this.active;
        },
        activate: function () {
            if (!this.active) this.region.activateAgent(this);
            this.active = true;
        },
        deactivate: function () {
            this.active = false;
        },
        getCode: function () {
            return this.code;
        },
        setPosition: function (position) {
            this.position = Coords.makeCoords(arguments);
        },
        isImpenetrable: function () {
            return true;
        }
    };

    return Agent;
});