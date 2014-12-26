define(function(require) {

    var DiamondSquareAlgorithm = require("js/generators/DiamondSquareAlgorithm");
    var JustSand = require("js/generators/JustSand");
    var ShrineAlgorithm = require("js/generators/ShrineAlgorithm");
    var VillageAlgorithm = require("js/generators/VillageAlgorithm");
    var CaveAlgorithm = require("js/generators/CaveAlgorithm");
    var HouseAlgorithm = require("js/generators/HouseAlgorithm");

    var LevelMapAlgorithms = {
        cave: {
            terrains: CaveAlgorithm
        },
        house: {
            terrains: HouseAlgorithm
        },
        shrine: {
            terrains: ShrineAlgorithm
        },
        village: VillageAlgorithm.generate,
        world: {
            elevations: DiamondSquareAlgorithm
        }
    };

    return LevelMapAlgorithms;
});