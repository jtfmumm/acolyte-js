define(function(require) {
    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var MovementAlgs = require("js/movement/MovementAlgs");

    function Priest(world, coords, options) {
        var options = options || {};
        Agent.call(this, world, coords);
        this.code = "priest";
        this.cult = options.cult || "Osiris";
    }

    Priest.prototype = _.extend(Object.create(Agent.prototype), {
        act: function () {
            this.move(MovementAlgs.drunk());
        },
        describe: function() {
            return "a priest of " + this.cult + ".";
        }
    });

    return Priest;
});