define(function(require) {
    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var MovementAlgs = require("js/movement/MovementAlgs");

    function Drunk(world, coords) {
        Agent.call(this, world, coords);
        this.code = "drunk";    
    }

    Drunk.prototype = _.extend(Object.create(Agent.prototype), {
        act: function () {
            this.move(MovementAlgs.drunk());
        }
    });

    return Drunk;
});