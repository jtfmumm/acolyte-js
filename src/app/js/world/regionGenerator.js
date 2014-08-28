define(function(require) {
    "use strict";

    var Matrix = require("js/utils/Matrix");
    var terrainFrequencies = require("js/data/terrainFrequencies");
    var Rand = require("js/utils/Rand");

    var regionGenerator = {
        average: function(diameter) {
            return generateMap(diameter, "average");
        }
    };

    function generateMap(diameter, type) {
        var i, j;
        var newMap = [];
        for (i = 0; i < diameter; i++) {
            newMap.push([]);
            for (j = 0; j < diameter; j++) {
                newMap[i].push(selectTerrain(type));
            }
        }
        return new Matrix(newMap);
    }

    function selectTerrain(type) {
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
        var total = 0;
        for (prop in terrainFrequencies[type]) {
            total += terrainFrequencies[type][prop];
        }
        return total;
    }

    return regionGenerator;
});