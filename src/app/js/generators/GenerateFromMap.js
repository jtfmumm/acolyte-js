define(function(require) {

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var landmarkTypes = require("js/data/landmarkTypes");

    var GenerateFromMap = {
        generate: function(options) {
            var diameter = options.diameter;
            var diameterPerRegion = options.diameterPerRegion;
            var span = diameter * diameterPerRegion;
            var genMap = options.genMap;
            var matrix = new Matrix().init(span, span);

            for (var y = 0; y < span; y++) {
                for (var x = 0; x < span; x++) {
                    var landmarkCode = landmarkTypes[genMap[y][x]];
                    matrix.setCell(x, y, {landmark: landmarkCode});
                }
            }

            return matrix;
        }
    };

    return GenerateFromMap;
});