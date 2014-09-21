define(function(require) {

    var LevelGenerator = require("js/world/LevelGenerator");
    var Shrine = require("js/world/Shrine");

    var LevelFactory = {
        world: function(parent) {
            return LevelGenerator.world(parent);
        },
        shrine: function(parent, parentCoords) {
            return new Shrine(parent, parentCoords);
        }
    };

    return LevelFactory;
});
