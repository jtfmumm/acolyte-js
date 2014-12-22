define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var shrineMap = require("js/maps/shrineMap");

    var HouseAlgorithm = {
        generate: function(options) {
            var diameter = options.diameter;
            var matrix = new Matrix().init(diameter, diameter, function() { return "grass"; });

            return matrix;
        }
    };

    return HouseAlgorithm;
});