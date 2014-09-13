define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");

    var JustSand = {
        generate: function(options) {
            var diameter = options.diameter;
            var diameterPerRegion = options.diameterPerRegion;
            var span = diameter * diameterPerRegion;
            var matrix = new Matrix().init(span, span);
            console.log("justsand");

            //Run diamondSquare on each subsection and add it as a matrix to newMatrixOfMatrices
            for (var y = 0; y < span; y++) {
                for (var x = 0; x < span; x++) {
                    matrix.setCell(x, y, 0);
                }
            }

            return matrix;
        }
    };


    return JustSand;
});