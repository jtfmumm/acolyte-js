define(function(require) {
    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var npcMixin = require("js/agents/npcMixin");
    var MovementAlgs = require("js/movement/MovementAlgs");
    var Personality = require("js/agents/stats/Personality");
    var Conversation = require("js/talk/Conversation");
    var Rand = require("js/utils/Rand");

    function NPC(level, coords, options) {
        options = options || {};
        Agent.call(this, level, coords);
        this.type = options.type || generateType();
        this.code = this.type;
        this.personality = new Personality({occupation: this.type});
        this.conversation = new Conversation({personality: this.personality});
    }

    NPC.prototype = npcMixin({});

    function generateType() {
        var types = ["alchemist", "baker", "bard", "carpenter", "cottager", "farmer", "potter", "tailor"];
        return Rand.pickItem(types);
    }

    return NPC;
});