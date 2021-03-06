define(function(require) {
    "use strict";

    var ActiveAgentsManager = require("js/agents/ActiveAgentsManager");
    var Coords = require("js/utils/Coords");

    function Region(options) {
        options = options || {};
        this.activeAgents = new ActiveAgentsManager();
        this.owner = options.owner || null;
    }

    Region.prototype = {
        isEqual: function(otherRegion) {
            return this === otherRegion;
        },
        registerAgent: function(agent) {
            this.activeAgents.addAgent(agent);
        },
        unregisterAgent: function(agent) {
            this.activeAgents.removeAgent(agent);
        },
        activate: function() {
            this.activeAgents.activate();
        },
        deactivate: function() {
            this.activeAgents.deactivate();
        }
    };


    return Region;
});