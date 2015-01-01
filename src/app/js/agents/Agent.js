define(function(require) {
    "use strict";

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var Uid = require("js/utils/Uid");
    var SocialAttitudes = require("js/agents/social/SocialAttitudes");
    var Dice = require("js/rules/Dice");
    var Console = require("js/screens/Console");

    var agentIdGenerator = Uid.makeGenerator();

    function Agent(level, wCoords) {
        this.id = agentIdGenerator();
        this.position = wCoords;
        this.level = level;
        this.hp = 1;
        this.armorClass = 10;
        this.attackDice = new Dice(1, 1);
        this.hitBonus = 0;
        this.code = null;
        this.lastMove = new Coords(0, 0);
        this.highlighted = false;
        this.socialAttitudes = new SocialAttitudes();
    }

    Agent.prototype = {
        act: function () {
            //Must be implemented
        },
        rollToHit: function(targetArmorClass) {
            return Rand.roll(20) > targetArmorClass;
        },
        rollToDamage: function() {
            return this.attackDice.roll() + this.hitBonus;
        },
        loseHP: function(damage) {
            this.hp -= damage;
            if (this.isDead()) this.fall();
        },
        getArmorClass: function() {
            return this.armorClass;
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
        },
        isDead: function() {
            return this.hp <= 0;
        },
        fall: function() {
            Console.msg(this.describe() + " has been slain!");
            this.level.unregisterAgent(this, this.position);
            this.level.removeAgent(this.position);
        }
    };

    return Agent;
});