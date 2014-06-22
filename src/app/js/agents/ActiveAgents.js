define(function(require) {
    
    var ActiveAgents = {
        waitList: [],
        activeList: [],

        addAgent: function(agent) {
            this.waitList.unshift(agent);
        },
        moveToActive: function() {
            this.activeList = this.waitList.filter(function(agent) {
                                return agent.isActive();
                            });
            this.waitList = []; 
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
            this.waitList.forEach(function(agent) {
                agent.deactivate();
            });
            this.activeList.forEach(function(agent) {
                agent.deactivate();
            });
            this.waitList = [];
            this.activeList = [];
        }
    }

    return ActiveAgents;
})