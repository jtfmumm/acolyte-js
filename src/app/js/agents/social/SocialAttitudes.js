define(function(require) {

    var SocialAttitude = require("js/agents/social/SocialAttitude");
    var Rand = require("js/utils/Rand");

    function SocialAttitudes() {
        //Hash of agent ids to SocialAttitudes (toward the corresponding agent)
        this.attitudes = {};
    }

    SocialAttitudes.prototype = {
        getSocialAttitude: function(agent) {
            var agentId = agent.getId();
            if (this.attitudes[agentId]) {
                return this.attitudes[agentId];
            } else {
                this.addAgent(agent);
                return this.attitudes[agentId];
            }
        },
        addAgent: function(agent) {
            var agentId = agent.getId();
            if (!this.attitudes[agentId]) this.attitudes[agentId] = new SocialAttitude(agent);
        },
        hasAttitude: function() {
            var keys = Object.keys(this.attitudes);
            return keys.length ? true : false;
        },
        getRandomAttitude: function() {
            var key = Rand.pickItem(Object.keys(this.attitudes));
            return this.attitudes[key];
        }
    };

    return SocialAttitudes;
});