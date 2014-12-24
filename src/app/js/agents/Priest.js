define(function(require) {
    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var npcMixin = require("js/agents/npcMixin");
    var MovementAlgs = require("js/movement/MovementAlgs");
    var Personality = require("js/agents/stats/Personality");
    var Conversation = require("js/talk/Conversation");

    function Priest(level, coords, options) {
        options = options || {};
        Agent.call(this, level, coords);
        this.type = "priest";
        this.code = "priest";
        this.cult = options.cult || "Osiris";
        this.personality = new Personality({occupation: "priest"});
        this.conversation = new Conversation({personality: this.personality});
    }

    Priest.prototype = npcMixin({
    });

    return Priest;
});