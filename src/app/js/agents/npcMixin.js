define(function(require) {

    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var MovementAlgs = require("js/movement/MovementAlgs");

    var npc = _.extend(Object.create(Agent.prototype), {
        act: function() {
            var posChange = MovementAlgs.drunk();
            this.move(posChange);
        },
        describe: function() {
            return this.personality ? this.personality.describe() : "someone.";
        },
        talk: function() {
            return this.conversation ? this.conversation.talk() : "Hello, weird one.";
        }
    });

    function npcMixin(extension) {
        return _.extend(Object.create(npc), extension);
    }

    return npcMixin;
});