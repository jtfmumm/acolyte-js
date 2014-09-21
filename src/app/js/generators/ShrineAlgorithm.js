define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var shrineMap = require("js/maps/shrineMap");

    var ShrineAlgorithm = {
        generate: function(options) {
            var diameter = options.diameter;
            var diameterPerRegion = options.diameterPerRegion || diameter;
            var matrix = new Matrix(shrineMap);

            return matrix;
        }
    };

    return ShrineAlgorithm;
});