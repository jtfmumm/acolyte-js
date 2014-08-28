define(function(require) {
    "use strict";

    var regionGenerator = require("js/world/regionGenerator");
   

    function Region(diameter, type, controller) {
        this.diameter = diameter;
        this.type = type;
        this.controller = controller || null;
    }
    Region.prototype.getType = function() {
        return this.type;
    };
    Region.prototype.getController = function() {
        return this.controller;
    };
    Region.prototype.hasController = function() {
        return !!this.controller;
    };
    Region.prototype.generateMap = function(type) {
        return regionGenerator[type](this.diameter);
    };

    return Region;
});