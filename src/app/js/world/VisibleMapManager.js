define(function(require) {

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");
    var WorldSubMapper = require("js/world/WorldSubMapper");

    function VisibleMapManager(regionMatrix) {
        var regionCoords = regionMatrix.getStartingRegionCoords();
        this.diameter = regionMatrix.getDiameter();
        this.regionMatrix = regionMatrix;
        this.map = new Matrix();
    }

    VisibleMapManager.prototype = {
        display: function(display, focus) {
            this.updateMap(focus);
            var codeMap = this.map.map(getTileCode);
            display.renderMap(codeMap);
        },
        getRegion: function(wCoords) {
            var regionMatrixCoords = wCoords.getRegionMatrixCoords();
            return this.regionMatrix.getRegion(regionMatrixCoords);
        },
        updateMap: function(focus) {
            this.map = WorldSubMapper.getSubMap(this.regionMatrix, focus, Math.floor(this.diameter / 2));
        }
    };

    function getTileCode(tile) {
        if (tile.occupant)
            return tile.occupant.getCode();
        else
            return tile.terrain.code;
    }

    return VisibleMapManager;
});