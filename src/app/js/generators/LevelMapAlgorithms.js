define(function(require) {

    var DiamondSquareAlgorithm = require("js/generators/DiamondSquareAlgorithm");
    var JustSand = require("js/generators/JustSand");
    var ShrineAlgorithm = require("js/generators/ShrineAlgorithm");
    var VillageAlgorithm = require("js/generators/VillageAlgorithm");

    var LevelMapAlgorithms = {
        world: {
            elevations: DiamondSquareAlgorithm
        },
        shrine: {
            terrains: ShrineAlgorithm
        },
        village: {
            terrains: VillageAlgorithm
        }
    };

    return LevelMapAlgorithms;
});