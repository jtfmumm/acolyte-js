define(function(require) {
    "use strict";

    var regionMapGenerator = require("js/world/regionMapGenerator");

    function Region(options) {
        this.diameter = options.diameter;
        this.type = options.type;
        this.owner = options.owner || null;
        this.map = this.generateMap();
    }

    Region.prototype = {
        generateMap: function () {
            return regionMapGenerator[this.type](this.diameter);
        },
        getType: function () {
            return this.type;
        }
    };

    return Region;
});