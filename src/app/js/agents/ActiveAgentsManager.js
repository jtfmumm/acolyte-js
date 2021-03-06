define(function(require) {

    var ActiveAgents = require("js/agents/ActiveAgents");

    function ActiveAgentsManager() {
        this.activeList = [];
        this.active = false;
    }

    ActiveAgentsManager.prototype = {
        addAgent: function(agent) {
            this.activeList.unshift(agent);
        },
        removeAgent: function(agent) {
            var agentIdx = this.activeList.indexOf(agent);
            if (agentIdx !== -1) {
                this.activeList.splice(agentIdx, 1);
            } else {
                console.error("That agent is not in this list!", agent);
            }
        },
        isActive: function() {
            return this.active;
        },
        getAgents: function() {
            return this.activeList;
        },
        activate: function() {
            this.active = true;
            ActiveAgents.addRegionAgentsManager(this);
        },
        deactivate: function() {
            this.active = false;
        },
        clearAll: function() {
            this.activeList = [];
        }
    };

    return ActiveAgentsManager;
});