define(function(require) {

    var Matrix = require("js/utils/Matrix");

    var DiamondSquareAlgorithm = require("js/generators/DiamondSquareAlgorithm");
    var JustSand = require("js/generators/JustSand");
    var GenerateFromMap = require("js/generators/GenerateFromMap");

    //Generates a matrix of values
    function MapValuesGenerator(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion;
        this.spanInCells = this.diameter * this.diameterPerRegion;
        this.values = new Matrix().init(this.spanInCells, this.spanInCells);
        this.genAlgorithm = algorithms[options.genAlgorithm];
        this.genMap = options.genMap || null;
    }

    MapValuesGenerator.prototype = {
        generateValues: function() {
            return this.genAlgorithm.generate({
                diameter: this.diameter,
                diameterPerRegion: this.diameterPerRegion,
                genMap: this.genMap
            });
        }
    };

    var algorithms = {
        "diamondSquare": DiamondSquareAlgorithm,
        "generateFromMap": GenerateFromMap,
        "justSand": JustSand
    };

    return MapValuesGenerator;
});