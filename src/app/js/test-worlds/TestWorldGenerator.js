define(function(require) {

    var World = require("js/world/World");
    var WorldCoords = require("js/utils/WorldCoords");
    var Coords = require("js/utils/Coords");

    var TestWorldGenerator = {
        generateFromMap: function(genMap) {
            return new World({
                focus: new WorldCoords(new Coords(0, 0), new Coords(4, 4), 9),
                horizontalRegions: 1,
                verticalRegions: 1,
                diameterPerRegion: genMap.length,
                elevationGenAlg: "justSand",
                genAlg: "generateFromMap",
                genMap: genMap
            });
        }

    };

    return TestWorldGenerator;
});