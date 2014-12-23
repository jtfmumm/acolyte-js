define(function(require) {
    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var npcMixin = require("js/agents/npcMixin");
    var MovementAlgs = require("js/movement/MovementAlgs");
    var Personality = require("js/agents/stats/Personality");
    var Conversation = require("js/talk/Conversation");

    function Alchemist(level, coords, options) {
        options = options || {};
        Agent.call(this, level, coords);
        this.code = "alchemist";
        this.personality = new Personality({occupation: "alchemist"});
        this.conversation = new Conversation({personality: this.personality});
    }

    Alchemist.prototype = npcMixin({
    });

    return Alchemist;

});