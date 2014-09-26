define(function(require) {

    var _ = require("lodash");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var Calendar = require("js/time/Calendar");

    var Simulator = {
        nextStep: function() {
            this._advanceSimulator();
            this._advanceTime();
        },
        nextSteps: function(n) {
            var _this = this;
            _.times(n, _this.nextStep.bind(_this));
        },
        catchUpStep: function() {
            this._advanceSimulator();
        },
        catchUpBy: function(n) {
            var _this = this;
            _.times(n, _this.catchUpStep.bind(_this));
        },
        _advanceSimulator: function() {
            ActiveAgents.prepareAgents();
        },
        _advanceTime: function() {
            Calendar.addTick();
        }

    };

    return Simulator;
});