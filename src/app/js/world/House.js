define(function(require) {

    var _ = require("lodash");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Priest = require("js/agents/Priest");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");

    function House(parent, parentCoords) {
        var house = LevelGenerator.generate({
            parent: parent,
            parentCoords: parentCoords,
            diameter: 5,
            diameterPerRegion: 5,
            visibleDiameter: 51,
            voidType: "void",
            levelMapAlgorithms: LevelMapAlgorithms.house,
            focus: new Coords(Math.floor(5 / 2), 4)
        });
        house.prototype = extendHousePrototype(Object.getPrototypeOf(house));
        house.initializeOccupants();

        return house;
    }

    function extendHousePrototype(p) {
        return _.extend(p, {
            initializeOccupants: function () {
//                var priestCoords = this.findEmptyTileCoords();
//                var priest = new Priest(this, priestCoords);
//                var tile = this.levelMap.getTile(priestCoords);
//                tile.updateOccupant(priest);
//                this.registerAgent(priest, new Coords(0, 0));
            }
        });
    }

    return House;
});