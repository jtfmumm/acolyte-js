define(function(require) {

    var _ = require("lodash");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");

    function Village(parent, parentCoords) {
        var diameter = 50;
        var focus = new Coords(Math.floor(diameter / 2), diameter - 1);
        var village = LevelGenerator.generate({
            parent: parent,
            parentCoords: parentCoords,
            diameter: diameter,
            diameterPerRegion: diameter,
            visibleDiameter: 51,
            voidType: "void",
            levelMapAlgorithms: LevelMapAlgorithms.village,
            focus: focus
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