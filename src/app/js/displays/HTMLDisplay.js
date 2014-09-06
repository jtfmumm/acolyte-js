define(function(require) {
    var $ = require("jquery");
    var mustache = require("mustache");
    var Matrix = require("js/utils/Matrix");
    var HTMLCodeTable = require("js/data/HTMLCodeTable");

    function HTMLDisplay() {
        this.codeTable = compileCodeTable(HTMLCodeTable);
    }

    HTMLDisplay.prototype = {
        renderMap: function(tileCodes) {
            var that = this;
            var newMap = tileCodes.map(function(tileCode) {
                return compileHTML(tileCode);
//                return that.codeTable[code];
            });

            var flatMap = newMap.flatJoin("", "<br>");
            $("#display").html(flatMap);
        }
    };

    function compileHTML(tileCode) {
        var tileObject = HTMLCodeTable[tileCode.object];
        var elevation = HTMLCodeTable[tileCode.elevation];
        var color = tileObject.color ? tileObject.color : "black";
        var backColor = elevation.color;
        var symbol = tileObject.symbol;

        return "<span class='" + color + " background-" + backColor + "'>" + symbol + "</span>";
    }

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