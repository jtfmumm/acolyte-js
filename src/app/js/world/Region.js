define(function(require) {
    "use strict";

    var regionMapGenerator = require("js/world/regionMapGenerator");

    function Region(options) {
        this.diameter = options.diameter;
        this.type = options.type;
        this.owner = options.owner || null;
        this.map = this.generateMap();
    }
    Region.prototype.generateMap = function() {
        return regionMapGenerator[this.type](this.diameter);
    };
    Region.prototype.getType = function() {
        return this.type;
    };
//    Region.prototype.getOwner = function() {
//        return this.owner;
//    };
//    Region.prototype.hasOwner = function() {
//        return !!this.owner;
//    };

    return Region;
});