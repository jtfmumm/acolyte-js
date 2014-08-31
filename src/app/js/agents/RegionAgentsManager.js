define(function(require) {

    var ActiveAgents = require("js/agents/ActiveAgents");

    function RegionAgentsManager() {
        this.activeList = [];
        this.active = false;
    }

    RegionAgentsManager.prototype = {
        addAgent: function(agent) {
            this.activeList.unshift(agent);
        },
        removeAgent: function(agent) {
            var agentIdx = this.activeList.indexOf(agent);
            if (agentIdx !== -1) {
                this.activeList.slice(agentIdx, 1);
            } else {
                console.log("That agent is not in this list!")
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
        processActiveList: function() {
            var that = this;
            this.activeList.forEach(function(agent) {
                agent.act();
                that.waitList.unshift(agent);
            });
            this.activeList = [];
        },
        prepareAgents: function() {
            this.moveToActive();
            this.processActiveList();
        },
        clearAll: function() {
            this.activeList = [];
        }
    };

    return RegionAgentsManager;
});