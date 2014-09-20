define(function(require) {

    var MapValuesGenerator = require("js/generators/MapValuesGenerator");
    var Matrix = require("js/utils/Matrix");

    function LevelMapGenerator(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion || null;
        this.genMap = options.genMap || null;
    }

    LevelMapGenerator.prototype = {
        generate: function(algorithm) {
            var genOptions = {
                diameter: this.diameter,
                diameterPerRegion: this.diameterPerRegion,
                genAlgorithm: algorithm,
                genMap: this.genMap
            };
            var generator = new MapValuesGenerator(genOptions);
            var values = generator.generateValues();
            var genAlg = this.algorithms(algorithm);
            return genAlg(values);
        },
        algorithms: function(algorithm) {
            var _this = this;
            var methods = {
                diamondSquare: _this.generateElevations.bind(_this),
                generateFromMap: _this.identity.bind(_this),
                justSand: _this.generateElevations.bind(_this)
            };
            return methods[algorithm];
        },
        generateElevations: function(values) {
            var elevations = new Matrix().init(this.diameter, this.diameter);
            for (var y = 0; y < this.diameter; y++) {
                for (var x = 0; x < this.diameter; x++) {
                    var elevation = Math.floor(values.getCell(x, y));
                    if (elevation < 0) elevation = 0;
                    if (elevation > 8) elevation = 8;
                    elevations.setCell(x, y, elevation);
                }
            }
            return elevations;
        },
        identity: function(values) {
            return values;
        }
    };

    return LevelMapGenerator;
});