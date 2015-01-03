define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var shrineMap = require("js/maps/shrineMap");

    var HouseAlgorithm = {
        generate: function(options) {
            var diameter = options.diameter;
            var focus = options.focus;
            var matrix = new Matrix().init(diameter, diameter, function() { return "floor"; });

            matrix.setEdges("wall");
            matrix.setCell(focus.x, focus.y, "floor");
            return matrix;
        }
    };

    return HouseAlgorithm;
});