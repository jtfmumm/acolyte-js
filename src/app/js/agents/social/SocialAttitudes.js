define(function(require) {

    var SocialAttitude = require("js/agents/social/SocialAttitude");

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
            if (!this.attitudes[agentId]) this.attitudes[agentId] = new SocialAttitude();
        }
    };

    return SocialAttitudes;
});