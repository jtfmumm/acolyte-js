define(function(require) {
    var Rand = require("js/utils/Rand");

    function generateMap(diameter) {
        var initialMap = [];
        for (var i = 0; i < 100; i++) {
            initialMap.push([]);
            for (var j = 0; j < 100; j++) {
                initialMap[i].push(blankSpace());
            }
        }
        return initialMap;
    }

    function uniform(width, height, terrainCodeTable) {
        var uniformMap = [];
        for (var i = 0; i < height; i++) {
            uniformMap.push([]);
            for (var j = 0; j < width; j++) {
                var key = Rand.pickEntryKey(terrainCodeTable);
                uniformMap[i].push(generateSpace(terrainCodeTable[key]));
            }
        }
        return uniformMap;
    }

    function generateSpace(terrain) {
        return {
            terrain: terrain,
            occupant: null
        }
    }

    return {
        uniform: uniform
    }
});