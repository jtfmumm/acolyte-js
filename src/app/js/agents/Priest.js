define(function(require) {
    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var npcMixin = require("js/agents/npcMixin");
    var MovementAlgs = require("js/movement/MovementAlgs");

    function Priest(level, coords, options) {
        var options = options || {};
        Agent.call(this, level, coords);
        this.code = "priest";
        this.cult = options.cult || "Osiris";
    }

    Priest.prototype = npcMixin({
        describe: function() {
            return "a priest of " + this.cult + ".";
        }
    });

    return Priest;
});