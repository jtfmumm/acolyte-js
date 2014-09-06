define(function(require) {

    var MapValuesGenerator = require("js/generators/MapValuesGenerator");
    var Matrix = require("js/utils/Matrix");

    function RegionMatrixMapGenerator(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion;
        this.span = this.diameter * this.diameterPerRegion;
    }

    RegionMatrixMapGenerator.prototype = {
        generate: function(algorithm) {
            var genOptions = {
                diameter: this.diameter,
                diameterPerRegion: this.diameterPerRegion,
                genAlgorithm: algorithm
            };
            var generator = new MapValuesGenerator(genOptions);
            var values = generator.generateValues();
            var genAlg = this.algorithms(algorithm);
            return this.createMatrixOfMatricesFrom(genAlg(values));
        },
        algorithms: function(algorithm) {
            var _this = this;
            var methods = {
                diamondSquare: _this.generateElevations.bind(_this)
            };
            return methods[algorithm];
        },
        generateElevations: function(values) {
            var elevations = new Matrix().init(this.span, this.span);
            for (var y = 0; y < this.span; y++) {
                for (var x = 0; x < this.span; x++) {
                    var elevation = Math.floor(values.getCell(x, y));
                    if (elevation < 0) elevation = 0;
                    if (elevation > 8) elevation = 8;
                    elevations.setCell(x, y, {
                        elevation: elevation
                    });
                }
            }
            return elevations;
        },
        createMatrixOfMatricesFrom: function(matrix) {
            var newMatrixOfMatrices = new Matrix().init(this.diameter, this.diameter);

            for (var y = 0; y < this.span; y += this.diameterPerRegion) {
                for (var x = 0; x < this.span; x += this.diameterPerRegion) {
                    var newMatrix = matrix.getSubMatrix(x, y, this.diameterPerRegion, this.diameterPerRegion);
                    newMatrixOfMatrices.setCell(x / this.diameterPerRegion, y / this.diameterPerRegion, newMatrix);
                }
            }

            return newMatrixOfMatrices;
        }
    };

    return RegionMatrixMapGenerator;
});