define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");

    var AstarPathfinder = require("js/algorithms/AstarPathfinder");

    var pathPoints = null;
    var terrainByValue = {
        1: "grass",
        2: "path",
        3: "wall",
        4: "door"
    };

    var initialTerrain = terrainByValue[1];

    var VillageAlgorithm = {
        generate: function(options) {
            pathPoints = [];
            var diameter = options.diameter;
            var totalBuildings = Math.floor(diameter / 5);
            var buildingClearance = 2;
            var matrix = new Matrix().init(diameter, diameter, function() { return initialTerrain; });

            for (var i = 0; i < totalBuildings; i++) {
                _addBuilding(matrix, buildingClearance);
            }

//            _drawPaths(matrix);

            return matrix;
        }
    };

    function _addBuilding(matrix, clearance) {
        //Choose a random cell, check if the surrounding area is clear for a building,
        //add building if clear, recurse if not
        var diameter = matrix.getWidth();
        var clearingDiameter = clearance * 2 + 1;
        var randX = Rand.rollFromZero(diameter);
        var randY = Rand.rollFromZero(diameter);
        var randomCell = matrix.getCell(randX, randY);
        var topLeftX = randX - clearance;
        var topLeftY = randY - clearance;
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
            var doorCellX = bTopLeftX + 1;
            var doorCellY = bTopLeftY + 2;
            matrix.setCell(doorCellX, doorCellY, terrainByValue[4]);
            //Add another point to eventually form paths
            pathPoints.push(new Coords(doorCellX, doorCellY));
        } else {
            _addBuilding(matrix, clearance);
        }

        return matrix;
    }

    function _drawPaths(matrix) {
        //Connect path points using astar
        var pathTiles = [];

        //Iterate through and get cardinal path from each point to the next (stopping before the last)
        for (var i = 0; i < pathPoints.length - 1; i++) {
            var nextPath = AstarPathfinder.getShortestCardinalPath(matrix, pathPoints[i], pathPoints[i + 1], isToBeAvoided);
            console.log(nextPath);
            pathTiles.concat(nextPath);
        }

        pathTiles.forEach(function(coords) {
            matrix.setCell(coords.x, coords.y, terrainByValue[2]);
        });

        return matrix;
    }

    function isToBeAvoided(matrix, coords) {
        return matrix.getCell(coords.x, coords.y) === "wall" ||
            matrix.getCell(coords.x, coords.y === "door");
    }

    function isClear(cell) {
        return cell === initialTerrain;
    }

    return VillageAlgorithm;
});