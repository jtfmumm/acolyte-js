define(function(require) {

    var _ = require("lodash");
    var Rand = require("js/utils/Rand");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");
    var NPC = require("js/agents/NPC");
    var Occupation = require("js/agents/occupations/Occupation");

    function Cave(parent, parentCoords) {
        var diameter = Rand.randInt(50, 80);
        var cave = LevelGenerator.generate({
            parent: parent,
            parentCoords: parentCoords,
            diameter: diameter,
            diameterPerRegion: diameter,
            visibleDiameter: 51,
            voidType: "void",
            levelMapAlgorithms: LevelMapAlgorithms.cave,
            focus: new Coords(Math.floor(diameter / 2), diameter - 1)
        });
        cave.prototype = extendCavePrototype(Object.getPrototypeOf(cave));
        cave.initializeOccupants();

        return cave;
    }

    function extendCavePrototype(p) {
        return _.extend(p, {
            initializeOccupants: function () {
            }
        });
    }

    return Cave;
});