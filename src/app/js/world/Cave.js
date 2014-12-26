define(function(require) {

    var _ = require("lodash");
    var Rand = require("js/utils/Rand");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");
    var Monster = require("js/agents/Monster");
    var Occupation = require("js/agents/occupations/Occupation");

    function Cave(parent, parentCoords) {
        var diameter = Rand.randInt(20, 30);
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
                for (var i = 0; i < 1; i++) {
                    var nextCoords = this.findEmptyTileCoords();
                    var tile = this.levelMap.getTile(nextCoords);
                    var monster = new Monster(this, nextCoords);
                    tile.updateOccupant(monster);
                    this.registerAgent(monster, nextCoords);
                }
            }
        });
    }

    return Cave;
});