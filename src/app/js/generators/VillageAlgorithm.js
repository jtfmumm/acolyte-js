define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");

    var VillageAlgorithm = {
        generate: function(options) {
            var diameter = options.diameter;
            var totalBuildings = Math.floor(diameter / 10);
            var buildingClearance = 5;
            var diameterPerRegion = options.diameterPerRegion || diameter;
            var matrix = new Matrix().init(diameter, diameter, function() { return 1; });

            for (var i = 0; i < totalBuildings; i++) {
                _addBuilding(matrix);
            }

            return matrix;
        }
    };

    var tilesByValue = {
        1: "grass",
        2: "path",
        3: "wall",
        4: "door"
    };

    function _addBuilding(matrix, clearance) {
        var diameter = matrix.getWidth();
        var clearingDiameter = clearance * 2 + 1;
        var randomCell = matrix.getCell(Rand.rollFromZero(diameter), Rand.rollFromZero(diameter));
        var topLeftX = randomCell.x - clearance;
        var topLeftY = randomCell.y - clearance;
        var randomCellNeighbors = matrix.getSubMap(topLeftX, topLeftY, clearingDiameter, clearingDiameter);

        if (randomCell === 1 && randomCellNeighbors.every(isClear)) {
            var bTopLeftX = topLeftX + 1;
            var bTopLeftY = topLeftY + 1;
            var bDiameter = clearingDiameter - 2;

            for (var x = bTopLeftX; x < bTopLeftX + bDiameter; x++) {
                for (var y = bTopLeftY; y < bTopLeftY + bDiameter; y++) {
                    matrix.setCell(x, y, tilesByValue[3]);
                }
            }
        }

        return matrix;
    }

    function isClear(cell) {
        return cell === 1;
    }

    function smallNoise() {
        return (Math.random() - 0.5) / 2;
    }

    return VillageAlgorithm;
});