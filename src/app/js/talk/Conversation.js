define(function(require) {

    var Personality = require("js/agents/stats/Personality");
    var Rand = require("js/utils/Rand");

    function Conversation(options) {
        options = options || {};
        this.personality = options.personality || new Personality();
    }

    Conversation.prototype = {
        talk: function() {
            if (!Rand.rolledByOdds(this.personality.friendly)) {
                return this.title() + ": I'm not interested in talking to you!";
            } else {
                return this.title() + ": Hi there, want to strike up a conversation?";
            }
        },
        title: function() {
            return this.personality.name + " the " + this.personality.occupation;
        }
    };

    return Conversation;
});