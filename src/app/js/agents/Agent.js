define(function(require) {
    "use strict";

    var Coords = require("js/utils/Coords");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var Uid = require("js/utils/Uid");
    var SocialAttitudes = require("js/agents/social/SocialAttitudes");
    var Console = require("js/screens/Console");

    var agentIdGenerator = Uid.makeGenerator();

    function Agent(level, wCoords) {
        this.id = agentIdGenerator();
        this.position = wCoords;
        this.level = level;
        this.hp = 1;
        this.armorClass = 0;
        this.code = null;
        this.lastMove = new Coords(0, 0);
        this.highlighted = false;
        this.socialAttitudes = new SocialAttitudes();
    }

    Agent.prototype = {
        act: function () {
            //Must be implemented
        },
        damage: function(attacker) {
            var damage = attacker.rollToHit(this.armorClass);
            if (damage) {
                this.hp -= damage;
                Console.msg(attacker.describe() + " hits " + this.describe() + " for " + damage + " damage!");
            } else {
                Console.msg(attacker.describe() + " misses!");
            }
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