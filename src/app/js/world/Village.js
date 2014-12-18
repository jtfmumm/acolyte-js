define(function(require) {

    var _ = require("lodash");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");

    function Village(parent, parentCoords) {
        var village = LevelGenerator.generate({
            parent: parent,
            parentCoords: parentCoords,
            diameter: 50,
            diameterPerRegion: 50,
            visibleDiameter: 51,
            voidType: "void",
            levelMapAlgorithms: LevelMapAlgorithms.village,
            focus: new Coords(25, 49)
        });
        village.prototype = extendVillagePrototype(Object.getPrototypeOf(village));
        village.initializeOccupants();

        return village;
    }

    function extendVillagePrototype(p) {
        return _.extend(p, {
            initializeOccupants: function () {
            }
        });
    }

    return Village;
});