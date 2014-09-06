define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");

    var DiamondSquareAlgorithm = {
        generate: function(options) {
            var diameter = options.diameter;
            var diameterPerRegion = options.diameterPerRegion;
            var span = diameter * diameterPerRegion;
            var matrix = new Matrix().init(span, span);

            //Create random seed points
            matrix = createCornerValues(matrix, diameter, diameterPerRegion);

            //Run diamondSquare on each subsection and add it as a matrix to newMatrixOfMatrices
            for (var y = 0; y < span; y += diameterPerRegion) {
                for (var x = 0; x < span; x += diameterPerRegion) {
                    diamondSquare(matrix, x, y, diameterPerRegion);
                }
            }

            return matrix;
        }
    };

    function createCornerValues(matrix, diameter, diameterPerRegion) {
        var span = diameter * diameterPerRegion;
        //Top
        for (var x = 0; x < span; x += diameterPerRegion) {
            var point = randomElevation();
            matrix.setCell(x, 0, point + smallNoise());
            matrix.setCell(x - 1, 0, point + smallNoise());
        }

        //Right
        for (var y = 0; y < span; y += diameterPerRegion) {
            var point = randomElevation();
            matrix.setCell(span - 1, y, point + smallNoise());
            matrix.setCell(span - 1, y - 1, point + smallNoise());
        }
        matrix.setCell(span - 1, span - 1, randomElevation());

        //Bottom
        for (var x = 0; x < span; x += diameterPerRegion) {
            var point = randomElevation();
            matrix.setCell(x, span - 1, point + smallNoise());
            matrix.setCell(x - 1, span - 1, point + smallNoise());
        }

        //Remaining
        for (var y = 0; y < span; y += diameterPerRegion) {
            for (var x = 0; x < span; x += diameterPerRegion) {
                var point = randomElevation();
                matrix.setCell(x, y, point + smallNoise());
                matrix.setCell(x, y - 1, point + smallNoise());
                matrix.setCell(x - 1, y, point + smallNoise());
                matrix.setCell(x - 1, y - 1, point + smallNoise());
            }
        }

        return matrix;
    }

    function randomElevation() {
        return Rand.rollFromZero(9);
    }

    function smallNoise() {
        return (Math.random() - 0.5) / 2;
    }

    function diamondSquare(matrix, x, y, diameter) {
        var midPoint = findMidPoint(diameter);
        var nw = matrix.getCell(x, y);
        var ne = matrix.getCell(x + diameter - 1, y);
        var sw = matrix.getCell(x, y + diameter - 1);
        var se = matrix.getCell(x + diameter - 1, y + diameter - 1);
        matrix.setCell(x + midPoint, y + midPoint, ((nw + ne + sw + se) / 4) + smallNoise());
        matrix.setCell(x, y + midPoint, ((nw + sw) / 2) + smallNoise());
        matrix.setCell(x + diameter - 1, y + midPoint, ((ne + se) / 2) + smallNoise());
        matrix.setCell(x + midPoint, y, ((nw + ne) / 2) + smallNoise());
        matrix.setCell(x + midPoint, y + diameter - 1, ((sw + se) / 2) + smallNoise());

        if (midPoint === 1) return;
        diamondSquare(matrix, x, y, midPoint + 1);
        diamondSquare(matrix, x, y + midPoint, midPoint + 1);
        diamondSquare(matrix, x + midPoint, y, midPoint + 1);
        diamondSquare(matrix, x + midPoint, y + midPoint, midPoint + 1);
    }

    function findMidPoint(diameter) {
        return Math.floor(diameter / 2);
    }

    return DiamondSquareAlgorithm;
});