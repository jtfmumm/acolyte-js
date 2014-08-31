define(function(require) {
    var $ = require("jquery");
    var mustache = require("mustache");
    var Matrix = require("js/utils/Matrix");
    var HTMLCodeTable = require("js/data/HTMLCodeTable");

    function HTMLDisplay() {
        this.codeTable = compileCodeTable(HTMLCodeTable);
    }

    HTMLDisplay.prototype = {
        renderMap: function(mapCodes) {
            var that = this;
            var newMap = mapCodes.map(function(code) {
                return that.codeTable[code];
            });

            var flatMap = newMap.flatJoin("", "<br>");
            $("#display").html(flatMap);
        }
    };

    function compileCodeTable(codeTable) {
        var terrainKey, newCodeTable = {};
        for (terrainKey in codeTable) {
            var entry;
            var terrain = codeTable[terrainKey];
            if (terrain.color) {
                entry = "<span class='" + terrain.color + "'>" + terrain.symbol + "</span>";
            } else {
                entry = terrain.symbol;
            }
            newCodeTable[terrainKey] = entry;
        }
        return newCodeTable;
    }

    return HTMLDisplay;
});