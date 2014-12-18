define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");

    var terrainByValue = {
        1: "grass",
        2: "path",
        3: "wall",
        4: "door"
    };

    var initialTerrain = terrainByValue[1];

    var VillageAlgorithm = {
        generate: function(options) {
            var diameter = options.diameter;
            var totalBuildings = Math.floor(diameter / 10);
            var buildingClearance = 2;
            var matrix = new Matrix().init(diameter, diameter, function() { return initialTerrain; });

            for (var i = 0; i < totalBuildings; i++) {
                _addBuilding(matrix, buildingClearance);
            }

            return matrix;
        }
    };

    function _addBuilding(matrix, clearance) {
        //Choose a random cell, check if the surrounding area is clear for a building,
        //add building if clear, recurse if not
        var diameter = matrix.getWidth();
        var clearingDiameter = clearance * 2 + 1;
        var randomCell = matrix.getCell(Rand.rollFromZero(diameter), Rand.rollFromZero(diameter));
        var topLeftX = randomCell.x - clearance;
        var topLeftY = randomCell.y - clearance;
        var randomCellNeighbors = matrix.getSubMatrix(topLeftX, topLeftY, clearingDiameter, clearingDiameter);

        if (randomCell === initialTerrain && randomCellNeighbors.every(isClear)) {
            var bTopLeftX = topLeftX + 1;
            var bTopLeftY = topLeftY + 1;
            var bDiameter = clearingDiameter - 2;

            for (var x = bTopLeftX; x < bTopLeftX + bDiameter; x++) {
                for (var y = bTopLeftY; y < bTopLeftY + bDiameter; y++) {
                    matrix.setCell(x, y, terrainByValue[3]);
                }
            }
        } else {
            _addBuilding(matrix, clearance);
        }

        return matrix;
    }

    function isClear(cell) {
        return cell === initialTerrain;
    }

    return VillageAlgorithm;
});