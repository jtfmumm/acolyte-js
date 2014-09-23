define(function(require) {

    var _ = require("lodash");
    var LevelGenerator = require("js/world/LevelGenerator");
    var Coords = require("js/utils/Coords");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");

    function World(parent) {
        var world = LevelGenerator.generate({
            parent: parent,
            diameter: 325, //Probably not larger than 3250
            diameterPerRegion: 65,
            visibleDiameter: 51,
            voidType: "water",
            levelMapAlgorithms: LevelMapAlgorithms.world
        });
        world.prototype = _.extend(Object.getPrototypeOf(world), WorldPrototype);
        world.initializeOccupants();

        return world;
    }

    WorldPrototype = {
        initializeOccupants: function() {
        }
    };

    return World;
});