define(function(require) {


    function RegionAgentsManager() {
    }

    RegionAgentsManager.prototype = {
        activeList: [],
        active: false,

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
        getAgents: function() {
            return this.activeList;
        },
        activate: function() {
            this.active = true;
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