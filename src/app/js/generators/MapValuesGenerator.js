define(function(require) {

    var Matrix = require("js/utils/Matrix");

    var DiamondSquareAlgorithm = require("js/generators/DiamondSquareAlgorithm");

    //Generates a matrix of values
    function MapValuesGenerator(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion;
        this.spanInCells = this.diameter * this.diameterPerRegion;
        this.values = new Matrix().init(this.spanInCells, this.spanInCells);
        this.genAlgorithm = algorithms[options.genAlgorithm];
    }

    MapValuesGenerator.prototype = {
        generateValues: function() {
            return this.genAlgorithm.generate({
                diameter: this.diameter,
                diameterPerRegion: this.diameterPerRegion
            });
        }
    };

    var algorithms = {
        "diamondSquare": DiamondSquareAlgorithm
    };

    return MapValuesGenerator;
});