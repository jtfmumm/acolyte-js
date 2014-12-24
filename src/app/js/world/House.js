define(function(require) {

    var _ = require("lodash");
    var Rand = require("js/utils/Rand");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Priest = require("js/agents/Priest");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");
    var NPC = require("js/agents/NPC");
    var Occupation = require("js/agents/occupations/Occupation");

    function House(parent, parentCoords) {
        var diameter = Rand.randInt(5, 8);
        var house = LevelGenerator.generate({
            parent: parent,
            parentCoords: parentCoords,
            diameter: diameter,
            diameterPerRegion: diameter,
            visibleDiameter: 51,
            voidType: "void",
            levelMapAlgorithms: LevelMapAlgorithms.house,
            focus: new Coords(Math.floor(diameter / 2), diameter - 1)
        });
        house.prototype = extendHousePrototype(Object.getPrototypeOf(house));
        house.initializeOccupants();

        return house;
    }

    function extendHousePrototype(p) {
        return _.extend(p, {
            initializeOccupants: function () {
                for (var i = 0; i < 1; i++) {
                    var nextCoords = this.findEmptyTileCoords();
                    var occupation = Occupation.generateByLocationType("village");
                    var npc = new NPC(this, nextCoords, occupation);
                    var tile = this.levelMap.getTile(nextCoords);
                    tile.updateOccupant(npc);
                    this.registerAgent(npc, nextCoords);
                    this.parent.population.add(npc);
                }
            }
        });
    }

    return House;
});