define(function(require) {
    "use strict";

    var Coords = require("js/utils/Coords");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var Uid = require("js/utils/Uid");
    var SocialAttitudes = require("js/agents/social/SocialAttitudes");

    var agentIdGenerator = Uid.makeGenerator();

    function Agent(level, wCoords) {
        this.id = agentIdGenerator();
        this.position = wCoords;
        this.level = level;
        this.code = null;
        this.highlighted = false;
        this.socialAttitudes = new SocialAttitudes();
    }

    Agent.prototype = {
        act: function () {
            //Must be implemented
        },
        move: function (posChange) {
            this.level.moveAgent(this, this.position, posChange);
        },
        getCode: function() {
            return this.code;
        },
        getId: function() {
            return this.id;
        },
        setPosition: function(coords) {
            this.position = coords;
        },
        isImpenetrable: function () {
            return true;
        },
        toggleHighlighted: function() {
            this.highlighted = !this.highlighted;
        },
        isHighlighted: function() {
            return this.highlighted;
        },
        talk: function() {
            return "Hi there, weirdo.";
        }
    };

    return Agent;
});