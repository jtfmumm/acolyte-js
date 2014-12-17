define(function(require) {

    var LevelGenerator = require("js/world/LevelGenerator");
    var Shrine = require("js/world/Shrine");

    var LevelFactory = {
        world: function(parent) {
            return new World(parent);
        },
        shrine: function(parent, parentCoords) {
            return new Shrine(parent, parentCoords);
        },
        village: function(parent, parentCoords) {
            return new Village(parent, parentCoords);
        }
    };

    return LevelFactory;
});
