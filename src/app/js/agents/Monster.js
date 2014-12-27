define(function(require) {
    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var monsterMixin = require("js/agents/monsterMixin");
    var MovementAlgs = require("js/movement/MovementAlgs");
    var Personality = require("js/agents/stats/Personality");
    var Conversation = require("js/talk/Conversation");
    var Rand = require("js/utils/Rand");

    function Monster(level, coords, options) {
        options = options || {};
        Agent.call(this, level, coords);
        this.type = options.type || generateType();
        this.code = this.type;
        this.hp = 5;
        this.armorClass = 10;
    }

    Monster.prototype = monsterMixin({});

    function generateType() {
        var types = ["skeleton"];
        return Rand.pickItem(types);
    }

    return Monster;
});