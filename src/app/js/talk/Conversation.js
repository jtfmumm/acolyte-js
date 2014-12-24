define(function(require) {

    var Personality = require("js/agents/stats/Personality");
    var SocialAttitudes = require("js/agents/social/SocialAttitudes");
    var Rand = require("js/utils/Rand");

    function Conversation(options) {
        options = options || {};
        this.personality = options.personality || new Personality();
        this.socialAttitudes = options.socialAttitudes || new SocialAttitudes();
    }

    Conversation.prototype = {
        talk: function() {
//            if (!Rand.rolledByOdds(this.personality.friendly)) {
                return this.title() + ": " + this.comment();
//            } else {
//                return this.title() + ": Hi there, want to strike up a conversation?";
//            }
        },
        title: function() {
            return this.personality.name + " the " + this.personality.occupation;
        },
        comment: function() {
            if (this.socialAttitudes.hasAttitude()) {
                var attitude = this.socialAttitudes.getRandomAttitude();
                var target = attitude.getTarget();
                return target.describe() + " is " + rateTarget(attitude.getLike());
            } else {
                return "I have nothing to talk about!";
            }
        }
    };

    function rateTarget(like) {
        if (like > 10) {
            return "amazing!";
        } else if (like > 6) {
            return "great.";
        } else if (like > 3) {
            return "good.";
        } else if (like > 1) {
            return "ok.";
        } else if (like >= 0) {
            return "someone I know nothing about.";
        } else if (like > -2) {
            return "strange.";
        } else if (like > -5) {
            return "annoying.";
        } else if (like > -10) {
            return "really bad,";
        } else {
            return "absolutely terrible!";
        }
    }

    return Conversation;
});