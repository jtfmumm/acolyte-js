define(function(require) {

    var LevelFactory = require("js/world/LevelFactory");
    var Coords = require("js/utils/Coords");

    var TestWorldGenerator = {
        generateFromMap: function(genMap) {
            return LevelFactory.createCustom({
                diameterPerRegion: genMap.length,
                elevationGenAlg: "justSand",
                genAlg: "generateFromMap",
                genMap: genMap
            });
        }

    };

    return TestWorldGenerator;
});