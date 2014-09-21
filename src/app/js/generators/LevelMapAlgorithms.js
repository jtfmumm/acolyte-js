define(function(require) {

    var DiamondSquareAlgorithm = require("js/generators/DiamondSquareAlgorithm");
    var JustSand = require("js/generators/JustSand");
//    var ShrineAlgorithm = require("js/generators/ShrineAlgorithm");

    var LevelMapAlgorithms = {
        world: {
            elevations: DiamondSquareAlgorithm
        },
        shrine: {
//          terrain: ShrineAlgorithm
        }
    };

    return LevelMapAlgorithms;
});