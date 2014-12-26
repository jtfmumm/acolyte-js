define(function(require) {

    var LevelGenerator = require("js/world/LevelGenerator");
    var Cave = require("js/world/Cave");
    var House = require("js/world/House");
    var Shrine = require("js/world/Shrine");
    var Village = require("js/world/Village");

    var LevelFactory = {
        cave: function(parent, parentCoords) {
            return new Cave(parent, parentCoords);
        },
        house: function(parent, parentCoords) {
            return new House(parent, parentCoords);
        },
        shrine: function(parent, parentCoords) {
            return new Shrine(parent, parentCoords);
        },
        world: function(parent) {
            return new World(parent);
        },
        village: function(parent, parentCoords) {
            return new Village(parent, parentCoords);
        }
    };

    return LevelFactory;
});
