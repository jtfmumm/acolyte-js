define(function(require) {
    "use strict";


    var Matrix = require("js/utils/Matrix");
    var terrainTypes = require("js/data/terrainTypes");
    var terrainFrequencies = require("js/data/terrainFrequencies");
    var Rand = require("js/utils/Rand");

    var RegionMapGenerator = {
        initialize: function(diameter, type) {
            switch (type) {
                case "average":
                    return generateMap(diameter, "average");
                    break;
                case "blank":
                    return generateMapAll(diameter, "plains");
                    break;
                case "void":
                    return generateVoidMap(diameter);
                    break;
                default:
                    return generateMapAll(diameter, "plains");
            }
        },
        updateMapWithMatrix: function(oldMap, matrix) {
            var prop;
            var newMap = oldMap;
            if (newMap.hasSameDimensions(matrix)) {
                for (var y = 0; y < matrix.getHeight(); y++) {
                    for (var x = 0; x < matrix.getWidth(); x++) {
                        var newTile = newMap.getCell(x, y);
                        var matrixTile = matrix.getCell(x, y);
                        for (prop in matrixTile) {
                            newTile[prop] = matrixTile[prop];
                        }
                        newMap.setCell(x, y, newTile);
                    }
                }
            } else {
                console.error("You can only update a map with a matrix of the same dimensions");
                return;
            }
            return newMap;
        }
    };

    function generateMap(diameter, type) {
        var i, j;
        var newMap = [];
        for (i = 0; i < diameter; i++) {
            newMap.push([]);
            for (j = 0; j < diameter; j++) {
                var nextTile = constructTile(selectTerrain(type));
                newMap[i].push(nextTile);
            }
        }
        return new Matrix(newMap);
    }

    function generateVoidMap(diameter) {
        var i, j;
        var newMap = [];
        for (i = 0; i < diameter; i++) {
            newMap.push([]);
            for (j = 0; j < diameter; j++) {
                var nextTile = constructVoidTile();
                newMap[i].push(nextTile);
            }
        }
        return new Matrix(newMap);
    }

    function generateMapAll(diameter, terrain) {
        var i, j;
        var newMap = [];
        for (i = 0; i < diameter; i++) {
            newMap.push([]);
            for (j = 0; j < diameter; j++) {
                var nextTile = constructTile(terrain);
                newMap[i].push(nextTile);
            }
        }
        return new Matrix(newMap);
    }

    function constructTile(terrain) {
        return {
            elevation: 0,
            terrain: terrainTypes[terrain],
            landmark: null,
            occupant: null
        }
    }

    function constructVoidTile() {
        return {
            elevation: -1,
            terrain: terrainTypes["void"],
            landmark: null,
            occupant: null
        }
    }

    function selectTerrain(type) {
        var prop;
        var runningTotal = 0;
        var sides = getTotal(type);
        var roll = Rand.roll(sides);
        for (prop in terrainFrequencies[type]) {
            if (terrainFrequencies[type][prop] === 0) continue; //0 means not an option
            runningTotal += terrainFrequencies[type][prop];
            if (roll <= runningTotal) return prop;
        }
    }

    function getTotal(type) {
        var prop;
        var total = 0;
        for (prop in terrainFrequencies[type]) {
            total += terrainFrequencies[type][prop];
        }
        return total;
    }

    return RegionMapGenerator;
});