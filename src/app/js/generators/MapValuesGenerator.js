define(function(require) {

    var Matrix = require("js/utils/Matrix");

    var DiamondSquareAlgorithm = require("js/generators/DiamondSquareAlgorithm");
    var JustSand = require("js/generators/JustSand");
    var GenerateFromMap = require("js/generators/GenerateFromMap");

    //Generates a matrix of values
    function MapValuesGenerator(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion;
        this.focus = options.focus;
        this.values = new Matrix().init(this.diameter, this.diameter);
        this.genAlgorithm = options.genAlgorithm;
    }

    MapValuesGenerator.prototype = {
        generateValues: function() {
            return this.genAlgorithm.generate({
                diameter: this.diameter,
                diameterPerRegion: this.diameterPerRegion,
                focus: this.focus
            });
        }
    };

    return MapValuesGenerator;
});