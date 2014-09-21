define(function(require) {

    var _ = require("lodash");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Priest = require("js/agents/Priest");
    var Coords = require("js/utils/Coords");

    function Shrine(parent, parentCoords) {
        var shrine = LevelGenerator.shrine(parent, parentCoords);
        shrine.prototype = _.extend(Object.getPrototypeOf(shrine), ShrinePrototype);
        shrine.initializeOccupants();

        return shrine;
    }

    ShrinePrototype = { //For mixing in
        initializeOccupants: function() {
            var priestCoords = this.findEmptyTileCoords();
            var priest = new Priest(this, priestCoords);
            var tile = this.levelMap.getTile(priestCoords);
            tile.updateOccupant(priest);
            this.registerAgent(priest, new Coords(0, 0));
        }
    };

    return Shrine;
});