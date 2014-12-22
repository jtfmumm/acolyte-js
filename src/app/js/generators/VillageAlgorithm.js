define(function(require) {

    var Rand = require("js/utils/Rand");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var Path = require("js/movement/Path");

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
            var terrainsMatrix = new Matrix().init(diameter, diameter, function() { return initialTerrain; });
            var levels = [];

            for (var i = 0; i < totalBuildings; i++) {
                _addBuildingToTerrainsAndLevels(terrainsMatrix, levels, buildingClearance);
            }

            _drawPaths(terrainsMatrix);

            return {
                terrains: terrainsMatrix,
                levels: levels
            };
        }
    };

    function _addBuildingToTerrainsAndLevels(matrix, levels, clearance) {
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
            levels.push({
                coords: new Coords(doorCellX, doorCellY),
                level: "house"
            });
            //Add another point to eventually form paths
            pathPoints.push(new Coords(doorCellX, doorCellY + 1));
        } else {
            _addBuildingToTerrainsAndLevels(matrix, levels, clearance);
        }

        return {
            terrains: matrix,
            levels: levels
        };
    }

    function _drawPaths(matrix) {
        //Connect path points using astar
        var pathTiles = [];

        var startingTile = new Coords(Math.floor(matrix.getWidth() / 2), matrix.getHeight() - 1);
//        var startingPath = AstarPathfinder.getShortestCardinalPath(matrix, startingTile, pathPoints[0], isToBeAvoided);
//        pathTiles.push(startingTile);
//        pathTiles = pathTiles.concat(startingPath.toArray());

        //Iterate through and get cardinal path from each point to the next (stopping before the last)
        for (var i = 0; i < pathPoints.length; i++) {
//            var nextPath = AstarPathfinder.getShortestCardinalPath(matrix, pathPoints[i], pathPoints[i + 1], isToBeAvoided);
            //Add initial point on path
            pathTiles.push(pathPoints[i]);
            var nextPath = findPathToEntrance(pathPoints[i], startingTile, matrix);

            pathTiles = pathTiles.concat(nextPath.toArray());
        }

        pathTiles.forEach(function(coords) {
            matrix.setCell(coords.x, coords.y, terrainByValue[2]);
        });

        return matrix;
    }

    //This algorithm assumes there is always space between two buildings
    //If two buildings can touch, then this algorithm can fail to find a path
    function findPathToEntrance(start, entrance, matrix) {
        //Randomly initialize starting axis direction
        var currentAxis = Rand.rolledByOdds(0.5) ? "x" : "y";
        var lastPosition = null;
        var currentPosition = start;
        var path = new Path().add(currentPosition);

        while (!_.isEqual(currentPosition, entrance) && !_.isEqual(lastPosition, currentPosition)) {
            lastPosition = currentPosition;
            currentAxis = chooseNextAxis(currentAxis);
            currentPosition = chooseNextPosition(lastPosition, entrance, currentAxis, matrix);
            path.add(currentPosition);
        }

        return path;
    }

    function chooseNextPosition(position, goal, axis, matrix) {
        if (axisToward(axis, position, goal) === 0) axis = switchAxis(axis);

        var tryMove = axisMove(position, goal, axis);

        if (isToBeAvoided(matrix, tryMove)) {
            return axisMove(position, goal, switchAxis(axis));
        } else {
            return tryMove;
        }
    }

    function chooseNextAxis(current) {
        //3 in 4 chance axis remains the same
        return (Rand.rolledByOdds(0.75)) ? current : switchAxis(current);
    }

    function axisMove(position, goal, axis) {
        if (axis === "x") {
            return position.plus(xToward(position, goal), 0);
        } else if (axis === "y") {
            return position.plus(0, yToward(position, goal));
        }
    }

    function switchAxis(axis) {
        if (axis === "x") {
            return "y"
        } else if (axis === "y") {
            return "x"
        } else {
            throw new Error("Switch axis requires 'x' or 'y'!");
        }
    }

    function axisToward(axis, start, end) {
        if (axis === "x") {
            return xToward(start, end);
        } else if (axis === "y") {
            return yToward(start, end);
        } else {
            throw new Error("axisToward requires 'x' or 'y'!");
        }
    }

    function xToward(start, end) {
        if (start.x < end.x) {
            return 1;
        } else if (start.x > end.x) {
            return -1;
        } else {
            return 0;
        }
    }

    function yToward(start, end) {
        if (start.y < end.y) {
            return 1;
        } else if (start.y > end.y) {
            return -1;
        } else {
            return 0;
        }
    }

    function isToBeAvoided(matrix, coords) {
        return matrix.getCell(coords.x, coords.y) === "wall" ||
            matrix.getCell(coords.x, coords.y) === "door";
    }

    function isClear(cell) {
        return cell === initialTerrain;
    }

    return VillageAlgorithm;
});