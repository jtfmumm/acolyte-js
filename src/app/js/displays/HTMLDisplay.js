define(function(require) {
    var $ = require("jquery");
    var mustache = require("mustache");
    var Matrix = require("js/utils/Matrix");
    var HTMLCodeTable = require("js/data/HTMLCodeTable");

    function HTMLDisplay() {

    }
    HTMLDisplay.prototype.renderMap = function(mapCodes) {
        var newMap = mapCodes.map(function(code) {
            return HTMLCodeTable[code];
        });

        var flatMap = newMap.flatJoin("", "<br>");
        $("#display").html(flatMap);    
    }

    return HTMLDisplay;
});