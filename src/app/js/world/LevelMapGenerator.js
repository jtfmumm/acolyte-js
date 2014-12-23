define(function(require) {

    var _ = require("lodash");
    var MapValuesGenerator = require("js/generators/MapValuesGenerator");
    var Matrix = require("js/utils/Matrix");

    function LevelMapGenerator(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion || null;
        this.levelMapAlgorithms = options.levelMapAlgorithms;
        this.focus = options.focus;
    }

    LevelMapGenerator.prototype = {
        generate: function(algorithm) {
            var levelMapValueMatrices = {}; //Could include elevations, terrains, landmarks, and/or occupants

            if (_.isFunction(this.levelMapAlgorithms)) {
                levelMapValueMatrices = this.generateValuesFromAlgFunction(levelMapValueMatrices);
            } else {
                for (var valueType in this.levelMapAlgorithms) {
                    var values = this.generateValuesByAlgorithm(this.levelMapAlgorithms[valueType]);
                    levelMapValueMatrices[valueType] = this[valueType](values);
                }
            }

            return levelMapValueMatrices;
        },
        generateValuesFromAlgFunction: function(levelMapValueMatrices) {
            var valueSet = this.levelMapAlgorithms({
                diameter: this.diameter,
                diameterPerRegion: this.diameterPerRegion,
                focus: this.focus
            });

            for (var valueType in valueSet) {
                levelMapValueMatrices[valueType] = this[valueType](valueSet[valueType]);
            }

            return levelMapValueMatrices;
        },
        generateValuesByAlgorithm: function(algorithm) {
            var genOptions = {
                diameter: this.diameter,
                diameterPerRegion: this.diameterPerRegion,
                genAlgorithm: algorithm,
                focus: this.focus
            };
            var generator = new MapValuesGenerator(genOptions);
            return generator.generateValues();
        },
        elevations: function(values) {
            return values.map(function(elevation) {
                var elevation = Math.floor(elevation);
                if (elevation < 0) elevation = 0;
                if (elevation > 8) elevation = 8;
                return {elevation: elevation};
            });
        },
        terrains: function(values) {
            return values.map(function(terrain) {
                return {terrain: terrain};
            });
        },
        levels: function(values) {
            var levelMatrix = new Matrix().init(this.diameter, this.diameter);

            values.forEach(function(levelWrapper) {
                var x = levelWrapper.coords.x,
                    y = levelWrapper.coords.y;
                levelMatrix.setCell(x, y, {level: levelWrapper.level});
            });

            return levelMatrix;
        },
        landmarks: function(values) {
            return values.map(function(landmark) {
                return {landmark: landmark};
            });
        },
        occupants: function(values) {
            return values.map(function(occupant) {
                return {occupant: occupant};
            });
        },
        identity: function(values) {
            return values;
        }
    };

    return LevelMapGenerator;
});