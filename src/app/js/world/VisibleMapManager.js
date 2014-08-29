define(function(require) {

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");

    function VisibleMapManager(regionMatrix) {
        var regionCoords = regionMatrix.getStartingRegionCoords();
        var diameter = regionMatrix.getDiameter();
        this.NWCorner = new WorldCoords(regionCoords, new Coords(0, 0));
        this.NECorner = new WorldCoords(regionCoords, new Coords(diameter, 0));
        this.SWCorner = new WorldCoords(regionCoords, new Coords(0, diameter));
        this.SECorner = new WorldCoords(regionCoords, new Coords(diameter, diameter));
        this.regionMatrix = regionMatrix;
        this.map = new Matrix();
    }

    VisibleMapManager.prototype = {
        display: function(display) {
            this.updateMap();
            var codeMap = this.map.map(getTileCode);
            display.renderMap(codeMap);
        },
        getRegion: function(wCoords) {
            var regionMatrixCoords = wCoords.getRegionMatrixCoords();
            return this.regionMatrix.getRegion(regionMatrixCoords);
        },
        updateMap: function() {
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