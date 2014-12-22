define(function(require) {

    var LevelGenerator = require("js/world/LevelGenerator");
    var Shrine = require("js/world/Shrine");
    var House = require("js/world/House");
    var Village = require("js/world/Village");

    var LevelFactory = {
        world: function(parent) {
            return new World(parent);
        },
        shrine: function(parent, parentCoords) {
            return new Shrine(parent, parentCoords);
        },
        village: function(parent, parentCoords) {
            return new Village(parent, parentCoords);
        },
        house: function(parent, parentCoords) {
            return new House(parent, parentCoords);
        }
    };

    return LevelFactory;
});
