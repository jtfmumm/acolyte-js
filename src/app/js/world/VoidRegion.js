define(function(require) {

    var Region = require("js/world/Region");

    function VoidRegion(options) {
        Region.call(this, {
            diameter: options.diameter,
            type: "void"
        });
    }

    VoidRegion.prototype = Object.create(Region.prototype);

    return VoidRegion;
});