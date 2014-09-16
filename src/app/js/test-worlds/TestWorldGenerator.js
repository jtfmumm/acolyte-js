define(function(require) {

    var World = require("js/world/World");
    var Coords = require("js/utils/Coords");

    var TestWorldGenerator = {
        generateFromMap: function(genMap) {
            return new World({
                focus: new Coords(Coords(5, 5)),
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