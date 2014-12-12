define(function(require) {

    var ActionProcessor = require("js/agents/ActionProcessor");
    
    var ActiveAgents = {
        waitList: [],
        activeList: [],

        addRegionAgentsManager: function(regionAgentsManager) {
            this.waitList.unshift(regionAgentsManager);
        },
        moveToActive: function() {
            this.activeList = this.waitList.filter(function(regionAgentsManager) {
                                return regionAgentsManager.isActive();
                            });
            this.waitList = []; 
        },
        processActiveList: function() {
            var that = this;
            var agents = [];
            this.activeList.forEach(function(regionAgentsManager) {
                agents = agents.concat(regionAgentsManager.getAgents());
                that.waitList.unshift(regionAgentsManager);
            });
            agents.forEach(function(agent) {
                agent.act();
            });
            this.activeList = [];
        },
        prepareAgents: function() {
            this.moveToActive();
            this.processActiveList();
        },
        clearAll: function() {
            this.waitList.forEach(function(regionAgentsManager) {
                regionAgentsManager.deactivate();
            });
            this.activeList.forEach(function(regionAgentsManager) {
                regionAgentsManager.deactivate();
            });
            this.waitList = [];
            this.activeList = [];
        }
    };

    return ActiveAgents;
});