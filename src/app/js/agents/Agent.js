define(function(require) {
    "use strict";

    var Coords = require("js/utils/Coords");
    var ActiveAgents = require("js/agents/ActiveAgents");


    function Agent(world, wCoords) {
        this.position = wCoords;
        this.level = level;
        this.code = null;
    }

    Agent.prototype = {
        act: function () {
            //Must be implemented
        },
        move: function (posChange) {
            this.world.moveAgent(this, this.position, posChange);
        },
        getCode: function() {
            return this.code;
        },
        setPosition: function(coords) {
            this.position = coords;
        },
        isImpenetrable: function () {
            return true;
        }
    };

    return Agent;
});