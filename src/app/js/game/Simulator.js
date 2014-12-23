define(function(require) {

    var _ = require("lodash");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var ActiveLocation = require("js/world/ActiveLocation");
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
        catchUpClock: 0,
        catchUpStep: function() {
            this._advanceSimulator();
            this.catchUpClock++;
            if (this.catchUpClock % 50 === 0) {
                ActiveLocation.playPopulationGame();
            }
        },
        catchUpBy: function(n) {
            var _this = this;
            _.times(n, _this.catchUpStep.bind(_this));
            this.catchUpClock = 0;
        },
        _advanceSimulator: function() {
            ActiveAgents.prepareAgents();
            if (Calendar.getTime() % 50 === 0) {
                ActiveLocation.playPopulationGame();
            }
        },
        _advanceTime: function() {
            Calendar.addTick();
        }

    };

    return Simulator;
});