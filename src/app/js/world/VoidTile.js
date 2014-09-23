define(function(require) {

    var Tile = require("js/world/Tile");

    function VoidTile(type) {
        var type = type || "void";
        Tile.call(this, {
            terrain: type,
            returnPoint: returnPoint[type]
        });
    }

    VoidTile.prototype = Object.create(Tile.prototype);

    var returnPoint = {
        void: true,
        water: false
    };

    return VoidTile;
});