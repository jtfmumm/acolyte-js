define(function(require) {
    var Agent = require("js/agents/Agent");
    var MovementAlgs = require("js/movement/MovementAlgs");

    function Drunk(world, coords) {
        Agent.call(this, world, coords);
        this.code = "drunk";    
    }
    Drunk.prototype = Object.create(Agent.prototype);
    Drunk.prototype.act = function() {
        this.move(MovementAlgs.drunk());
    }

    return Drunk;
});