define(function(require) {

    var _ = require("lodash");
    var ActiveAgents = require("js/agents/ActiveAgents");

    var Simulator = {
        nextStep: function() {
            ActiveAgents.prepareAgents();
        },
        nextSteps: function(n) {
            _.times(n, this.nextStep);
        }
    };

    return Simulator;
});