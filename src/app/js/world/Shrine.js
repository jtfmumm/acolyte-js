define(function(require) {

    var _ = require("lodash");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Priest = require("js/agents/Priest");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");

    function Shrine(parent, parentCoords) {
        var shrine = LevelGenerator.generate({
            parent: parent,
            parentCoords: parentCoords,
            diameter: 13,
            diameterPerRegion: 13,
            visibleDiameter: 51,
            voidType: "void",
            levelMapAlgorithms: LevelMapAlgorithms.shrine,
            focus: new Coords(Math.floor(13 / 2), 12)
        });
        shrine.prototype = extendShrinePrototype(Object.getPrototypeOf(shrine));
        shrine.initializeOccupants();

        return shrine;
    }

    function extendShrinePrototype(p) {
        return _.extend(p, {
            initializeOccupants: function () {
                var priestCoords = this.findEmptyTileCoords();
                var priest = new Priest(this, priestCoords);
                var tile = this.levelMap.getTile(priestCoords);
                tile.updateOccupant(priest);
                this.registerAgent(priest, new Coords(0, 0));
                this.population.add(priest);
            }
        });
    }

    return Shrine;
});