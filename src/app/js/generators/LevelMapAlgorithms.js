define(function(require) {

    var DiamondSquareAlgorithm = require("js/generators/DiamondSquareAlgorithm");
    var JustSand = require("js/generators/JustSand");
    var ShrineAlgorithm = require("js/generators/ShrineAlgorithm");
    var VillageAlgorithm = require("js/generators/VillageAlgorithm");
    var HouseAlgorithm = require("js/generators/HouseAlgorithm");

    var LevelMapAlgorithms = {
        world: {
            elevations: DiamondSquareAlgorithm
        },
        shrine: {
            terrains: ShrineAlgorithm
        },
        village: VillageAlgorithm.generate,
        house: {
            terrains: HouseAlgorithm
        }
    };

    return LevelMapAlgorithms;
});